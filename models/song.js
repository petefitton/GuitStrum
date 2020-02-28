'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    timeSig: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    chordCadence: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    instanceCount: {
      type: DataTypes.NUMERIC
    },
    public: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  song.associate = function(models) {
    // associations can be defined here
    models.song.belongsTo(models.user);
    models.song.hasMany(models.instance);
    models.song.belongsToMany(models.user, { through: "songsUsers" });
  };
  return song;
};