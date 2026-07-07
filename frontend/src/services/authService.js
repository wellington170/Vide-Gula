import api from './api';

const authService = {
  // Login
  login: async (email, senha) => {
    try {
      const response = await api.post('/login', { email, senha });
      const { token, usuario } = response.data.data;
      
      // Armazena token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Registrar novo cliente
  register: async (nome, email, telefone, senha, confirmarSenha, endereco) => {
    try {
      const response = await api.post('/clientes/cadastro', {
        nome,
        email,
        telefone,
        senha,
        confirmarSenha,
        endereco,
      });
      
      const { token, usuario } = response.data.data;
      
      // Armazena token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtém usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verifica se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtém token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
