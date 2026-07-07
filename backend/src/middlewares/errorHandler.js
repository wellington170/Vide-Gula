const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      details: err.details
    });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Validação de dados falhou.',
      details: err.errors.map((validationError) => ({
        field: validationError.path,
        message: validationError.message
      }))
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.'
  });
};

module.exports = errorHandler;
