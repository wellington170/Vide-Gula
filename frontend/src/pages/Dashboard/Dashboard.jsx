import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css'
import Card from '../../components/Card'
import adjustmentBlack from '../../images/adjustment-black.png'

import orderService from '../../services/orderService';
import productService from '../../services/productService';


const Dashboard = () => {

  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

useEffect(() => {
    carregarDashboard();
}, []);

const carregarDashboard = async () => {
    try {
        setLoading(true);

        const pedidosApi = await orderService.listarPedidosAdmin();
        const produtosApi = await productService.listarCardapio();

        setPedidos(pedidosApi || []);

        setProdutos(
            (produtosApi || []).map(produto => ({
                ...produto,
                preco: Number(produto.precoBase ?? produto.preco ?? 0)
            }))
        );

        setError("");

    } catch (err) {
        console.error(err);
        setError("Erro ao carregar dashboard.");
    } finally {
        setLoading(false);
    }
};

  const getStatusClass = (status) => {
    switch (status) {
      case 'EM_PREPARO': return 'status-preparo';
      case 'RECEBIDO': return 'status-recebido';
      case 'SAIU_PARA_ENTREGA': return 'status-saiu-entrega';
      case 'ENTREGUE': return 'status-entregue';
      case 'CANCELADO': return 'status-cancelado';
      default: return 'status-default';
    }
  };

    const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (user?.perfil !== 'ADMINISTRADOR') {
    return (
      <div className="dashboard-container">
        <h1>Acesso Negado</h1>
        <p>Esta seção está disponível apenas para administradores.</p>
      </div>
    );
  }

  const quantidadePedidos = pedidos.filter(pedido =>
    ["RECEBIDO", "EM_PREPARO", "SAIU_PARA_ENTREGA"].includes(pedido.status)
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
                  {pedido.status}
                </div>
                <div className="cartao-pedido-header">
                  <div className="categoria-icons">
                    {pedido.itens.map((item) => item.produto.tipo).includes('PIZZA') && <span>🍕</span>}
                    {pedido.itens.map((item) => item.produto.tipo).includes('LANCHE') && <span>🍔</span>}
                    {pedido.itens.map((item) => item.produto.tipo).includes('BEBIDA') && <span>🥤</span>}
                    {pedido.itens.map((item) => item.produto.tipo).includes('PORCAO') && <span>🍟</span>}
                  </div>
                  <span className="id-pedido">{pedido.id}</span>
                </div>
                <div className="lista-itens-pedido">
                  {pedido.itens.map((item, idx) => (
                    <div className="item-pedido" key={idx}>
                      <p className="nome-item"><strong>{item.quantidade}x</strong> {item.produto.nome}</p>
                      {item.observacao && <p className="obs-item">{item.observacao}</p>}
                    </div>
                  ))}
                </div>
                <div className="cartao-pedido-footer">
                  <button className="btn-opcoes" onClick={() => navigate('/pedidos')}>
                    •••
                  </button>
                  <span className="hora-pedido">{formatarData(pedido.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='dashboard-section'>
        <h2>Produtos</h2>
        <div className='content-container'>
          <Card produtos={produtos} icon={null} cardColor={"card-yellow"} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard