const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const {
    uploadFile,
    getFilesAndFolders,
    getFileDetails,
    downloadFile,
    createFolder,
    renameFile,
    renameFolder,
    shareFile,
    makeFilePrivate,
    getFilePreviewPublic,
    getFileDetailsPublic,
} = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFilesAndFolders);
router.get("/get-file/:id", authenticateUser, getFileDetails);
router.get("/download/:id", authenticateUser, downloadFile);
router.post("/create-folder", authenticateUser, trimRequest.all, createFolder);
router.put("/rename-file", authenticateUser, trimRequest.all, renameFile);
router.put("/rename-folder", authenticateUser, trimRequest.all, renameFolder);
router.post("/share-file", authenticateUser, shareFile);
router.post("/make-file-private", authenticateUser, makeFilePrivate);
router.get("/file-preview-public/:key", getFilePreviewPublic);
router.get("/get-file-public/:key", getFileDetailsPublic);

module.exports = router;