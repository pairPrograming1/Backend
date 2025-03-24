const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { LINKDB } = process.env;

const sequelize = new Sequelize(LINKDB, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You can set this to true if you're using a trusted certificate
    },
  },
});

const modelDefiners = [];

// Función recursiva para leer modelos en carpetas y subcarpetas
const readModels = (folderPath) => {
  fs.readdirSync(folderPath)
    .forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Si es una carpeta, llamamos recursivamente a la función para leer modelos en esa carpeta
        readModels(filePath);
      } else if (file.slice(-3) === '.js') {
        // Si es un archivo JavaScript en la carpeta, lo agregamos a los modelDefiners
        modelDefiners.push(require(filePath));
      }
    });
};

// Llamamos a la función inicialmente con la ruta de la carpeta 'models'
readModels(path.join(__dirname, '/models'));

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Log de los modelos cargados
console.log(sequelize.models);

// Destructuring de los modelos
const { Users, Rols, User_Type, Invitados, Salones, Eventos, Metodo_de_pago, Punto_de_venta } = sequelize.models;
/* ------------------- Relaciones --------------------- */
// Usuario / Roles
Rols.hasMany(Users, { foreignKey: 'roleId' });
Users.belongsTo(Rols, { foreignKey: 'roleId' });
// Usuario / Tipos
User_Type.hasMany(Users, { foreignKey: 'utypeId' });
Users.belongsTo(User_Type, { foreignKey: 'utypeId',  allowNull:false});

// Salones / Users
Salones.belongsToMany(Users, {  through: 'UsersSalones', foreignKey: 'salonId' });
Users.belongsToMany(Salones, { through: 'UsersSalones', foreignKey: 'userId' });

// Usuario / Punto de venta:
Users.belongsToMany(Punto_de_venta, { through: 'UserPuntoVenta', foreignKey: 'userId' });
Punto_de_venta.belongsToMany(Users, {  through: 'UserPuntoVenta',  foreignKey: 'puntoId' });

// Salones / Punto de venta
Salones.belongsToMany(Punto_de_venta, { through: 'SalonPunto', foreignKey: 'salonId' });
Punto_de_venta.belongsToMany(Salones, {  through: 'SalonPunto',  foreignKey: 'puntoId' });

// tipo de pago / punto de venta
Metodo_de_pago.belongsToMany(Punto_de_venta, {through: 'metodosPago', foreignKey: 'pagoId'});
Punto_de_venta.belongsToMany(Metodo_de_pago, {through: 'metodosPago', foreignKey: 'puntoId'});

// Eventos / Salones
Salones.hasMany(Eventos, { foreignKey: "salonId"} );
Eventos.belongsTo(Salones, {foreignKey: 'salonId'});

// Invitados / Users
Users.hasMany(Invitados, {foreignKey: 'userId'});
Invitados.belongsTo(Users, {foreignKey: 'userId'});
// Invitados / Eventos
Eventos.hasMany(Invitados, { foreignKey: 'eventoId'});
Invitados.belongsTo(Eventos, { foreignKey: 'eventoId'});

// Transacciones y registro de las mismas



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./DataBase.js');
}
