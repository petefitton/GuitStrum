'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('chords', [
      { strings: 'x32010',
        fingering: '-32-1-',
        colloqChordName: 'C',
        apiSearchChordName: 'C',
        imageChordName: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { strings: 'x02210',
        fingering: '--231-',
        colloqChordName: 'Am',
        apiSearchChordName: 'A_m',
        imageChordName: 'Am',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { strings: '022000',
        fingering: '-23---',
        colloqChordName: 'Em',
        apiSearchChordName: 'E_m',
        imageChordName: 'Em',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('chords', null, {})
  }
}
