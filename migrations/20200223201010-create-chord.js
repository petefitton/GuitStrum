'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strings: {
        type: Sequelize.STRING
      },
      fingering: {
        type: Sequelize.STRING
      },
      chordName: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      },
      searchName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chords');
  }
};