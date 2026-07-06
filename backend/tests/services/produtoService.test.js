jest.mock('../../src/repositories/ProdutoRepository', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countLinkedOrders: jest.fn(),
  findAvailableByIds: jest.fn(),
  findAvailableById: jest.fn()
}));

const produtoRepository = require('../../src/repositories/ProdutoRepository');
const ProdutoService = require('../../src/services/ProdutoService');

describe('ProdutoService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('deve cadastrar um produto com sucesso', async () => {
    const produtoCriado = { id: 10, nome: 'Pizza', tipo: 'PIZZA', precoBase: 35 };
    produtoRepository.create.mockResolvedValue(produtoCriado);

    const result = await ProdutoService.cadastrarProduto({
      nome: 'Pizza',
      descricao: 'Saborosa',
      tipo: 'PIZZA',
      precoBase: 35,
      imagem: null,
      ativo: true,
      disponivel: true
    });

    expect(produtoRepository.create).toHaveBeenCalledTimes(1);
    expect(produtoRepository.create).toHaveBeenCalledWith({
      nome: 'Pizza',
      descricao: 'Saborosa',
      tipo: 'PIZZA',
      precoBase: 35,
      imagem: null,
      ativo: true,
      disponivel: true
    });
    expect(result).toEqual(produtoCriado);
  });

  test('deve rejeitar tipo de produto inválido', async () => {
    await expect(ProdutoService.cadastrarProduto({
      nome: 'Produto',
      descricao: 'Teste',
      tipo: 'INVALIDO',
      precoBase: 10
    })).rejects.toMatchObject({ status: 400, message: 'Tipo de produto inválido.' });

    expect(produtoRepository.create).not.toHaveBeenCalled();
  });

  test('deve rejeitar preço menor ou igual a zero', async () => {
    await expect(ProdutoService.cadastrarProduto({
      nome: 'Produto',
      descricao: 'Teste',
      tipo: 'PIZZA',
      precoBase: 0
    })).rejects.toMatchObject({ status: 400, message: 'O preço do produto deve ser maior que zero.' });

    expect(produtoRepository.create).not.toHaveBeenCalled();
  });

  test('deve propagar exceções do repository ao cadastrar', async () => {
    produtoRepository.create.mockRejectedValue(new Error('Falha ao salvar produto'));

    await expect(ProdutoService.cadastrarProduto({
      nome: 'Produto',
      descricao: 'Teste',
      tipo: 'PIZZA',
      precoBase: 10
    })).rejects.toThrow('Falha ao salvar produto');
  });
});
