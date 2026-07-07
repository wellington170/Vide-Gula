jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

jest.mock('../../src/repositories/UsuarioRepository', () => ({
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findByIdWithAddresses: jest.fn(),
  create: jest.fn()
}));

jest.mock('../../src/repositories/EnderecoRepository', () => ({
  findActiveByIdAndUser: jest.fn(),
  update: jest.fn(),
  create: jest.fn()
}));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../../src/repositories/UsuarioRepository');
const AuthService = require('../../src/services/AuthService');

describe('AuthService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.JWT_SECRET = 'secret-test';
  });

  test('deve autenticar um usuário com sucesso', async () => {
    const usuario = {
      id: 1,
      perfil: 'CLIENTE',
      senha: 'hash-senha',
      toJSON: () => ({ id: 1, perfil: 'CLIENTE', senha: 'hash-senha' })
    };

    usuarioRepository.findByEmail.mockResolvedValue(usuario);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token-jwt');

    const result = await AuthService.login({ email: 'cliente@email.com', senha: '123456' });

    expect(usuarioRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(usuarioRepository.findByEmail).toHaveBeenCalledWith('cliente@email.com');
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hash-senha');
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ id: 1, perfil: 'CLIENTE' }, 'secret-test', { expiresIn: '1d' });
    expect(result).toEqual({
      usuario: { id: 1, perfil: 'CLIENTE' },
      token: 'token-jwt'
    });
  });

  test('deve lançar erro quando o usuário não for encontrado', async () => {
    usuarioRepository.findByEmail.mockResolvedValue(null);

    await expect(AuthService.login({ email: 'inexistente@email.com', senha: '123456' }))
      .rejects.toMatchObject({ status: 401, message: 'Usuário não encontrado.' });

    expect(usuarioRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  test('deve lançar erro quando a senha estiver incorreta', async () => {
    const usuario = {
      id: 1,
      perfil: 'CLIENTE',
      senha: 'hash-senha',
      toJSON: () => ({ id: 1, perfil: 'CLIENTE', senha: 'hash-senha' })
    };

    usuarioRepository.findByEmail.mockResolvedValue(usuario);
    bcrypt.compare.mockResolvedValue(false);

    await expect(AuthService.login({ email: 'cliente@email.com', senha: '123456' }))
      .rejects.toMatchObject({ status: 401, message: 'Senha inválida.' });

    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  test('deve propagar exceções vindas do repository', async () => {
    usuarioRepository.findByEmail.mockRejectedValue(new Error('Falha no repositório'));

    await expect(AuthService.login({ email: 'cliente@email.com', senha: '123456' }))
      .rejects.toThrow('Falha no repositório');
  });
});
