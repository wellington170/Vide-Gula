import React from 'react'

import './AcompanharPedido.css'

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

const AcompanharPedido = () => {

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Preparo': return { classe: 'status-preparo', icone: '🕒' };
            case 'Enviado': return { classe: 'status-enviado', icone: '🛵' };
            case 'Cancelado': return { classe: 'status-cancelado', icone: '❌' };
            case 'Concluido': return { classe: 'status-concluido', icone: '✅' };
            default: return { classe: '', icone: '' };
        }
    };

  return (
    <div className='acompanhar-container'>
        <h1>Pedido em andamento</h1>
        <div className='info-pedido'>
            <div className='info-container'>
                <span>Detalhes</span>
                <div className='info-content'>
                    <div className='info-detalhes'>
                        <span>Itens</span>
                        <p>SUAOSHDOADJAI</p>
                    </div>
                    <div className='info-detalhes'>
                        <span>Entrega</span>
                        <p>SUAOSHDOADJAI</p>
                    </div>
                    <div className='info-detalhes'>
                        <span>Observações</span>
                        <p>SUAOSHDOADJAI</p>
                    </div>
                    <div className='info-detalhes'>
                        <strong>Pagamento</strong>
                        <strong>SUAOSHDOADJAI</strong>
                    </div>
                </div>
            </div>
            <div className='info-container'>
                <span>Status</span>
                <div className='info-content'>
                    <strong>Pedido recebido, logo seu pedido será entregue</strong>
                    <span>Previsão de entrega: 30-45 minutos</span>
                </div>
            </div>
        </div>

        <h1>Histórico</h1>
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
                {initialPedidos.map((pedido, index) => (
                    <div key={index} className='linha-acompanhar'>
                        <div className='coluna-data conteudo-celula-acompanhar'>{pedido.id}</div>
                        <div className='coluna-itens conteudo-celula-acompanhar'>
                            {pedido.itens.map((item) => (item.qtd + 'x ' + item.nome + ', ')).join(' ').slice(0, -2)}
                        </div>
                        <div className='coluna-subtotal conteudo-celula-acompanhar'>R$ 20,00</div>
                        <div className='coluna-entrega conteudo-celula-acompanhar'>R$ 10,00</div>
                        <div className='coluna-total conteudo-celula-acompanhar'>R$ 30,00</div>
                        <div className={'coluna-status-acompanhar conteudo-celula-acompanhar' }>
                            <div className={getStatusConfig(pedido.status).classe + ' badge-status'}>
                                {getStatusConfig(pedido.status).icone} {pedido.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>


    </div>
  )
}

export default AcompanharPedido