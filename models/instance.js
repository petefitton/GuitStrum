'use strict';
module.exports = (sequelize, DataTypes) => {
  const instance = sequelize.define('instance', {
    chordId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    location: {
      type: DataTypes.NUMERIC
      // validate: {
      //   notNull: true
      // }
    }
  }, {});
  instance.associate = function(models) {
    // associations can be defined here
    models.instance.belongsTo(models.song);
    models.instance.belongsTo(models.chord);
  };
  return instance;
};