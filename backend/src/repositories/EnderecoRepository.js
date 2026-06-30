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

  findByUserId(usuarioId) {
    return this.findAll({
      where: {
        usuarioId
      }
    });
  }
}

module.exports = new EnderecoRepository();
