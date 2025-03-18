const { createUserController, obtenerUserController, obtenerUserGridController, updateUserController } = require('../Controllers/UserController')
//const { hash_password } = require('../utils/hash_passwords');

const createUsserHandler = async (req, res) => {
    const { dni, auth0Id, nombre, apellido, direccion, email, whatsapp, usuario, password, utypeId } = req.body;
    //const roldefault = 1;
    try {
        if(!dni){
            return res.status(400).json({
                error: "Solicitud incorrecta",
                message: "El DNI no puede estar vacio.",
            });
        }
        if(!dni || !nombre || !apellido || !direccion || !email || !whatsapp || !usuario || !password) {
            return res.status(400).json({
                error: "Solicitud incorrecta",
                message: "Todos los campos son obligatorios.",
            });
        }
        const userData = {
            auth0Id,
            dni,
            nombre,
            apellido,
            direccion,
            email,
            whatsapp,
            usuario,
            password,
            utypeId: utypeId,
        };
        await createUserController(userData);
        return res.status(201).json({message: 'Usuario Creado'});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id){
            return res.status(400).json({
                error: "Solicitud incorrecta",
                message: "El Identificador no puede estar vacio.",
            });
        }
        const user = await obtenerUserController(id);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const obtenerUserGridHandler = async (req, res) => {
    try {
        const users = await obtenerUserGridController();
        return res.status(201).json(users);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const updateUserHandler = async (req, res) =>{
    const id = req.params
    const {data} =req.body
    try {
        await updateUserController(id, data);
        return res.status(201).json("Modificacion Exitosa");
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
module.exports= {
    createUsserHandler,
    obtenerUserHandler,
    obtenerUserGridHandler,
    updateUserHandler
}