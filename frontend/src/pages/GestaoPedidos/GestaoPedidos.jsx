import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './GestaoPedidos.css';
import orderService from '../../services/orderService';

const GestaoPedidos = () => {
  const user = useSelector((state) => state.auth.user);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pedidoExpandido, setPedidoExpandido] = useState(null);
  const [statusExpandido, setStatusExpandido] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    setLoading(true);
    setError('');
    try {
      const dados = await orderService.listarPedidosAdmin();
      setPedidos(dados);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setError('Erro ao carregar seus pedidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

const alterarPedido = async (pedidoId, status) => {

    try {

        await orderService.atualizarStatusPedido(pedidoId, status);

        setPedidos(prev =>
            prev.map(p =>
                p.id === pedidoId
                    ? { ...p, status }
                    : p
            )
        );

        setStatusExpandido(null);

    } catch (err) {
        console.error(err);
    }

};

  const getStatusColor = (status) => {
    const cores = {
      'RECEBIDO': '#ff9800',
      'EM_PREPARO': '#2196f3',
      'SAIU_PARA_ENTREGA': '#4caf50',
      'ENTREGUE': '#8bc34a',
      'CANCELADO': '#f44336'
    };
    return cores[status] || '#999';
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

  const selecionarStatus = (tipo) => {
    setPedidos((prev) => (prev.id === { ...prev, tipo }));
    setMenuCategoriaAberto(false);
  };

const excluirPedido = async (pedidoId) => {
    const confirmar = window.confirm(
        "Tem certeza que deseja excluir este pedido?"
    );

    if (!confirmar) return;

    try {
        console.log(pedidoId);
        await orderService.excluirPedidoAdmin(pedidoId);

        setPedidos((prev) =>
            prev.filter((pedido) => pedido.id !== pedidoId)
        );

        if (pedidoExpandido === pedidoId) {
            setPedidoExpandido(null);
        }

        if (statusExpandido === pedidoId) {
            setStatusExpandido(null);
        }
    } catch (err) {
        console.error(err);
        setError("Erro ao excluir pedido.");
    }
};

  if (loading) {
    return <div className="gestao-pedidos-container"><p>Carregando seus pedidos...</p></div>;
  }

  return (
    <div className="gestao-pedidos-container">
      <h1>Pedidos</h1>

      {error && <div style={{ color: 'red', padding: '15px', marginBottom: '15px', backgroundColor: '#ffe0e0' }}>{error}</div>}

      {pedidos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
          <p>Você ainda não fez nenhum pedido</p>
        </div>
      ) : (
        <div className="pedidos-lista">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-header" onClick={() => setPedidoExpandido(pedidoExpandido === pedido.id ? null : pedido.id)}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                        <h3>Pedido #{pedido.id}</h3>
                        <p style={{ color: '#666', marginTop: '5px' }}>
                            {formatarData(pedido.createdAt)}
                        </p>
                  </div>

                  <div className="excluir-gestao" onClick={(e) => {
                        e.stopPropagation();
                        excluirPedido(pedido.id);
                  }}>
                      <button>🗑️</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                    R$ {Number(pedido.valorTotal).toFixed(2)}
                  </p>
                </div>
        <div
            className="dropdown-status-container"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="btn-status"
                type="button"
                onClick={() =>
                    setStatusExpandido(
                        statusExpandido === pedido.id ? null : pedido.id
                    )
                }
                style={{
                    backgroundColor: getStatusColor(pedido.status)
                }}
            >
                {pedido.status} ▼
            </button>

            {statusExpandido === pedido.id && (
                <div className="pedidos-categorias">
                    <button onClick={() => alterarPedido(pedido.id, "RECEBIDO")}
                        style={{
                            backgroundColor: getStatusColor("RECEBIDO")
                        }}    
                    >RECEBIDO
                    </button>

                    <button onClick={() => alterarPedido(pedido.id, "EM_PREPARO")}
                        style={{
                            backgroundColor: getStatusColor("EM_PREPARO")
                        }}    
                    >EM PREPARO
                    </button>

                    <button onClick={() => alterarPedido(pedido.id, "SAIU_PARA_ENTREGA")}
                        style={{
                            backgroundColor: getStatusColor("SAIU_PARA_ENTREGA")
                        }}    
                    >SAIU PARA ENTREGA
                    </button>

                    <button onClick={() => alterarPedido(pedido.id, "ENTREGUE")}
                        style={{
                            backgroundColor: getStatusColor("ENTREGUE")
                        }}    
                    >ENTREGUE
                    </button>

                    <button onClick={() => alterarPedido(pedido.id, "CANCELADO")}
                        style={{
                            backgroundColor: getStatusColor("CANCELADO")
                        }}    
                    >CANCELADO
                    </button>
                </div>
            )}
        </div>
        </div>

              {pedidoExpandido === pedido.id && (
                <div className="pedido-detalhes">
                  <h4>Itens do Pedido:</h4>
                  <div>
                    {pedido.itens && pedido.itens.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pedido.itens.map((item, idx) => (
                          <li key={idx} style={{ padding: '8px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.produto?.nome} x {item.quantidade}</span>
                            <span style={{ fontWeight: 'bold' }}>R$ {(item.subtotal)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Sem itens</p>
                    )}
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
                    <p><strong>Forma de Recebimento:</strong> {pedido.formaRecebimento}</p>
                    <p><strong>Forma de Pagamento:</strong> {pedido.formaPagamento}</p>
                    {pedido.formaRecebimento === 'DELIVERY' && (
                      <>
                        <p><strong>Taxa de Entrega:</strong> R$ {Number(pedido.taxaEntrega || 0).toFixed(2)}</p>
                        {pedido.endereco && (
                          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                            <p><strong>Endereço de Entrega:</strong></p>
                            <p>{pedido.endereco.rua}, {pedido.endereco.numero} - {pedido.endereco.bairro}</p>
                            <p>{pedido.endereco.cidade}, {pedido.endereco.estado} {pedido.endereco.cep}</p>
                            {pedido.endereco.complemento && <p>Complemento: {pedido.endereco.complemento}</p>}
                            {pedido.endereco.pontoReferencia && <p>Referência: {pedido.endereco.pontoReferencia}</p>}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GestaoPedidos;