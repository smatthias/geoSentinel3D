<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div v-if="isLogin">
        <input
          type="email"
          v-model="loginForm.email"
          placeholder="Email"
          class="input"
        />
        <input
          type="password"
          v-model="loginForm.password"
          placeholder="Password"
          class="input"
        />
      </div>

      <div v-else>
        <input
          type="email"
          v-model="registerForm.email"
          placeholder="Email"
          class="input"
        />
        <input
          type="password"
          v-model="registerForm.password"
          placeholder="Password"
          class="input"
        />
        <input
          type="text"
          v-model="registerForm.name"
          placeholder="Full Name"
          class="input"
        />
      </div>

      <button type="submit">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

const isLogin = ref(true)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  name: ''
})

function handleSubmit() {
  if (isLogin.value) {
    console.log('Logging in with', loginForm.value)
    // call your login API
  } else {
    console.log('Registering with', registerForm.value)
    // call your register API
  }
}
</script>

<style scoped>
button {
  outline: none;
}
</style>
