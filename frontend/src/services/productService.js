import api from './api';

const productService = {
  // Listar cardápio (produtos)
  listarCardapio: async () => {
    try {
      const response = await api.get('/cardapio');
      const produtos = response.data.data || [];
      return produtos.map(produto => ({
        ...produto,
        preco: parseFloat(produto.precoBase || produto.preco || 0)
      }));
    } catch (error) {
      console.error('Erro ao listar cardápio:', error);
      throw error.response?.data || error.message;
    }
  },

  // Consultar produto específico
  consultarProduto: async (id) => {
    try {
      const response = await api.get(`/produtos/${id}`);
      const produto = response.data.data;
      return produto ? { ...produto, preco: parseFloat(produto.precoBase || produto.preco || 0) } : produto;
    } catch (error) {
      console.error('Erro ao consultar produto:', error);
      throw error.response?.data || error.message;
    }
  },

  // Filtra produtos por tipo/categoria
  listarPorCategoria: async (categoria) => {
    try {
      const cards = await productService.listarCardapio();
      return cards.filter(p => p.tipo?.toLowerCase() === categoria?.toLowerCase());
    } catch (error) {
      console.error('Erro ao filtrar produtos por categoria:', error);
      throw error;
    }
  },

  // Admin: listar produtos
  listarProdutosAdmin: async () => {
    try {
      const response = await api.get('/produtos');
      const produtos = response.data.data || [];
      return produtos.map(produto => ({
        ...produto,
        preco: parseFloat(produto.precoBase || produto.preco || 0),
        valor: parseFloat(produto.precoBase || produto.preco || 0).toFixed(2),
        visibilidade: produto.ativo ? 'Visível' : 'Invisível'
      }));
    } catch (error) {
      console.error('Erro ao listar produtos admin:', error);
      throw error.response?.data || error.message;
    }
  },

  cadastrarProduto: async (produto) => {
    try {
      const response = await api.post('/produtos', {
        nome: produto.nome,
        descricao: produto.descricao,
        tipo: produto.tipo.toUpperCase(),
        precoBase: Number(produto.precoBase),
        imagem: produto.imagem || null,
        ativo: produto.ativo !== undefined ? produto.ativo : true,
        disponivel: produto.disponivel !== undefined ? produto.disponivel : true
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      throw error.response?.data || error.message;
    }
  },

  atualizarProduto: async (id, updates) => {
    try {
      const payload = {
        ...updates,
        tipo: updates.tipo ? updates.tipo.toUpperCase() : undefined,
      };
      const response = await api.patch(`/produtos/${id}`, payload);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error.response?.data || error.message;
    }
  },

  excluirProduto: async (id) => {
    try {
      const response = await api.delete(`/produtos/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default productService;
