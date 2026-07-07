const BaseRepository = require('./BaseRepository');
const { Usuario } = require('../models');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findByEmail(email) {
    return this.findOne({ where: { email } });
  }
}

module.exports = new UsuarioRepository();
