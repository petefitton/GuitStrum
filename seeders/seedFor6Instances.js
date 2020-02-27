'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('instances', [
      { location: 1,
        chordId: 1,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 2,
        chordId: 2,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 3,
        chordId: 1,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 4,
        chordId: 3,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 1,
        chordId: 2,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 2,
        chordId: 2,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 3,
        chordId: 1,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 4,
        chordId: 1,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 1,
        chordId: 1,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 2,
        chordId: 3,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 3,
        chordId: 1,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 4,
        chordId: 2,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 1,
        chordId: 1,
        songId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 2,
        chordId: 1,
        songId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 3,
        chordId: 2,
        songId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { location: 4,
        chordId: 3,
        songId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('instances', null, {})
  }
}
