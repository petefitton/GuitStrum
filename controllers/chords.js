const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios');
const cheerio = require('cheerio');


// Home page for chords - shows saved chords as well as has a search bar for finding chords - STRETCH GOAL: have a random chord button
router.get('/', (req, res) => {
  res.render('chords/index');
});

// adds a chord to favorites
router.post('/', (req, res) => {
  res.redirect('chords/show');
});

// shows a specific chord - has search bar on this page
router.get('/result', (req, res) => {
  let chordNameQuery = req.query.chordSearch;
  // next section of code is for adding an underscore in order to search for the chord with the API call
    // if second character of string is a b or #, then add _ in between 2nd and 3rd char
    // else if there are at least two characters add _ after the first char
    // else do nothing (not required)
  // '#' sign will be sent as '%23'
  let chordNameSearch;
  if (chordNameQuery[1] == ('b')) {
    chordNameSearch = chordNameQuery.split('');
    chordNameSearch.splice(2, 0, '_');
    chordNameSearch = chordNameSearch.join('');
    // console.log('Test1')
  } else if (chordNameQuery[1] == ('#')) {
    chordNameSearch = chordNameQuery.split('');
    chordNameSearch.splice(2, 0, '_');
    chordNameSearch.splice(1, 1, '%23');
    chordNameSearch = chordNameSearch.join('');
    // console.log('Test2')
  } else if (chordNameQuery.length > 1) {
    chordNameSearch = chordNameQuery.split('');
    chordNameSearch.splice(1, 0, '_');
    chordNameSearch = chordNameSearch.join('');
    // console.log('Test3')
  } else {
    chordNameSearch = chordNameQuery;
    // console.log('Test4')
  }
  // console.log('this is the chord name that should be searched');
  // console.log(chordNameSearch);
  axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
  }).then(function(apiResponse) {
    // console.log(apiResponse);
    // console.log(apiResponse.data[0].strings);

    // define strings from API call and remove spaces
    let strings = apiResponse.data[0].strings;
    let cutStrings = strings.replace(/\s+/g, '');
    // console.log(cutStrings);

    // define fingering from API call and remove spaces as well as replace all instances of "x" with a "-"
    let fingering = apiResponse.data[0].fingering;
    let slimFingering = fingering.replace(/\s+/g, '');
    let dashFingering = slimFingering.replace(/x/gi, '-');
    // console.log(dashFingering);

    // define chord name from API call and remove all commas
    // let apiChordName = apiResponse.data[0].chordName;
    // let chordName = apiChordName.replace(/[,]+/g, '');
    // console.log(chordName);

    let chordName = chordNameSearch.replace(/_/gi, '');

    let chord = { chordName, cutStrings, dashFingering };
    return chord;
  })
    .then((chord) => {
      // update image link with correct chord name, string-numbers, and fingering-numbers & render page
      let source = `https://chordgenerator.net/${chord.chordName}.png?p=${chord.cutStrings}&f=${chord.dashFingering}&s=5`
      res.render('chords/result', { source: source })
    }).catch(err => res.send({ "error" : err}));
});

// deletes a specific chord from favorites
router.delete('/:id', (req, res) => {
  res.render('chords/index');
});

module.exports = router;
