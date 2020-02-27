const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios');
const cheerio = require('cheerio');
const isLoggedIn = require('../middleware/isLoggedIn');

// Home page for chords - shows saved chords as well as has a search bar for finding chords - STRETCH GOAL: have a random chord button
router.get('/', (req, res) => {
  // if a user is logged in, then retrieve their info from the database (chords they have liked)
  if (req.user) {
    db.user.findOne({
      include: [db.chord],
      where: {
        email: req.user.dataValues.email
      }
    }).then((user) => {
      res.render('chords/index', { user });
    })
  } else {
    res.render('chords/index');
  }
});

// adds a chord to favorites
router.post('/', isLoggedIn, (req, res) => {
  res.redirect('chords/show');
});

// shows a specific chord - has search bar on this page
router.get('/result', (req, res) => {
  console.log('test1')
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
  console.log('test2')
  axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
  }).then(function(apiResponse) {
    console.log('test3')
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
    console.log('test4')
    return chord;
  })
    .then((chord) => {
      console.log(chord);
      console.log('test5')
      if (req.user) {
        console.log('test6')
        db.user.findOne({
          include: [db.chord],
          where: {
            email: req.user.dataValues.email
          }
        }).then((user) => {
          console.log('test7');
          // console.log(chord);
          // update image link with correct chord name, string-numbers, and fingering-numbers & render page
          let source = `https://chordgenerator.net/${chord.chordName}.png?p=${chord.cutStrings}&f=${chord.dashFingering}&s=5`
          res.render('chords/result', { source: source, user: user });
        })
      } else {
        console.log('test8')
        let source = `https://chordgenerator.net/${chord.chordName}.png?p=${chord.cutStrings}&f=${chord.dashFingering}&s=5`
        res.render('chords/result', { source });
      }
      // res.render('chords/result', { source: source }, { user: userData })
    }).catch(err => res.send({ "error" : err}));
});

// deletes a specific chord from favorites
router.delete('/:id', isLoggedIn, (req, res) => {
  res.redirect('chords/index');
});

module.exports = router;
