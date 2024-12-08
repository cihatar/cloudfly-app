const CustomAPIError = require("../errors/custom.error.js");
const User = require("../models/user.model.js");

// update image
const updateImage = async (req, res) => {};

// update name
const updateName = async (req, res) => {
    const { firstName, lastName } = req.body;
    const user = req.user;

    if (!firstName || !lastName) {
        throw new CustomAPIError("Please provide all required fields", 400);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(200).json({ firstName, lastName, message: "Your name has been successfully updated" });
};

// change password
const changePassword = async (req, res) => {
    const { oldPassword, password, password_confirmation } = req.body;
    const user = req.user;

    if (!oldPassword || !password || !password_confirmation) {
        throw new CustomAPIError("Please provide all required fields", 400);
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomAPIError("Please enter your current password correctly", 400);
    }

    if (password !== password_confirmation) {
        throw new CustomAPIError("Passwords are not same", 400);
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Your password has been successfully updated" });
};

// delete user
const deleteUser = async (req, res) => {
    const user = req.user;
    await user.deleteOne();
    res.clearCookie("token");
    res.status(200).json({ message: "Your account has been deleted" });
};

module.exports = { updateImage, updateName, changePassword, deleteUser };
