const CustomAPIError = require("../errors/custom.error.js");
const File = require("../models/file.model.js");
const path = require("path");
const fs = require("fs").promises;
const { isValidObjectId } = require("mongoose");
const { v4: uuid } = require('uuid');
const { encryptFile, decryptFile } = require("../utils/drive.js");

// upload file
const uploadFile = async (req, res) => {
    const user = req.user;
    const { parent } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new CustomAPIError("No file uploaded", 400);
    }

    let files = req.files.files;

    // if one file is uploaded then add it into array
    if (!Array.isArray(files)) {
        files = Array.of(files);
    }

    const uploadPath = path.join(__dirname, `../private/${user._id}/`);
    try {
        await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    for (const file of files) {
        // if file name is same then remove the existing one and upload new one
        const doesFileExist = await File.findOneAndDelete({ originalName: file.name });
        if (doesFileExist) {
            try {
                user.currentStorage -= doesFileExist.size;
                await fs.rm(uploadPath + doesFileExist.name, { recursive: true, force: true });
            } catch (err) {
                throw new CustomAPIError("Something went wrong", 500);
            }
        }

        // check size
        const totalStorage = user.currentStorage + file.size;
        if (totalStorage > user.maxStorage) { 
            throw new CustomAPIError(`Your ${file.name} couldn't be uploaded because you have reached the storage limit`, 400);
        }
        user.currentStorage = totalStorage;

        const encryptedFileName = uuid() + ".enc";
        const encryptedFilePath = path.join(uploadPath, encryptedFileName);

        // save file and user to db
        await new File({
            owner: user._id,
            parent: isValidObjectId(parent) ? parent : null,
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

    res.status(200).json({ message: "File uploaded successfully" });
};

module.exports = { uploadFile };
