const CustomAPIError = require("../errors/custom.error.js");
const User = require("../models/user.model.js");
const { attachCookiesToResponse } = require("../utils/jwt.js");

// register
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new CustomAPIError("Please provide all required fields", 400);
    }

    // check email
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
        throw new CustomAPIError("This email address is already used", 400);
    }

    // save user to db
    await User.create({ firstName, lastName, email, password });

    return res.status(201).json({ message: "Registration successful!"});
};

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomAPIError("Please provide all required fields", 400);
    }

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new CustomAPIError("There is no user with this email", 404);
    }

    // compare password
    const isPasswordCorrect = await existingUser.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomAPIError("Wrong password", 400);
    }

    // set cookie
    attachCookiesToResponse({ res, payload: { userId: existingUser._id } });

    return res.status(200).json({ message: `Hello, ${existingUser.firstName} ${existingUser.lastName}!`});

};

// google login & signup
const googleSign = async (req, res) => {
    attachCookiesToResponse({ res, payload: { userId: req.user._id } });
    return res.redirect("/");
}

// logout
const logout = async (req, res) => {
    res.cookie('token', "", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ message: 'You logged out' });
};

module.exports = { registerUser, loginUser, googleSign, logout };
