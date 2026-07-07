import api from './api';

const orderService = {
  // Criar pedido
  criarPedido: async (dadosPedido) => {
    try {
      const response = await api.post('/pedidos', dadosPedido);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error.response?.data || error.message;
    }
  },

  // Listar pedidos do cliente
  listarPedidosCliente: async () => {
    try {
      const response = await api.get('/pedidos');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      throw error.response?.data || error.message;
    }
  },

  listarPedidosAdmin: async () => {
    try {
      const response = await api.get('/admin/pedidos');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      throw error.response?.data || error.message;
    }
  },

  // Atualizar pedido do cliente
  atualizarPedidoCliente: async (usuarioId, id, dadosAtualizacao) => {
    try {
      const response = await api.patch(`/pedidos/${id}`, { usuarioId, ...dadosAtualizacao });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error.response?.data || error.message;
    }
  },

  atualizarStatusPedido: async (id, status) => {
    try {
      const response = await api.patch(`/admin/pedidos/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error.response?.data || error.message;
    }
  },

  excluirPedidoAdmin: async (id) => {
    try {
      const response = await api.delete(`/admin/pedidos/${id}`, id);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error.response?.data || error.message;
    }
  },

  // Cancelar pedido do cliente
  cancelarPedidoCliente: async (id) => {
    try {
      const response = await api.patch(`/pedidos/${id}/cancelar`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default orderService;
