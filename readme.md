# Documento de Padrões de Projeto e Utilizações
## Frontend
O próprio framework Vue implementa padrões GRASP por meio de seus componentes, onde cada componente atua como Controller ao gerenciar eventos e como Information Expert ao manipular seus próprios dados. A comunicação via props, eventos e provide/inject assegura baixo acoplamento e alta coesão, facilitando a manutenção.

Além disso, a reatividade com computed properties e watchers protege contra variações inesperadas (Protected Variations), e a criação modular de componentes reflete o princípio do Creator, promovendo uma arquitetura escalável e organizada.

### 1. Controller

O padrão Controller centraliza a entrada de requisições do sistema, delegando as responsabilidades para outras classes conforme necessário. No Projeto, componentes como Login e Register capturam eventos (como a submissão de formulários) e chamam funções que coordenam a lógica de autenticação ou cadastro.

**Exemplo:**  ****
  ```html
  <form @submit.prevent="login">
    <!-- Campos de email e senha -->
  </form>
```
```js
async function login() {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      // ...
    })
    // ...
  } catch (error) {
    console.error(error)
  }
}
```
---

### 2. Information Expert

Cada objeto deve ser responsável por executar tarefas para as quais possui a maior quantidade de informações necessárias. No Projeto, componentes como o MotoCard têm a “expertise” sobre os dados da moto, pois recebem os detalhes via props e utilizam esses dados para apresentar informações de forma consistente.

**Exemplo:**  
  ```html
  <div>
    <img
      :src="motoImage"
    />
    <h2>{{ moto.nome }} - {{ moto.fabricante.nome }}</h2>
    <Accordion>
      <AccordionTab>
        <p>Cilindrada: {{ moto.json_motor.cilindradas }}</p>
        <p>Tipo: {{ moto.json_motor.tipo }}</p>
        <p>Potência: {{ moto.json_motor.potencia }}</p>
        <p>Torque: {{ moto.json_motor.torque }}</p>
        <p>Refrigeração: {{ moto.json_motor.refrigeracao }}</p>
      </AccordionTab>
      <AccordionTab>
        <p>Velocidade Máxima: {{ moto.json_performance.velocidade_maxima }}</p>
        <p>Aceleração: {{ moto.json_performance.aceleracao }} s (0-100 km/h)</p>
        <p>Consumo: {{ moto.json_performance.consumo }}</p>
        <p>Transmissão: {{ moto.json_performance.transmissao }}</p>
      </AccordionTab>
      <AccordionTab>
        <p>Peso: {{ moto.json_dimensoes.peso }}</p>
        <p>Comprimento: {{ moto.json_dimensoes.comprimento }}</p>
        <p>Altura do Assento: {{ moto.json_dimensoes.altura_assento }}</p>
        <p>Entre-eixos: {{ moto.json_dimensoes.entre_eixos }}</p>
      </AccordionTab>
    </Accordion>
  </div>
  ```
---

### 3. Creator
A responsabilidade pela criação de novos objetos deve ser atribuída à classe que possui as informações necessárias para essa criação ou que agrega os componentes a serem criados. No projeto, o componente MotoRegister coleta dados de diversas fontes (dados gerais, motor, performance, dimensões) para criar uma nova moto.

**Exemplo:**  
  ```js
  async function createMoto() {
    const payload = {
      nome: formData.value.nome,
      ano_fabricacao: formData.value.ano_fabricacao,
      id_fabricante: formData.value.id_fabricante,
      json_motor: { ...motor.value },
      json_dimensoes: { ...dimensoes.value },
      json_performance: { ...performance.value }
    }
    // Envio do payload para a criação da moto
  }
  ```

---
### 4. Indirection
Usar intermediários para desacoplar componentes que, de outra forma, teriam uma dependência direta. No Projeto, o FabricanteDialog emite um evento (`added`) para que o componente pai atualize sua lista de fabricantes sem conhecer os detalhes internos do diálogo.

**Exemplo:**  
  ```js
  // FabricanteDialog.vue
  emit('added', data)

  // MotoRegister.vue
  function handleFabricanteAdded(newFabricante) {
  fabricantes.value.push({
    code: newFabricante.id.toString(),
    name: newFabricante.nome
  })
    formData.value.id_fabricante = newFabricante.id.toString()
  }
  ```
---

### 6. Protected Variations
Isolar pontos do sistema onde se espera variações, de modo a minimizar o impacto de mudanças. No Projeto, o uso de *computed properties* com valores padrão, como na exibição da imagem da moto, protege o sistema contra alterações inesperadas nos dados.

**Exemplo:**  
  ```js
  const motoImage = computed(() => {
    return props.moto.imagens?.[0]?.url || 'https://placehold.co/600x400'
  })
  ```
---

## Backend
Esta sessão do documento descreve os padrões de projeto (GoF) e os princípios GRASP implementados no backend, detalhando o número de vezes que cada padrão foi utilizado e os principais arquivos onde podem ser encontrados. A análise abrange os arquivos de configuração do servidor, conexão com o banco, models e rotas.

---

## 1. Padrões GoF

### 1.1 Singleton
- **Descrição:**  
  Garante que apenas uma única instância de um objeto seja criada e utilizada durante a execução da aplicação.
- **Número de Utilizações:** 2 vezes
- **Arquivos:**
  - **server.js:**  
    - **Onde:** A instância do servidor Express é criada com `const app = express();` e utilizada de forma única.
  - **db.js:**  
    - **Onde:** A classe `Database` verifica se uma instância já existe e, caso contrário, cria a conexão com o banco de dados, garantindo uma única instância para a aplicação.

---

### 1.2 Facade
- **Descrição:**  
  Simplifica a interface de um subsistema complexo, proporcionando uma interface única e de fácil utilização.
- **Número de Utilizações:** 1 vez
- **Arquivo:**
  - **server.js:**  
    - **Onde:** A função `setupRoutes()` encapsula a configuração das rotas, escondendo os detalhes de como elas são implementadas e agrupando a inicialização em um único método.

---

### 1.3 Factory Method
- **Descrição:**  
  Encapsula a criação de objetos, delegando a responsabilidade da instanciação aos próprios modelos.
- **Número de Utilizações:** 3 vezes
- **Arquivos:**
  - **Motocicleta Model:**  
    - **Onde:** Métodos estáticos `createMotocicleta` e `getMotocicleta` para criação e recuperação de instâncias.
  - **Fabricantes Model:**  
    - **Onde:** Método estático `createFabricante` para criação de instâncias de fabricantes.
  - **Users Model:**  
    - **Onde:** Método estático `createUser` para criação de novos usuários.

---

## 2. Princípios GRASP

### 2.1 Controller
- **Descrição:**  
  Atua como o intermediário entre a interface do usuário e os componentes do sistema, coordenando as operações e a comunicação entre eles.
- **Número de Utilizações:**  
  - **Rotas:** 3 arquivos (cada arquivo de rota funciona como um controller)  
  - **Server:** 1 vez (a função `startServer()` em server.js orquestra a inicialização)
- **Arquivos:**
  - **Rotas de Autenticação (ex.: auth.js):**  
    - Gerencia o registro e login dos usuários.
  - **Rotas de Motocicletas e Fabricantes (ex.: motocicletas.js):**  
    - Coordena operações de listagem, criação e associação de motocicletas, fabricantes e imagens.
  - **Rotas de Comentários (ex.: comments.js):**  
    - Gerencia a criação, consulta e atualização de comentários.
  - **server.js:**  
    - A função `startServer()` coordena a conexão com o banco, sincronização e inicialização das rotas.

---

### 2.2 Creator
- **Descrição:**  
  O princípio “Creator” define que a classe que tem as informações necessárias para criar uma instância de outra deve ser responsável por sua criação.
- **Número de Utilizações:** 3 vezes (nas rotas, delegando a criação para os models)
- **Arquivos:**
  - **Rotas de Autenticação:**  
    - Delegam a criação de usuário para `User.createUser`.
  - **Rotas de Motocicletas e Fabricantes:**  
    - Utilizam `Motocicleta.createMotocicleta` e `Fabricantes.createFabricante` para criação de novas instâncias.
  - **Rotas de Comentários:**  
    - Utilizam `Comments.create` para adicionar novos comentários.

---

### 2.3 Information Expert
- **Descrição:**  
  Cada objeto deve ser responsável por conhecer e gerenciar as informações necessárias para executar suas funções.
- **Número de Utilizações:** 3 vezes (mais inerente à definição dos models)
- **Arquivos:**
  - **Motocicleta Model:**  
    - **Onde:** O método `addImage` utiliza o conhecimento da própria instância para associar uma imagem, delegando a criação ao model de imagem.
  - **Models em Geral:**  
    - Cada model (Motocicleta, Fabricantes, Users, Comments) centraliza o conhecimento e as operações relativas à sua entidade.
  - **Rotas de Comentários:**  
    - As operações de consulta e formatação de dados (por exemplo, ao incluir informações do usuário) evidenciam que o objeto certo (o model) é quem detém a informação necessária.

---

### 2.4 Alta Coesão (High Cohesion)
- **Descrição:**  
  Cada módulo ou classe possui uma única responsabilidade bem definida, facilitando a manutenção e compreensão do sistema.
- **Número de Utilizações:**  
  - **db.js:** 1 vez (foco exclusivo na conexão com o banco)
  - **Models:** Cada model é responsável por sua própria entidade.
- **Arquivos:**
  - **db.js:**  
    - Concentra a lógica de conexão e configuração do banco de dados.
  - **Models:**  
    - Cada arquivo de model (Motocicleta, Fabricantes, Users, Comments, Img_motocicletas) é especializado e coeso em relação à sua função.

---

### 2.5 Baixo Acoplamento (Low Coupling)
- **Descrição:**  
  Minimiza as dependências entre os módulos do sistema, promovendo flexibilidade e facilidade de manutenção.
- **Número de Utilizações:**  
  - Aparece de forma transversal em todos os módulos do projeto.
- **Arquivos:**
  - **server.js:**  
    - A separação entre a inicialização do servidor, configuração de rotas e conexão com o banco.
  - **db.js:**  
    - Isolamento da lógica de conexão com o banco em um módulo específico.
  - **Models:**  
    - Cada model é definido em seu próprio arquivo, reduzindo dependências diretas entre entidades.
  - **Rotas:**  
    - Cada conjunto de rotas lida com uma responsabilidade específica (autenticação, gerenciamento de motocicletas/fabricantes/imagens e comentários).

---
## Conclusão

O projeto demonstra uma aplicação consistente dos padrões GoF e princípios GRASP, distribuindo responsabilidades de forma clara e modular.  
- **Padrões GoF** foram aplicados para garantir instâncias únicas (Singleton), simplificar interfaces (Facade), encapsular a criação de objetos (Factory Method).
- **Princípios GRASP** foram evidenciados com o uso de controllers para orquestrar operações, o princípio de Creator para delegar a criação de objetos, Information Expert para centralizar o conhecimento nos models, e práticas de alta coesão e baixo acoplamento que permeiam todo o código.

Essa abordagem torna o sistema mais fácil de manter, escalável e robusto, refletindo boas práticas de design de software.

---