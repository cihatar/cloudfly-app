const CustomAPIError = require("../errors/custom.error.js");
const User = require("../models/user.model.js");
const ResetPasswordToken = require("../models/resetPasswordToken.model.js");
const crypto = require("crypto");
const { attachCookiesToResponse } = require("../utils/jwt.js");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail.js");

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

    return res.status(200).json({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        profileImage: existingUser.profileImage,
        maxStorage: existingUser.maxStorage,
    });
};

// google login & signup
const googleSign = async (req, res) => {
    const { firstName, lastName, email, profileImage, maxStorage } = req.user;

    // set cookie
    attachCookiesToResponse({ res, payload: { userId: req.user._id } });

    return res.status(200).json({ firstName, lastName, email, profileImage, maxStorage });
}

// logout
const logout = async (req, res) => {
    res.cookie('token', "", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ message: 'You logged out' });
};

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new CustomAPIError("Please provide email address", 400);
    }

    const user = await User.findOne({ email });

    if (user) {
        const token = crypto.randomBytes(70).toString('hex');
        const tenMinutes = 1000 * 60 * 10;
        const expirationDate = new Date(Date.now() + tenMinutes);

        const resetPasswordToken = await ResetPasswordToken.create({ token, expirationDate, user: user._id });

        // send email
        await sendResetPasswordEmail({
            name: user.firstName,
            email: user.email,
            token: resetPasswordToken.token,
        });
    }
    
    res.status(200).json({ message: 'Please check your email for reset password link' });
}

// reset password
const resetPassword = async (req, res) => {
    const { token, password, password_confirmation } = req.body;

    if (!token || !password && !password_confirmation) {
        throw new CustomAPIError("Please provide all required fields", 400);
    }

    if (password !== password_confirmation) {
        throw new CustomAPIError("Passwords are not same", 400);
    }
    
    const resetPasswordToken = await ResetPasswordToken.findOne({ token });
    if (!resetPasswordToken) {
        throw new CustomAPIError("Token is invalid", 400);
    }

    const userId = resetPasswordToken.user;
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomAPIError("User not found", 404);
    }

    // check expiration date
    const currentDate = new Date();
    const expirationDate = new Date(resetPasswordToken.expirationDate);
    if (expirationDate.getTime() < currentDate.getTime()) {
        await resetPasswordToken.deleteOne();
        throw new CustomAPIError("Token has expired", 400);
    }

    // update password
    user.password = password;
    await user.save();

    // remove token from db
    await resetPasswordToken.deleteOne();

    res.status(200).json({ message: "Your password has been successfully updated" })
}

const verifyToken = async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (!user) {
        throw new CustomAPIError("User not found", 404);
    }

    return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        maxStorage: user.maxStorage,
    });
}

module.exports = { registerUser, loginUser, googleSign, logout, forgotPassword, resetPassword, verifyToken };
