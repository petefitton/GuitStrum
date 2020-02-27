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
      colloqChordName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apiSearchChordName: {
        type: Sequelize.STRING
      },
      imageChordName: {
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