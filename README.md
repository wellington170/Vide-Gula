# Vide Gula Lanches e Pizzas

Sistema Web de Gestão de Pedidos para Delivery e Retirada desenvolvido para a disciplina **GCC188 - Engenharia de Software** da **Universidade Federal de Lavras (UFLA)**.

O projeto foi idealizado a partir de uma necessidade real observada na **Vide Gula Lanches e Pizzas**, buscando modernizar o processo de atendimento, reduzir a dependência de pedidos por telefone e WhatsApp e fortalecer a presença digital da empresa.

---

## 👥 Integrantes

* João Victor Arantes
* Pedro Henrique Fonseca Resende
* Wellington Costa Grilo Pereira

---

## 🎯 Contexto do Problema

A lanchonete **Vide Gula Lanches e Pizzas** realiza atualmente o atendimento de pedidos de forma predominantemente manual.

Os pedidos presenciais são anotados em papel, enquanto os pedidos remotos são recebidos por telefone ou WhatsApp e passados para o papel manualmente. Como o atendimento está centralizado em um único aparelho telefônico, durante horários de maior movimento ocorre uma sobrecarga no processo de atendimento, tanto do Whatsapp, tanto dos outros dois telefones fixos.

Além disso, os pedidos realizados via WhatsApp dependem que algum funcionário acompanhe constantemente as mensagens recebidas. Em muitos momentos, devido à rotina operacional da lanchonete, as mensagens não são respondidas com a rapidez esperada pelos clientes, gerando atrasos no atendimento e possíveis perdas de vendas.

Outro problema identificado é a baixa presença digital da empresa. Atualmente a Vide Gula possui apenas cadastro no Google, não possuindo um site próprio para divulgação da marca e realização de pedidos online, ficando dependente do atendimento manual.. 

---

## 💡 Solução Proposta

Plataforma web para realização e gerenciamento de pedidos online, incluindo:

- Cadastro e autenticação de usuários
- Catálogo digital de produtos
- Realização e acompanhamento de pedidos
- Delivery e retirada no local
- Área administrativa

## 🚀 Tecnologias Utilizadas

### Frontend
- React 19
- Vite 7
- JavaScript
- Bootstrap 5
- Axios

### Backend
- Node.js 22
- Express
- Sequelize ORM
- JWT

### Banco de Dados
- MySQL 8

### Testes
- Jest
- Selenium IDE

## 🖥️ Instruções para Uso

### Pré-requisitos

- Node.js 22+
- MySQL 8+
- Git

### Banco de Dados

```sql
CREATE DATABASE vide_gula;
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 👨‍💻 Instruções para Desenvolvedores

### Clonar o Projeto

```bash
git clone https://github.com/SEU-USUARIO/vide-gula-lanches-pizzas.git
```

### Instalar Dependências

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Executar

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## 🗄️ Modelo de Dados Inicial

O sistema foi modelado para atender às necessidades da Vide Gula Lanches e Pizzas, permitindo o gerenciamento de clientes, endereços, produtos e pedidos.

### Principais Entidades
#### Usuário

Responsável pelo acesso administrativo ao sistema.

- id
- nome
- email
- senha
- perfil

#### Cliente

Representa os clientes que realizam pedidos na plataforma.

- id
- nome
- telefone

#### Endereço

Permite que um cliente possua um ou mais endereços cadastrados para entrega.

- id
- cliente_id
- rua
- número
- complemento
- bairro
- cidade
- estado
- cep
- referência

#### Produto

Representa os itens vendidos pela lanchonete, como hambúrgueres, pizzas, porções e bebidas.

- id
- nome
- categoria
- preço
- descrição

#### Pedido

Representa a compra realizada pelo cliente.

- id
- cliente_id
- endereço_entrega
- tipo (Delivery ou Retirada)
- data_hora
- status
- valor_total

#### ItemPedido

Produtos associados a um pedido.

- id
- pedido_id
- produto_id
- tamanho
- quantidade

#### Relacionamentos Principais

- Um cliente pode possuir vários endereços.
- Um cliente pode realizar vários pedidos.
- Um pedido pode conter vários itens.
- Um item de pedido está associado a um produto.
- Um produto pode estar presente em vários pedidos.

### Operação Principal do Sistema

A principal operação do sistema é o gerenciamento de pedidos, envolvendo as seguintes entidades:

- Cliente
- Endereço
- Pedido
- ItemPedido
- Produto

--- 

## 📁 Organização do Projeto

```text
```text
vide-gula-lanches-pizzas/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── database/
│   │   └── utils/
│   │
│   ├── package.json
│   ├── .env
│   └── server.js
│
├── docs/
│   ├── requisitos/
│   ├── diagramas/
│   ├── atas/
│   └── apresentacoes/
│
├── padroes-adotados/
│   ├── regras-verificacao-requisitos.md
│   ├── padrao-commits.md
│   └── padrao-nomenclatura.md
│
├── testes/
│   ├── unidade/
│   ├── selenium/
│   └── evidencias/
│
├── .gitignore
├── README.md
└── LICENSE
```
### Descrição das Pastas

#### Frontend

- **assets/**: imagens, ícones e arquivos estáticos.
- **components/**: componentes reutilizáveis da interface.
- **pages/**: páginas do sistema.
- **services/**: comunicação com a API.
- **hooks/**: hooks customizados do React.
- **contexts/**: gerenciamento de estado global.
- **routes/**: definição das rotas da aplicação.
- **utils/**: funções utilitárias.
- **styles/**: estilos globais.

#### Backend

- **controllers/**: endpoints da API REST.
- **services/**: regras de negócio.
- **models/**: entidades e modelos do banco de dados.
- **routes/**: definição das rotas da API.
- **middlewares/**: autenticação, autorização e tratamento de erros.
- **database/**: configuração do banco, migrations e seeders.
- **config/**: configurações da aplicação.
- **utils/**: funções auxiliares.
```
#### Documentação

- **docs/**: documentação do projeto.
- **padroes-adotados/**: padrões definidos pela equipe.
- **testes/**: roteiros, scripts e evidências de testes.


---

## 🔖 Controle de Versão

O projeto utiliza Git e GitHub para controle de versão.

Todos os integrantes devem:

* Trabalhar em branches próprias;
* Realizar commits frequentes;
* Utilizar Pull Requests para integração;
* Manter o histórico de desenvolvimento atualizado.

---

## 📦 Primeira Release

A primeira baseline do projeto será registrada através da tag:

```text
v0.1
```

Esta versão conterá:

* Documento de requisitos;
* Documento de regras de verificação e análise de requisitos;
* Modelagem inicial do banco de dados;
* README do projeto;
* Estrutura inicial da aplicação.
