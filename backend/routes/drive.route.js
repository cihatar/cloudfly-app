const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const {
    uploadFile,
    getFilesAndFolders,
    getFileInformation,
    downloadFile,
    createFolder,
} = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFilesAndFolders);
router.get("/get-file/:id", authenticateUser, getFileInformation);
router.get("/download/:id", authenticateUser, downloadFile);
router.post("/create-folder", authenticateUser, createFolder);

module.exports = router;