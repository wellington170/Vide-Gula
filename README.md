# Vide Gula Lanches e Pizzas

Sistema Web de Gestão de Pedidos para Delivery e Retirada desenvolvido para a disciplina **GCC188 - Engenharia de Software** da **Universidade Federal de Lavras (UFLA)**.

O projeto foi criado para a Vide Gula Lanches e Pizzas com o objetivo de digitalizar o processo de pedidos, reduzir a dependência de anotações manuais e mensagens via WhatsApp, e oferecer uma interface de pedidos online para clientes e equipe.

---

## 👥 Integrantes

- João Victor Arantes
- Pedro Henrique Fonseca Resende
- Wellington Costa Grilo Pereira

---

## 🎯 Problema

A Vide Gula Lanches e Pizzas realiza grande parte dos atendimentos manualmente. Pedidos presenciais são anotados em papel e os pedidos remotos chegam por telefone ou WhatsApp.

Essa operação centralizada em poucos aparelhos causa atraso no atendimento, sobrecarga de comunicação e dependência do acompanhamento constante do WhatsApp. O projeto também visa melhorar a presença digital da empresa.

---

## 💡 Solução

Plataforma web para atendimento de pedidos com:

- Cadastro e autenticação de usuários
- Catálogo digital de produtos
- Realização e acompanhamento de pedidos
- Delivery e retirada no local
- Área administrativa para gerenciamento

---

## 🚀 Tecnologias

### Frontend

- React 19.2.7
- Vite 8.1.0
- React Router Dom 7.18.1
- Redux Toolkit 2.12.0
- JavaScript

### Backend

- Node.js 22
- Express 5.2.1
- Sequelize 6.33.2
- JWT
- MySQL 8

### Testes

- Jest
- Selenium

---

## 🧩 Estrutura do Projeto

```text
Vide-Gula/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docs/
├── padroes_adotados/
└── README.md
```

---

## 🛠️ Pré-requisitos

- Node.js 22+
- npm
- MySQL 8+
- Git

---

## 🔧 Configuração do Banco de Dados

No MySQL, crie o banco de dados:

```sql
CREATE DATABASE vide_gula;
```

O backend utiliza variáveis de ambiente em `backend/src/config/database.js`. Crie um arquivo `.env` em `backend/` com:

```env
PORT=3000
HOST=127.0.0.1
DB_PORT=3306
DIALECT=mysql
DB_USERNAME=root
PASSWORD=senha_do_banco
DATABASE=vide_gula
JWT_SECRET=uma_chave_secreta
ADMIN_EMAIL=admin@videgula.local
ADMIN_PASSWORD=Admin@123
```

O seeder inicial criará automaticamente um usuário administrador quando não existir nenhum admin no banco.

---

## ▶️ Executando o Projeto

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

---

## 🧪 Testes

No backend:

```bash
cd backend
npm test
```

---

## 🚀 Comandos Úteis

### Rodar backend em produção

```bash
cd backend
npm start
```

### Verificar frontend localmente

```bash
cd frontend
npm run preview
```

### Lint frontend

```bash
cd frontend
npm run lint
```

---

## 📦 Migrações

Para aplicar migrações do Sequelize no backend:

```bash
cd backend
npx sequelize-cli db:migrate
```

---

## 📚 Observações

- O backend carrega `dotenv` em `backend/src/server.js` e `backend/src/config/database.js`.
- O repositório não inclui um arquivo `.env`; crie-o localmente para execução.
- O frontend está construído em React com páginas, componentes e roteamento.

```

Esta versão conterá:

* Documento de requisitos;
* Documento de regras de verificação e análise de requisitos;
* Modelagem inicial do banco de dados;
* README do projeto;
* Estrutura inicial da aplicação.
