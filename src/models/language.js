module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
    {
      name: {
        type: DataTypes.ENUM(
          'English',
          'Thai',
          'Korean',
          'Japanese',
          'Spanish'
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  return Language;
};
