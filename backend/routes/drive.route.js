const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const { uploadFile, getFileInformation, downloadFile } = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFileInformation);
router.get("/download/:id", authenticateUser, downloadFile);

module.exports = router;