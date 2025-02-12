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
    const existingFiles = await File.find({ owner: user._id, parent, originalName: { $in: files.map(file => file.name) }, isDeleted: false });

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
        await File.deleteMany({ owner: user._id, parent, originalName: { $in: files.map(file => file.name) }, isDeleted: false });
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

    let files = await File.find({ owner: user._id, parent, isDeleted: false })
        .select("_id parent originalName mimeType type isStarred isDeleted publicKey");
    let folders = await Folder.find({ owner: user._id, parent, isDeleted: false })
        .select("_id parent name isStarred isDeleted");

    files = files.length === 0 ? null : files;
    folders = folders.length === 0 ? null : folders;

    res.status(200).json({ files, folders });
}

// get latest data
const getLatestFiles = async (req, res) => {
    const user = req.user;    

    let lastUploadedFiles = await File.find({ owner: user._id, isDeleted: false, })
        .sort({ createdAt: -1 })
        .limit(6);  

    let lastUpdatedFiles = await File.find({ owner: user._id, isDeleted: false, })
        .sort({ updatedAt: -1 })
        .limit(6);  
    
    // remove newly uploaded files from updated files array
    lastUpdatedFiles = lastUpdatedFiles.filter(updatedFile => 
        !lastUploadedFiles.some(uploadedFile => 
            uploadedFile._id.toString() === updatedFile._id.toString() &&
            uploadedFile.createdAt.getTime() === updatedFile.updatedAt.getTime()
        )
    );

    lastUploadedFiles = lastUploadedFiles.length === 0 ? null : lastUploadedFiles;
    lastUpdatedFiles = lastUpdatedFiles.length === 0 ? null : lastUpdatedFiles;

    res.status(200).json({ lastUploadedFiles, lastUpdatedFiles });
}

// search files and folders
const searchFilesAndFolders = async (req, res) => {
    const { k } = req.query;
    const user = req.user;  
    
    let files = await File.find({ owner: user._id, isDeleted: false, originalName: { $regex: `^${k}`, $options: 'i' } })
        .select("_id parent originalName mimeType type isStarred isDeleted publicKey");
    let folders = await Folder.find({ owner: user._id, isDeleted: false, name: { $regex: `^${k}`, $options: 'i' } })
        .select("_id parent name isStarred isDeleted");

    files = files.length === 0 ? null : files;
    folders = folders.length === 0 ? null : folders;

    res.status(200).json({ files, folders });
}

// get starred files and folders
const getStarredFilesAndFolders = async (req, res) => {
    let parent = req.params.id;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;    
    
    let files = await File.find({ owner: user._id, isStarred: true, isDeleted: false })
        .select("_id parent originalName mimeType type isStarred isDeleted publicKey");
    let folders = await Folder.find({ owner: user._id, isStarred: true, isDeleted: false })
        .select("_id parent name isStarred isDeleted");
    
    files = files.length === 0 ? null : files;
    folders = folders.length === 0 ? null : folders;

    res.status(200).json({ files, folders });
} 

// get trashed files and folders
const getTrashedFilesAndFolders = async (req, res) => {
    const user = req.user;    
    
    let files = await File.find({ owner: user._id, isDeleted: true })
        .select("_id parent originalName mimeType type isStarred isDeleted publicKey");
    let folders = await Folder.find({ owner: user._id, isDeleted: true })
        .select("_id parent name isStarred isDeleted");
    
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
    const existingFolder = await Folder.findOne({ owner: user._id, parent, name, isDeleted: false });
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

// rename file or folder
const rename = async (req, res) => {
    let { _id, parent, name, type } = req.body;
    _id = isValidObjectId(_id) ? _id : null;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;
    
    if (!name) {
        throw new CustomAPIError("Please provide name", 400);
    }

    let message;
    if (type === "file") {
        const file = await File.findOne({ _id, parent, owner: user._id })
        if (!file) {
            throw new CustomAPIError("File not found", 404);
        }
        const newName = name + path.extname(file.originalName); 
        // if there is a file with the same name then throw an error
        const existingFile = await File.findOne({ owner: user._id, parent, originalName: newName, isDeleted: false});
        if (existingFile) {
            throw new CustomAPIError("There is already a file with the same name in this directory", 400);
        }
        file.originalName = newName;
        await file.save();
        message = "Your file has been successfully renamed";
    } else if (type === "folder") {
        const folder = await Folder.findOne({ _id, parent, owner: user._id })
        if (!folder) {
            throw new CustomAPIError("Folder not found", 404);
        }
        // if there is a folder with the same name then throw an error
        const existingFolder = await Folder.findOne({ owner: user._id, parent, name, isDeleted: false });
        if (existingFolder) {
            throw new CustomAPIError("There is already a folder with the same name in this directory", 400);
        }
        folder.name = name;
        await folder.save();
        message = "Your folder has been successfully renamed";
    } else {
        throw new CustomAPIError("Invalid type provided", 400);
    }

    res.status(200).json({ message });
}

// star file or folder
const star = async (req, res) => {
    let { files, folders } = req.body;
    const user = req.user;

    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    }  

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }
            file.isStarred = true;
            await file.save();
        }
    }
    if (folders && folders.length > 0) {
        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }
            folder.isStarred = true;
            await folder.save();
        }
    }

    res.status(200).json({ message: "Starred successfully" });
}

// unstar file or folder
const unstar = async (req, res) => {
    let { files, folders } = req.body;
    const user = req.user;

    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    }  

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }
            file.isStarred = false;
            await file.save();
        }
    }
    if (folders && folders.length > 0) {
        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }
            folder.isStarred = false;
            await folder.save();
        }
    }
    
    res.status(200).json({ message: "Removed from starred" });
}

// get folders
const getFolders = async (req, res) => {
    let parent = req.params.id;
    let folderId = req.query.folderId;
    parent = isValidObjectId(parent) ? parent : null;
    folderId = isValidObjectId(folderId) ? folderId : null;
    const user = req.user;
    
    let folders = await Folder.find({ _id: { $ne: folderId }, owner: user._id, parent, isDeleted: false })
        .select("_id parent name");
    folders = folders.length === 0 ? null : folders;

    let parentFolder = await Folder.findOne({ _id: folders !== null ? folders[0].parent : parent, owner: user._id, isDeleted: false})
            .select("_id parent name");
    
    res.status(200).json({ folders, parentFolder });
}

// move
const move = async (req, res) => {
    let { data, parent } = req.body;
    parent = isValidObjectId(parent) ? parent : null;
    const user = req.user;
    let files = data.files;
    let folders = data.folders;

    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    }  

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }

            if (file.parent?.toString() === parent || file.parent === parent) {
                throw new CustomAPIError("This file is already in this directory", 400);
            }

            async function generateName(name, i) {                
                const fileWithSameName = await File.findOne({ owner: user._id, parent, originalName: name, isDeleted: false });
                if (!fileWithSameName) {
                    file.originalName = name;
                    return;
                }
                const existingFileName = path.basename(file.originalName, path.extname(file.originalName)) + " (" + i + ")" + path.extname(file.originalName);
                i++;
                await generateName(existingFileName, i);
            }

            let i = 1;
            await generateName(file.originalName, i);

            file.parent = parent;
            await file.save();
        }
    } 
    if (folders && folders.length > 0) {
        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }

            if (folder.parent?.toString() === parent || folder.parent === parent) {
                throw new CustomAPIError("This folder is already in this directory", 400);
            }

            async function generateName(name, i) {                
                const folderWithSameName = await Folder.findOne({ owner: user._id, parent, name, isDeleted: false });
                if (!folderWithSameName) {
                    folder.name = name;
                    return;
                }
                const existingFolderName = folder.name + " (" + i + ")";
                i++;
                await generateName(existingFolderName, i);
            }

            let i = 1;
            await generateName(folder.name, i);

            folder.parent = parent;
            await folder.save();
        }
    }

    res.status(200).json({ message: "Moved successfully" });
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

const moveToTrash = async (req, res) => {
    let { files, folders } = req.body;
    const user = req.user;
    
    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    }

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }
            file.isDeleted = true;
            file.deletedAt = new Date(Date.now());
            file.isStarred = false;
            file.publicKey = null;
            await file.save();
        }
    } 
    if (folders && folders.length > 0) {
        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }
            folder.isDeleted = true;
            folder.deletedAt = new Date(Date.now());
            folder.isStarred = false;
            await folder.save();
        }
    } 
    
    res.status(200).json({ message: "Moved to trash" });
}

// restore 
const restore = async (req, res) => {
    let { files, folders } = req.body;
    const user = req.user;

    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    }    

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }

            const parentFolder = await Folder.findOne({ _id: file.parent, owner: user._id });
            if (!parentFolder || parentFolder?.isDeleted) {
                file.parent = null;
            } else {
                async function isParentDeleted(parent) {
                    const deletedParent = await Folder.findOne({ _id: parent, owner: user._id });
                    if (deletedParent && deletedParent?.isDeleted) {
                        file.parent = null;
                        return;
                    } else if (!deletedParent) {
                        return;
                    }
                    await isParentDeleted(deletedParent.parent);
                }

                await isParentDeleted(parentFolder.parent);
            }

            async function generateName(name, i) {                
                const fileWithSameName = await File.findOne({ owner: user._id, parent: file.parent, originalName: name, isDeleted: false });
                if (!fileWithSameName) {
                    file.originalName = name;
                    return;
                }
                const existingFileName = path.basename(file.originalName, path.extname(file.originalName)) + " (" + i + ")" + path.extname(file.originalName);
                i++;
                await generateName(existingFileName, i);
            }

            let i = 1;
            await generateName(file.originalName, i);

            file.isDeleted = false;
            file.deletedAt = null;  
            await file.save();
        }
    }
    if (folders && folders.length > 0) {
        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }
            
            const parentFolder = await Folder.findOne({ _id: folder.parent, owner: user._id });
            if (!parentFolder || parentFolder?.isDeleted) {
                folder.parent = null;
            } else {
                async function isParentDeleted(parent) {
                    const deletedParent = await Folder.findOne({ _id: parent, owner: user._id });
                    if (deletedParent && deletedParent?.isDeleted) {
                        folder.parent = null;
                        return;
                    } else if (!deletedParent) {
                        return;
                    }
                    await isParentDeleted(deletedParent.parent);
                }

                await isParentDeleted(parentFolder.parent);
            }

            async function generateName(name, i) {                
                const folderWithSameName = await Folder.findOne({ owner: user._id, parent: folder.parent, name, isDeleted: false });
                if (!folderWithSameName) {
                    folder.name = name;
                    return;
                }
                const existingFolderName = folder.name + " (" + i + ")";
                i++;
                await generateName(existingFolderName, i);
            }

            let i = 1;
            await generateName(folder.name, i);

            folder.isDeleted = false;
            folder.deletedAt = null;
            await folder.save();
        }
    }
    
    res.status(200).json({ message: "Restored successfully" });
}

// delete permanently
const deletePermanently = async (req, res) => {
    let { files, folders } = req.body;
    const user = req.user;

    if (!files && !folders) {
        throw new CustomAPIError("No files or folders found");
    } 

    const userFilesPath = path.join(__dirname, `../private/${user._id}/`);

    if (files && files.length > 0) {
        for (const f of files) {
            const file = await File.findOne({ _id: f._id, owner: user._id, isDeleted: true });
            if (!file) {
                throw new CustomAPIError("File not found", 404);
            }
            try {
                await fs.rm(userFilesPath + file.name, { recursive: true, force: true });
            } catch (err) {
                throw new CustomAPIError("Something went wrong", 500);
            }
            user.currentStorage -= file.size;
            await file.deleteOne();
            await user.save();
        }
    }
    if (folders && folders.length > 0) {

        async function deleteRecursive(parent) {
            const subFiles = await File.find({ owner: user._id, parent, isDeleted: false });  
            for (let file of subFiles) {                    
                try {
                    await fs.rm(userFilesPath + file.name, { recursive: true, force: true });
                } catch (err) {
                    throw new CustomAPIError("Something went wrong", 500);
                }
                user.currentStorage -= file.size;
                await file.deleteOne();
            }  
              
            const subFolders = await Folder.find({ owner: user._id, parent, isDeleted: false });            
            for (let folder of subFolders) {
                await deleteRecursive(folder._id); 
                await folder.deleteOne();
            }
        }

        for (const f of folders) {
            const folder = await Folder.findOne({ _id: f._id, owner: user._id, isDeleted: true });
            if (!folder) {
                throw new CustomAPIError("Folder not found", 404);
            }
            await deleteRecursive(folder._id);
            await folder.deleteOne();
            await user.save();
        }
    }
    
    res.status(200).json({ currentStorage: user.currentStorage, message: "Deleted successfully" });
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
    getLatestFiles,
    searchFilesAndFolders,
    getStarredFilesAndFolders,
    getTrashedFilesAndFolders,
    getFileDetails,
    downloadFile,
    createFolder,
    rename,
    star,
    unstar,
    getFolders,
    move,
    shareFile,
    makeFilePrivate,
    moveToTrash,
    restore,
    deletePermanently,
    getFilePreviewPublic,
    getFileDetailsPublic,
    downloadFilePublic,
};
