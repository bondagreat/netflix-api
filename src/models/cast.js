module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define(
    'Cast',
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

  Cast.associate = (db) => {
    Cast.hasMany(db.MovieMainCast, {
      foreignKey: {
        name: 'castId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Cast.hasMany(db.MovieCast, {
      foreignKey: {
        name: 'castId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Cast;
};
