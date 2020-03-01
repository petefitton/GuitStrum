'use strict';
module.exports = (sequelize, DataTypes) => {
  const share = sequelize.define('share', {
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  share.associate = function(models) {
    // associations can be defined here
    models.share.belongsTo(models.user);
    models.share.belongsTo(models.song);
  };
  return share;
};