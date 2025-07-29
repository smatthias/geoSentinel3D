<template>
  <div class="p-6 space-y-6">

    <!-- Filter Controls -->
    <div class="flex space-x-4 items-center">
      <label>
        Range:
        <select v-model="range" class="ml-2 border rounded p-1">
          <option value="day">1 Day</option>
          <option value="week">7 Days</option>
          <option value="month">30 Days</option>
        </select>
      </label>

      <label>
        <input type="checkbox" v-model="onlyCampi" class="ml-2" />
        Only Campi Flegrei
      </label>

      <button @click="loadEvents" class="bg-blue-600 text-white px-4 py-2 rounded">
        🔄 Refresh
      </button>
    </div>

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
const range = ref('day')
const onlyCampi = ref(false)
const events = ref([])

async function loadEvents() {
  try {
    const response = await axios.get('/api/seismic/events', {
      params: {
        range: range.value,
        region: onlyCampi.value ? 'campi' : '',
      },
    })
    events.value = response.data
  } catch (err) {
    console.error('Failed to fetch filtered events', err)
  }
}


onMounted(async () => {
  try {
    const response = await axios.get('/api/alert')
    alert.value = response.data
  } catch (error) {
    console.error('Failed to fetch alert data', error)
  }
})
</script>
