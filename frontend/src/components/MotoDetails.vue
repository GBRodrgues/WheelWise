<template>
    <div class="moto-details" v-if="moto">
      <img :src="moto.image" :alt="moto.name" />
      <h1>{{ moto.name }}</h1>
      <p>{{ moto.description }}</p>
      <ul>
        <li v-for="(value, key) in moto.specifications" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
      <button @click="$router.back()">Voltar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        moto: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/motos/${id}`);
        this.moto = response.data;
      } catch (error) {
        console.error('Erro ao carregar detalhes da moto:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .moto-details img {
    max-width: 100%;
    border-radius: 8px;
  }
  </style>
  