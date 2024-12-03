<template>
    <div class="moto-card">
      <img :src="moto.image" :alt="moto.name" />
      <h3>{{ moto.name }}</h3>
      <p>{{ moto.description }}</p>
      <button @click="viewDetails">Ver Detalhes</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      moto: {
        type: Object,
        required: true,
      },
    },
    methods: {
      viewDetails() {
        this.$emit('view-details', this.moto.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .moto-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  