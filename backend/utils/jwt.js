const jwt = require("jsonwebtoken");

// create token
const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

// check if token is valid
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// set cookie
const attachCookiesToResponse = ({ res, payload }) => {
    const token = createJWT({ payload });

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        secure: process.env.NODE_ENV === "production",
    });
};

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
};
