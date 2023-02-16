module.exports = (sequelize, DataTypes) => {
  const MovieCategory = sequelize.define(
    'MovieCategory',
    {},
    { underscored: true }
  );
  MovieCategory.associate = (db) => {
    MovieCategory.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    MovieCategory.belongsTo(db.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return MovieCategory;
};
