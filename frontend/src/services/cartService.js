import api from './api';

const cartService = {
  // Visualizar carrinho
  visualizarCarrinho: async () => {
    try {
      const response = await api.get('/carrinho');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao visualizar carrinho:', error);
      throw error.response?.data || error.message;
    }
  },

  // Adicionar produto ao carrinho
  adicionarProduto: async (produtoId, quantidade) => {
    try {
      const response = await api.post('/carrinho/produtos', {
        produtoId,
        quantidade,
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error.response?.data || error.message;
    }
  },

  // Alterar quantidade de produto no carrinho
  alterarQuantidade: async (produtoId, quantidade) => {
    try {
      const response = await api.patch(`/carrinho/produtos/${produtoId}`, {
        quantidade,
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      throw error.response?.data || error.message;
    }
  },

  // Remover produto do carrinho
  removerProduto: async (produtoId) => {
    try {
      const response = await api.delete(`/carrinho/produtos/${produtoId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw error.response?.data || error.message;
    }
  },

  // Finalizar carrinho
  finalizarCarrinho: async (id) => {
    try {
      const response = await api.post('/carrinho/finalizar', id);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao finalizar carrinho:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default cartService;
