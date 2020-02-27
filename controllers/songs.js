const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

// HOME page for songs site - shows list of public songs, list of private songs
router.get('/', (req, res) => {
  let userData;
  if (req.user) {
    userData = req.user.dataValues
  } else {
    userData = [];
  }
  res.render('songs/index', { user: userData });
});

// gets a form for creating a new song
router.get('/new', isLoggedIn, (req, res) => {
  res.render('songs/new', { user: req.user.dataValues });
});

// submits the first page of song creation
router.post('/new/:id', isLoggedIn, (req, res) => {
  // submit button from new.ejs file in songs view folder sends here
  // should add info to DB
  // will render songs/edit page with the DB info accessible
  res.redirect('songs/edit');
});

// gets the page for editing a song
router.get('/edit/:id', isLoggedIn, (req, res) => {
  res.render('songs/edit', { user: req.user.dataValues });
});

// submits the second page of song creation NOT the edited song
router.post('/:id', isLoggedIn, (req, res) => {
  res.redirect('songs/show');
});

// shows a single song
router.get('/:id', (req, res) => {
  let userData;
  if (req.user) {
    userData = req.user.dataValues
  } else {
    userData = [];
  }
  res.render('songs/show', { user: userData });
});

// updates a song (both the song table and the instance table)
router.put('/:id', isLoggedIn, (req, res) => {
  // this should redirect to the song at the ID that was edited
  res.redirect(`songs/${song.id}`);
});

// deletes a song from the DB (both from song and instance tables)
router.delete('/', isLoggedIn, (req, res) => {
  res.redirect('songs/');
});



module.exports = router;
