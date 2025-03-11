const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Juridica',{
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: UUIDV4
        },
        nombre_fantasia:{
            type: DataTypes.STRING,
            allowNull:false
        },
        razon_social:{
            type: DataTypes.STRING,
            allowNull:false
        },
        cuit:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
                is: /^\d{2}-\d{8}-\d{1}$/  // Valida formato CUIT argentino
            }
        },
        libb:{
            type: DataTypes.STRING,
            allowNull:false
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull:false
        }

    }, { timestamps: true });
}