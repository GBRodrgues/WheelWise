## Padrões GRASP
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

## Conclusão

As explicações e exemplos apresentados estão em plena conformidade com os conceitos de GRASP conforme detalhados no artigo da Wikipédia. Cada padrão (Controller, Information Expert, Creator, Low Coupling/High Cohesion, Indirection e Protected Variations) foi validado com exemplos práticos extraídos dos arquivos do projeto, demonstrando como esses princípios são aplicados para criar uma arquitetura organizada, de fácil manutenção e escalável. Essa validação reforça que os conceitos GRASP não apenas orientam a atribuição de responsabilidades, mas também promovem um design robusto e adaptável às mudanças, conforme discutido na referência.