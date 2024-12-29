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
    renameFile,
    renameFolder,
} = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFilesAndFolders);
router.get("/get-file/:id", authenticateUser, getFileInformation);
router.get("/download/:id", authenticateUser, downloadFile);
router.post("/create-folder", authenticateUser, trimRequest.all, createFolder);
router.put("/rename-file", authenticateUser, trimRequest.all, renameFile);
router.put("/rename-folder", authenticateUser, trimRequest.all, renameFolder);

module.exports = router;