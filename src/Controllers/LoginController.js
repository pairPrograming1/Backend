const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { Users, Rols } = require("../DbIndex");
require("dotenv").config();

const { JWTKEY } = process.env;

const login = async (usuario, password) => {
  try {
    const user = await Users.findOne({
      where: { usuario },
      include: {
        model: Rols,
        attributes: ["rol"],
      },
      attributes: { // Especificamos los atributos a incluir, incluyendo 'password'
        include: ['password']
      },
      raw: true,
      nest: true,
    });
    
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta.");
    }

    const roleName = user.rol;
    const token = jwt.sign({ userId: user.id, role: roleName }, JWTKEY, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
};

module.exports = {
  login,
};
