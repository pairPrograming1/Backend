const { Users } = require("../DbIndex");

const createUserController = async (Id, email) => {
  try {
    const [existingUser, created] = await Users.findOrCreate({
      where: { Id },
      defaults: { Id, email },
    });
    if (!created) {
      throw new Error("EL usuario ya existe");
    }
    return existingUser;
  } catch (error) {
    throw new Error(`EError al crear el usuario ${error.message}`);
  }
};
/*
const obtenerUserController = async(Id) => {
  try {
    const userE = await Users.findByPk(Id, {
      attributes: ['email']
    })
    return userE ? userE.email : null;
  } catch (error) {
      throw new Error(`EError al crear el usuario ${error.message}`);
  }
};
*/
module.exports = {
  createUserController,
  //obtenerUserController
}