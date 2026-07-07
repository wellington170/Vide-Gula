import { useState, useEffect } from 'react';
import orderService from '../../services/orderService';
import './AcompanharPedido.css';

const statusConfig = {
  RECEBIDO: { texto: 'Recebido', icone: '📥', classe: 'status-recebido' },
  EM_PREPARO: { texto: 'Em preparo', icone: '🕒', classe: 'status-preparo' },
  SAIU_PARA_ENTREGA: { texto: 'Saiu para entrega', icone: '🛵', classe: 'status-enviado' },
  ENTREGUE: { texto: 'Entregue', icone: '✅', classe: 'status-concluido' },
  CANCELADO: { texto: 'Cancelado', icone: '❌', classe: 'status-cancelado' }
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

const AcompanharPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    setLoading(true);
    setError('');
    try {
      const dados = await orderService.listarPedidosCliente();
      setPedidos(dados);
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Erro ao carregar pedidos.');
    } finally {
      setLoading(false);
    }
  };

const cancelarPedido = async (pedidoId) => {
    const confirmar = window.confirm(
        "Tem certeza que deseja cancelar este pedido?"
    );

    if (!confirmar) return;

    try {
        console.log(pedidoId);
        await orderService.cancelarPedidoCliente(pedidoId);

        buscarPedidos();
    } catch (err) {
        console.error(err);
        setError("Erro ao excluir pedido.");
    }
};

  return (
    <div className='acompanhar-container'>
      <h1>Acompanhar Pedido</h1>

      {error && <div className='erro-mensagem'>{error}</div>}

      {loading ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Você ainda não tem pedidos para acompanhar.</p>
        </div>
      ) : (
        <div className='tabela-acompanhar-wrapper'>
          <div className='tabela-acompanhar-header'>
            <div className='coluna-data'>Data</div>
            <div className='coluna-itens'>Itens</div>
            <div className='coluna-subtotal'>Subtotal</div>
            <div className='coluna-entrega'>Entrega</div>
            <div className='coluna-total'>Total</div>
            <div className='coluna-status-acompanhar'>Status</div>
          </div>
          <div>
            {pedidos.map((pedido) => {
                console.log(pedido.id, pedido.status);
              const status = statusConfig[pedido.status] || { texto: pedido.status, icone: 'ℹ️', classe: 'status-default' };
              const itensText = pedido.itens?.map((item) => `${item.quantidade}x ${item.produto?.nome || 'Produto'}`).join(', ');
              return (
                <div key={pedido.id} className='linha-acompanhar'>
                  <div className='coluna-data conteudo-celula-acompanhar'>{formatarData(pedido.createdAt)}</div>
                  <div className='coluna-itens conteudo-celula-acompanhar'>{itensText}</div>
                  <div className='coluna-subtotal conteudo-celula-acompanhar'>R$ {Number(pedido.valorTotal - (pedido.taxaEntrega || 0)).toFixed(2)}</div>
                  <div className='coluna-entrega conteudo-celula-acompanhar'>R$ {Number(pedido.taxaEntrega || 0).toFixed(2)}</div>
                  <div className='coluna-total conteudo-celula-acompanhar'>R$ {Number(pedido.valorTotal).toFixed(2)}</div>
                  <div className='coluna-status-acompanhar conteudo-celula-acompanhar'>
                    <div className={`${status.classe} badge-status`}>
                      {status.icone} {status.texto}
                    </div>
                    <div className="btn-excluir-acompanhar">
                        <button onClick={() => cancelarPedido(pedido.id)}>✖️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcompanharPedido