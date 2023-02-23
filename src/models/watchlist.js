module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {}, { underscored: true });
  Watchlist.associate = (db) => {
    Watchlist.belongsTo(db.Profile, {
      foreignKey: {
        name: 'profileId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Watchlist.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  return Watchlist;
};
