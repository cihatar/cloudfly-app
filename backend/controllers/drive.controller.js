const CustomAPIError = require("../errors/custom.error.js");
const File = require("../models/file.model.js");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuid } = require('uuid');
const { encryptFile, decryptFile } = require("../utils/drive.js");

const uploadFile = async (req, res) => {
    const user = req.user;

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new CustomAPIError("No file uploaded", 400);
    }

    // if one file is uploaded then add it into array
    if (!Array.isArray(req.files.files)) {
        req.files.files = Array.of(req.files.files);
    }

    const files = req.files.files;

    const uploadPath = path.join(__dirname, `../private/${user._id}/`);
    try {
        await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    for (const file of files) {
        const encryptedFileName = uuid() + ".enc";
        const p = path.join(uploadPath, encryptedFileName);
        try {
            await encryptFile(file.data, p);
        } catch (err) {
            throw new CustomAPIError("Something went wrong", 500);
        }
        // save file to db
        await new File({
            owner: user._id,
            originalName: file.name,
            name: encryptedFileName,
            size: file.size,
            mimeType: file.mimetype,
        }).save();
    }

    res.status(200).json({ message: "File uploaded successfully" });
};

module.exports = { uploadFile };
