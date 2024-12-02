const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");
const trimRequest = require("trim-request");
const passport = require("passport");
const { authenticateUser } = require("../middlewares/authentication.js");
const {
    registerUser,
    loginUser,
    googleSign,
    logout,
    forgotPassword,
    resetPassword,
    verifyToken
} = require("../controllers/auth.controller.js");

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

router.post("/login", limiter, trimRequest.all, loginUser);
router.post("/register", limiter, trimRequest.all, registerUser);
router.get("/logout", logout);
router.post("/forgot-password", limiter, trimRequest.all, forgotPassword);
router.post("/reset-password", limiter, trimRequest.all, resetPassword);
router.post("/verify-token", authenticateUser, verifyToken);

// google oauth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/auth/login` }), googleSign);

module.exports = router;