import { useState } from 'react'

import './GestaoPedidos.css'

const initialPedidos = [
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

const getStatusConfig = (status) => {
    switch (status) {
        case 'Preparo': return { classe: 'status-preparo', icone: '🕒' };
        case 'Enviado': return { classe: 'status-enviado', icone: '🛵' };
        case 'Cancelado': return { classe: 'status-cancelado', icone: '❌' };
        case 'Concluido': return { classe: 'status-concluido', icone: '✅' };
        default: return { classe: '', icone: '' };
    }
};

const GestaoPedidos = () => {
    const [pedidos, setPedidos] = useState(initialPedidos);
    const [openStatusMenuId, setOpenStatusMenuId] = useState(null);

    const toggleStatusMenu = (id) => {
        setOpenStatusMenuId(prev => prev === id ? null : id);
    };

    const selecionarStatus = (id, status) => {
        setPedidos(prev => prev.map(p => p.id === id ? { ...p, status } : p));
        setOpenStatusMenuId(null);
    };

    return (
        <div className="gestao-pedidos-container">
            <h1>Gestão de Pedidos</h1>
            <div className="tabela-pedidos-wrapper">
                <div className="tabela-pedidos-header">
                    <div className="coluna-id">Id</div>
                    <div className="coluna-pedido">Pedido</div>
                    <div className="coluna-endereco">Endereço</div>
                    <div className="coluna-total">Total</div>
                    <div className="coluna-status">Status</div>
                </div>

                <div className="tabela-pedidos-body">
                    {pedidos.map((pedido) => {
                        const config = getStatusConfig(pedido.status);
                        return (
                            <div className="linha-pedido-gestao" key={pedido.id}>

                                <div className="coluna-id conteudo-celula">
                                    {pedido.id}
                                </div>
                                <div className="coluna-pedido conteudo-celula">
                                    {pedido.itens.map((item) => (item.qtd + 'x ' + item.nome + (item.obs ? ` (${item.obs})` : '') + ', ')).join(' ').slice(0, -2)}
                                </div>

                                <div className="coluna-endereco conteudo-celula">
                                    {pedido.endereco}
                                </div>

                                <div className="coluna-total conteudo-celula valor-total-destaque">
                                    R$ {pedido.total}
                                </div>

                                <div className="coluna-status conteudo-celula">
                                    <div className="dropdown-status-container">
                                        <button
                                            type="button"
                                            className={`badge-status-linha ${getStatusConfig(pedido.status).classe}`}
                                            onClick={() => toggleStatusMenu(pedido.id)}
                                        >
                                            {getStatusConfig(pedido.status).icone} {pedido.status}
                                        </button>

                                        {openStatusMenuId === pedido.id && (
                                            <div className="pedidos-categorias">
                                                <button type="button" className="status-preparo" onClick={() => selecionarStatus(pedido.id, 'Preparo')}>🕒 Preparo</button>
                                                <button type="button" className="status-enviado" onClick={() => selecionarStatus(pedido.id, 'Enviado')}>🛵 Enviado</button>
                                                <button type="button" className="status-cancelado" onClick={() => selecionarStatus(pedido.id, 'Cancelado')}>❌ Cancelado</button>
                                                <button type="button" className="status-concluido" onClick={() => selecionarStatus(pedido.id, 'Concluido')}>✅ Concluido</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default GestaoPedidos