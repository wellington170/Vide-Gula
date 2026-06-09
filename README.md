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

O sistema consiste em uma plataforma web que permitirá aos clientes realizar pedidos diretamente pelo site da lanchonete.

O objetivo principal é centralizar o recebimento de pedidos em uma única plataforma, diminuindo a dependência de canais manuais de atendimento.

### Funcionalidades previstas

* Cadastro e autenticação de usuários;
* Catálogo digital de produtos;
* Cadastro e gerenciamento de clientes;
* Cadastro e gerenciamento de produtos;
* Realização de pedidos online;
* Opção de retirada no local;
* Opção de entrega por delivery;
* Acompanhamento do status dos pedidos;
* Histórico de pedidos;
* Área administrativa para gerenciamento da operação.

### Benefícios esperados

* Redução da dependência do WhatsApp;
* Redução da sobrecarga do atendimento telefônico;
* Maior organização dos pedidos;
* Agilidade no atendimento;
* Melhor experiência para os clientes;
* Fortalecimento da presença digital da empresa.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- React 19
- Vite 7
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- Axios

### Backend

- Java 21
- Spring Boot 3
- Spring Data JPA
- Spring Security
- Maven

### Banco de Dados

- MySQL 8

### Testes

- JUnit 5
- Selenium IDE

### Ferramentas

- Git
- GitHub
- IntelliJ IDEA Community Edition
- Visual Studio Code
- Postman

---

## 📚 Utilização das Tecnologias

### Frontend

- **React:** Construção da interface utilizando componentes reutilizáveis.
- **Vite:** Ambiente de desenvolvimento e build da aplicação React.
- **JavaScript:** Implementação da lógica da interface.
- **HTML5:** Estruturação das páginas do sistema.
- **CSS3:** Estilização e responsividade da interface.
- **Bootstrap:** Componentes visuais e layout responsivo.
- **Axios:** Comunicação entre frontend e backend.

### Backend

- **Java:** Implementação das regras de negócio da aplicação.
- **Spring Boot:** Desenvolvimento da API REST.
- **Spring Data JPA:** Persistência e manipulação dos dados.
- **Spring Security:** Autenticação e controle de acesso.
- **Maven:** Gerenciamento de dependências e build do projeto.

### Banco de Dados

- **MySQL:** Armazenamento persistente das informações do sistema.

### Testes

- **JUnit 5:** Testes unitários das regras de negócio.
- **Selenium IDE:** Automação de testes de interface.

### Ferramentas

- **Git:** Controle de versão.
- **GitHub:** Hospedagem e colaboração do código-fonte.
- **Visual Studio Code:** Desenvolvimento frontend.
- **IntelliJ IDEA:** Desenvolvimento backend Java.
- **Postman:** Testes e validação da API REST.

## 🖥️ Instruções para Uso

### Pré-requisitos

* Java 21+
* Node.js 22+
* MySQL 8+
* Git

### Criando o Banco de Dados

```sql
CREATE DATABASE vide_gula;
```

### Configuração da Aplicação

Arquivo:

```text
backend/src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vide_gula
spring.datasource.username=root
spring.datasource.password=senha
```

### Executando o Backend

```bash
cd backend
mvn spring-boot:run
```

API disponível em:

```text
http://localhost:8080
```

### Executando o Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

## 👨‍💻 Instruções para Desenvolvedores

### Clonar o Projeto

```bash
git clone https://github.com/SEU-USUARIO/vide-gula-lanches-pizzas.git
```

### Instalar Dependências do Frontend

```bash
cd frontend
npm install
```

### Instalar Dependências do Backend

```bash
cd backend
mvn clean install
```

### Executar o Projeto

Backend:

```bash
mvn spring-boot:run
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
- Cliente

#### Cliente 
Representa os clientes que realizam pedidos na plataforma.

- id
- nome
- telefone
- Endereço

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
- Produto

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
- ItemPedido

#### ItemPedido
Produtos associados a um pedido.

- id
- pedido_id
- tamanho
- quantidade

#### Relacionamentos Principais

- Um cliente pode possuir vários endereços.
- Um cliente pode realizar vários pedidos.
- Um pedido pode conter vários itens.
- Operação Principal do Sistema

#### A principal operação do sistema é o gerenciamento de pedidos, envolvendo as seguintes entidades:

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
│   │   │
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages
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
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── model/
│   │   ├── dto/
│   │   ├── mapper/
│   │   ├── exception/
│   │   ├── security/
│   │   └── util/
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── static/
│   │   │       └── templates/
│   │   │
│   │   └── test/
│   │       └── java/
│   │
│   ├── pom.xml 
│   └── mvnw
│
├── docs/
│   │
│   ├── requisitos/
│   ├── diagramas/
│   ├── atas/
│   └── apresentacoes/
│
├── padroes-adotados/
│   │
│   ├── regras-verificacao-requisitos.md
│   ├── padrao-commits.md
│   └── padrao-nomenclatura.md
│
├── testes/
│   │
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

- **controller/**: endpoints da API REST.
- **service/**: regras de negócio.
- **repository/**: acesso ao banco de dados.
- **model/**: entidades do sistema.
- **dto/**: objetos de transferência de dados.
- **mapper/**: conversão entre entidades e DTOs.
- **exception/**: tratamento centralizado de erros.
- **security/**: autenticação e autorização.
- **config/**: configurações da aplicação.
- **util/**: classes auxiliares.

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
