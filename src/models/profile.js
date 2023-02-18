module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]{4}$/,
        },
      },
    },
    { underscored: true }
  );

  Profile.associate = (db) => {
    Profile.hasMany(db.Watchlist, {
      foreignKey: {
        name: 'profileId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Profile.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  return Profile;
};
