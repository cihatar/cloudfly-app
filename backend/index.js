require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const connectToDB = require("./config/db.js");
require("express-async-errors");
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const { rateLimit } = require("express-rate-limit");
const session = require("express-session");
const passport = require("passport");
require("./config/passport.js");
const errorHandlerMiddleware = require("./middlewares/error.handler.js");
const authRoute = require("./routes/auth.route.js");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// rate limiter
const limiter = rateLimit({
	windowMs: 1000 * 60 * 5,
	limit: 10,
    handler: (req, res) => {
        res.status(429).json({ error: "Too many requests, please try again later" });
    }
})

// routes
app.use("/api/auth", limiter, authRoute);

// error handling
app.use(errorHandlerMiddleware);

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
