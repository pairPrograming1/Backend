const { getRolesController, changeRolesController } = require('../Controllers/RolesController');

const getRolesHandler = async (req, res) =>{
    try {
        const roles = await getRolesController();
        return res.status(201).json(roles);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

const changeRoleHandler = async(req, res) => {
    const { Id } = req.params;
    const { roleId } = req.body
    try {
        await changeRolesController(Id, roleId);
        return res.status(201).json("Cambio exitoso")
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
module.exports = {
    getRolesHandler,
    changeRoleHandler
}