import React from 'react'

import './Card.css'

const Card = ({produtos, icon, cardColor}) => {
  return (
      <div className="products-grid">
          {produtos.map((produto) => (
              <div key={produto.id} className={`product-card ${cardColor}`}>
                  <img src="https://via.placeholder.com/250x150?text=Foto+Pizza" alt={produto.nome} className="product-image" />
                  <div className="product-info">
                      <h3>{produto.nome}</h3>
                      <p>{produto.descricao}</p>
                      <div className="product-footer">
                          <button className="add-btn">
                              <img src={icon} alt="Adicionar" />
                          </button>
                          <span className="price">R$ <strong>{produto.preco}</strong></span>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default Card