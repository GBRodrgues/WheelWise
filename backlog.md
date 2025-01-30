# Backlog do Projeto: WheelWise

## 1. Visão Geral
O projeto consiste no desenvolvimento de um site para comparação de motocicletas, permitindo aos usuários visualizar e analisar diferentes modelos com base em especificações técnicas, avaliações e custos de manutenção. O sistema será desenvolvido utilizando Node.js no backend e Vue.js no frontend, seguindo os padrões de projeto GRASP e GOTH.

## 2. Requisitos Funcionais
### 2.1 Funcionalidades principais
- **Cadastro de motos**: Permitir a inserção de novas motos no banco de dados.
- **Comparação de motos**: Selecionar duas ou mais motos para exibir as diferenças entre suas especificações.
- **Visualização de detalhes**: Exibir a ficha técnica detalhada de cada moto.
- **Avaliações de usuários**: Permitir que usuários deixem avaliações e notas para cada modelo.
- **Filtragem e ordenação**: Possibilitar a busca por motos com base em critérios como marca, cilindrada, preço e categoria.

### 2.2 Funcionalidades futuras
- **Simulação de custo de manutenção**: Estimativa de gastos com peças e revisões.
- **Sugestão de motos similares**: Indicação de modelos similares com base nas preferências do usuário.
- **Autenticação de usuários**: Login e perfil para salvar comparações e avaliações.

## 3. Tecnologias Utilizadas
- **Backend**: Node.js com Express.js
- **Banco de Dados**: PostgreSQL
- **Frontend**: Vue.js
- **Padrões de Projeto**: GRASP e GOTH

## 4. Divisão de Tarefas
### 4.1 Backend (Node.js, Express.js, PostgreSQL)
- **Pessoa 1**
  - Modelagem do banco de dados (PostgreSQL)
  - Criação das entidades principais (Moto, Usuário, Avaliação)
  - Implementação dos endpoints da API REST

- **Pessoa 2**
  - Implementação da lógica de comparação entre motos
  - Criação de endpoints para busca e filtragem
  - Segurança da API e autenticação (se aplicável)

### 4.2 Frontend (Vue.js)
- **Pessoa 3**
  - Design da interface e implementação do layout
  - Criação de componentes para exibição das motos
  - Implementação da página de comparação
  
### 4.3 Integração
- Todos os membros deverão contribuir para a integração entre frontend e backend.
- Revisões de código e testes em conjunto para garantir a funcionalidade correta da aplicação.

## 5. Como Prosseguir com o Desenvolvimento
1. **Planejamento**: Definir bem as responsabilidades e realizar reuniões semanais para acompanhamento.
2. **Configuração do ambiente**: Criar o repositório no GitHub e configurar o ambiente de desenvolvimento.
3. **Implementação**: Seguir a divisão de tarefas e documentar o código conforme as boas práticas.
4. **Testes**: Realizar testes unitários e integração para garantir o funcionamento correto.
5. **Refinamento e ajustes**: Revisar e otimizar código conforme necessário.
6. **Entrega final**: Preparar a apresentação e demonstrar as funcionalidades implementadas.

## 6. Padrões de Projeto Utilizados
### 6.1 GRASP
- **Creator**: As classes que criam objetos de motos e usuários serão responsáveis por suas instâncias.
- **Controller**: Criação de controladores para gerenciar requisições HTTP.
- **Information Expert**: As classes fornecerão dados diretamente quando necessário.

### 6.2 GOTH
- **Hierarquia de objetos**: Organização dos dados para facilitar a busca e comparação.
- **Encapsulamento**: Manter detalhes da implementação ocultos quando possível.
- **Responsabilidade distribuída**: Cada entidade será responsável por uma parte específica do sistema.
