const { Users, Rols } = require("../DbIndex");

const createUserController = async (data) => {
  try {
    const defaultRol = await Rols.findOne({where: {rol:"Graduado"}});
    data.roleId = defaultRol.id;
    const [existingUser, created] = await Users.findOrCreate({
      where: { dni: data.dni }, // Or email or usuario
      defaults: data,
    });
    if (!created) {
      throw new Error("EL usuario ya existe");
    }
    return existingUser;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
//datos como el perfil principal del usuario
const obtenerUserController = async(Id) => {
  try {
    const user = await Users.findByPk(Id, {
      attributes: ['dni', 'nombre', 'apellido', 'email', 'direccion', 'whatsapp', 'usuario'],
      include:{
        model: User_Type,
        attributes: ['usertyype']
      }
    });
    
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    return user;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
};
//obtener datos para grid
const obtenerUserGridController = async (id) => {
  try {
    const grid =  await Users.findByPk(id, {
      attributes:['usuario', 'nombre', 'apellido', 'email'],
      include:{
        model: "Rols",
        attributes:['rol']
      },
      raw: true, 
      nest: true
    })
    return grid;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
}

const updateUserController = async (data) => {
  const {nombre, apellido, direccion, email, whatsapp, id} = data;
  try {
    await Users.update(
      { nombre, apellido, direccion, email, whatsapp },
      { where: { id } }
    );
    return "informacion actualizada correctamente"; // Otra indicación de que la actualización fue exitosa
  } catch (error) {
    throw new Error(`Error al actualizar la información del usuario, ${error.message}`);
  }
}
module.exports = {
  createUserController,
  obtenerUserController,
  obtenerUserGridController,
  updateUserController
}