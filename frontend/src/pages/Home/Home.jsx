import React, { useState, useEffect } from 'react';
import './Home.css';

import onda from '../../images/onda_home.png';
import addWhite from '../../images/add-white.png';
import addBlack from '../../images/add-black.png';
import Card from '../../components/Card';
import productService from '../../services/productService';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const dados = await productService.listarCardapio();
      setProdutos(dados);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const pizzas = produtos.filter(p => p.tipo?.toUpperCase() === 'PIZZA') || [];
  const lanches = produtos.filter(p => p.tipo?.toUpperCase() === 'LANCHE') || [];
  const bebidas = produtos.filter(p => p.tipo?.toUpperCase() === 'BEBIDA') || [];
  const porcoes = produtos.filter(p => p.tipo?.toUpperCase() === 'PORCAO') || [];

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px' }}>Carregando produtos...</div>;
  }

  return (
    <div className="home-container">
      {error && <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>{error}</div>}
      
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
        {pizzas.length > 0 && (
          <section className="menu-section">
            <h2>Pizzas <span className="title-icon">🍕</span></h2>
            <Card produtos={pizzas} icon={addBlack} cardColor="card-yellow" />
          </section>
        )}

        {/* Menu de lanches */}
        <section className="menu-section">
          <h2>Lanches <span className="title-icon">🍔</span></h2>
          <Card produtos={lanches} icon={addWhite} cardColor="card-red" />
        </section>

        {/* Menu de bebidas */}
        <section className="menu-section">
          <h2>Bebidas <span className="title-icon">🥤</span></h2>
          <Card produtos={bebidas} icon={addBlack} cardColor="card-yellow" />
        </section>

        {/* Menu de porcoes */}
        <section className="menu-section">
          <h2>Porções <span className="title-icon">🍟</span></h2>
          <Card produtos={porcoes} icon={addWhite} cardColor="card-red" />
        </section>
    </div>
  );
};

export default Home;