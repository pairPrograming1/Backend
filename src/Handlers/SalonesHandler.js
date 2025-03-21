const { getGridSalonesController, getSalonController,
     postSalonController, postUserSalonController
  } = require('../Controllers/SalonesControlers');

const getGridSalonesHandler = async(req, res) => {
    try {
        const salones = await getGridSalonesController();
        return res.status(201).json(salones);
    } catch (error) {
        return res.status(400).json({message:error.message});
    }

}

const getSalonHandler = async(req, res) => { 
    const { id } = req.params;
    try {
        const salon = await getSalonController(id);
        return res.status(201).json(salon);
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
const postSalonHandler = async(req, res) => {
    const { salon, nombre, capacidad, cuit, email, whatsapp, estatus, Mercadopago} = req.body;
    const info = { salon, nombre, capacidad, cuit, email, whatsapp, estatus, Mercadopago: Mercadopago};
    try {
        await postSalonController(info);
        return res.status(201).json('Salon agregado');
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const postUserSalonHandler = async (req, res) => {
    const {userId, salonId} = req.body;
    try {
        const result = await postUserSalonController(userId, salonId);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
module.exports = {
    getGridSalonesHandler,
    getSalonHandler,
    postSalonHandler,
    postUserSalonHandler

}