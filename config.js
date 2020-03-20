// config.js
if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();
}

module.exports = {
  cookieKey: process.env.COOKIE_KEY,
  googleOAuth2ClientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  googleOAuth2ClientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  googleOAuth2CallbackURL: process.env.GOOGLE_OAUTH2_CALLBACK,
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT
};
