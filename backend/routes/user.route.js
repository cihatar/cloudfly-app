const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");
const trimRequest = require("trim-request");
const fileUpload = require("express-fileupload");
const { authenticateUser } = require("../middlewares/authentication.js");
const { updateImage, removeImage, updateName, changePassword, deleteUser } = require("../controllers/user.controller.js");

// rate limiter
const limiter = rateLimit({
	windowMs: 1000 * 60 * 5,
	limit: 10,
    handler: (req, res) => {
        res.status(429).json({
            status: false,
            error: "Too many requests, please try again later",
        });
    }
})

router.put("/update-image", limiter, authenticateUser, fileUpload(), updateImage);
router.delete("/remove-image", limiter, authenticateUser, removeImage);
router.put("/update-name", limiter, authenticateUser, trimRequest.all, updateName);
router.put("/change-password", limiter, authenticateUser, trimRequest.all, changePassword);
router.delete("/delete", limiter, authenticateUser, deleteUser);

module.exports = router;