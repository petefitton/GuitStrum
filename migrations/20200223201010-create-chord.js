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
        allowNull: false,
        type: Sequelize.STRING
      },
      fingering: {
        allowNull: false,
        type: Sequelize.STRING
      },
      chordName: {
        allowNull: false,
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