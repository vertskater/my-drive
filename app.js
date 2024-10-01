const express = require("express");
const path = require("path");
const passport = require("passport");

const app = express();
//init dotenv
require("dotenv").config();
//set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//set assets path to public
app.use(express.static(path.join(__dirname, "public")));
//use form-data (req.body)
app.use(express.urlencoded({ extended: true }));

//setup session store
const sessionStoreConfig = require("./db/sessionStore");
app.use(sessionStoreConfig);
//init passport set current user global
require("./config/passport");
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const router = require("./routes/index");
app.use(router);
const driveRouter = require("./routes/driveRouter");
app.use("/drive", driveRouter);

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(process.env.PORT);
