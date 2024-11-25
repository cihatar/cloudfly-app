const db = require("mongoose");

module.exports = connectToDB = (url) => {
    return db
        .connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((e) => console.log(e));
};

