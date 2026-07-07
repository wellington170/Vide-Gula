-- Seed script for Vide-Gula (MySQL)
-- Run: mysql -u DB_USER -p DB_NAME < backend/sql/seed_full.sql

SET @now = NOW();

-- Users (admin and cliente)
INSERT INTO usuarios (nome, telefone, email, senha, perfil, created_at, updated_at)
VALUES
  ('Administrador', '+5511999999999', 'admin@videgula.local', '$2a$10$wq4I8N0Pd/vuUVresVW3NOhnJnAsRnAw0lO1fw.IJfIujjQ9MrVzS', 'ADMINISTRADOR', @now, @now),
  ('Cliente Teste', '+5511988888888', 'cliente@teste.local', '$2a$10$uvBiAdmCQ1Xf7TTXL5d/eONGFnmahks3VvUWO7S7sOGpYi.DhScCe', 'CLIENTE', @now, @now);

-- Capture inserted user ids
SELECT id INTO @admin_id FROM usuarios WHERE email = 'admin@videgula.local' LIMIT 1;
SELECT id INTO @cliente_id FROM usuarios WHERE email = 'cliente@teste.local' LIMIT 1;

-- Address for cliente
INSERT INTO enderecos (usuario_id, rua, numero, bairro, cidade, estado, cep, complemento, ponto_referencia, ativo, created_at, updated_at)
VALUES
  (@cliente_id, 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01000-000', 'Apto 12', 'Perto do parque', true, @now, @now);

-- Capture endereco id
SELECT id INTO @end1 FROM enderecos WHERE usuario_id = @cliente_id LIMIT 1;

-- Products
INSERT INTO produtos (nome, descricao, tipo, preco_base, imagem, ativo, disponivel, created_at, updated_at)
VALUES
  ('X-Bacon', 'Pão, hambúrguer, queijo, bacon, alface e tomate.', 'LANCHE', 25.50, 'xbacon.jpg', true, true, @now, @now),
  ('Pizza Margherita', 'Massa fina, molho de tomate e mussarela.', 'PIZZA', 42.00, 'pizza_margherita.jpg', true, true, @now, @now),
  ('Coca-Cola 350ml', 'Refrigerante 350ml.', 'BEBIDA', 6.00, 'coca_350.jpg', true, true, @now, @now),
  ('Porção de Batata', 'Porção média de batatas fritas.', 'PORCAO', 18.00, 'porcao_batata.jpg', true, true, @now, @now);

-- Capture product ids into variables for referencing in items
SELECT id INTO @prod_xbacon FROM produtos WHERE nome = 'X-Bacon' LIMIT 1;
SELECT id INTO @prod_pizza FROM produtos WHERE nome = 'Pizza Margherita' LIMIT 1;
SELECT id INTO @prod_coca FROM produtos WHERE nome = 'Coca-Cola 350ml' LIMIT 1;
SELECT id INTO @prod_por FROM produtos WHERE nome = 'Porção de Batata' LIMIT 1;

-- Sample order (delivered) by cliente
INSERT INTO pedidos (usuario_id, endereco_id, status, forma_recebimento, forma_pagamento, troco_para, taxa_entrega, valor_total, created_at, updated_at)
VALUES
  (@cliente_id, @end1, 'ENTREGUE', 'DELIVERY', 'DINHEIRO', 0.00, 5.00, 30.50, @now, @now);
SET @pedido1 = LAST_INSERT_ID();

-- Order items for pedido1: 1 X-Bacon
INSERT INTO item_pedidos (pedido_id, produto_id, quantidade, preco_unitario, subtotal, observacao, created_at, updated_at)
VALUES
  (@pedido1, @prod_xbacon, 1, 25.50, 25.50, NULL, @now, @now);

-- Another sample order (cancelled) with a pizza and a bebida
INSERT INTO pedidos (usuario_id, endereco_id, status, forma_recebimento, forma_pagamento, troco_para, taxa_entrega, valor_total, created_at, updated_at)
VALUES
  (@cliente_id, NULL, 'CANCELADO', 'RETIRADA', 'PIX', 0.00, 0.00, 48.00, @now, @now);
SET @pedido2 = LAST_INSERT_ID();

INSERT INTO item_pedidos (pedido_id, produto_id, quantidade, preco_unitario, subtotal, observacao, created_at, updated_at)
VALUES
  (@pedido2, @prod_pizza, 1, 42.00, 42.00, 'Sem cebola', @now, @now),
  (@pedido2, @prod_coca, 1, 6.00, 6.00, NULL, @now, @now);

-- Done
SELECT 'Seed finished' AS result;
