<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      class="bg-white border-2 border-blue-600 rounded-2xl shadow-lg p-6 w-full max-w-md relative"
    >
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h2 class="text-2xl font-bold text-center mb-6">
        {{ isLogin ? 'Login' : 'Register' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-if="!isLogin"
            v-model="form.name"
            type="text"
            placeholder="Full Name"
            class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {{ isLogin ? 'Login' : 'Register' }}
          </button>
        </div>
      </form>

      <div class="text-sm text-center mt-6">
        <span>{{ isLogin ? "Don't have an account?" : "Already have an account?" }}</span>
        <button class="text-blue-600 hover:underline ml-1" @click="isLogin = !isLogin">
          {{ isLogin ? 'Register' : 'Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps(['show'])
defineEmits(['close'])

const isLogin = ref(true)

const form = reactive({
  email: '',
  password: '',
  name: ''
})

function handleSubmit() {
  console.log(isLogin.value ? 'Login:' : 'Register:', form)
}
</script>
