<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="p-4 bg-red-700 text-white">
      <h1 class="text-2xl font-semibold">🌋 VulcanSight Dashboard</h1>
    </header>
    <main class="p-4 space-y-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/seismic/recent')
    events.value = res.data
  } catch (err) {
    console.error('Failed to load seismic data', err)
  }
})
</script>
