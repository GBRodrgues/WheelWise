<template>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        @input="fetchSuggestions"
        type="text"
        placeholder="Busque motos, peças, etc."
      />
      <ul v-if="suggestions.length">
        <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        suggestions: [],
      };
    },
    methods: {
      async fetchSuggestions() {
        if (this.searchQuery.length < 3) {
          this.suggestions = [];
          return;
        }
        try {
          const response = await axios.get(`/api/search?q=${this.searchQuery}`);
          this.suggestions = response.data;
        } catch (error) {
          console.error('Erro ao buscar sugestões:', error);
        }
      },
      selectSuggestion(suggestion) {
        this.$emit('select', suggestion);
        this.searchQuery = suggestion.name;
        this.suggestions = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    position: relative;
    width: 100%;
  }
  
  ul {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    cursor: pointer;
  }
  li:hover {
    background: #f0f0f0;
  }
  </style>
  