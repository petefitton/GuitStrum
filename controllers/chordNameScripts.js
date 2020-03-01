//Function declarations for use in multiple routes

let chordNameUnderscore = function(param) {
  // chordNameQuery is used within this function to convert from a colloqial chord name to the API search chord name
  let chordNameQuery = param;
  // this code is for adding an underscore in order to search for the chord with the API call
    // if second character of string is a b or #, then add _ in between 2nd and 3rd char
    // else if there are at least two characters add _ after the first char
    // else do nothing (not required)
  // Also changes '#' sign to '%23'
  // console.log('This should be the chordName before it is changed:')
  // console.log(chordNameQuery)
  if (chordNameQuery[1] == ('b')) {
    chordNameQuery = chordNameQuery.split('');
    chordNameQuery.splice(2, 0, '_');
    return chordNameQuery.join('');

  } else if (chordNameQuery[1] == ('#')) {
    chordNameQuery = chordNameQuery.split('');
    if (chordNameQuery.length > 2) {
      chordNameQuery.splice(2, 0, '_');
    }
    chordNameQuery.splice(1, 1, '%23');
    return chordNameQuery.join('');
    
  } else if (chordNameQuery[1] == ('%')) {
    chordNameQuery = chordNameQuery.split('');
    chordNameQuery.splice(4, 0, '_');
    return chordNameQuery.join('');

  } else if (chordNameQuery.length > 1) {
    chordNameQuery = chordNameQuery.split('');
    chordNameQuery.splice(1, 0, '_');
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

module.exports = {
  chordNameUnderscore: chordNameUnderscore,
  addHash: addHash
}