import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Carrinho.css";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import { atualizarQuantidade, removerProduto, limparCarrinho, setCartItens } from "../../redux/slices/cartSlice";

const Carrinho = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const itens = useSelector((state) => state.cart.itens);
    const total = useSelector((state) => state.cart.total);
    const user = useSelector((state) => state.auth.user);

    const [entregaSelecionada, setEntregaSelecionada] = useState('RETIRADA');
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState('PIX');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const carregarCarrinho = async () => {
            try {
                setLoading(true);
                const carrinho = await cartService.visualizarCarrinho();

                if (carrinho && carrinho.itens) {
                    const itensFormatados = carrinho.itens.map((item) => ({
                        id: item.produtoId,
                        nome: item.produto?.nome || 'Produto',
                        preco: parseFloat(item.precoUnitario || item.produto?.precoBase || 0),
                        quantidade: item.quantidade
                    }));
                    dispatch(setCartItens(itensFormatados));
                }
            } catch (err) {
                console.error('Erro ao carregar carrinho:', err);
            } finally {
                setLoading(false);
            }
        };

        carregarCarrinho();
    }, []);

    const aumentarQuantidade = async (id) => {
        const item = itens.find(i => i.id === id);
        if (item) {
            try {
                await cartService.alterarQuantidade(id, item.quantidade + 1);
                dispatch(atualizarQuantidade({ id, quantidade: item.quantidade + 1 }));
            } catch (err) {
                console.error('Erro ao aumentar quantidade:', err);
            }
        }
    };

    const diminuirQuantidade = async (id) => {
        const item = itens.find(i => i.id === id);
        if (item && item.quantidade > 1) {
            try {
                await cartService.alterarQuantidade(id, item.quantidade - 1);
                dispatch(atualizarQuantidade({ id, quantidade: item.quantidade - 1 }));
            } catch (err) {
                console.error('Erro ao diminuir quantidade:', err);
            }
        }
    };

    const excluirItem = async (id) => {
        try {
            await cartService.removerProduto(id);
            dispatch(removerProduto(id));
        } catch (err) {
            console.error('Erro ao remover produto:', err);
        }
    };

    const finalizarPedido = async () => {
        if (itens.length === 0) {
            alert('Carrinho vazio!');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const pedidoData = {
                items: itens.map(i => ({
                    produtoId: i.id,
                    quantidade: i.quantidade,
                })),
                formaPagamento: pagamentoSelecionado,
                formaRecebimento: entregaSelecionada,
            };

            // Se é delivery, adiciona o endereço
            if (entregaSelecionada === 'DELIVERY') {
                if (!user?.endereco?.id) {
                    setError('Você precisa ter um endereço de entrega cadastrado para escolher a opção delivery.');
                    setLoading(false);
                    return;
                }
                pedidoData.enderecoId = user.endereco.id;
            }
            const carrinho = await cartService.visualizarCarrinho();
            console.log(carrinho);
            await orderService.atualizarPedidoCliente(user.usuarioId, carrinho.id, pedidoData);
            await cartService.finalizarCarrinho(user.usuarioId);

            // Limpa o carrinho
            dispatch(limparCarrinho());
            
            alert('Pedido criado com sucesso!');
        } catch (err) {
            console.error('Erro ao criar pedido:', err);
            setError('Erro ao criar pedido. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="carrinho-container">
            <h1>Carrinho de Compras</h1>
            
            {error && <div style={{ color: 'red', padding: '15px', marginBottom: '15px', backgroundColor: '#ffe0e0' }}>{error}</div>}

            {itens.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
                    <p>Seu carrinho está vazio</p>
                    <button 
                        className="btn-primary"
                        onClick={() => navigate('/')}
                        style={{ marginTop: '20px', maxWidth: '200px' }}
                    >
                        Continuar comprando
                    </button>
                </div>
            ) : (
                <>
                    <div className="tabela-carrinho-wrapper">
                        <div className="tabela-carrinho-header">
                            <div className="coluna-quantidade">Qtd</div>
                            <div className="coluna-item">Item</div>
                            <div className="coluna-valor">Valor Unitário</div>
                            <div className="coluna-subtotal">Subtotal</div>
                            <div className="coluna-excluir">Excluir</div>
                        </div>

                        <div>
                            {itens.map((item) => (
                                <div className="linha-carrinho" key={item.id}>
                                    <div className="coluna-quantidade">
                                        <button className="btn-subtract" onClick={() => diminuirQuantidade(item.id)}>-</button>
                                        {item.quantidade}
                                        <button className="btn-add" onClick={() => aumentarQuantidade(item.id)}>+</button>
                                    </div>
                                    <div className="coluna-item">
                                        {item.nome}
                                    </div>
                                    <div className="coluna-valor">
                                        R$ {item.preco.toFixed(2)}
                                    </div>
                                    <div className="coluna-subtotal">
                                        R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </div>
                                    <div className="coluna-excluir">
                                        <button 
                                            className="btn-delete"
                                            onClick={() => excluirItem(item.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                            <h3>Tipo de Entrega</h3>
                            <div style={{ marginTop: '15px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="entrega" 
                                        value="RETIRADA"
                                        checked={entregaSelecionada === 'RETIRADA'}
                                        onChange={(e) => setEntregaSelecionada(e.target.value)}
                                    />
                                    Retirada na loja
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="entrega" 
                                        value="DELIVERY"
                                        checked={entregaSelecionada === 'DELIVERY'}
                                        onChange={(e) => setEntregaSelecionada(e.target.value)}
                                    />
                                    Entrega em casa
                                </label>
                            </div>
                        </div>

                        <div>
                            <h3>Método de Pagamento</h3>
                            <div style={{ marginTop: '15px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="pagamento" 
                                        value="PIX"
                                        checked={pagamentoSelecionado === 'PIX'}
                                        onChange={(e) => setPagamentoSelecionado(e.target.value)}
                                    />
                                    Pix
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="pagamento" 
                                        value="CARTAO_CREDITO"
                                        checked={pagamentoSelecionado === 'CARTAO_CREDITO'}
                                        onChange={(e) => setPagamentoSelecionado(e.target.value)}
                                    />
                                    Cartão de Crédito
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="pagamento" 
                                        value="CARTAO_DEBITO"
                                        checked={pagamentoSelecionado === 'CARTAO_DEBITO'}
                                        onChange={(e) => setPagamentoSelecionado(e.target.value)}
                                    />
                                    Cartão de Débito
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input 
                                        type="radio" 
                                        name="pagamento" 
                                        value="DINHEIRO"
                                        checked={pagamentoSelecionado === 'DINHEIRO'}
                                        onChange={(e) => setPagamentoSelecionado(e.target.value)}
                                    />
                                    Dinheiro
                                </label>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', textAlign: 'right' }}>
                        <h2>Total: R$ {total.toFixed(2)}</h2>
                        <button 
                            className="btn-primary"
                            onClick={finalizarPedido}
                            
                            style={{ marginTop: '20px', maxWidth: '300px' }}
                        >
                            {loading ? 'Finalizando...' : 'Finalizar Pedido'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Carrinho;

