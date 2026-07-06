const { body } = require('express-validator');

const updateProfileRules = [
  body('email').optional().isEmail().withMessage('E-mail inválido.'),
  body('senha').optional().isLength({ min: 8 }).withMessage('A senha deve conter ao menos 8 caracteres.'),
  body('confirmarSenha').optional().isString().withMessage('Confirmação de senha deve ser uma string.'),
  body('endereco.id').optional().isInt().withMessage('ID do endereço inválido.'),
  body('endereco.rua').optional().isString(),
  body('endereco.numero').optional().isString(),
  body('endereco.bairro').optional().isString(),
  body('endereco.cidade').optional().isString(),
  body('endereco.estado').optional().isString(),
  body('endereco.cep').optional().isString()
];

module.exports = {
  updateProfileRules
};
