const { createUserController, /*obtenerUserController*/ } = require('../Controllers/UserController')

const createUsserHandler = async (req, res) => {
    const { Id, email }  = req.body;
    //const roldefault = 1;
    try {
        if(!Id){
            return res.status(400).json({
                error: "Solicitud incorrecta",
                message: "El Identificador no puede estar vacio.",
              });
        }
        await createUserController(Id, email);
        return res.status(201).json({message: 'Usuario Creado'});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

/*const obtenerUserHandler = async (req, res) => {
    const Id = req.body;
    try {
        if(!Id){
            return res.status(400).json({
                error: "Solicitud incorrecta",
                message: "El Identificador no puede estar vacio.",
            });
        }
        const user = await obtenerUserController(Id);
        return res.status(201).json(user.email);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}*/
module.exports= {
    createUsserHandler,
    //obtenerUserHandler
}