<template>
  <Button @click="addCardEntry">Adicionar Card</Button>

  <div class="cards-wrapper">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card-container"
    >
      <Select
        v-model="card.selectedMotoId"
        :options="motos"
        optionLabel="nome"
        optionValue="id"
        placeholder="Selecione uma moto"
      />
      <div v-if="card.selectedMotoId">
        <MotoCard
          :moto="findMotoById(card.selectedMotoId)"
          :key="card.selectedMotoId"
          show-spec
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MotoCard from '../components/MotoCard.vue'
import Select from 'primevue/select'
import Button from 'primevue/button'

const MAX_CARDS = 3
const motos = ref([])
const cards = ref([{ selectedMotoId: null }, { selectedMotoId: null }])

function addCardEntry() {
  if (cards.value.length < MAX_CARDS) {
    cards.value.push({ selectedMotoId: null })
  }
}

function findMotoById(selectedId) {
  return motos.value.find(moto => moto.id === selectedId)
}

async function loadMotos() {
  try {
    const response = await fetch('http://localhost:3001/motocicletas')
    motos.value = await response.json()
    console.log('Fetched motos:', motos.value)
  } catch (error) {
    console.error('Error fetching motos:', error)
  }
}

onMounted(loadMotos)
</script>

<style scoped>
.cards-wrapper {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.card-container {
  border-radius: 8px;
  max-width: 400px;
}
</style>
