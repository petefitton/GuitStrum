'use strict';
module.exports = (sequelize, DataTypes) => {
  const chord = sequelize.define('chord', {
    strings: DataTypes.STRING,
    fingering: DataTypes.STRING,
    chordName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    searchName: DataTypes.STRING
  }, {});
  chord.associate = function(models) {
    // associations can be defined here
    models.chord.belongsToMany(models.user, { through: "chordsUsers" });
    models.chord.hasMany(models.instance);
  };
  return chord;
};