'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/users')
var mongoose = require('mongoose');
var cors = require('cors')
var session = require('express-session')
var passport = require('passport');
const { verifyUser } = require('./authenticate');
var uri = "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/Razor?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

const router = express.Router();
app.use(passport.initialize());
app.use(cors())
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.use('/user',user)



app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
