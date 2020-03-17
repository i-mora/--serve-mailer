const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("GOOGLE_OAUTH2_CLIENT_ID"),
      clientSecret: config.get("GOOGLE_OAUTH2_CLIENT_SECRET"),
      callbackURL: config.get("GOOGLE_OAUTH2_CALLBACK")
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) cb(null, user);
        else {
          new User({ googleId: profile.id, name: profile.displayName })
            .save()
            .then(user => {
              cb(null, user);
            });
        }
      });
    }
  )
);

// we use the mongo provided ID
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then(user => cb(null, user));
});
