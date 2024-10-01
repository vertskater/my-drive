const passport = require('passport');
const LocalStrategy = require('passport-local');
const dbUsers = require('../db/users');

const {verifyPassword} = require('../lib/passportUtils');

const verifyCallback = async (username, password, done) => {
  try {
    const user = await dbUsers.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "incorrect username" });
    }
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  }catch (error) {
    return done(error)
  }
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.uuid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await dbUsers.getUserByUuid(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
