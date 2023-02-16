module.exports = (sequelize, DataTypes) => {
  const MovieGenre = sequelize.define('MovieGenre', {}, { underscored: true });
  MovieGenre.associate = (db) => {
    MovieGenre.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    MovieGenre.belongsTo(db.Genre, {
      foreignKey: {
        name: 'genreId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return MovieGenre;
};
