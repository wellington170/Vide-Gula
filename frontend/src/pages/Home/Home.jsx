import React from 'react';

import './Home.css';

import onda from '../../images/onda_home.png';
import addWhite from '../../images/add-white.png';
import addBlack from '../../images/add-black.png';
import Card from '../../components/Card';

const Home = () => {
  // Dados de exemplo para renderizar os cards dinamicamente
  const pizzas = [
    { id: 1, nome: 'FRANGO COM CATUPIRY', descricao: 'Combina massa macia, suculento peito de frango desfiado temperado e a cremosidade inconfundível do requeijão.', preco: '00,00' },
    { id: 2, nome: 'CALABRESA', descricao: 'Combina massa macia, suculenta calabresa fatiada, cebola e a cremosidade inconfundível do queijo.', preco: '00,00' },
    { id: 3, nome: 'PORTUGUESA', descricao: 'Combina massa macia, presunto, ovos, cebola, ervilha e a cremosidade inconfundível da mussarela.', preco: '00,00' },
    { id: 4, nome: 'QUATRO QUEIJOS', descricao: 'Combina massa macia, suculento mix de queijos provolone, parmesão, gorgonzola e mussarela.', preco: '00,00' },
  ];

  const burguers = [
    { id: 1, nome: 'X-SALADA', descricao: 'Pão brioche, hambúrguer artesanal, queijo, alface, tomate e maionese especial da casa.', preco: '00,00' },
    { id: 2, nome: 'X-BURGER', descricao: 'Pão brioche, hambúrguer artesanal e muito queijo derretido.', preco: '00,00' },
    { id: 3, nome: 'X-BACON', descricao: 'Pão brioche, hambúrguer, queijo, e fatias crocantes de bacon artesanal.', preco: '00,00' },
    { id: 4, nome: 'X-TUDO', descricao: 'Pão brioche, hambúrguer, queijo, bacon, ovo, presunto, alface e tomate.', preco: '00,00' },
  ];

  return (
    <div className="home-container">
      
        <section className="home-section">
          <h1>
            Sua <span className="highlight">PRÓXIMA REFEIÇÃO</span> favorita está<br/>
            a <span className="highlight">POUCOS CLIQUES</span> de distância
          </h1>
          <p>
            A Vide Gula Lanches E Pizzas Agora Está Online Para Facilitar Seus Pedidos.
            Navegue Pelo Cardápio, Personalize Seus Produtos Favoritos E Escolha Entre
            Receber Em Casa Ou Retirar Na Loja. Tudo Pensado Para Tornar Sua Experiência
            Mais Rápida E Saborosa.
          </p>
        </section>

        <section className="category-circles-container">
          <div className="onda-container">
            <img src={onda} alt="Linha ondulada" className="onda" />
          </div>
          
          <div className="category-circles">
            <button className="circle-btn"><span className="icon-placeholder">🍕</span></button>
            <button className="circle-btn"><span className="icon-placeholder">🍔</span></button>
            <button className="circle-btn"><span className="icon-placeholder">🥤</span></button>
            <button className="circle-btn"><span className="icon-placeholder">🍟</span></button>
          </div>
        </section>

        {/* Menu de pizzas */}
        <section className="menu-section">
          <h2>Pizzas <span className="title-icon">🍕</span></h2>
          <Card produtos={pizzas} icon={addBlack} cardColor="card-yellow" />
        </section>

        {/* Menu de burguers */}
        <section className="menu-section">
          <h2>Burguers <span className="title-icon">🍔</span></h2>
          <Card produtos={burguers} icon={addWhite} cardColor="card-red" />
        </section>
    </div>
  );
};

export default Home;