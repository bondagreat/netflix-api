module.exports = (sequelize, DataTypes) => {
  const MovieMood = sequelize.define('MovieMood', {}, { underscored: true });
  MovieMood.associate = (db) => {
    MovieMood.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    MovieMood.belongsTo(db.Mood, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return MovieMood;
};
