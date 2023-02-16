module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
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

  Language.associate = (db) => {
    Language.hasMany(db.Movie, {
      foreignKey: {
        name: 'languageId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Language;
};
