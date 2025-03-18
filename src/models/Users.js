const { DataTypes, UUIDV4 } = require('sequelize');
const bcrypt = require('bcrypt'); // Para hashear contraseñas
module.exports = (sequelize) => {
  sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    auth0Id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'DNI no puede estar vacío',
          args: [this.auth0Id === null] 
        }
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notEmpty: {
          msg: 'Nombre no puede estar vacío',
          args: [this.auth0Id === null]
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notEmpty: {
          msg: 'Apellido no puede estar vacío',
          args: [this.auth0Id === null]
        }
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notEmpty: {
          msg: 'Dirección no puede estar vacía',
          args: [this.auth0Id === null]
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notEmpty: {
          msg: 'Whatsapp no puede estar vacío',
          args: [this.auth0Id === null]
        }
      }
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Usuario no puede estar vacío',
          args: [this.auth0Id === null]
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notNullIfNoAuth0(value) {
          if (!this.auth0Id && !value) {
            throw new Error("Debe establecer una contraseña o usar Auth0");
          }
        },
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    hooks: {
      // Hook para hashear la contraseña antes de guardar
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
    defaultScope: {
      attributes: { exclude: ['password'] } // No devolver la contraseña en las consultas
    }
  })
};
