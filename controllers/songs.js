const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// HOME page for songs site - shows list of public songs, list of private songs
router.get('/', (req, res) => {
  res.render('songs/index');
});

// gets a form for creating a new song
router.get('/new', (req, res) => {
  res.render('songs/new');
});

// submits the first page of song creation
router.post('/new/:id', (req, res) => {
  // submit button from new.ejs file in songs view folder sends here
  // should add info to DB
  // will render songs/edit page with the DB info accessible
  res.render('songs/edit');
});

// gets the page for editing a song
router.get('/edit/:id', (req, res) => {
  res.render('songs/edit');
});

// submits the second page of song creation NOT the edited song
router.post('/:id', (req, res) => {
  res.render('songs/show');
});

// shows a single song
router.get('/:id', (req, res) => {
  res.render('songs/show');
});

// updates a song (both the song table and the instance table)
router.put('/:id', (req, res) => {
  res.render('songs/');
});

// deletes a song from the DB (both from song and instance tables)
router.delete('/', (req, res) => {
  res.render('songs/');
});



module.exports = router;
