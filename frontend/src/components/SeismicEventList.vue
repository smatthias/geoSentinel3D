<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Recent Earthquakes</h2>
    <ul>
      <li v-for="event in events" :key="event.id" class="mb-2">
        <strong>{{ event.magnitude.toFixed(1) }}</strong> – {{ event.location }} <br />
        <small>{{ new Date(event.time).toLocaleString() }}</small>
      </li>
    </ul>
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
