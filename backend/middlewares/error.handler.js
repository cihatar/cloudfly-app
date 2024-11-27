const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        message: err.message || "INTERNAL SERVER ERROR",
        status: err.statusCode || 500,
    };

    if (err.name === 'ValidationError') {
        customError.message = Object.values(err.errors).map((e) => e.toString()).join(", ")
        customError.status = 400;
    }

    return res.status(customError.status).json({ error: customError.message });
};

module.exports = errorHandlerMiddleware;
