'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('songs', [
      { userId: 1,
        timeSig: '4 4',
        chordCadence: '4',
        instanceCount: '4',
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 1,
        timeSig: '4 4',
        chordCadence: '4',
        instanceCount: '4',
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        timeSig: '4 4',
        chordCadence: '4',
        instanceCount: '4',
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        timeSig: '4 4',
        chordCadence: '4',
        instanceCount: '4',
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('songs', null, {})
  }
}
