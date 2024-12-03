<template>
    <div class="review-list">
      <h2>Reviews</h2>
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <strong>{{ review.user }}:</strong> {{ review.comment }}
          <span> - {{ review.rating }}/5</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      motoId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        reviews: [],
      };
    },
    async created() {
      try {
        const response = await axios.get(`/api/motos/${this.motoId}/reviews`);
        this.reviews = response.data;
      } catch (error) {
        console.error('Erro ao carregar reviews:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .review-list ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  </style>
  