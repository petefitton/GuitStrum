'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('chords', [
      { strings: 'x32010',
        fingering: '-32-1-',
        chordName: 'C',
        displayName: 'C,,,',
        searchName: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { strings: 'x02210',
        fingering: '--231-',
        chordName: 'Am',
        displayName: 'A,m,,',
        searchName: 'A_m',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { strings: '022000',
        fingering: '-23---',
        chordName: 'Em',
        displayName: 'E,m,,',
        searchName: 'E_m',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('chords', null, {})
  }
}
