'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    userId: DataTypes.INTEGER,
    timeSig: DataTypes.STRING,
    chordCadence: DataTypes.STRING,
    instanceCount: DataTypes.NUMERIC,
    public: DataTypes.BOOLEAN
  }, {});
  song.associate = function(models) {
    // associations can be defined here
    models.song.belongsTo(models.user);
    models.song.hasMany(models.instance);
  };
  return song;
};