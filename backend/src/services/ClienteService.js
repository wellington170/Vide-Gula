const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const usuarioRepository = require('../repositories/UsuarioRepository');
const enderecoRepository = require('../repositories/EnderecoRepository');

class ClienteService {
  async obterPerfil(usuarioId) {
    const usuario = await usuarioRepository.findByIdWithAddresses(usuarioId);

    if (!usuario) {
      throw ApiError.notFound('Usuário não encontrado.');
    }

    return usuario;
  }

  async atualizarPerfil(usuarioId, { nome, telefone, email, senha, confirmarSenha, endereco }) {
    const usuario = await usuarioRepository.findById(usuarioId, { include: [{ model: require('../models').Endereco, as: 'enderecos' }] });

    if (!usuario) {
      throw ApiError.notFound('Usuário não encontrado.');
    }

    if (email && email !== usuario.email) {
      const emailEmUso = await usuarioRepository.findByEmail(email);
      if (emailEmUso) {
        throw ApiError.badRequest('Já existe uma conta cadastrada com este e-mail.');
      }
    }

    if (senha) {
      if (senha !== confirmarSenha) {
        throw ApiError.badRequest('As senhas informadas não coincidem.');
      }
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    if (nome) usuario.nome = nome;
    if (telefone) usuario.telefone = telefone;
    if (email) usuario.email = email;

    await usuario.save();

    if (endereco && typeof endereco === 'object') {
      if (endereco.id) {
        const enderecoExistente = await enderecoRepository.findActiveByIdAndUser(endereco.id, usuario.id);

        if (!enderecoExistente) {
          throw ApiError.notFound('Endereço não encontrado para este usuário.');
        }

        await enderecoRepository.update(enderecoExistente, {
          rua: endereco.rua || enderecoExistente.rua,
          numero: endereco.numero || enderecoExistente.numero,
          bairro: endereco.bairro || enderecoExistente.bairro,
          cidade: endereco.cidade || enderecoExistente.cidade,
          estado: endereco.estado || enderecoExistente.estado,
          cep: endereco.cep || enderecoExistente.cep,
          complemento: endereco.complemento !== undefined ? endereco.complemento : enderecoExistente.complemento,
          pontoReferencia: endereco.pontoReferencia !== undefined ? endereco.pontoReferencia : enderecoExistente.pontoReferencia,
          ativo: endereco.ativo !== undefined ? endereco.ativo : enderecoExistente.ativo
        });
      } else {
        await enderecoRepository.create({
          usuarioId: usuario.id,
          rua: endereco.rua,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          cep: endereco.cep,
          complemento: endereco.complemento || null,
          pontoReferencia: endereco.pontoReferencia || null,
          ativo: endereco.ativo !== undefined ? endereco.ativo : true
        });
      }
    }

    return usuarioRepository.findByIdWithAddresses(usuario.id);
  }
}

module.exports = new ClienteService();
