<template>
    <div class="home-page">
      <!-- Barra de Busca -->
      <SearchBar @select="handleSearch" />
  
      <!-- Lista de Motos -->
      <div class="moto-list">
        <MotoCard
          v-for="moto in motos"
          :key="moto.id"
          :moto="moto"
          @view-details="viewMotoDetails"
        />
      </div>
  
      <!-- Modal para Detalhes da Moto -->
      <div v-if="selectedMoto" class="modal">
        <MotoDetails :moto="selectedMoto" />
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from "@/components/SearchBar.vue";
  import MotoCard from "@/components/MotoCard.vue";
  import MotoDetails from "@/components/MotoDetails.vue";
  import axios from "axios";
  
  export default {
    components: {
      SearchBar,
      MotoCard,
      MotoDetails,
    },
    data() {
      return {
        motos: [], // Lista de motos carregadas
        selectedMoto: null, // Moto selecionada para exibir detalhes
      };
    },
    async created() {
      await this.loadMotos();
    },
    methods: {
      async loadMotos() {
        try {
          const response = await axios.get("/api/motos");
          this.motos = response.data;
        } catch (error) {
          console.error("Erro ao carregar motos:", error);
        }
      },
      handleSearch(searchResult) {
        // Atualiza a lista com base no resultado da busca
        this.motos = [searchResult];
      },
      async viewMotoDetails(motoId) {
        try {
          const response = await axios.get(`/api/motos/${motoId}`);
          this.selectedMoto = response.data;
        } catch (error) {
          console.error("Erro ao carregar detalhes da moto:", error);
        }
      },
      closeModal() {
        this.selectedMoto = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .home-page {
    padding: 20px;
  }
  
  .moto-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  button {
    margin-top: 20px;
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: #0056b3;
  }
  </style>
  