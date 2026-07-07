import { useState, useEffect } from 'react';

import './Dashboard.css'
import Card from '../../components/Card'
import adjustmentBlack from '../../images/adjustment-black.png'


const pedidos = [
  {
    id: '00231',
    status: 'Preparo',
    iconeStatus: '🕒',
    itens: [
      { qtd: 1, nome: 'Pizza Calabresa', obs: '+Borda Cheddar', categoria: 'Pizza' },
      { qtd: 1, nome: 'Pizza Quatro Queijos', obs: '+Borda Catupiry', categoria: 'Pizza' },
      { qtd: 1, nome: 'X-Salada', obs: '+Complemento Milho', categoria: 'Lanche' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
    ],
    hora: '10:23'
  },
  {
    id: '00230',
    status: 'Preparo',
    iconeStatus: '🕒',
    itens: [
      { qtd: 1, nome: 'X-Salada', obs: '+Complemento Milho', categoria: 'Lanche' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
    ],
    hora: '10:23'
  },
  {
    id: '00229',
    status: 'Enviado',
    iconeStatus: '🛵',
    itens: [
      { qtd: 1, nome: 'Pizza Calabresa', obs: '+Borda Cheddar', categoria: 'Pizza' },
      { qtd: 1, nome: 'Pizza Quatro Queijos', obs: '+Borda Catupiry', categoria: 'Pizza' },
    ],
    hora: '10:23'
  },
  {
    id: '00228',
    status: 'Cancelado',
    iconeStatus: '❌',
    itens: [
      { qtd: 1, nome: 'X-Salada', obs: '+Complemento Milho', categoria: 'Lanche' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
    ],
    hora: '10:23'
  },
  {
    id: '00227',
    status: 'Concluido',
    iconeStatus: '✅',
    itens: [
      { qtd: 1, nome: 'Pizza Calabresa', obs: '+Borda Cheddar', categoria: 'Pizza' },
      { qtd: 1, nome: 'Pizza Quatro Queijos', obs: '+Borda Catupiry', categoria: 'Pizza' },
      { qtd: 1, nome: 'X-Salada', obs: '+Complemento Milho', categoria: 'Lanche' },
      { qtd: 1, nome: 'Guaraná', obs: '', categoria: 'Bebida' },
    ],
    hora: '10:23'
  }
];

const produtos = [
  { id: 1, nome: 'X-SALADA', descricao: 'Pão brioche, hambúrguer artesanal, queijo, alface, tomate e maionese especial da casa.', preco: '00,00' },
  { id: 2, nome: 'X-BURGER', descricao: 'Pão brioche, hambúrguer artesanal e muito queijo derretido.', preco: '00,00' },
  { id: 3, nome: 'X-BACON', descricao: 'Pão brioche, hambúrguer, queijo, e fatias crocantes de bacon artesanal.', preco: '00,00' },
  { id: 4, nome: 'X-TUDO', descricao: 'Pão brioche, hambúrguer, queijo, bacon, ovo, presunto, alface e tomate.', preco: '00,00' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Preparo': return 'status-preparo';
    case 'Enviado': return 'status-enviado';
    case 'Cancelado': return 'status-cancelado';
    case 'Concluido': return 'status-concluido';
    default: return 'status-default';
  }
};

const Dashboard = () => {

  const quantidadePedidos = pedidos.filter(
    pedido => pedido.status === "Preparo" || pedido.status === "Enviado"
  ).length;

  return (
    <div className="dashboard-container">
      <section className='dashboard-section'>
        <h2>Pedidos</h2>
        <div className='content-container'>
          <h3>{quantidadePedidos} Pedidos em andamento</h3>
          <div className="lista-pedidos">
            {pedidos.map((pedido, index) => (
              <div className="cartao-pedido" key={index}>
                <div className={`etiqueta-status ${getStatusClass(pedido.status)}`}>
                  {pedido.iconeStatus} {pedido.status}
                </div>
                <div className="cartao-pedido-header">
                  <div className="categoria-icons">
                    {pedido.itens.map((item) => item.categoria).includes('Pizza') && <span>🍕</span>}
                    {pedido.itens.map((item) => item.categoria).includes('Lanche') && <span>🍔</span>}
                    {pedido.itens.map((item) => item.categoria).includes('Bebida') && <span>🥤</span>}
                  </div>
                  <span className="id-pedido">{pedido.id}</span>
                </div>
                <div className="lista-itens-pedido">
                  {pedido.itens.map((item, idx) => (
                    <div className="item-pedido" key={idx}>
                      <p className="nome-item"><strong>{item.qtd}x</strong> {item.nome}</p>
                      {item.obs && <p className="obs-item">{item.obs}</p>}
                    </div>
                  ))}
                </div>
                <div className="cartao-pedido-footer">
                  <button className="btn-opcoes">•••</button>
                  <span className="hora-pedido">{pedido.hora}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='dashboard-section'>
        <h2>Produtos</h2>
        <div className='content-container'>
          <Card produtos={produtos} icon={adjustmentBlack} cardColor={"card-yellow"} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard