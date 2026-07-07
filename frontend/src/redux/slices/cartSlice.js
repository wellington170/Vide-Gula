import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itens: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItens: (state, action) => {
      state.itens = action.payload;
      state.total = action.payload.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    },
    adicionarProduto: (state, action) => {
      const produto = action.payload;
      const existente = state.itens.find(item => item.id === produto.id);
      
      if (existente) {
        existente.quantidade += produto.quantidade;
      } else {
        state.itens.push(produto);
      }
      state.total = state.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    },
    removerProduto: (state, action) => {
      state.itens = state.itens.filter(item => item.id !== action.payload);
      state.total = state.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    },
    atualizarQuantidade: (state, action) => {
      const { id, quantidade } = action.payload;
      const produto = state.itens.find(item => item.id === id);
      if (produto) {
        produto.quantidade = quantidade;
        if (produto.quantidade <= 0) {
          state.itens = state.itens.filter(item => item.id !== id);
        }
      }
      state.total = state.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    },
    limparCarrinho: (state) => {
      state.itens = [];
      state.total = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCartItens,
  adicionarProduto,
  removerProduto,
  atualizarQuantidade,
  limparCarrinho,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
