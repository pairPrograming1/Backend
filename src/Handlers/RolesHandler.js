const { getRolesController } = require('../Controllers/RolesController');

const getRolesHandler = async (req, res) =>{
    try {
        const roles = await getRolesController();
        return res.status(201).json(roles);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getRolesHandler
}