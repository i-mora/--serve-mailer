const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    (req, res, next) => {
      //   console.log(req);
      //   if (req.query.return) req.session.oauth2return = req.query.return;
      next();
    },
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (err, req, res) => {
      if (err.name === "TokenError") res.redirect("/auth/google");
      //   const redirect = req.session.oauth2return || "/";
      //   delete req.session.oauth2return;
      //   res.redirect(redirect);
    },
    (req, res) => res.redirect("/")
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};
