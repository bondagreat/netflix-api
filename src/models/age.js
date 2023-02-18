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

  return Age;
};
