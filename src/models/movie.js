module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      release: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^[0-9]{4}$/,
        },
      },
      length: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.ENUM('ALL', '7+', '13+', '16+', '18+'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Movie.associate = (db) => {
    Movie.hasMany(db.Watchlist, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Movie.hasMany(db.MovieGenre, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Movie.hasMany(db.MovieMainCast, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Movie.hasMany(db.MovieCast, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Movie.hasMany(db.MovieCategory, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Movie.belongsTo(db.Language, {
      foreignKey: {
        name: 'languageId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Movie;
};
