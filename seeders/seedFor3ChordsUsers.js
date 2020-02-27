'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('chordsUsers', [
      { userId: '1',
        chordId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '2',
        chordId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '1',
        chordId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '2',
        chordId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '1',
        chordId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '3',
        chordId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '3',
        chordId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('chordsUsers', null, {})
  }
}
