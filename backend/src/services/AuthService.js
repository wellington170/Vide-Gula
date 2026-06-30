const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const usuarioRepository = require('../repositories/UsuarioRepository');
const enderecoRepository = require('../repositories/EnderecoRepository');
const { UsuarioPerfis } = require('../utils/enums');

class AuthService {
  async login({ email, senha }) {
    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw ApiError.unauthorized('Usuário não encontrado.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw ApiError.unauthorized('Senha inválida.');
    }

    const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    const usuarioJson = usuario.toJSON();
    delete usuarioJson.senha;

    return { usuario: usuarioJson, token };
  }

  async registerCliente({ nome, telefone, email, senha, confirmarSenha, endereco }) {
    if (senha !== confirmarSenha) {
      throw ApiError.badRequest('As senhas informadas não coincidem.');
    }

    const usuarioExistente = await usuarioRepository.findByEmail(email);

    if (usuarioExistente) {
      throw ApiError.badRequest('Já existe uma conta cadastrada com este e-mail.');
    }

    if (!endereco || typeof endereco !== 'object') {
      throw ApiError.badRequest('É necessário informar um endereço de entrega.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await usuarioRepository.create(
      {
        nome,
        telefone,
        email,
        senha: senhaHash,
        perfil: UsuarioPerfis.CLIENTE,
        enderecos: [
          {
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
            cep: endereco.cep,
            complemento: endereco.complemento || null,
            pontoReferencia: endereco.pontoReferencia || null,
            ativo: true
          }
        ]
      },
      {
        include: [{ model: require('../models').Endereco, as: 'enderecos' }]
      }
    );

    const usuarioJson = usuario.toJSON();
    delete usuarioJson.senha;

    return usuarioJson;
  }
}

module.exports = new AuthService();
