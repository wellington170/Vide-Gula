# Regras e Padrões de Uso do Git

## Organização do Repositório

O projeto será organizado da seguinte forma:

```text
vide-gula/
│
├── frontend/          # Aplicação React
├── backend/           # API Node.js
├── docs/              # Documentação do projeto
│   ├── diagramas/
│   ├── requisitos/
│   └── atas/
├── README.md
├── .gitignore
└── docker-compose.yml (caso utilizado)
```

* **frontend/**: código da interface do usuário.
* **backend/**: código da API e acesso ao banco de dados.
* **docs/**: documentação do projeto, diagramas UML, requisitos e demais artefatos.
* **README.md**: instruções para instalação e execução do projeto.

---

# Estratégia de Branches

Serão utilizadas as seguintes branches:

* **main**

  * Contém apenas versões estáveis do projeto.
  * Não serão realizados commits diretamente nesta branch.

* **develop**

  * Branch principal de desenvolvimento.
  * Recebe a integração das funcionalidades concluídas.

* **feature/nome-da-funcionalidade**

  * Utilizada para desenvolver novas funcionalidades.
  * Exemplo:

    * feature/login
    * feature/cardapio
    * feature/pedidos

* **fix/nome-do-problema**

  * Utilizada para correção de erros encontrados durante o desenvolvimento.

Após a conclusão da funcionalidade, será realizado um Pull Request para a branch **develop**.

---

# Regras para Commits

Os commits deverão seguir o padrão Conventional Commits.

Estrutura:

```
tipo: descrição
```

Tipos utilizados:

* feat: nova funcionalidade
* fix: correção de erro
* docs: alteração na documentação
* style: alterações de formatação (sem modificar funcionamento)
* refactor: melhoria no código sem alterar comportamento
* test: criação ou alteração de testes
* chore: tarefas de manutenção

Exemplos:

```
feat: implementar autenticação de usuários

feat: adicionar CRUD de produtos

fix: corrigir cálculo do valor total do pedido

docs: atualizar diagrama de classes

style: ajustar indentação do código

refactor: reorganizar estrutura dos serviços

test: adicionar testes do cadastro de clientes

chore: atualizar dependências do projeto
```

---

# Regras Gerais

* Não realizar commits diretamente na branch **main**.
* Cada funcionalidade deve possuir sua própria branch.
* Os commits devem representar apenas uma alteração lógica.
* Utilizar mensagens claras e objetivas.
* Antes de abrir um Pull Request, atualizar a branch com as alterações da develop.
* Todo Pull Request deverá ser revisado por pelo menos um integrante da equipe antes da integração.

---

# Arquivos Ignorados (.gitignore)

Os seguintes arquivos e diretórios não deverão ser versionados:

```gitignore
# Dependências
node_modules/

# Variáveis de ambiente
.env
.env.*

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Build React
frontend/build/
frontend/dist/

# Build Backend
backend/dist/

# Cobertura de testes
coverage/

# Cache
.cache/

# Sistema Operacional
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/

# Arquivos temporários
*.tmp
*.swp

# Banco SQLite (caso utilizado)
*.sqlite
*.sqlite3
```

---

# Fluxo de Trabalho

1. Atualizar a branch **develop**.
2. Criar uma nova branch **feature/** ou **fix/**.
3. Desenvolver a funcionalidade.
4. Realizar commits seguindo o padrão definido.
5. Enviar a branch para o GitHub.
6. Abrir um Pull Request para **develop**.
7. Após revisão, integrar a funcionalidade.
8. Quando houver uma versão estável, realizar a integração da **develop** para a **main**.
