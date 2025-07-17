<template>
  <div v-if="alert.alert" class="p-4 bg-red-600 text-white font-bold text-lg rounded">
    ⚠️ Multi-signal volcanic anomaly detected!
    <ul class="mt-2 text-sm font-normal">
      <li>🟡 {{ alert.summary.quakeCount }} quakes > M3.5 in last 6h</li>
      <li>📈 Uplift >10mm at: {{ alert.summary.gpsStations.join(', ') }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const alert = ref({})
const MAG_THRESHOLD = 3.5

onMounted(async () => {
  const res = await axios.get('/api/seismic/alert')
  alert.value = res.data
})
</script>
