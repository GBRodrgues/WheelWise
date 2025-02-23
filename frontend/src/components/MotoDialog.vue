<template>
  <Dialog
    header="Detalhes da Moto"
    v-model:visible="visible"
    :modal="true"
    :closable="true"
    style="width: 60vw"
    @hide="handleHide"
  >
    <div class="dialog-content">
      <div class="moto-details">
        <img
          :src="motoImage"
          alt="Imagem da Moto"
          class="moto-image-dialog"
        />
        <div class="specifications">
          <div class="specs">
            <h2>{{ moto.nome }} - {{ moto.fabricante.nome }}</h2>
            <b>Motor</b>
            <p>Cilindrada: {{ moto.json_motor.cilindradas }}</p>
            <p>Tipo: {{ moto.json_motor.tipo }}</p>
            <p>Potência: {{ moto.json_motor.potencia }}</p>
            <p>Torque: {{ moto.json_motor.torque }}</p>
            <p v-if="moto.json_motor.refrigeracao">
              Refrigeração: {{ moto.json_motor.refrigeracao }}
            </p>
          </div>
          <div class="specs">
            <b>Performance</b>
            <p>Velocidade Máxima: {{ moto.json_performance.velocidade_maxima }}</p>
            <p v-if="moto.json_performance.aceleracao">
              Aceleração: {{ moto.json_performance.aceleracao }} s (0-100 km/h)
            </p>
            <p>Consumo: {{ moto.json_performance.consumo }}</p>
            <p v-if="moto.json_performance.transmissao">
              Transmissão: {{ moto.json_performance.transmissao }}
            </p>
          </div>
          <div class="specs">
            <b>Dimensões</b>
            <p>Peso: {{ moto.json_dimensoes.peso }}</p>
            <p>Comprimento: {{ moto.json_dimensoes.comprimento }}</p>
            <p>Altura do Assento: {{ moto.json_dimensoes.altura_assento }}</p>
            <p>Entre-eixos: {{ moto.json_dimensoes.entre_eixos }}</p>
          </div>
        </div>
      </div>

      <Comment :motoId="moto.id" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Comment from './Comment.vue'

const props = defineProps({
  moto: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const visible = ref(true)

const handleHide = () => emit('close')

const motoImage = computed(() =>
  props.moto.imagens && props.moto.imagens.length > 0
    ? props.moto.imagens[0].url
    : 'https://placehold.co/600x400'
)
</script>

<style scoped>
.moto-details {
  display: flex;
  gap: 20px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.moto-image-dialog {
  width: 60%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.specifications {
  margin-top: 10px;
}

.specs {
  margin-bottom: 20px;
}
</style>
