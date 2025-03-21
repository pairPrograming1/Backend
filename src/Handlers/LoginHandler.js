const { login } = require('../Controllers/LoginController');

const loginHandler = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const { token } = await login(usuario, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    loginHandler,
}