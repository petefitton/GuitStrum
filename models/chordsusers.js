'use strict';
module.exports = (sequelize, DataTypes) => {
  const chordsUsers = sequelize.define('chordsUsers', {
    userId: DataTypes.INTEGER,
    chordId: DataTypes.INTEGER
  }, {});
  chordsUsers.associate = function(models) {
    // associations can be defined here
  };
  return chordsUsers;
};