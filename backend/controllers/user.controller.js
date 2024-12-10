const CustomAPIError = require("../errors/custom.error.js");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuid } = require('uuid');

// update image
const updateImage = async (req, res) => {
    if (!req.files) {
        throw new CustomAPIError("No file uploaded", 400);
    }

    const profileImage = req.files.profileImage;
    if (!profileImage.mimetype.startsWith("image")) {
        throw new CustomAPIError("Please upload a valid image", 400);
    }

    const maxSize = 1024 * 1024; // 1 mb
    if (profileImage.size > maxSize) {
        throw new CustomAPIError("Please upload an image smaller 1 MB", 400);
    }

    const profileImageName = uuid() + "-" + profileImage.name;
    
    const uploadPath = path.join(__dirname, `../public/images/${req.user._id}/`);
    try {
        await fs.mkdir(uploadPath, { recursive: true });
    } catch (err) {
        throw new CustomAPIError("Something went wrong", 500);
    }

    const imagePath = path.join(uploadPath, profileImageName);
    await profileImage.mv(imagePath);

    res.status(200).json({
        profileImage: `${process.env.BASE_URL}/images/${req.user._id}/${profileImageName}`,
        message: "Your profile photo has been successfully updated",
    });
};

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
