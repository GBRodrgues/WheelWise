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
          <h2>{{ moto.nome }} - {{ moto.fabricante.nome }}</h2>
          <b>Motor</b>
          <p>Cilindrada: {{ moto.json_motor.cilindradas }}</p>
          <p>Tipo: {{ moto.json_motor.tipo }}</p>
          <p>Potência: {{ moto.json_motor.potencia }}</p>
          <p>Torque: {{ moto.json_motor.torque }}</p>
          <p v-if="moto.json_motor.refrigeracao">
            Refrigeração: {{ moto.json_motor.refrigeracao }}
          </p>
          <b>Performance</b>
          <p>Velocidade Máxima: {{ moto.json_performance.velocidade_maxima }}</p>
          <p v-if="moto.json_performance.aceleracao">
            Aceleração: {{ moto.json_performance.aceleracao }} s (0-100 km/h)
          </p>
          <p>Consumo: {{ moto.json_performance.consumo }}</p>
          <p v-if="moto.json_performance.transmissao">
            Transmissão: {{ moto.json_performance.transmissao }}
          </p>
          <b>Dimensões</b>
          <p>Peso: {{ moto.json_dimensoes.peso }}</p>
          <p>Comprimento: {{ moto.json_dimensoes.comprimento }}</p>
          <p>Altura do Assento: {{ moto.json_dimensoes.altura_assento }}</p>
          <p>Entre-eixos: {{ moto.json_dimensoes.entre_eixos }}</p>
        </div>
      </div>

      <div class="comments-section">
        <h3>Comentários</h3>
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="comment"
        >
          <p>{{ comment }}</p>
        </div>
        <div class="add-comment">
          <InputText
            v-model="newComment"
            placeholder="Adicionar comentário"
            @keyup.enter="addComment"
          />
          <Button
            label="Enviar"
            icon="pi pi-check"
            @click="addComment"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

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

const comments = ref([
  'Esta moto é fantástica!',
  'Incrível desempenho e design.'
])

const newComment = ref('')

async function addComment() {
  if (!newComment.value.trim()) return

  const storedUser = localStorage.getItem('user')
  if (!storedUser) return

  const commentData = {
    user_id: JSON.parse(storedUser).id,
    moto_id: props.moto.id,
    content: newComment.value.trim(),
    status: true
  }

  try {
    const response = await fetch('http://localhost:3001/comment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar comentário')
    }

    const savedComment = await response.json()
    comments.value.push(savedComment.content)
    newComment.value = ''
  } catch (error) {
    console.error('Erro ao enviar comentário:', error)
  }
}
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
}

.specifications {
  margin-top: 10px;
}

.comments-section {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.comment {
  padding: 5px 0;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.p-inputtext {
  width: 100%;
}
</style>
