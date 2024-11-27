const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const { registerUser, loginUser, googleSign, logout } = require("../controllers/auth.controller.js");

router.post("/login", trimRequest.all, loginUser);
router.post("/register", trimRequest.all, registerUser);
router.get("/logout", logout);

// google oauth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: '/' }), googleSign);

module.exports = router;