const express = require('express');
const path = require('path');

const app = express();
//init dotenv
require('dotenv').config();
//set view engine to EJS
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
//set assets path to public
app.use(express.static(path.join(__dirname, 'public')))
//use form-data (req.body)
app.use(express.urlencoded({ extended: true }));

//setup session store
const sessionStoreConfig = require('./db/sessionStore');
app.use(sessionStoreConfig);

app.get('/', (req, res) => {
  res.send('hello session');
})

app.listen(process.env.PORT);