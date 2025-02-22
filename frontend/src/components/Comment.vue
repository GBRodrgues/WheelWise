<template>
  <div class="comments-section">
    <h3>Comentários</h3>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="comment"
    >
      <div class="comment-header">
        <p>
          <strong>{{ comment.user_name }} ({{ comment.user_uf }}) </strong>
          <small>{{ formatDate(comment.createdAt) }}</small>
        </p>
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger"
          @click="deleteComment(comment.id)"
        >X</Button>
      </div>
      {{ comment.content }}
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps({
  motoId: {
    type: [String, Number],
    required: true
  }
})

const comments = ref([])
const newComment = ref("")

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

async function fetchComments() {
  try {
    const response = await fetch(`http://localhost:3001/comment?moto_id=${props.motoId}`)
    if (!response.ok) {
      throw new Error('Erro ao carregar comentários')
    }
    const data = await response.json()
    comments.value = data.comments
  } catch (error) {
    console.error('Erro ao buscar comentários:', error)
  }
}

async function addComment() {
  if (!newComment.value.trim()) return

  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    alert('Você precisa estar logado para comentar.')
    return
  }
  const user = JSON.parse(storedUser)

  const commentData = {
    user_id: user.id,
    moto_id: props.motoId,
    content: newComment.value.trim(),
    status: true
  }

  try {
    const response = await fetch('http://localhost:3001/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar comentário')
    }

    const savedComment = await response.json()
    savedComment.user_name = user.nome
    savedComment.user_uf = user.uf
    comments.value.push(savedComment)
    newComment.value = ""
  } catch (error) {
    console.error('Erro ao enviar comentário:', error)
  }
}

async function deleteComment(commentId) {
  if (!confirm('Tem certeza que deseja excluir este comentário?')) return

  try {
    const response = await fetch('http://localhost:3001/comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_comentario: commentId, status: false })
    })

    if (!response.ok) {
      throw new Error('Falha ao excluir comentário')
    }

    comments.value = comments.value.filter(comment => comment.id !== commentId)
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
  }
}


onMounted(() => {
  fetchComments()
})
</script>

<style scoped>
.comments-section {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 20px;
}

.comment {
  padding: 5px 0;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

::v-deep .p-inputtext {
  width: 100%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
