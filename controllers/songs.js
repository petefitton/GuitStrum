const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

// HOME page for songs site - shows list of public songs, list of private songs
router.get('/', (req, res) => {
  if (req.user) {
    db.user.findOne({
      include: [db.song],
      where: {
        email: req.user.email
      }
    }).then((user) => {
      res.render('songs/index', { user });
    }).catch(err => {console.log(err)});
  } else {
    res.render('songs/index');
  }
});

// gets a form for creating a new song
router.get('/new', isLoggedIn, (req, res) => {
  res.render('songs/new', { user: req.user.dataValues });
});

// submits the first page of song creation
router.post('/new/song', isLoggedIn, (req, res) => {
  console.log('😆Test1')
  // submit button from new.ejs file in songs view folder sends here
  // should add info to DB
  // let instanceCount = math on measure count with chord cadence

  let instanceCount;
  if ((req.body.chordCadence == 4) && (req.body.timeSig == "4 4")) {
    console.log('😆Test2')
    instanceCount = req.body.measureNumber * 4;
  }
  console.log('😆Test3')
  db.song.create({
      userId: req.user.id,
      name: req.body.songName,
      timeSig: req.body.timeSig,
      chordCadence: req.body.chordCadence,
      instanceCount: instanceCount,
      public: req.body.pubPriv,
    // need to include connecting information about songsUsers as well
  }).then(song => {
    console.log('😆Test4')
    // will render songs/edit page with the DB info accessible
    res.redirect(`/songs/edit/${song.id}`);
  }).catch(err => console.log(err));
});

// gets the page for editing a song
router.get('/edit/:id', isLoggedIn, (req, res) => {
  console.log('😆Test5')
  db.song.findOne({
    include: [db.user],
    where: {
      id: req.params.id
    }
  }).then(song => {
    console.log('😆Test6')
    res.render('songs/edit', { song });
  })
});

// submits the second page of song creation NOT the edited song
router.post('/:id', isLoggedIn, (req, res) => {
  res.redirect('/songs/show');
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
  res.redirect(`/songs/${song.id}`);
});

// deletes a song from the DB (both from song and instance tables)
router.delete('/', isLoggedIn, (req, res) => {
  res.redirect('/songs/');
});



module.exports = router;
