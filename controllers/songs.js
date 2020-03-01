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
        db.song.findAll({
          include: [db.user],
          where: {
            public: false
          }
        }).then(privSongs => {
          // console.log(privSongs)
          // console.log('this is the array privSongs ^^^')
          let firstFilteredSongs = privSongs.filter(song => {
            // console.log('this should be song.user.id below');
            // console.log(song.user.id);
            // console.log('this should be req.user.id below');
            // console.log(req.user.id);
            return song.user.id != req.user.id
          });
          // console.log(firstFilteredSongs)
          // console.log('this is the array firstFilteredSongs ^^^')
          return firstFilteredSongs
        }).then((firstFilteredSongs) => {
          db.songsUsers.findAll({
            where: {
              userId: req.user.id
            }
          }).then(songsUsers => {
            // filter the songs from the first filter with the songsUsers object
            // let filteredSongs = firstFilteredSongs.filter(song => {
              // iterate over all of songsUsers to see if songId matches any of these song ids
              // let sharedSongs = firstFilteredSongs.forEach(song => {
              //   for (i = 0; i < songsUsers.length; i++) {
              //     if (song.id == songsUsers[i].songId) {
              //       return song;
              //     } else {
              //       return;
              //     }
              //   }
              // })
              // ​Array.prototype.diff = function(arr2) {
              //   let ret = [];
              //   for(let i in this) {   
              //       if(arr2.indexOf(this[i]) > -1){
              //           ret.push(this[i]);
              //       }
              //   }
              //   console.log(ret)
              //   console.log('this is the return of the diff function ^^^')
              //   return ret;
              // };
              // let sharedSongs = firstFilteredSongs.diff(songsUsers);
              console.log(sharedSongs);
              console.log('this ^^^^ is array of sharedSongs');
              // let sharedSongs = songsUsers.forEach(songsUser => {
              //   if (song.id == songsUser.songId) {
              //     return song;
              //   } else {
              //     return false;
              //   }
              // });
            // });
            console.log(filteredSongs);
            console.log('this is the array filteredSongs ^^^')
            // return filteredSongs
          }).then(filteredSongs => {
              res.render('songs/index', { user, songs: pubSongs, filteredSongs });
          }).catch(err => {console.log(err)});
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
    where: {
      id: req.params.id
    }
  }).then(song => {
    db.instance.findAll({
      include: [db.chord],
      where: {
        songId: req.params.id
      }
    }).then(instances => {
      console.log('😆Test6')
      res.render('songs/edit', { song, instances, user: req.user });
    })
  })
});

// submits the second page of song creation NOT the edited song
router.put('/:id', isLoggedIn, (req, res) => {
  db.song.update({
    name: req.body.songName,
    public: req.body.pubPriv
    // ideally would have, but for the moment not including - instanceCount: instanceCount,
    // same here - public: req.body.pubPriv,
  }, { where: { id: req.params.id }
  // need to include connecting information about songsUsers as well
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
      console.log('😆Test4')
      // console.log(song)
      for (let i = 1; i <= (song.instanceCount); i++) {
        let chordNum = "chord" + i;
        // console.log(req.body.chord1)
        // console.log(req.body.chordNum) THIS DOES NOT WORK
        // console.log(req.body[chordNum])
        let noSpaceChordName
        if (req.body[chordNum] == '') {
          noSpaceChordName = ''
        } else {
          noSpaceChordName = req.body[chordNum].replace(/\s/g, '');
        }
        if (noSpaceChordName == '') {
          // do nothing EXCEPT DELETE if the instance had previously held a chord at that location
          console.log('😍😍')
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
                  console.log(chord);
                  console.log(i);
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
              console.log('this should be the number of i at this point in code:');
              console.log(i);
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
    // possibly create a timeout function to move forward
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
  let userData;
  if (req.user) {
    userData = req.user.dataValues
  } else {
    userData = [];
  }
  db.instance.findAll({
    include: [db.chord, db.song],
    where: {
      songId: req.params.id
    }
  }).then(instances => {
    console.log(instances[0].song.public);
    console.log('this is song info directly above');
    res.render('songs/show', { user: userData, instances });
  }).catch(err=>console.log(err));
});

// updates a song (both the song table and the instance table)
// router.put('/:id', isLoggedIn, (req, res) => {
  // this should redirect to the song at the ID that was edited
//   res.redirect(`/songs/${song.id}`);
// });

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
  db.songsUsers.findOrCreate({
    where: {
      userId: req.body.userShareId,
      songId: req.params.id
    }
  }).then(() => {
    res.redirect(`/songs/${req.params.id}`)
  }).catch(err=>console.log(err));
});


module.exports = router;
