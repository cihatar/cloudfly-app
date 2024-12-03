const CustomAPIError = require("../errors/custom.error.js");
const User = require("../models/user.model.js");
const { isTokenValid } = require("../utils/jwt.js");

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        throw new CustomAPIError("Authentication Invalid", 401);
    }

    try {
        const { userId } = isTokenValid({ token });

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomAPIError("Authentication Invalid", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        throw new CustomAPIError("Authentication Invalid", 401);
    }
};

module.exports = { authenticateUser };
