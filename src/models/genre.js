module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
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

  Genre.associate = (db) => {
    Genre.hasMany(db.MovieGenre, {
      foreignKey: {
        name: 'genreId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Genre;
};
