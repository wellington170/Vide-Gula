import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './GestaoProdutos.css';
import productService from '../../services/productService';
import defaultImage from '../../images/default.jpg';

const GestaoProdutos = () => {
  const user = useSelector((state) => state.auth.user);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modoAtual, setModoAtual] = useState('visualizar');
  const [menuCategoriaAberto, setMenuCategoriaAberto] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    tipo: 'PIZZA',
    precoBase: '',
    visibilidade: 'Visível',
    ativo: true,
    disponivel: true,
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setLoading(true);
    setError('');
    try {
      const dados = await productService.listarProdutosAdmin();
      setProdutos(dados.map((produto) => ({
        ...produto,
        desc: produto.descricao || '',
      })));
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const toggleModo = (modo) => {
    setModoAtual(modoAtual === modo ? 'visualizar' : modo);
  };

  const handleEditProduto = (id, campo, valor) => {
    setProdutos((prev) => prev.map((produto) => (
      produto.id === id ? { ...produto, [campo]: valor } : produto
    )));
  };

  const handleSaveProduto = async (produto) => {
    try {
      const updates = {
        nome: produto.nome,
        descricao: produto.desc,
        tipo: produto.tipo.toUpperCase(),
        precoBase: Number(produto.preco),
        ativo: produto.visibilidade === 'Visível',
        disponivel: produto.visibilidade === 'Visível'
      };
      await productService.atualizarProduto(produto.id, updates);
      await carregarProdutos();
      alert('Produto atualizado com sucesso.');
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Erro ao atualizar produto');
    }
  };

  const handleDeleteProduto = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      await productService.excluirProduto(id);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
      alert('Produto excluído com sucesso.');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Erro ao excluir produto');
    }
  };

  const toggleVisibilidadeForm = (id) => {
    if (!id) {
      setNovoProduto((prev) => ({
        ...prev,
        visibilidade: prev.visibilidade === 'Visível' ? 'Invisível' : 'Visível',
        ativo: prev.visibilidade !== 'Visível',
        disponivel: prev.visibilidade !== 'Visível'
      }));
      return;
    }

    setProdutos((prev) => prev.map((produto) => (
      produto.id === id
        ? {
            ...produto,
            visibilidade: produto.visibilidade === 'Visível' ? 'Invisível' : 'Visível',
            ativo: produto.visibilidade !== 'Visível',
            disponivel: produto.visibilidade !== 'Visível'
          }
        : produto
    )));
  };

  const selecionarCategoria = (tipo) => {
    setNovoProduto((prev) => ({ ...prev, tipo }));
    setMenuCategoriaAberto(false);
  };

  const handleNovoProdutoChange = (campo, valor) => {
    setNovoProduto((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAdicionarProduto = async (e) => {
    e.preventDefault();
    setError('');

    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.precoBase) {
      setError('Nome, descrição e valor são obrigatórios.');
      return;
    }

    try {
      await productService.cadastrarProduto({
        nome: novoProduto.nome,
        descricao: novoProduto.descricao,
        tipo: novoProduto.tipo,
        precoBase: Number(novoProduto.precoBase),
        imagem: defaultImage,
        ativo: novoProduto.visibilidade === 'Visível',
        disponivel: novoProduto.visibilidade === 'Visível'
      });
      setNovoProduto({
        nome: '',
        descricao: '',
        tipo: 'PIZZA',
        precoBase: '',
        visibilidade: 'Visível',
        ativo: true,
        disponivel: true,
      });
      await carregarProdutos();
      alert('Produto adicionado com sucesso.');
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Erro ao cadastrar produto');
    }
  };

  const getCategoriaEstilo = (tipo) => {
    switch (tipo) {
      case 'PIZZA': return { classe: 'tipo-pizza', icone: '🍕' };
      case 'LANCHE': return { classe: 'tipo-burguer', icone: '🍔' };
      case 'PORCAO': return { classe: 'tipo-porcao', icone: '🍟' };
      case 'BEBIDA': return { classe: 'tipo-bebida', icone: '🥤' };
      default: return { classe: '', icone: '' };
    }
  };

  if (user?.perfil !== 'ADMINISTRADOR') {
    return (
      <div className="gestao-container">
        <h1 className="titulo-pagina">Acesso Negado</h1>
        <p>Esta seção está disponível apenas para administradores.</p>
      </div>
    );
  }

  return (
    <div className="gestao-container">
      <h1 className="titulo-pagina">Gestão de Produtos</h1>

      {error && <div className="erro-mensagem">{error}</div>}

      <div className="gestao-conteudo">
        <section className="painel-tabela">
          <div className="tabela-acoes">
            <div className="botoes-acao">
              <button className={`btn-icone ${modoAtual === 'editar' ? 'ativo-editar' : ''}`} onClick={() => toggleModo('editar')} title="Editar">✏️</button>
              <button className={`btn-icone ${modoAtual === 'excluir' ? 'ativo-excluir' : ''}`} onClick={() => toggleModo('excluir')} title="Excluir">🗑️</button>
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
                  {modoAtual === 'editar' && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {produtos.map((prod) => (
                  <tr key={prod.id} className={modoAtual === 'excluir' ? 'linha-clicavel' : ''}>
                    <td>{prod.id}</td>
                    <td>
                      {modoAtual === 'editar' ? (
                        <input type="text" className="input-tabela" value={prod.nome} onChange={(e) => handleEditProduto(prod.id, 'nome', e.target.value)} />
                      ) : prod.nome}
                    </td>
                    <td>
                      {modoAtual === 'editar' ? (
                        <input type="number" className="input-tabela" value={prod.preco} onChange={(e) => handleEditProduto(prod.id, 'preco', e.target.value)} />
                      ) : `R$ ${Number(prod.preco).toFixed(2)}`}
                    </td>
                    <td>
                      <span className={`badge ${getCategoriaEstilo(prod.tipo).classe}`}>
                        {getCategoriaEstilo(prod.tipo).icone} {prod.tipo}
                      </span>
                    </td>
                    <td>
                      {modoAtual === 'editar' ? (
                        <button type="button" className={`btn-seletor ${prod.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`} onClick={() => toggleVisibilidadeForm(prod.id)}>
                          {prod.visibilidade === 'Visível' ? '👁️ Visível' : '🙈 Invisível'}
                        </button>
                      ) : (
                        <span className={`badge ${prod.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`}>
                          {prod.visibilidade}
                        </span>
                      )}
                    </td>
                    <td>
                      {modoAtual === 'editar' ? (
                        <input type="text" className="input-tabela" value={prod.desc} onChange={(e) => handleEditProduto(prod.id, 'desc', e.target.value)} />
                      ) : prod.desc}
                    </td>
                    {modoAtual === 'editar' && (
                      <td>
                        <button type="button" className="btn-salvar" onClick={() => handleSaveProduto(prod)}>
                          Salvar
                        </button>
                      </td>
                    )}
                    {modoAtual === 'excluir' && (
                      <td>
                        <button type="button" className="btn-excluir" onClick={() => handleDeleteProduto(prod.id)}>
                          Excluir
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="painel-formulario">
          <h2>Adicionar Produto</h2>
          <form className="form-adicionar" onSubmit={handleAdicionarProduto}>
            <div className="input-grupo-gestao">
              <label>Nome</label>
              <input type="text" value={novoProduto.nome} onChange={(e) => handleNovoProdutoChange('nome', e.target.value)} placeholder="Digite o nome" />
            </div>

            <div className="input-grupo-gestao">
              <label>Valor</label>
              <input type="number" step="0.01" value={novoProduto.precoBase} onChange={(e) => handleNovoProdutoChange('precoBase', e.target.value)} placeholder="Digite o valor" />
            </div>

            <div className="input-grupo-gestao">
              <label>Descrição</label>
              <textarea rows="4" value={novoProduto.descricao} onChange={(e) => handleNovoProdutoChange('descricao', e.target.value)} placeholder="Descreva o produto"></textarea>
            </div>

            <div className="seletores-rapidos">
              <button type="button" className={`btn-seletor ${novoProduto.visibilidade === 'Visível' ? 'vis-visivel' : 'vis-invisivel'}`} onClick={() => toggleVisibilidadeForm(null)}>
                {novoProduto.visibilidade === 'Visível' ? '👁️ Visível' : '🙈 Invisível'}
              </button>
              <div className="dropdown-categoria-container">
                <button type="button" className={`btn-seletor ${getCategoriaEstilo(novoProduto.tipo).classe}`} onClick={() => setMenuCategoriaAberto(!menuCategoriaAberto)}>
                  {getCategoriaEstilo(novoProduto.tipo).icone} {novoProduto.tipo}
                </button>

                {menuCategoriaAberto && (
                  <div className="menu-categorias">
                    <button type="button" className="tipo-pizza" onClick={() => selecionarCategoria('PIZZA')}>🍕 Pizza</button>
                    <button type="button" className="tipo-burguer" onClick={() => selecionarCategoria('LANCHE')}>🍔 Lanche</button>
                    <button type="button" className="tipo-porcao" onClick={() => selecionarCategoria('PORCAO')}>🍟 Porção</button>
                    <button type="button" className="tipo-bebida" onClick={() => selecionarCategoria('BEBIDA')}>🥤 Bebida</button>
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