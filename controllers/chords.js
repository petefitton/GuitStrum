const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const chordNameScripts = require('../controllers/chordNameScripts.js')

// Home page for chords - shows saved chords as well as has a search bar for finding chords - STRETCH GOAL: have a random chord button
router.get('/', (req, res) => {
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
  let chordNameSearch = chordNameScripts.chordNameUnderscore(req.body.chordName);
  axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
  }).then(function(apiResponse) {

    let newChordName = chordNameScripts.addHash(req.body.chordName);

    db.chord.findOrCreate({
      where: {
        strings: apiResponse.data[0].strings,
        fingering: apiResponse.data[0].fingering,
        colloqChordName: newChordName,
        apiSearchChordName: chordNameSearch,
        imageChordName: req.body.chordName // should have %23 but no underscores
      }
    }).then(([chord, created]) => {
      db.chordsUsers.create({
        userId: req.user.id,
        chordId: chord.id
      }).then(() => {
          res.redirect(`/chords/result?chordSearch=${req.body.chordName}`);
      }).catch(err => res.send({ "error" : err}));
    }).catch(err => res.send({ "error" : err}));
  }).catch(err => res.send({ "error" : err}));
});

// shows a specific chord - has search bar on this page
router.get('/result', (req, res) => {
  let chordNameSearch = chordNameScripts.chordNameUnderscore(req.query.chordSearch);
  axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
  }).then(function(apiResponse) {

    // define strings from API call and remove spaces
    let strings = apiResponse.data[0].strings;
    let cutStrings = strings.replace(/\s+/g, '');

    // define fingering from API call and remove spaces as well as replace all instances of "x" with a "-"
    let fingering = apiResponse.data[0].fingering;
    let slimFingering = fingering.replace(/\s+/g, '');
    let dashFingering = slimFingering.replace(/x/gi, '-');

    let chordName = chordNameSearch.replace(/_/gi, '');

    let chord = { chordName, cutStrings, dashFingering };
    return chord;
  }).then((chord) => {
    if (req.user) {
      db.user.findOne({
        include: [db.chord],
        where: {
          email: req.user.email
        }
      }).then((user) => {
        // update image link with correct chord name, string-numbers, and fingering-numbers & render page
        let source = `https://chordgenerator.net/${chord.chordName}.png?p=${chord.cutStrings}&f=${chord.dashFingering}&s=5`
        res.render('chords/result', { source: source, user: user, chordName: chord.chordName });
      }).catch(err => res.send({ "error" : err}));
    } else {
      let source = `https://chordgenerator.net/${chord.chordName}.png?p=${chord.cutStrings}&f=${chord.dashFingering}&s=5`
      res.render('chords/result', { source });
    }
  }).catch(err => res.send({ "error" : err}));
});

// deletes a specific chord from favorites
router.delete('/:chordName', isLoggedIn, (req, res) => {
  db.chord.findOne({
    where: {
      colloqChordName: req.params.chordName
    }
  }).then(chord => {
    db.chordsUsers.destroy({
      where: {
        userId: req.user.id,
        chordId: chord.id
      }
    }).then(() => {
      res.redirect('/chords');
    }).catch(err => res.send({ "error" : err}));
  }).catch(err => res.send({ "error" : err}));
});

router.get('/random', (req, res) => {
  randChordLetter = function() {
    let randNum = Math.floor(Math.random() * 7);
    let randLetter;
    switch(randNum) {
      case 0:
        randLetter = "A";
        break;
      case 1:
        randLetter = "B";
        break;
      case 2:
        randLetter = "C";
        break;
      case 3:
        randLetter = "D";
        break;
      case 4:
        randLetter = "E";
        break;
      case 5:
        randLetter = "F";
        break;
      case 6:
        randLetter = "G";
        break;
      default:
        randLetter = "C"
    }
    return randLetter;
  };



  randChordAccidental = function() {
    let randNum = Math.floor(Math.random() * 4);
    let randAccidental;
    switch(randNum) {
      case 0:
        randAccidental = "";
        break;
      case 1:
        randAccidental = "";
        break;
      case 2:
        randAccidental = "b";
        break;
      case 3:
        randAccidental = "%23";
        break;
      default:
        randAccidental = ""
    }
    return randAccidental;
  };
  
  randChordQuality = function() {
    let randNum = Math.floor(Math.random() * 9);
    let randQuality;
    switch(randNum) {
      case 0:
        randQuality = "";
        break;
      case 1:
        randQuality = "";
        break;
      case 2:
        randQuality = "maj7";
        break;
      case 3:
        randQuality = "m7";
        break;
      case 4:
        randQuality = "mmaj7";
        break;
      case 5:
        randQuality = "sus2";
        break;
      case 6:
        randQuality = "sus4";
        break;
      case 7:
        randQuality = "7";
        break;
      case 8:
        randQuality = "";
        break;
      default:
        randQuality = ""
    }
    return randQuality;
  };

  let randChord = randChordLetter() + randChordAccidental() + randChordQuality();
  res.redirect(`/chords/result?chordSearch=${randChord}`)
})

module.exports = router;