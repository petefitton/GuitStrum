'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      { name: 'Keith',
        email: 'Fuller@key.com',
        password: '$2b$12$SAjdpcPu9ItSq5uVxz0RBeAXzq9jzhy7vTq9XKhj/NaQGKHwbR8Ie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Bobby',
        email: 'Bobbington@test.co',
        password: '$2b$12$SAjdpcPu9ItSq5uVxz0RBeAXzq9jzhy7vTq9XKhj/NaQGKHwbR8Ie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Misty',
        email: 'Owens@gam.com',
        password: '$2b$12$SAjdpcPu9ItSq5uVxz0RBeAXzq9jzhy7vTq9XKhj/NaQGKHwbR8Ie',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
