const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const {
    uploadFile,
    getFilesAndFolders,
    getStarredFilesAndFolders,
    getTrashedFilesAndFolders,
    getFileDetails,
    downloadFile,
    createFolder,
    rename,
    shareFile,
    star,
    unstar,
    getFolders,
    move,
    makeFilePrivate,
    moveToTrash,
    restore,
    deletePermanently,
    getFilePreviewPublic,
    getFileDetailsPublic,
    downloadFilePublic,
} = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFilesAndFolders);
router.get("/get-starred/:id", authenticateUser, getStarredFilesAndFolders);
router.get("/get-trashed", authenticateUser, getTrashedFilesAndFolders);
router.get("/get-file/:id", authenticateUser, getFileDetails);
router.get("/download/:id", authenticateUser, downloadFile);
router.post("/create-folder", authenticateUser, trimRequest.all, createFolder);
router.put("/rename", authenticateUser, trimRequest.all, rename);
router.put("/star", authenticateUser, star);
router.put("/unstar", authenticateUser, unstar);
router.get("/get-folders/:id", authenticateUser, getFolders);
router.put("/move", authenticateUser, move);
router.put("/share-file", authenticateUser, shareFile);
router.put("/make-file-private", authenticateUser, makeFilePrivate);
router.put("/move-to-trash", authenticateUser, moveToTrash);
router.put("/restore", authenticateUser, restore);
router.delete("/delete/:id", authenticateUser, deletePermanently);
router.get("/file-preview-public/:key", getFilePreviewPublic);
router.get("/get-file-public/:key", getFileDetailsPublic);
router.get("/download-public/:key", downloadFilePublic);

module.exports = router;