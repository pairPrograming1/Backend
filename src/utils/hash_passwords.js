const bcrypt = require('bcrypt');
//por ahora no es nescesario
const hash_password = async (password) => {
    const saltRounds = 10; // Standard recommendation
    const result = await bcrypt.hash(password, saltRounds);
    return result
}

module.exports={
    hash_password
};