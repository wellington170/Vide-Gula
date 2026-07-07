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
}

module.exports = new EnderecoRepository();
