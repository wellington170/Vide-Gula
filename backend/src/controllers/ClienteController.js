const clienteService = require('../services/ClienteService');
const { sendSuccess } = require('../utils/responseFormatter');

const getProfile = async (req, res) => {
  const perfil = await clienteService.obterPerfil(req.user.id);
  return sendSuccess(res, perfil);
};

const updateProfile = async (req, res) => {
  const perfil = await clienteService.atualizarPerfil(req.user.id, req.body);
  return sendSuccess(res, perfil);
};

module.exports = {
  getProfile,
  updateProfile
};
