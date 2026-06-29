# Regras de Verificação e Análise de Requisitos

## 1. Objetivo

Este documento define os critérios utilizados para elaboração, análise e verificação dos requisitos da Plataforma de Simulados e Banco de Questões. O objetivo é garantir que todos os requisitos sejam escritos de forma padronizada, compreensível e verificável.

---

# 2. Padrões Adotados

## 2.1 Identificação dos Requisitos

Os requisitos funcionais deverão ser identificados utilizando o padrão:

RF001, RF002, RF003...

Exemplos:

* RF001 – Realizar Login
* RF002 – Cadastrar Usuário

Os requisitos não funcionais deverão ser identificados utilizando o padrão:

NF001, NF002, NF003...

Exemplos:

* NF001 – Tempo de Resposta
* NF002 – Segurança de Dados

Não é permitida a reutilização de identificadores já utilizados.

---

## 2.2 Prioridade dos Requisitos

Todos os requisitos deverão possuir exatamente uma das prioridades abaixo:

* Essencial
* Importante
* Desejável

Não será permitido deixar o campo de prioridade em branco.

---

## 2.3 Estrutura Obrigatória dos Requisitos Funcionais

Todo requisito funcional deverá conter obrigatoriamente os seguintes campos:

* Identificação
* Prioridade
* Atores
* Resumo
* Pré-condição
* Pós-condição
* Interfaces
* Fluxo Principal
* Fluxo Alternativo
* Regras de Negócio

A ausência de qualquer um desses campos reprova o requisito durante a revisão.

---

# 3. Critérios de Verificação e Análise

Os critérios abaixo foram definidos com base nas características de qualidade da especificação de requisitos apresentadas no livro Engenharia de Software, de Rogério Magela.

## 3.1 Completude

Todo requisito funcional deverá conter obrigatoriamente:

* Um ator identificado;
* Uma ação executada;
* Um resultado esperado.

Exemplo:

"Permite que o cliente realize um pedido e o sistema registre a solicitação."

Caso algum dos três elementos esteja ausente, o requisito será considerado incompleto.

---

## 3.2 Não Ambiguidade

Não será permitido o uso das seguintes palavras:

* rápido
* fácil
* adequado
* eficiente
* geralmente
* normalmente
* aproximadamente
* eventualmente

Esses termos permitem múltiplas interpretações e tornam o requisito ambíguo.

---

## 3.3 Verificabilidade

Todo requisito deverá possuir pelo menos um comportamento passível de teste.

Exemplo inválido:

"O sistema deve possuir boa usabilidade."

Exemplo válido:

"O sistema deve permitir acesso a qualquer funcionalidade principal em no máximo três cliques."

---

## 3.4 Consistência

Um requisito não poderá contradizer outro requisito já existente.

Exemplo de inconsistência:

RF010: O sistema deve permitir exclusão permanente de questões.

RF011: O sistema não deve permitir exclusão de questões.

Durante a revisão será realizada conferência para identificar conflitos entre requisitos.

---

## 3.5 Rastreabilidade

Todo requisito deverá possuir referência única através de seu identificador.

Além disso, o requisito deverá ser associado aos artefatos relacionados:

* Casos de Uso;
* Interfaces;
* Regras de Negócio;
* Diagramas.

Exemplo:

RF001 → I001 → Caso de Uso Login

---

# 4. Critérios de Aprovação

Um requisito será considerado aprovado quando:

1. Possuir identificador único válido;
2. Possuir prioridade definida;
3. Contiver todos os campos obrigatórios;
4. Não utilizar termos ambíguos;
5. Puder ser testado objetivamente;
6. Não apresentar conflitos com outros requisitos;
7. Possuir rastreabilidade para os demais artefatos do projeto.
