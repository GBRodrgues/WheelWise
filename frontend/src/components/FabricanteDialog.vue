<template>
  <Dialog
    header="Adicionar Fabricante"
    v-model:visible="visible"
    :modal="true"
    :closable="true"
    style="width: 40vw"
    @hide="handleHide"
  >
    <form @submit.prevent="createFabricante">
      <div class="form-group">
        <label for="nome">Nome</label>
        <InputText
          id="nome"
          v-model="form.nome"
          required
        />
      </div>
      <div class="form-group">
        <label for="nacionalidade">Nacionalidade</label>
        <InputText
          id="nacionalidade"
          v-model="form.nacionalidade"
          required
        />
      </div>
      <div class="form-group">
        <label for="data_fundacao">Data de Fundação</label>
        <InputText
          id="data_fundacao"
          v-model="form.data_fundacao"
          required
        />
      </div>
      <Button
        label="Salvar"
        type="submit"
      />
    </form>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'added'])

const visible = ref(props.modelValue)

const form = ref({
  nome: '',
  nacionalidade: '',
  data_fundacao: ''
})

function handleHide() {
  visible.value = false
  emit('update:modelValue', false)
}

async function createFabricante() {
  try {
    const response = await fetch('http://localhost:3001/motocicletas/fabricante', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!response.ok) {
      throw new Error('Erro ao criar fabricante')
    }
    const data = await response.json()
    // Emite o fabricante criado para que o componente pai possa atualizá-lo
    emit('added', data)
    // Limpa o formulário e fecha o modal
    form.value = { nome: '', nacionalidade: '', data_fundacao: '' }
    visible.value = false
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Erro ao criar fabricante:', error)
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
