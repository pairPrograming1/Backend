const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Metodo_de_pago', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          tipo_de_cobro: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          comision: {
            type: DataTypes.DECIMAL(10, 2), // Ajusta el tipo según lo que necesites
            allowNull: false,
          },
    }, { timestamps: true });
};