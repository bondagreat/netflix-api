module.exports = (sequelize, DataTypes) => {
  const MovieMainCast = sequelize.define(
    'MovieMainCast',
    {},
    { underscored: true }
  );
  MovieMainCast.associate = (db) => {
    MovieMainCast.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    MovieMainCast.belongsTo(db.Cast, {
      foreignKey: {
        name: 'castId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return MovieMainCast;
};
