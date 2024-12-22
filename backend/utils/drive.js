const crypto = require("crypto");
const fs = require("fs").promises;

const algorithm = 'aes-256-ctr';
let key = process.env.ENCRYPTION_KEY;
key = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);

// encrypt
const encrypt = (buffer) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return encrypted;
};

// decrypt
const decrypt = (buffer) => {
    const iv = buffer.slice(0, 16);  
    buffer = buffer.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
};

// encrypt file
const encryptFile = async (buffer, filePath) => {
    const result = encrypt(buffer);
    await fs.writeFile(filePath, result);
};

// decrypt file
const decryptFile = async (filePath) => {
    const encrypted = await fs.readFile(filePath);    
    const buffer = decrypt(encrypted);
    return buffer;
};

const bytesToSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "N/A";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes}$ ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
} 

module.exports = { encryptFile, decryptFile, bytesToSize };

