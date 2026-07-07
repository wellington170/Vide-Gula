const ProdutoTipos = ['PIZZA', 'LANCHE', 'BEBIDA', 'PORCAO'];
const FormasRecebimento = ['DELIVERY', 'RETIRADA'];
const FormasPagamento = ['DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO'];
const StatusPedido = ['RECEBIDO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADO'];
const UsuarioPerfis = {
  CLIENTE: 'CLIENTE',
  ADMINISTRADOR: 'ADMINISTRADOR'
};

module.exports = {
  ProdutoTipos,
  FormasRecebimento,
  FormasPagamento,
  StatusPedido,
  UsuarioPerfis
};
