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
    },
    { timestamps: true }
);

folderSchema.index({ owner: 1, parent: null, name: 1 }, { unique: true });
folderSchema.index({ owner: 1, parent: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("folder", folderSchema);
