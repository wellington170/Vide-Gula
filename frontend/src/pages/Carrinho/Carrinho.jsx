import { useState } from "react";
import "./Carrinho.css";

const Carrinho = () => {
    const [itens, setItens] = useState([
        {
            id: 1,
            quantidade: 1,
            nome: "Pizza Portuguesa",
            valor: 50.0,
        },
        {
            id: 2,
            quantidade: 2,
            nome: "X-Bacon",
            valor: 32.0,
        },
        {
            id: 3,
            quantidade: 1,
            nome: "Coca-Cola 2L",
            valor: 12.0,
        },
    ]);

    const [entregaSelecionada, setEntregaSelecionada] = useState('Retirada');
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState('Pix');

    const aumentarQuantidade = (id) => {
        setItens((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
        );
    };

    const diminuirQuantidade = (id) => {
        setItens((prev) =>
            prev.map((item) =>
                item.id === id && item.quantidade > 1
                    ? { ...item, quantidade: item.quantidade - 1 }
                    : item
            )
        );
    };

    const excluirItem = (id) => {
        setItens((prev) => prev.filter((item) => item.id !== id));
    };

    const total = itens.reduce(
        (acc, item) => acc + item.valor * item.quantidade,
        0
    );

    return (
        <div className="carrinho-container">
            <h1>Carrinho de Compras</h1>
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
                                R$ {item.valor.toFixed(2)}
                            </div>
                            <div className="coluna-subtotal">
                                R$ {(item.valor * item.quantidade).toFixed(2)}
                            </div>
                            <div className="coluna-excluir">
                                <button className="btn-delete" onClick={() => excluirItem(item.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="carrinho-footer">
                <div className="opcoes-carrinho">
                    <div className="opcoes">
                        <h2>Entrega</h2>
                        <button
                            className={`opcao ${entregaSelecionada === 'Retirada' ? 'opcao-selecionada' : ''}`}
                            type="button"
                            onClick={() => setEntregaSelecionada('Retirada')}
                        >Retirada</button>
                        <button
                            className={`opcao ${entregaSelecionada === 'Endereço' ? 'opcao-selecionada' : ''}`}
                            type="button"
                            onClick={() => setEntregaSelecionada('Endereço')}
                        >Endereço</button>
                    </div>
                    <div className="opcoes">
                        <h2>Pagamento</h2>
                        <button
                            className={`opcao ${pagamentoSelecionado === 'Pix' ? 'opcao-selecionada' : ''}`}
                            type="button"
                            onClick={() => setPagamentoSelecionado('Pix')}
                        >Pix</button>
                        <button
                            className={`opcao ${pagamentoSelecionado === 'Dinheiro' ? 'opcao-selecionada' : ''}`}
                            type="button"
                            onClick={() => setPagamentoSelecionado('Dinheiro')}
                        >Dinheiro</button>
                        <button
                            className={`opcao ${pagamentoSelecionado === 'Cartão' ? 'opcao-selecionada' : ''}`}
                            type="button"
                            onClick={() => setPagamentoSelecionado('Cartão')}
                        >Cartão</button>
                    </div>
                </div>
                
                <div className="valor-total">
                    <h2>Valor Total: R$ {total.toFixed(2)}</h2>
                    <button className="btn-finalizar" onClick={() => alert('Compra finalizada!')}>
                        Finalizar Compra
                    </button>
                </div>
            </div>

        </div>

    );
};

export default Carrinho;