import React from 'react'
import cartService from '../services/cartService';
import { useDispatch } from 'react-redux';
import { adicionarProduto } from '../redux/slices/cartSlice';

import './Card.css'

const Card = ({produtos, icon, cardColor}) => {
  const dispatch = useDispatch();
  const adicionarAoCarrinho = async (produto) => {
    try {
      await cartService.adicionarProduto(produto.id, 1);
      dispatch(adicionarProduto({
        id: produto.id,
        nome: produto.nome,
        preco: parseFloat(produto.precoBase),
        quantidade: 1,
      }));
      alert('Produto adicionado ao carrinho!');
    } catch (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      alert('Erro ao adicionar ao carrinho');
    }
  };

  return (
      <div className="products-grid">
          {produtos.map((produto) => (
              <div key={produto.id} className={`product-card ${cardColor}`}>
                  <img src={produto.imagem} alt={produto.nome} className="product-image" />
                  <div className="product-info">
                      <h3>{produto.nome}</h3>
                      <p>{produto.descricao}</p>
                      <div className="product-footer">
                          {icon && (
                              <button className="add-btn"
                                  onClick={() => adicionarAoCarrinho(produto)}>
                                  <img src={icon} alt="Adicionar" />
                              </button>
                          )}
                          <span className="price">R$ <strong>{produto.precoBase}</strong></span>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default Card