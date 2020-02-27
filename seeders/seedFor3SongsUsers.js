'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('songsUsers', [
      { userId: '1',
        songId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '2',
        songId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '3',
        songId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: '1',
        songId: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('songsUsers', null, {})
  }
}
