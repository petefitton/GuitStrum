const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// Home page for chords - shows saved chords as well as has a search bar for finding chords - STRETCH GOAL: have a random chord button
router.get('/', (req, res) => {
  res.render('chords/index');
});

// adds a chord to favorites
router.post('/', (req, res) => {
  res.redirect('chords/show');
});

// shows a specific chord - has search bar on this page
router.get('/:id', (req, res) => {
  res.render('chords/index');
});

// deletes a specific chord from favorites
router.delete('/:id', (req, res) => {
  res.render('chords/index');
});

module.exports = router;
