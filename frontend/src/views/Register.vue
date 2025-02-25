<template>
  <div class="register-container">
    <h1>Cadastra-se</h1>
    <form @submit.prevent="submitForm">
      <div
        class="form-group"
        v-for="field in fields"
        :key="field.id"
      >
        <FloatLabel>
          <InputText
            :id="field.id"
            :type="field.type"
            v-model="formData[field.model]"
            :required="field.required"
          />
          <label :for="field.id">{{ field.label }}</label>
        </FloatLabel>
      </div>
      <div class="form-group">
        <FloatLabel>
          <Dropdown
            id="uf"
            v-model="formData.UF"
            :options="states"
            optionLabel="name"
            optionValue="code"
            required
            style="width: 100%"
          />
          <label for="uf">UF</label>
        </FloatLabel>
      </div>
      <Button type="submit">Cadastra-se</Button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'

const defaultFormData = {
  nome: '',
  email: '',
  senha: '',
  idade: null,
  UF: ''
}

const formData = reactive({ ...defaultFormData })

const fields = [
  { id: 'nome', label: 'Nome', type: 'text', model: 'nome', required: true },
  { id: 'email', label: 'Email', type: 'email', model: 'email', required: true },
  { id: 'senha', label: 'Senha', type: 'password', model: 'senha', required: true },
  { id: 'idade', label: 'Idade', type: 'number', model: 'idade', required: true }
]

const states = [
  { code: 'AC', name: 'AC' },
  { code: 'AL', name: 'AL' },
  { code: 'AP', name: 'AP' },
  { code: 'AM', name: 'AM' },
  { code: 'BA', name: 'BA' },
  { code: 'CE', name: 'CE' },
  { code: 'DF', name: 'DF' },
  { code: 'ES', name: 'ES' },
  { code: 'GO', name: 'GO' },
  { code: 'MA', name: 'MA' },
  { code: 'MT', name: 'MT' },
  { code: 'MS', name: 'MS' },
  { code: 'MG', name: 'MG' },
  { code: 'PA', name: 'PA' },
  { code: 'PB', name: 'PB' },
  { code: 'PR', name: 'PR' },
  { code: 'PE', name: 'PE' },
  { code: 'PI', name: 'PI' },
  { code: 'RJ', name: 'RJ' },
  { code: 'RN', name: 'RN' },
  { code: 'RS', name: 'RS' },
  { code: 'RO', name: 'RO' },
  { code: 'RR', name: 'RR' },
  { code: 'SC', name: 'SC' },
  { code: 'SP', name: 'SP' },
  { code: 'SE', name: 'SE' },
  { code: 'TO', name: 'TO' }
]

async function submitForm() {
  try {
    const response = await fetch('http://localhost:3001/auth/registerUsr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    console.log('Success:', data)
    resetForm()
  } catch (error) {
    console.error('Error:', error)
  }
}

function resetForm() {
  Object.assign(formData, defaultFormData)
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 8px;
}

.register-container h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 30px;
}

::v-deep label {
  font-size: 1rem;
  color: #666;
}

Button {
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>
