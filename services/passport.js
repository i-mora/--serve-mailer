const {
  googleOAuth2ClientID,
  googleOAuth2ClientSecret,
  googleOAuth2CallbackURL
} = require("../config");
const errors = require("../utils/errors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleOAuth2ClientID,
      clientSecret: googleOAuth2ClientSecret,
      callbackURL: googleOAuth2CallbackURL
    },
    (accessToken, refreshToken, profile, cb) => {
      try {
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
      } catch (err) {
        errors(err);
      }
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
