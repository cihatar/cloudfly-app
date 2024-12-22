const CustomAPIError = require("../errors/custom.error.js");
const File = require("../models/file.model.js");
const path = require("path");
const fs = require("fs").promises;
const moment = require("moment");
const mime = require('mime-types')
const { isValidObjectId } = require("mongoose");
const { v4: uuid } = require('uuid');
const { encryptFile, decryptFile, bytesToSize } = require("../utils/drive.js");

// upload file
const uploadFile = async (req, res) => {
    const user = req.user;
    let { parent } = req.body;
    parent = isValidObjectId(parent) ? parent : null;

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new CustomAPIError("No file uploaded", 400);
    }

    let files = req.files.files;

    // if one file is uploaded then add it into array and sort by size
    if (!Array.isArray(files)) {
        files = Array.of(files);
    
    }
    // sort by size
    files.sort((a, b) => a.size - b.size)
    
    const uploadPath = path.join(__dirname, `../private/${user._id}/`);
    try {
        await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    for (const file of files) {
        // if file name is same then remove the existing one and upload new one
        const existingFile = await File.findOneAndDelete({ parent, originalName: file.name });
        if (existingFile) {
            user.currentStorage -= existingFile.size;            
            try {
                await fs.rm(uploadPath + existingFile.name, { recursive: true, force: true });
            } catch (err) {
                throw new CustomAPIError("Something went wrong", 500);
            }
        }

        // check size
        const totalStorage = user.currentStorage + file.size;   
        if (totalStorage > user.maxStorage) { 
            throw new CustomAPIError(`You have reached the storage limit`, 400);
        }
        user.currentStorage = totalStorage;

        const encryptedFileName = uuid() + ".enc";
        const encryptedFilePath = path.join(uploadPath, encryptedFileName);

        // save file and user to db
        await new File({
            owner: user._id,
            parent: parent,
            originalName: file.name,
            name: encryptedFileName,
            size: file.size,
            mimeType: file.mimetype,
        }).save();
        await user.save();

        try {
            await encryptFile(file.data, encryptedFilePath);
        } catch (err) {
            throw new CustomAPIError("Something went wrong", 500);
        }
    }

    res.status(201).json({ message: "File uploaded successfully" });
};

// get file information
const getFileInformation = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;

    const file = await File.findOne({ _id, owner: user._id })
    if (!file) {
        throw new CustomAPIError("File not found", 404);
    }
    
    const { originalName, isStarred, publicKey } = file;
    const size = bytesToSize(file.size);
    const type = mime.extension(file.mimeType);
    const createdAt = moment(file.createdAt).format("YYYY MMMM DD HH:mm");
    const updatedAt = moment(file.updatedAt).format("YYYY MMMM DD HH:mm");

    res.status(200).json({ originalName, size, type, isStarred, publicKey, createdAt, updatedAt });
}

module.exports = { uploadFile, getFileInformation };
