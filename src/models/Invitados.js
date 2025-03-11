const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Invitados', {
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },{
        timestamps: true,
        indexes: [
        {
          unique: true,
          fields: ['eventoId', 'dni'], // Restricción única para evitar duplicados en el mismo evento
          name: 'evento_invitado_unique'
        }
      ]})
}