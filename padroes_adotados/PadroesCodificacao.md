# Regras de Boas Práticas de Codificação do Grupo

Este documento define as regras de boas práticas que serão seguidas durante o desenvolvimento do projeto, com o objetivo de garantir organização, legibilidade e qualidade do código.

---

## 1. Padrão de notação de código (obrigatório)
O grupo adotará um padrão único de nomenclatura no código para manter consistência e facilitar a leitura.

- Variáveis e funções: **camelCase** (ex: `calcularMediaAluno`)
- Classes: **PascalCase** (ex: `AlunoController`)
- Constantes: **UPPER_SNAKE_CASE** (ex: `MAX_ALUNOS`)


## 2. Documentação e comentários no código (obrigatório)
O código deve ser documentado de forma clara e objetiva.

- Comentários devem ser usados apenas quando necessário
- Evitar comentar coisas óbvias
- Funções e classes devem ter descrição quando o contexto não for claro


## 3. Aplicação de princípios SOLID
Sempre que possível, o código deve seguir os princípios SOLID:

### S — Single Responsibility Principle (Responsabilidade Única)
Cada classe ou função deve ter apenas uma responsabilidade bem definida. Isso evita que um mesmo componente faça várias tarefas diferentes e facilita a manutenção.

### O — Open/Closed Principle (Aberto/Fechado)
O código deve ser aberto para extensão, mas fechado para modificação. Ou seja, novas funcionalidades devem ser adicionadas sem a necessidade de alterar código já existente.

### L — Liskov Substitution Principle (Substituição de Liskov)
Classes derivadas devem poder substituir suas classes base sem causar erros ou alterar o comportamento esperado do sistema.

### I — Interface Segregation Principle (Segregação de Interfaces)
Interfaces devem ser específicas e não obrigar classes a implementarem métodos que não utilizam.

### D — Dependency Inversion Principle (Inversão de Dependência)
O sistema deve depender de abstrações (interfaces) e não de implementações concretas, reduzindo o acoplamento entre módulos.

## 4. Aplicação de Clean Code
O grupo deve priorizar código limpo e legível:

- Funções pequenas e com uma única responsabilidade
- Evitar repetição de código (DRY)
- Nomes de variáveis e funções devem ser claros e descritivos
- Evitar soluções difíceis de entender, priorizando soluções simples

## 5. Organização de funções e responsabilidade única (SRP)
Cada função ou método deve ter **uma única responsabilidade**, seguindo o princípio SRP (Single Responsibility Principle) e mantendo boa coesão,

- Funções devem ser pequenas e objetivas
- Evitar funções que fazem múltiplas tarefas ao mesmo tempo
- Caso uma função esteja grande, ela deve ser dividida em funções menores e reutilizáveis
- Facilita leitura, testes e manutenção do código

## 6. Revisão de código (Code Review)
Antes de qualquer funcionalidade ser integrada ao projeto principal:

- Outro membro do grupo deve revisar o código
- Verificar erros, melhorias e padronização
- Garantir que as regras acima estão sendo seguidas
