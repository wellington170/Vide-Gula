const BaseRepository = require('./BaseRepository');
const { Endereco } = require('../models');

class EnderecoRepository extends BaseRepository {
  constructor() {
    super(Endereco);
  }

  findActiveByIdAndUser(id, usuarioId) {
    return this.findOne({
      where: {
        id,
        usuarioId,
        ativo: true
      }
    });
  }

  findByUsuarioId(usuarioId) {
    return this.findOne({
      where: {
        usuarioId
      }
    });
  }

  findActiveByUsuarioId(usuarioId) {
    return this.findOne({
      where: {
        usuarioId,
        ativo: true
      }
    });
  }
}

module.exports = new EnderecoRepository();
