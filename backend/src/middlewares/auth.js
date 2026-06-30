const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const usuarioRepository = require('../repositories/UsuarioRepository');
const { UsuarioPerfis } = require('../utils/enums');

const verificarToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Token de autenticação não fornecido.'));
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await usuarioRepository.findById(payload.id);

    if (!usuario) {
      return next(ApiError.unauthorized('Token inválido.'));
    }

    req.user = {
      id: usuario.id,
      perfil: usuario.perfil
    };

    return next();
  } catch (error) {
    return next(ApiError.unauthorized('Token inválido ou expirado.'));
  }
};

const verificarAdmin = (req, res, next) => {
  if (!req.user || req.user.perfil !== UsuarioPerfis.ADMINISTRADOR) {
    return next(ApiError.forbidden('Acesso negado. Apenas administradores podem acessar esta rota.'));
  }

  return next();
};

module.exports = {
  verificarToken,
  verificarAdmin
};
