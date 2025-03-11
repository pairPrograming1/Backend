const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Salones',{
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull:false
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 1,
            validate: {
                min: 1 // Asegura que sea un número positivo
            }
        },
        estatus: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        },
        Mercadopago: {
            type: DataTypes.STRING,
            allowNull:false
        }
    }, { timestamps: true })
}