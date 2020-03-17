const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const cookiesession = require("cookie-session");
const errorhandler = require("errorhandler");

require("./models/User");
require("./services/passport");

const app = express();
app.use(
  cookiesession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.get("COOKIE_KEY")]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(errorhandler({ log: err => console.log("ERROR", err) }));

require("./routes/auth")(app);

mongoose.connect(config.get("MONGO_URI"), {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`This app runs on port ${PORT}!`));
