require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const app = express();
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
app.use(methodOverride('_method'));

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;

  next();
});

app.get('/', function(req, res) {
  let userData;
  if (req.user) {
    userData = req.user.dataValues
  } else {
    userData = [];
  }
  res.render('index', { user: userData });
});

app.get('/profile/:id', isLoggedIn, function(req, res) {
  db.user.findOne({
    include: [db.chord, db.song],
    where: {
      email: req.user.email
    }
  }).then((user) => {
    res.render('profile', { user });
  }).catch(err => {console.log(err)});
});

app.use('/auth', require('./controllers/auth'));
app.use('/chords', require('./controllers/chords'));
app.use('/songs', require('./controllers/songs'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;