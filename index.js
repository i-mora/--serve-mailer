const { cookieKey, mongoURI, port } = require("./config");
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
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(errorhandler({ log: err => console.log("ERROR", err) }));

require("./routes/auth")(app);
app.get("/", (req, res) => {
  res.send(`Welcome ${req.user ? req.user.name : "user"}`);
});

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.listen(port, () => console.log(`This app runs on port ${port}!`));
