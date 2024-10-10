const { Router } = require("express");
const passport = require("passport");
const { isAuth, redirectIfIsAuth } = require("./authMiddleware");

const indexRouter = Router();

const indexController = require("../controllers/indexController");
indexRouter.get("/", redirectIfIsAuth, indexController.loginGet);
indexRouter.post(
  "/",
  passport.authenticate("local", {
    //TODO: handle login failure
    failureRedirect: "/login-failure",
    successRedirect: "/drive",
  })
);
indexRouter.get("/login-failure", (req, res) => {
  res.render("index", {
    errors: [{ msg: "Invalid Username or Password" }],
    title: "Login failed",
  });
});
indexRouter.get("/logout", indexController.logout);
indexRouter.get("/drive", isAuth, indexController.driveHomeGet);

indexRouter.get("/signup", indexController.signUpGet);
indexRouter.post("/signup", indexController.signUpPost);

module.exports = indexRouter;
