const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true,
        },
        parent: {
            type: mongoose.Schema.ObjectId,
            ref: "folder",
            default: null,
        },
        name: {
            type: String,
            required: [true, "Please provide folder name"],
            maxlength: [50, "Your folder name must be maximum 50 characters"],
        },
        isStarred: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("folder", folderSchema);
