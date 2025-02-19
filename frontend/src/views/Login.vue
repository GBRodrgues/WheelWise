<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <FloatLabel>
          <InputText
            id="email"
            type="email"
            v-model="formData.email"
            required
          />
          <label for="email">Email</label>
        </FloatLabel>
      </div>
      <div class="form-group">
        <FloatLabel>
          <InputText
            id="senha"
            type="password"
            v-model="formData.senha"
            required
          />
          <label for="senha">Senha</label>
        </FloatLabel>
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const formData = ref({
  email: '',
  senha: ''
})

const login = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = '/'
    } else {
      alert('Email ou senha inválidos')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  margin-bottom: 20px;
}

Button {
  width: 100%;
}
</style>
