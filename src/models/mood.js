module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define(
    'Mood',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Mood.associate = (db) => {
    Mood.hasMany(db.MovieMood, {
      foreignKey: {
        name: 'moodId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Mood;
};
