import { useState } from 'react';
import './GestaoProdutos.css';

const GestaoProdutos = () => {

  
  const [produtos, setProdutos] = useState([
    { id: '1', nome: 'Fritas', valor: '25,00', tipo: 'Porção', tipoClasse: 'tipo-porcao', visibilidade: 'Visível', visClasse: 'vis-visivel', desc: 'Porção de fritas' },
    { id: '2', nome: 'X-Bacon', valor: '30,00', tipo: 'Burguer', tipoClasse: 'tipo-burguer', visibilidade: 'Invisível', visClasse: 'vis-invisivel', desc: 'Pão, carne, queijo e bacon' },
    { id: '3', nome: 'Calabresa', valor: '45,00', tipo: 'Pizza', tipoClasse: 'tipo-pizza', visibilidade: 'Invisível', visClasse: 'vis-invisivel', desc: 'Massa, queijo e calabresa' },
    { id: '4', nome: 'Portuguesa', valor: '50,00', tipo: 'Pizza', tipoClasse: 'tipo-pizza', visibilidade: 'Visível', visClasse: 'vis-visivel', desc: 'Massa, presunto, ovos' },
    { id: '5', nome: 'Coca-Cola', valor: '8,00', tipo: 'Bebida', tipoClasse: 'tipo-bebida', visibilidade: 'Visível', visClasse: 'vis-visivel', desc: 'Lata 350ml' },
  ]);

  const [modoAtual, setModoAtual] = useState('visualizar'); // 'visualizar', 'editar', 'excluir'
  const [menuCategoriaAberto, setMenuCategoriaAberto] = useState(false);
  
  // Estado do formulário
  const [novoProduto, setNovoProduto] = useState({
    nome: '', valor: '', descricao: '', visibilidade: 'Invisível', tipo: 'Pizza'
  });

  // Alterna o modo da tabela
  const toggleModo = (modo) => {
    setModoAtual(modoAtual === modo ? 'visualizar' : modo);
  };

  // Edita um campo específico de um produto
  const handleEditProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  };

  // Exclui um produto (se estiver no modo excluir)
  const handleDeleteProduto = (id) => {
    if (modoAtual === 'excluir') {
      if(window.confirm('Tem certeza que deseja excluir este produto?')) {
        setProdutos(produtos.filter(p => p.id !== id));
      }
    }
  };

  // Alterna a visibilidade no formulário
  const toggleVisibilidadeForm = (id) => {
    if (!id) {
      setNovoProduto(prev => ({
        ...prev,
        visibilidade: prev.visibilidade === 'Visível' ? 'Invisível' : 'Visível'
      }));
    } else {
      setProdutos(produtos.map(p => p.id === id ? { ...p, visibilidade: p.visibilidade === 'Visível' ? 'Invisível' : 'Visível'} : p));
    }
  };

  // Seleciona a categoria e fecha o menu
  const selecionarCategoria = (tipo) => {
    setNovoProduto(prev => ({ ...prev, tipo }));
    setMenuCategoriaAberto(false);
  };

  const getCategoriaEstilo = (tipo) => {
    switch(tipo) {
      case 'Pizza': return { classe: 'tipo-pizza', icone: '🍕' };
      case 'Burguer': return { classe: 'tipo-burguer', icone: '🍔' };
      case 'Porção': return { classe: 'tipo-porcao', icone: '🍟' };
      case 'Bebida': return { classe: 'tipo-bebida', icone: '🥤' };
      default: return { classe: '', icone: '' };
    }
  };

  return (
    <div className="gestao-container">
        <h1 className="titulo-pagina">Gestão de Produtos</h1>

        <div className="gestao-conteudo">
          
          {/* Painel Esquerdo */}
          <section className="painel-tabela">
            <div className="tabela-acoes">
              <div className="botoes-acao">
                <button className={`btn-icone ${modoAtual === 'editar' ? 'ativo-editar' : ''}`}
                   onClick={() => toggleModo('editar')}
                   title="Editar">✏️
                </button>
                <button className={`btn-icone ${modoAtual === 'excluir' ? 'ativo-excluir' : ''}`}
                 onClick={() => toggleModo('excluir')}
                 title="Excluir">🗑️</button>
              </div>
            </div>

            <div className="tabela-container">
              <table className={`tabela-produtos ${modoAtual === 'excluir' ? 'modo-exclusao' : ''}`}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Visibilidade</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((prod, index) => (
                    <tr key={prod.id}
                      onClick={() => handleDeleteProduto(prod.id)}
                      className={modoAtual === 'excluir' ? 'linha-clicavel' : ''}
                    >
                      <td>{prod.id}</td>
                      <td>
                        {modoAtual === 'editar' ? (
                          <input type="text" className="input-tabela" value={prod.nome} onChange={(e) => handleEditProduto(prod.id, 'nome', e.target.value)} />
                        ) : prod.nome}
                      </td>
                      <td>
                        {modoAtual === 'editar' ? (
                          <input type="text" className="input-tabela" value={prod.valor} onChange={(e) => handleEditProduto(prod.id, 'valor', e.target.value)} />
                        ) : prod.valor}
                      </td>
                      <td>
                        <span className={`badge ${getCategoriaEstilo(prod.tipo).classe}`}>
                          {getCategoriaEstilo(prod.tipo).icone}
                          {prod.tipo}
                        </span>
                      </td>
                      <td>
                        {modoAtual === 'editar' ? (
                          <button
                            type="button"
                            className={`btn-seletor ${prod.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`}
                            onClick={() => toggleVisibilidadeForm(prod.id)}
                          >
                            {prod.visibilidade === 'Visível' ? '👁️ Visível' : '🙈 Invisível'}
                          </button>
                        ) : (
                          <span className={`badge ${prod.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`}>
                            {prod.visibilidade === 'Visível' ? '👁️ ' : '🙈 '} {prod.visibilidade}
                          </span>
                        )}
                      </td>
                      <td>
                        {modoAtual === 'editar' ? (
                          <input type="text" className="input-tabela" value={prod.desc} onChange={(e) => handleEditProduto(prod.id, 'desc', e.target.value)} />
                        ) : prod.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Painel Direito */}
          <aside className="painel-formulario">
            <h2>Adicionar Produto</h2>
            
            <form className="form-adicionar">
              <div className="input-grupo-gestao">
                <label>Nome</label>
                <input type="text" placeholder="Digite o nome" />
              </div>

              <div className="input-grupo-gestao">
                <label>Valor</label>
                <input type="text" placeholder="Digite o valor" />
              </div>

              <div className="input-grupo-gestao">
                <label>Descrição</label>
                <textarea rows="4" placeholder="Descreva o produto"></textarea>
              </div>

              <div className="seletores-rapidos">
              <button
                type="button"
                className={`btn-seletor ${novoProduto.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`}
                onClick={() => toggleVisibilidadeForm(null)}
              >
                {novoProduto.visibilidade === 'Visível' ? '👁️ Visível' : '🙈 Invisível'}
              </button>
              <div className="dropdown-categoria-container">
                <button
                  type="button"
                  className={`btn-seletor ${getCategoriaEstilo(novoProduto.tipo).classe}`}
                  onClick={() => setMenuCategoriaAberto(!menuCategoriaAberto)}
                >
                  {getCategoriaEstilo(novoProduto.tipo).icone} {novoProduto.tipo}
                </button>

                {menuCategoriaAberto && (
                  <div className="menu-categorias">
                    <button type="button" className="tipo-pizza" onClick={() => selecionarCategoria('Pizza')}>🍕 Pizza</button>
                    <button type="button" className="tipo-burguer" onClick={() => selecionarCategoria('Burguer')}>🍔 Burguer</button>
                    <button type="button" className="tipo-porcao" onClick={() => selecionarCategoria('Porção')}>🍟 Porção</button>
                    <button type="button" className="tipo-bebida" onClick={() => selecionarCategoria('Bebida')}>🥤 Bebida</button>
                  </div>
                )}
              </div>
              </div>

              <button type="submit" className="btn-adicionar-produto">
                Adicionar
              </button>
            </form>
          </aside>

        </div>
    </div>
  );
};
export default GestaoProdutos;