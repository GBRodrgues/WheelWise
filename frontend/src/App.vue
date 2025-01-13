<template>
  <div id="app">
    <div
      v-for="(moto, index) in motos"
      :key="index"
      style="margin-bottom: 20px;"
    >
      <MotoCard :moto="moto" />
    </div>
  </div>
</template>

<script setup>
import MotoCard from './components/MotoCard.vue'
import { ref } from 'vue'

const motos = ref([
  {
    name: 'CB 650R',
    brand: 'Honda',
    price: 10000,
    engine: {
      displacement: 649,
      power: 95,
      torque: 64,
      cylinders: 4,
    },
    performance: {
      topSpeed: 220,
      acceleration: 3.5,
      consumption: 20,
    },
    dimensions: {
      weight: 202,
      seatHeight: 810,
      tankCapacity: 15.4,
    },
    image: 'https://placehold.co/600x400',
  },
  {
    name: 'Super Meteor 650',
    brand: 'Royal Enfield',
    price: 8000,
    engine: {
      displacement: 648,
      power: 47,
      torque: 52,
      cylinders: 1,
    },
    performance: {
      topSpeed: 160,
      acceleration: 4.5,
      consumption: 25,
    },
    dimensions: {
      weight: 202,
      seatHeight: 800,
      tankCapacity: 13.5,
    },
    image: 'https://placehold.co/600x400',
  }
])
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

div[v-for] {
  width: 100%;
  max-width: 600px;
}
</style>
