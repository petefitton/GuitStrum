const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('auth/signup');
  }
});

router.post('/signup', (req, res) => {
  // add user to db or redirect to signup
  // res.send(req.body);
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      console.log(`User created`);
      // res.redirect('/');
      passport.authenticate('local', {
        successRedirect: `/profile/${user.id}`,
        successFlash: 'Thanks for signing up!'
      })(req, res);
    } else {
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(err => {
    console.log('💩 Error occurred finding or creating user');
    console.log(err);
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('auth/login');
  }
});

router.post('/login', passport.authenticate('local', {
  // successRedirect: '/',
  failureRedirect: '/auth/login',
  // successFlash: 'Welcome!',
  failureFlash: 'Invalid credentials'
}), (req, res) => {
  db.user.findOne({
    where:  {
      email: req.body.email
    }
  }).then( user => {
    // console.log(user.dataValues);
    req.flash('success', 'You successfully logged in');
    req.session.save(function() {
      res.redirect(`/profile/${user.id}`);
    })
  }).catch(err => {
    console.log(err);
    res.send('Cannot find page');
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out successfully');
  res.redirect('/');
});

module.exports = router;
