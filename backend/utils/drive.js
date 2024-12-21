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

module.exports = { encryptFile, decryptFile };

