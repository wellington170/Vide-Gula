const authService = require('../services/AuthService');
const { sendSuccess } = require('../utils/responseFormatter');

const login = async (req, res) => {
  const payload = await authService.login(req.body);
  return sendSuccess(res, payload, 'Login realizado com sucesso.');
};

const registerCliente = async (req, res) => {
  const usuario = await authService.registerCliente(req.body);
  return sendSuccess(res, usuario, 'Cliente cadastrado com sucesso.', 201);
};

module.exports = {
  login,
  registerCliente
};
