const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");
const trimRequest = require("trim-request");
const { authenticateUser } = require("../middlewares/authentication.js");
const { updateImage, updateName, updatePassword, deleteUser } = require("../controllers/user.controller.js");

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

router.put("/update-image", limiter, authenticateUser, updateImage);
router.put("/update-name", limiter, authenticateUser, trimRequest.all, updateName);
router.put("/update-password", limiter, authenticateUser, trimRequest.all, updatePassword);
router.delete("/delete", limiter, authenticateUser, deleteUser);

module.exports = router;