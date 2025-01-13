<template>
  <div class="card">
    <img
      :src="moto.image"
      alt="Moto image"
      class="moto-image"
    />
    <h2>{{ moto.name }} - {{ moto.brand }}</h2>
    <p>Preço: R${{ moto.price }}</p>
    <Accordion>
      <AccordionPanel value="1">
        <AccordionHeader>Motor</AccordionHeader>
        <AccordionContent>
          <p>Cilindradas: {{ moto.engine.displacement }} cc</p>
          <p>Potência: {{ moto.engine.power }} hp</p>
          <p>Torque: {{ moto.engine.torque }} Nm</p>
          <p>Cilindros: {{ moto.engine.cylinders }}</p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="2">
        <AccordionHeader>Performance</AccordionHeader>
        <AccordionContent>
          <p>Velocidade Máxima: {{ moto.performance.topSpeed }} km/h</p>
          <p>Aceleração: {{ moto.performance.acceleration }} s (0-100 km/h)</p>
          <p>Consumo: {{ moto.performance.consumption }} km/l</p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="3">
        <AccordionHeader>Dimensões</AccordionHeader>
        <AccordionContent>
          <p>Peso: {{ moto.dimensions.weight }} kg</p>
          <p>Altura do Banco: {{ moto.dimensions.seatHeight }} mm</p>
          <p>Capacidade do Tanque: {{ moto.dimensions.tankCapacity }} l</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

import { defineProps } from 'vue'

const props = defineProps({
  moto: {
    type: Object,
    required: true,
  },
})
</script>

<style>
.card {
  padding: 20px;
  border-radius: 5px;
  background-color: #18181b;
  color: #fff;
}

.moto-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}
</style>
