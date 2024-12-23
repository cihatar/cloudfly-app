const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
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
        originalName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            unique: true,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        isStarred: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        publicKey: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

fileSchema.index({ owner: 1, parent: null, originalName: 1 }, { unique: true });
fileSchema.index({ owner: 1, parent: 1, originalName: 1 }, { unique: true });

module.exports = mongoose.model("file", fileSchema);
