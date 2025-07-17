<template>
  <div class="p-6 space-y-6">
    <!-- 🔴 Anomaly Alert -->
    <div
      v-if="alert?.alert"
      style="width: 750px; height: 50px"
    >
      ⚠️ Multi-signal volcanic anomaly detected!
      <ul class="mt-2 text-sm font-normal text-white">
        <li>🟡 {{ alert.summary.quakeCount }} quakes > M3.5 in last 6h</li>
        <li>📈 Uplift >10mm at: {{ alert.summary.gpsStations.join(', ') }}</li>
      </ul>
    </div>
    <!-- 🌍 Seismic Map -->
    <div>
      <SeismicMap :events="events"/>
    </div>

    <!-- 🧭 3D Terrain Deformation Viewer -->
    <div>
      <h2 class="text-xl font-semibold mb-2">3D Deformation Viewer</h2>
      <Deformation3D />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Components
import SeismicMap from '../components/SeismicMap.vue'
import Deformation3D from '../components/Deformation3D.vue'

// State
const alert = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('/api/seismic/alert')
    alert.value = response.data
  } catch (error) {
    console.error('Failed to fetch alert data', error)
  }
})
</script>
