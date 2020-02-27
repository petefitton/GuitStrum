const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios');
const cheerio = require('cheerio');
const isLoggedIn = require('../middleware/isLoggedIn');


//Function declarations for use in multiple routes followed by routes below

let chordNameUnderscore = function(param) {
  // chordNameQuery is used within this function to convert from a colloqial chord name to the API search chord name
  let chordNameQuery = param;
  // this code is for adding an underscore in order to search for the chord with the API call
    // if second character of string is a b or #, then add _ in between 2nd and 3rd char
    // else if there are at least two characters add _ after the first char
    // else do nothing (not required)
  // Also changes '#' sign to '%23'
  console.log('This should be the chordName before it is changed:')
  console.log(chordNameQuery)
  if (chordNameQuery[1] == ('b')) {
    chordNameQuery = chordNameQuery.split('');
    chordNameQuery.splice(2, 0, '_');
    return chordNameQuery.join('');

  } else if (chordNameQuery[1] == ('#')) {
    console.log('😌😗')
    chordNameQuery = chordNameQuery.split('');
    if (chordNameQuery.length > 2) {
      chordNameQuery.splice(2, 0, '_');
    }
    chordNameQuery.splice(1, 1, '%23');
    return chordNameQuery.join('');
    
  } else if (chordNameQuery[1] == ('%')) {
    console.log('😊')
    chordNameQuery = chordNameQuery.split('');
    chordNameQuery.splice(4, 0, '_');
    // chordNameQuery.splice(1, 1, '%23');
    return chordNameQuery.join('');

  } else if (chordNameQuery.length > 1) {
    console.log('Test3')
    console.log(chordNameQuery);
    chordNameQuery = chordNameQuery.split('');
    console.log(chordNameQuery);
    chordNameQuery.splice(1, 0, '_');
    console.log(chordNameQuery);
    return chordNameQuery.join('');

  } else {
    return chordNameQuery
  }
}

let addHash = function(chordName) {
  if (chordName[1] == ('%')) {
    chordName = chordName.split('');
    chordName.splice(1, 3, '#');
    return chordName.join('');
  } else {
    return chordName;
  }
}


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
      console.log('😇 This is the user object:');
      console.log(user.chords[0].colloqChordName);
      res.render('chords/index', { user });
    })
  } else {
    res.render('chords/index');
  }
});

// adds a chord to favorites
router.post('/', isLoggedIn, (req, res) => {
  let chordNameSearch = chordNameUnderscore(req.body.chordName);
  axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
  }).then(function(apiResponse) {
    console.log("API RESPONSE DATA: ");
    console.log(apiResponse.data[0]);
    // do an axios call for the info for the chord at req.body.chordName
    // take that info and create a chord in the DB
    // then redirect to the correct page

    let newChordName = addHash(req.body.chordName);

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
          res.redirect(`chords/result?chordSearch=${req.body.chordName}`);
      }).catch(err => {console.log(err)});
    });
  });
});

// shows a specific chord - has search bar on this page
router.get('/result', (req, res) => {
  console.log('test1')
  // if (req.query.chordSearch) {
  let chordNameSearch = chordNameUnderscore(req.query.chordSearch);
  // } else {
  //   let chordNameSearch = 
  // }
  console.log('this is the chord name that should be searched');
  console.log(chordNameSearch);
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
          res.render('chords/result', { source: source, user: user, chordName: chord.chordName });
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
router.delete('/:chordName', isLoggedIn, (req, res) => {
  db.chord.destroy({
    where: {
      colloqChordName: req.params.chordName
    }
  }).then(() => {
    res.redirect('/chords');
  });
});

module.exports = router;