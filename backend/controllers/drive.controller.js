const CustomAPIError = require("../errors/custom.error.js");
const File = require("../models/file.model.js");
const Folder = require("../models/folder.model.js");
const path = require("path");
const fs = require("fs").promises;
const crypto = require("crypto");
const moment = require("moment");
const mime = require('mime-types')
const { isValidObjectId } = require("mongoose");
const { v4: uuid } = require('uuid');
const { encryptFile, decryptFile, bytesToSize } = require("../utils/drive.js");
const { previewFile } = require("../utils/preview.js");

// upload file
const uploadFile = async (req, res) => {
    let { parent } = req.body;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new CustomAPIError("No file uploaded", 400);
    }

    let files = req.files.files;

    // if only one file is uploaded then convert to array
    if (!Array.isArray(files)) {
        files = Array.of(files);
    }

    // get existing files with the same name in db
    const existingFiles = await File.find({ owner: user._id, parent, originalName: { $in: files.map(file => file.name) } });

    // calculate total size for replaced files
    const existingFileSizes = existingFiles.reduce((sum, f) => sum + f.size, 0);    
    
    // check size
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    
    const totalStorage = user.currentStorage + totalSize - existingFileSizes;
    if (totalStorage > user.maxStorage) {
        const message = files.length > 1 
                            ? "The size of the files exceeds your storage limit" 
                            : "The size of the file exceeds your storage limit"
        throw new CustomAPIError(message, 400);
    }

    const uploadPath = path.join(__dirname, `../private/${user._id}/`);
    
    // delete existing files if any
    if (existingFiles.length > 0) {
        await File.deleteMany({ owner: user._id, parent, originalName: { $in: files.map(file => file.name) } });
        await Promise.all(existingFiles.map(async (existingFile) => {
            try {
                await fs.rm(uploadPath + existingFile.name, { recursive: true, force: true });
            } catch (err) {
                throw new CustomAPIError("Something went wrong", 500);
            }
        }));
    }
    
    try {
        await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    await Promise.all(files.map(async (file) => {
        const encryptedFileName = uuid() + ".enc";
        const encryptedFilePath = path.join(uploadPath, encryptedFileName);

        try {
            await encryptFile(file.data, encryptedFilePath);
        } catch (err) {
            throw new CustomAPIError("Something went wrong", 500);
        }

        const mimeType = mime.lookup(file.name);        
        const type = mime.extension(mimeType);

        // save file
        await new File({
            owner: user._id,
            parent: parent,
            originalName: file.name,
            name: encryptedFileName,
            size: file.size,
            mimeType: mimeType,
            type: type,
        }).save();
    }));

    // save user
    user.currentStorage = totalStorage;
    await user.save();

    res.status(201).json({ currentStorage: totalStorage, message: "File uploaded successfully" });
};

// get all files and folders
const getFilesAndFolders = async (req, res) => {
    let parent = req.params.id;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;

    let files = await File.find({ owner: user._id, parent })
        .select("_id parent originalName mimeType type isStarred publicKey");
    let folders = await Folder.find({ owner: user._id, parent })
        .select("_id parent name isStarred");

    files = files.length === 0 ? null : files;
    folders = folders.length === 0 ? null : folders;

    res.status(200).json({ files, folders });
} 

// get file information
const getFileDetails = async (req, res) => {
    let _id = req.params.id;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    const file = await File.findOne({ _id, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }
    
    const { originalName, mimeType, type, isStarred, publicKey } = file;
    const size = bytesToSize(file.size);
    const createdAt = moment(file.createdAt).format("LLLL");
    const updatedAt = moment(file.updatedAt).format("LLLL");

    res.status(200).json({ originalName, size, mimeType, type, isStarred, publicKey, createdAt, updatedAt });
}

// download file
const downloadFile = async (req, res) => {
    let _id = req.params.id;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    const file = await File.findOne({ _id, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    const uploadPath = path.join(__dirname, `../private/${user._id}/`);
    const encryptedFilePath = path.join(uploadPath, file.name);
    let buffer;
    try {
        buffer = await decryptFile(encryptedFilePath);
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }
    
    res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);
    res.type(file.mimeType);
    res.status(200).send(buffer);
}

// create folder
const createFolder = async (req, res) => {
    let { name, parent } = req.body;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;

    // if there is a folder with the same name then throw an error
    const existingFolder = await Folder.findOne({ owner: user._id, parent, name });
    if (existingFolder) {
        throw new CustomAPIError("There is already a folder with the same name in this directory", 400);
    }
    
    const newFolder = await Folder.create({ owner: user._id, parent, name });
    res.status(201).json({
        folder: {
            _id: newFolder._id,
            parent: newFolder.parent,
            name: newFolder.name,
            isStarred: newFolder.isStarred,
        },
        message: "Folder created successfully",
    });
}

// rename file
const renameFile = async (req, res) => {
    let { _id, parent, name } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;
    
    if (!name) {
        throw new CustomAPIError("Please provide file name", 400);
    }

    const file = await File.findOne({ _id, parent, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    const newName = name + path.extname(file.originalName); 

    // if there is a file with the same name then throw an error
    const existingFile = await File.findOne({ owner: user._id, parent, originalName: newName});
    if (existingFile) {
        throw new CustomAPIError("There is already a file with the same name in this directory", 400);
    }

    file.originalName = newName;
    await file.save();
    res.status(200).json({ message: "You have successfully renamed your file" });
}

// rename folder
const renameFolder = async (req, res) => {
    let { _id, parent, name } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;

    if (!name) {
        throw new CustomAPIError("Please provide folder name", 400);
    }

    const folder = await Folder.findOne({ _id, parent, owner: user._id })
    if (!folder) {
        throw new CustomAPIError("Folder not found", 404);
    }

    // if there is a folder with the same name then throw an error
    const existingFolder = await Folder.findOne({ owner: user._id, parent, name });
    if (existingFolder) {
        throw new CustomAPIError("There is already a folder with the same name in this directory", 400);
    }

    folder.name = name;
    await folder.save();
    res.status(200).json({ message: "You have successfully renamed your folder" });
}

// star file or folder
const star = async (req, res) => {
    let { _id, type } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    let message;
    if (type === 'file') {
        const file = await File.findOne({ _id, owner: user._id });
        if (!file) {
            throw new CustomAPIError("File not found", 404);
        }
        file.isStarred = true;
        await file.save();
        message = "Your file has been starred";
    } else if (type === 'folder') {
        const folder = await Folder.findOne({ _id, owner: user._id });
        if (!folder) {
            throw new CustomAPIError("Folder not found", 404);
        }
        folder.isStarred = true;
        await folder.save();
        message = "Your folder has been starred";
    } else {
        throw new CustomAPIError("Invalid type provided", 400);
    }
    
    res.status(200).json({ message });
}

// unstar file or folder
const unstar = async (req, res) => {
    let { _id, type } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    let message;
    if (type === 'file') {
        const file = await File.findOne({ _id, owner: user._id });
        if (!file) {
            throw new CustomAPIError("File not found", 404);
        }
        file.isStarred = false;
        await file.save();
        message = "Your file has been removed from starred";
    } else if (type === 'folder') {
        const folder = await Folder.findOne({ _id, owner: user._id });
        if (!folder) {
            throw new CustomAPIError("Folder not found", 404);
        }
        folder.isStarred = false;
        await folder.save();
        message = "Your folder has been removed from starred";
    } else {
        throw new CustomAPIError("Invalid type provided", 400);
    }
    
    res.status(200).json({ message });
}

// share file/make public
const shareFile = async (req, res) => {
    let { _id } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    const file = await File.findOne({ _id, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    const uniqueId = crypto.randomBytes(16).toString('hex');
    file.publicKey = uniqueId;
    await file.save();
    res.status(200).json({ link: `${process.env.FRONTEND_URL}/file/d/${uniqueId}`, message: "Your file is public" });
}

// make file private
const makeFilePrivate = async (req, res) => {
    let { _id } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    const user = req.user;

    const file = await File.findOne({ _id, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    file.publicKey = null;
    await file.save();
    res.status(200).json({ message: "Your file has been set to private" });
}

// get file preview (public)
const getFilePreviewPublic = async (req, res) => {
    const publicKey = req.params.key;

    const file = await File.findOne({ publicKey })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    const MAX_SIZE = 1024 * 1024 * 20; // 20 MB
    if (file.size > MAX_SIZE) {
        throw new CustomAPIError("This file is too big to preview", 413);
    } 

    const uploadPath = path.join(__dirname, `../private/${file.owner}/`);
    const encryptedFilePath = path.join(uploadPath, file.name);
    let buffer;
    try {
        buffer = await decryptFile(encryptedFilePath);
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    const mimeType = file.mimeType;
    const originalName = file.originalName;
    const size = file.size;
    await previewFile(res, buffer, mimeType, originalName, size);
}

// get file details (public)
const getFileDetailsPublic = async (req, res) => {
    const publicKey = req.params.key;

    const file = await File.findOne({ publicKey }).populate("owner", "-_id firstName lastName profileImage")
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }
    
    const { owner, originalName, type } = file;
    const size = bytesToSize(file.size);

    res.status(200).json({ owner, originalName, size, type });
}

// download file (public)
const downloadFilePublic = async (req, res) => {
    const publicKey = req.params.key;

    const file = await File.findOne({ publicKey });
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }

    const uploadPath = path.join(__dirname, `../private/${file.owner}/`);
    const encryptedFilePath = path.join(uploadPath, file.name);
    let buffer;
    try {
        buffer = await decryptFile(encryptedFilePath);
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }
    
    res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);
    res.type(file.mimeType);
    res.status(200).send(buffer);
}

module.exports = {
    uploadFile,
    getFilesAndFolders,
    getFileDetails,
    downloadFile,
    createFolder,
    renameFile,
    renameFolder,
    star,
    unstar,
    shareFile,
    makeFilePrivate,
    getFilePreviewPublic,
    getFileDetailsPublic,
    downloadFilePublic,
};
