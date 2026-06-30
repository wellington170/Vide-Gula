const { body } = require('express-validator');

const loginRules = [
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('senha').isString().notEmpty().withMessage('Senha é obrigatória.')
];

const registerClienteRules = [
  body('nome').isString().notEmpty().withMessage('Nome é obrigatório.'),
  body('telefone').isString().notEmpty().withMessage('Telefone é obrigatório.'),
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('senha').isLength({ min: 8 }).withMessage('A senha deve conter ao menos 8 caracteres.'),
  body('confirmarSenha').isString().notEmpty().withMessage('Confirmação de senha é obrigatória.'),
  body('endereco.rua').isString().notEmpty().withMessage('Rua é obrigatória.'),
  body('endereco.numero').isString().notEmpty().withMessage('Número é obrigatório.'),
  body('endereco.bairro').isString().notEmpty().withMessage('Bairro é obrigatório.'),
  body('endereco.cidade').isString().notEmpty().withMessage('Cidade é obrigatória.'),
  body('endereco.estado').isString().notEmpty().withMessage('Estado é obrigatório.'),
  body('endereco.cep').isString().notEmpty().withMessage('CEP é obrigatório.')
];

module.exports = {
  loginRules,
  registerClienteRules
};
