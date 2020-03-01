const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const chordNameScripts = require('../controllers/chordNameScripts.js')

// HOME page for songs site - shows list of public songs, list of private songs
router.get('/', (req, res) => {
  if (req.user) {
    db.user.findOne({
      include: [db.song],
      where: {
        email: req.user.email
      }
    }).then((user) => {
      db.song.findAll({
        include: [db.user],
        where: {
          public: true
        }
      }).then(pubSongs => {
        db.share.findAll({
          include: [db.song],
          where: {
            userId: req.user.id
          }
        }).then(sharedSongs => {
        //   let firstFilteredSongs = privSongs.filter(song => {
        //     return song.user.id != req.user.id
        //   });
        //   return firstFilteredSongs
        // }).then(filteredSongs => {
          res.render('songs/index', { user, songs: pubSongs, sharedSongs });
        }).catch(err => {console.log(err)});
      }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});
  } else {
    db.song.findAll({
      include: [db.user],
      where: {
        public: true
      }
    }).then(songs => {
      res.render('songs/index', { songs });
    }).catch(err => {console.log(err)});
  }
});

// gets a form for creating a new song
router.get('/new', isLoggedIn, (req, res) => {
  res.render('songs/new', { user: req.user.dataValues });
});

// submits the first page of song creation
router.post('/new/song', isLoggedIn, (req, res) => {
  // submit button from new.ejs file in songs view folder sends here
  let instanceCount;
  if ((req.body.chordCadence == 4) && (req.body.timeSig == "4 4")) {
    instanceCount = req.body.measureNumber * 4;
  }
  db.song.create({
      userId: req.user.id,
      name: req.body.songName,
      timeSig: req.body.timeSig,
      chordCadence: req.body.chordCadence,
      instanceCount: instanceCount,
      public: req.body.pubPriv,
  }).then(song => {
    res.redirect(`/songs/edit/${song.id}`);
  }).catch(err => console.log(err));
});

// gets the page for editing a song
router.get('/edit/:id', isLoggedIn, (req, res) => {
  db.song.findOne({
    where: {
      id: req.params.id,
    }
  }).then(song => {
    // if the song is not the same as the user, then redirect the request
    if (song.userId !== req.user.id) {
      res.redirect('/songs');
    } else {
      db.instance.findAll({
        include: [db.chord],
        where: {
          songId: req.params.id
        }
      }).then(instances => {
        res.render('songs/edit', { song, instances, user: req.user });
      }).catch(err => console.log(err));
    }
  }).catch(err => console.log(err));
});

// submits the second page of song creation NOT the edited song
router.put('/:id', isLoggedIn, (req, res) => {
  db.song.update({
    name: req.body.songName,
    public: req.body.pubPriv
    // ideally would have but for the moment not including - instanceCount: instanceCount,
    }, { where: {
      id: req.params.id
    }
  }).then(() => {
    db.song.findOne({
      where: {
        id: req.params.id
      }
    }).then(song => {
      // start a loop that iterates over every instance count that song contains
        // first remove all spaces from instance chord name
        // then search for the chordId of the chord contained in the instance
          // include what to do when instance is an empty string
        // if the chord does not exist in the chord DB table, then:
          // do an axios call and add that chord to the chord DB with no associated user
        // create each instance in the instance DB table
        // do a timeout function before redirecting for now, can also look into async
      for (let i = 1; i <= (song.instanceCount); i++) {
        let chordNum = "chord" + i;
        let noSpaceChordName
        if (req.body[chordNum] == '') {
          noSpaceChordName = ''
        } else {
          noSpaceChordName = req.body[chordNum].replace(/\s/g, '');
        }
        if (noSpaceChordName == '') {
          // DELETE if the instance had previously held a chord at that location
          db.instance.destroy({
            where: {
              location: i,
              songId: song.id
            }
          }).catch(err=>console.log(err));
        } else {
          db.chord.findOne({
            where: {
              colloqChordName: noSpaceChordName
            }
          }).then(chord => {
          // return is null if not found
            if (chord === null) {
              let chordNameSearch = chordNameScripts.chordNameUnderscore(req.body[chordNum]);
              axios.get(`https://api.uberchord.com/v1/chords/${chordNameSearch}`, {
              }).then(function(apiResponse) {
                let newChordName = chordNameScripts.addHash(req.body[chordNum]);
                db.chord.create({
                  strings: apiResponse.data[0].strings,
                  fingering: apiResponse.data[0].fingering,
                  colloqChordName: newChordName,
                  apiSearchChordName: chordNameSearch,
                  imageChordName: req.body[chordNum] // should have %23 but no underscores
                }).then(chord => {
                  // create instance with the correct chordId
                  db.instance.findOne({
                    where: {
                      songId: song.id,
                      location: i
                    }
                  }).then(instance => {
                    if (instance) {
                      db.instance.update(
                        {
                          chordId: chord.id
                        }, {
                          where: { songId: song.id }
                        }
                      ).catch(err=>console.log(err));
                    } else {
                      db.instance.create({
                        chordId: chord.id,
                        songId: song.id,
                        location: i // location of instance in song
                      }).catch(err=>console.log(err));
                    }
                  }).catch(err=>console.log(err));
                }).catch(err=>console.log(err));
              }).catch(err=>console.log(err));
            } else {
              // if the chord does exist in the chord table, then:
              // if the instance exists, update it, otherwise create it
              db.instance.findOne({
                where: {
                  songId: song.id,
                  location: i
                }
              }).then(instance => {
                if (instance) {
                  db.instance.update(
                    {
                      chordId: chord.id
                    }, {
                      where: {
                        songId: song.id,
                        location: i
                      }
                    }
                  ).catch(err=>console.log(err));
                } else {
                  db.instance.create({
                    chordId: chord.id,
                    songId: song.id,
                    location: i // location of instance in song
                  }).catch(err=>console.log(err));
                }
              }).catch(err=>console.log(err));
            }
          }).catch(err=>console.log(err));
        }
      }
    }).catch(err=>console.log(err));
    setTimeout(function() {
      db.song.findOne({
        where: {
          name: req.body.songName
        }, include: [db.instance]
      }).then(song => {
        res.redirect(`/songs/${song.id}`);
      }).catch(err => console.log(err));
    }, 3000)
  }).catch(err=>console.log(err));
});

// shows a single song
router.get('/:id', (req, res) => {
  console.log('test1')
  let userData;
  if (req.user) {
  console.log('test2')
    userData = req.user.dataValues
  } else {
    userData = [];
  console.log('test3')
  }
  db.instance.findAll({
    include: [db.chord, db.song],
    where: {
      songId: req.params.id
    }
  }).then(instances => {
    console.log('test3')
    if (instances[0].song.public === true) {
      res.render('songs/show', { user: userData, instances });
    } else if (req.user) {
      if (req.user.id === instances[0].song.userId) {
        res.render('songs/show', { user: userData, instances });
      } else {
        console.log('test4')
        db.share.findOne({
          where: {
            songId: req.params.id,
            userId: req.user.id
          }
        }).then(share => {
          console.log('I bet it is getting to this point')
          if (share) {
            console.log('2I bet it is getting to this point')
            res.render('songs/show', { user: userData, instances });
          } else {
            console.log('3I bet it is getting to this point')
            res.redirect('/songs');
          }
        }).catch(err=>console.log(err));
      }
      // res.redirect('/songs');
    } else {
      res.redirect('/songs');
    }
  }).catch(err=>console.log(err));
});

// deletes a song from the DB (both from song and instance tables)
router.delete('/:id', isLoggedIn, (req, res) => {
  db.song.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/songs/');
  }).catch(err=>console.log(err));
});

// adds a song to SongsUsers table to share with another user if it is private
router.post('/share/:id', isLoggedIn, (req, res, next) => {
  // I have access to the id number of the song and I have access to the user ID who should be shared to
  // I want to find or create a row in the share table via the share model
  // 
  db.share.findOrCreate({
    where: {
      userId: req.body.userShareId,
      songId: req.params.id
    }
  }).then(() => {
    res.redirect(`/songs/${req.params.id}`)
  }).catch(err=>console.log(err));
});


module.exports = router;