<template>
  <Button @click="addCard">Adicionar Card</Button>

  <div class="cards-wrapper">
    <div
      v-for="(card, index) in cardList"
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
          :moto="getMoto(card.selectedMotoId)"
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

const motos = ref([])
const cardList = ref([{ selectedMotoId: null }, { selectedMotoId: null }])

function addCard() {
  if (cardList.value.length >= 5) return
  cardList.value.push({ selectedMotoId: null })
}

function getMoto(selectedId) {
  return motos.value.find(moto => moto.id === selectedId)
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/motocicletas')
    motos.value = await response.json()
    console.log('Motos:', motos.value)
  } catch (error) {
    console.error('Error fetching motos:', error)
  }
})
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
