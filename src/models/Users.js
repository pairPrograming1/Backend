const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, { timestamps: true });
};