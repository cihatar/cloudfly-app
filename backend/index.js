const express = require("express");
const connectToDB = require("./config/db");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect db & start server  
const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        app.listen(5000, console.log(`Server is listening on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};
start();
