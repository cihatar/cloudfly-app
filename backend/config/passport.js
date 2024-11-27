const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model.js");
const crypto = require("crypto");

passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            // extract information
            const firstName = profile.displayName.split(" ")[0] || "User";
            const lastName = profile.displayName.split(" ")[profile.displayName.split(" ").length - 1] || ""; 
            const email = profile.emails[0].value;
            const password = crypto.randomBytes(10).toString("hex");
            const profileImage = profile.photos[0].value;

            if (!firstName || !lastName || !email || !password) {
                throw new CustomAPIError("Please provide all required fields", 400);
            }

            try {
                let user = await User.findOne({ email });
                if (!user) {
                    user = await User.create({ firstName, lastName, email, password, profileImage });
                }
                return done(null, user);
            } catch (error) {
                done(null, error);
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
