const mongoose = require("mongoose");

const resetPasswordTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            unique: true,
            required: true,
        },
        expirationDate: {
            type: Date,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("reset_password_token", resetPasswordTokenSchema);
