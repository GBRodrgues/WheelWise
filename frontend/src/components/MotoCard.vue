<template>
  <div class="card">
    <img
      :src="motoImage"
      alt="Imagem da moto"
      class="moto-image"
    />
    <h2>{{ moto.nome }} - {{ moto.fabricante.nome }}</h2>

    <Accordion v-if="showSpec">
      <AccordionTab header="Motor">
        <p>Cilindrada: {{ moto.json_motor.cilindradas }}</p>
        <p>Tipo: {{ moto.json_motor.tipo }}</p>
        <p>Potência: {{ moto.json_motor.potencia }}</p>
        <p>Torque: {{ moto.json_motor.torque }}</p>
        <p v-if="moto.json_motor.refrigeracao">
          Refrigeração: {{ moto.json_motor.refrigeracao }}
        </p>
      </AccordionTab>
      <AccordionTab header="Performance">
        <p>Velocidade Máxima: {{ moto.json_performance.velocidade_maxima }}</p>
        <p v-if="moto.json_performance.aceleracao">
          Aceleração: {{ moto.json_performance.aceleracao }} s (0-100 km/h)
        </p>
        <p>Consumo: {{ moto.json_performance.consumo }}</p>
        <p v-if="moto.json_performance.transmissao">
          Transmissão: {{ moto.json_performance.transmissao }}
        </p>
      </AccordionTab>
      <AccordionTab header="Dimensões">
        <p>Peso: {{ moto.json_dimensoes.peso }}</p>
        <p>Comprimento: {{ moto.json_dimensoes.comprimento }}</p>
        <p>Altura do Assento: {{ moto.json_dimensoes.altura_assento }}</p>
        <p>Entre-eixos: {{ moto.json_dimensoes.entre_eixos }}</p>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const props = defineProps({
  moto: {
    type: Object,
    required: true
  },
  showSpec: {
    type: Boolean,
    default: false
  }
})

const { moto, showSpec } = props

const motoImage = computed(() => {
  return props.moto.imagens?.[0]?.url || 'https://placehold.co/600x400'
})

</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  overflow: hidden;
  padding: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.moto-image {
  display: block;
  width: 423px;
  height: 240px;
  border-radius: 4px;
  margin-bottom: 16px;
  object-fit: cover;
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 16px;
}

p {
  margin: 8px 0;
  line-height: 1.5;
}
</style>
