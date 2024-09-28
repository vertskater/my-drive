const expressSession = require('express-session');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const {PrismaClient} = require('@prisma/client');


module.exports =  expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // ms
  },
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
})

