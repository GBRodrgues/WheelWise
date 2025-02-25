<template>
  <div>
    <h1>Catálogo de Motos</h1>
    <p>Selecione uma moto para ver mais detalhes</p>
    <div class="cards-wrapper">
      <div
        v-for="moto in motos"
        :key="moto.id || moto.name"
        class="card-container"
      >
        <MotoCard
          :moto="moto"
          @click="openMotoDialog(moto)"
        />
      </div>
    </div>
    <MotoDialog
      v-if="showDialog"
      :moto="selectedMoto"
      @close="showDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MotoCard from '../components/MotoCard.vue'
import MotoDialog from '@/components/MotoDialog.vue'

const motos = ref([])
const selectedMoto = ref(null)
const showDialog = ref(false)

function openMotoDialog(moto) {
  selectedMoto.value = moto
  showDialog.value = true
}

const fetchMotos = async () => {
  try {
    const response = await fetch('http://localhost:3001/motocicletas')
    motos.value = await response.json()
  } catch (error) {
    console.error('Error fetching motos:', error)
  }
}

onMounted(fetchMotos)
</script>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
