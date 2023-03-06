module.exports = (sequelize, DataTypes) => {
  const Age = sequelize.define(
    'Age',
    {
      name: {
        type: DataTypes.ENUM('ALL', '7+', '13+', '16+', '18+'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Age.associate = (db) => {
    Age.hasMany(db.Movie, {
      foreignKey: {
        name: 'ageId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Age;
};
