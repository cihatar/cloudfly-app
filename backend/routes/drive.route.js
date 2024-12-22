const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const { uploadFile, getFileInformation } = require("../controllers/drive.controller.js");

router.post("/upload", authenticateUser, fileUpload(), uploadFile);
router.get("/get/:id", authenticateUser, getFileInformation);

module.exports = router;