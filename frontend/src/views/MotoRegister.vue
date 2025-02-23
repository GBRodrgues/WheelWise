<template>
  <div class="moto-create">
    <h1>Adicionar Moto</h1>
    <form @submit.prevent="createMoto">
      <!-- Dados Gerais: organizados horizontalmente -->
      <div class="general-data-container">
        <div class="form-group">
          <label for="nome">Nome</label>
          <InputText
            id="nome"
            v-model="formData.nome"
            required
          />
        </div>
        <div class="form-group">
          <label for="ano_fabricacao">Ano de Fabricação</label>
          <InputText
            id="ano_fabricacao"
            type="number"
            v-model.number="formData.ano_fabricacao"
            required
          />
        </div>
        <div class="form-group">
          <label for="imageUrl">URL da Imagem</label>
          <InputText
            id="imageUrl"
            v-model="formData.imageUrl"
            required
          />
        </div>
        <div class="form-group">
          <label for="id_fabricante">Fabricante</label>
          <Dropdown
            id="id_fabricante"
            v-model="formData.id_fabricante"
            :options="fabricantes"
            optionLabel="name"
            optionValue="code"
            placeholder="Selecione um fabricante"
            required
          />
        </div>
        <div class="form-group">
          <label for="add_fabricante">&nbsp;</label>
          <Button
            id="add_fabricante"
            class="add-manufacturer-button"
            icon="pi pi-plus"
            @click="openFabricanteDialog"
          />
        </div>
      </div>

      <!-- Container Horizontal para os fieldsets -->
      <div class="horizontal-container">
        <!-- Fieldset: Especificações do Motor -->
        <fieldset class="fieldset">
          <legend>Motor</legend>
          <div class="form-group">
            <label for="cilindradas">Cilindradas</label>
            <InputText
              id="cilindradas"
              v-model="motor.cilindradas"
              required
            />
          </div>
          <div class="form-group">
            <label for="tipo_motor">Tipo</label>
            <InputText
              id="tipo_motor"
              v-model="motor.tipo"
              required
            />
          </div>
          <div class="form-group">
            <label for="potencia">Potência</label>
            <InputText
              id="potencia"
              v-model="motor.potencia"
              required
            />
          </div>
          <div class="form-group">
            <label for="torque">Torque</label>
            <InputText
              id="torque"
              v-model="motor.torque"
              required
            />
          </div>
          <div class="form-group">
            <label for="refrigeracao">Refrigeração</label>
            <InputText
              id="refrigeracao"
              v-model="motor.refrigeracao"
            />
          </div>
        </fieldset>

        <!-- Fieldset: Performance -->
        <fieldset class="fieldset">
          <legend>Performance</legend>
          <div class="form-group">
            <label for="velocidade_maxima">Velocidade Máxima</label>
            <InputText
              id="velocidade_maxima"
              v-model="performance.velocidade_maxima"
              required
            />
          </div>
          <div class="form-group">
            <label for="aceleracao">Aceleração (0-100 km/h)</label>
            <InputText
              id="aceleracao"
              v-model="performance.aceleracao"
            />
          </div>
          <div class="form-group">
            <label for="consumo">Consumo</label>
            <InputText
              id="consumo"
              v-model="performance.consumo"
              required
            />
          </div>
          <div class="form-group">
            <label for="transmissao">Transmissão</label>
            <InputText
              id="transmissao"
              v-model="performance.transmissao"
            />
          </div>
        </fieldset>

        <!-- Fieldset: Dimensões -->
        <fieldset class="fieldset">
          <legend>Dimensões</legend>
          <div class="form-group">
            <label for="peso">Peso</label>
            <InputText
              id="peso"
              v-model="dimensoes.peso"
              required
            />
          </div>
          <div class="form-group">
            <label for="comprimento">Comprimento</label>
            <InputText
              id="comprimento"
              v-model="dimensoes.comprimento"
              required
            />
          </div>
          <div class="form-group">
            <label for="altura_assento">Altura do Assento</label>
            <InputText
              id="altura_assento"
              v-model="dimensoes.altura_assento"
              required
            />
          </div>
          <div class="form-group">
            <label for="entre_eixos">Entre-eixos</label>
            <InputText
              id="entre_eixos"
              v-model="dimensoes.entre_eixos"
              required
            />
          </div>
        </fieldset>
      </div>

      <Button
        label="Adicionar"
        type="submit"
      />
    </form>

    <!-- Modal para adicionar Fabricante -->
    <FabricanteDialog
      v-model:visible="fabricanteDialogVisible"
      @added="handleFabricanteAdded"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import FabricanteDialog from '../components/FabricanteDialog.vue'

const formData = ref({
  nome: '',
  ano_fabricacao: null,
  id_fabricante: null,
  imageUrl: ''
})

const motor = ref({
  cilindradas: '',
  tipo: '',
  potencia: '',
  torque: '',
  refrigeracao: ''
})

const performance = ref({
  velocidade_maxima: '',
  aceleracao: '',
  consumo: '',
  transmissao: ''
})

const dimensoes = ref({
  peso: '',
  comprimento: '',
  altura_assento: '',
  entre_eixos: ''
})

const fabricantes = ref([])

const fabricanteDialogVisible = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/motocicletas/list?target=fabricantes')
    if (!response.ok) {
      throw new Error('Erro ao buscar fabricantes')
    }
    const data = await response.json()
    fabricantes.value = Object.entries(data).map(([key, value]) => ({
      code: key,
      name: value
    }))
  } catch (error) {
    console.error('Erro ao buscar fabricantes:', error)
  }
})

function openFabricanteDialog() {
  fabricanteDialogVisible.value = true
}

function handleFabricanteAdded(newFabricante) {
  fabricantes.value.push({
    code: newFabricante.id.toString(),
    name: newFabricante.nome
  })
  formData.value.id_fabricante = newFabricante.id.toString()
}

async function createMoto() {
  const payload = {
    nome: formData.value.nome,
    ano_fabricacao: formData.value.ano_fabricacao,
    id_fabricante: formData.value.id_fabricante,
    json_motor: { ...motor.value },
    json_dimensoes: { ...dimensoes.value },
    json_performance: { ...performance.value }
  }

  try {
    const response = await fetch('http://localhost:3001/motocicletas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Falha ao criar motocicleta')
    }

    const motoCriada = await response.json()
    console.log('Moto criada com sucesso:', motoCriada)

    if (formData.value.imageUrl.trim() !== '') {
      const imgPayload = {
        id_motocicleta: motoCriada.id,
        url: formData.value.imageUrl.trim()
      }
      const imgResponse = await fetch('http://localhost:3001/motocicletas/img', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgPayload)
      })

      if (!imgResponse.ok) {
        throw new Error('Falha ao salvar a imagem')
      }

      const imgData = await imgResponse.json()
      console.log('Imagem salva com sucesso:', imgData)
    }

    formData.value = { nome: '', ano_fabricacao: null, id_fabricante: null, imageUrl: '' }
    motor.value = { cilindradas: '', tipo: '', potencia: '', torque: '', refrigeracao: '' }
    performance.value = { velocidade_maxima: '', aceleracao: '', consumo: '', transmissao: '' }
    dimensoes.value = { peso: '', comprimento: '', altura_assento: '', entre_eixos: '' }

    alert('Moto criada com sucesso!')
  } catch (error) {
    console.error('Erro ao criar moto:', error)
    alert('Erro ao criar moto')
  }
}
</script>

<style scoped>
.moto-create {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.moto-create h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.general-data-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.general-data-container .form-group {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.manufacturer-group .manufacturer-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

/* Container que organiza os fieldsets horizontalmente */
.horizontal-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: space-between;
}

/* Cada fieldset tem largura flexível e um mínimo para manter a legibilidade */
.fieldset {
  flex: 1;
  min-width: 280px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 15px;
}

legend {
  font-weight: bold;
  padding: 0 5px;
}

::v-deep .p-inputtext,
::v-deep .p-dropdown {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  height: 2.5rem;
  box-sizing: border-box;
}

::v-deep .p-button {
  display: block;
  width: 100%;
}

/* Estilização específica para o botão de adicionar fabricante */
.add-manufacturer-button {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
