'use strict';
module.exports = (sequelize, DataTypes) => {
  const songsUsers = sequelize.define('songsUsers', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  songsUsers.associate = function(models) {
    // associations can be defined here
  };
  return songsUsers;
};