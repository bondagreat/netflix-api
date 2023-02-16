module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    'Package',
    {
      name: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Package.associate = (db) => {
    Transaction.hasMany(db.User, {
      foreignKey: {
        name: 'packageId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Package;
};
