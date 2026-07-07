const BaseRepository = require('./BaseRepository');
const { Usuario } = require('../models');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findByEmail(email) {
    return this.findOne({
      where: { email },
      include: [{ model: require('../models').Endereco, as: 'endereco' }]
    });
  }
}

module.exports = new UsuarioRepository();
