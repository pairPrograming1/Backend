const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Natural',{
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: UUIDV4
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        dni:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                is: /^\d{7,8}$/ // Asegura que el DNI tenga entre 7 y 8 dígitos numéricos
            }
        }

    }, { timestamps: true });
}