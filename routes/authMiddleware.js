const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("index", {
    title: "Not Authorized",
  });
};

const redirectIfIsAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/drive");
  }
  next();
};

module.exports = {
  isAuth,
  redirectIfIsAuth,
};
