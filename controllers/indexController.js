const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const dbUsers = require("../db/users");
const dbFolders = require("../db/folder");
const dbFiles = require("../db/files");

const alphaError = "must have Alphabetical characters.";
const lengthError = "must have at least 5 and max 30 characters";

const validateSchema = [
  body("forename")
    .isAlpha()
    .withMessage(`forename ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`forename ${lengthError}`)
    .trim(),
  body("surname")
    .isAlpha()
    .withMessage(`surname ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`surname ${lengthError}`)
    .trim(),
  body("username")
    .isAlpha()
    .withMessage(`Username ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`Username ${lengthError}`)
    .trim(),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("password must have at least 12 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must be at least 12 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("pass-confirm")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("passwords do not match!"),
];
// Signup & login get requests
const signUpGet = async (req, res, next) => {
  res.render("sign-up", {
    title: "Sign-up Drive",
    user: {},
  });
};

const loginGet = (req, res) => {
  res.render("index", { title: "Login to drive" });
};
// Signup & login post requests
const signUpPost = [
  validateSchema,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { forename, surname, username } = req.body;
      return res.render("sign-up", {
        title: "Sign-up Errors",
        errors: errors.array(),
        user: { forename: forename, surname: surname, username: username },
      });
    }
    try {
      const { forename, surname, username, password } = req.body;
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.render("error-page", { title: "Error" });
        dbUsers.pushNewUser({
          username: username,
          forename: forename,
          surname: surname,
          password: hashedPassword,
        });
        res.redirect("/");
      });
    } catch (error) {
      next(error);
    }
  }),
];

const driveHomeGet = async (req, res, next) => {
  try {
    const folders = await dbFolders.getRootFolders(req.user.id);
    const files = await dbFiles.getRootFiles(req.user.id);
    res.render("drive-home", {
      title: "My-Drive - Home",
      folders: folders,
      files: files,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  driveHomeGet,
  logout,
};
