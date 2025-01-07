const sharp = require("sharp");
const CustomAPIError = require("../errors/custom.error");
const { Readable } = require("stream");

// preview file
const previewFile = async (res, buffer, mimeType, originalName, size) => {
    if (mimeType.startsWith("image/")) {
        try {
            const compressedImageBuffer = await sharp(buffer).resize(500).toFormat("webp").toBuffer(); 
            res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
            res.type(mimeType);
            res.status(200).send(compressedImageBuffer);
            return;
        } catch (err) {
            throw new CustomAPIError("This file cannot be previewed", 500);
        }
    } else if (mimeType.startsWith("video/")) {
        if (size > 1024 * 1024 * 15) {
            res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
            res.set('Content-Length', buffer.length);
            res.type(mimeType);
            const bufferStream = Readable.from(buffer);
            bufferStream.pipe(res);
            return;
        } else {
            res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
            res.type(mimeType);
            res.status(200).send(buffer);
        }
    } else if (mimeType.startsWith("audio/")) {
        res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
        res.type(mimeType);
        res.status(200).send(buffer);
    }
    else if (mimeType === "text/plain") {
        res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
        res.type(mimeType);
        res.status(200).send(buffer);
        return;
    } else {
        throw new CustomAPIError("This file cannot be previewed", 415);
    }
}

module.exports = { previewFile };