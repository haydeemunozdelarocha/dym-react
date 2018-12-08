const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const db = require('./db.js');

const SUPER_SECRET_KEY = 'keyboard-cat';

const api = require('./api/index');
const users = require('./api/users');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var options = {
  cookie : { httpOnly: true, maxAge: 3600000*24 },
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

let sessionStore = new MySQLStore(options, db);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'session_cookie_name',
  secret: SUPER_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie:{maxAge:new Date(Date.now() + (3600000*24))},
  store: sessionStore
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
app.use('/api/users', users);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on ${port}`);
