<template>
  <div>
    <!-- 🔴 Alert Box -->
    <div
      v-if="alert?.alert"
      class="p-4 mb-4 bg-red-600 text-white font-bold text-lg rounded-lg shadow-md"
    >
      ⚠️ Multi-signal volcanic anomaly detected!
      <ul class="mt-2 text-sm font-normal text-white">
        <li>🟡 {{ alert.summary.quakeCount }} quakes > M3.5 in last 6h</li>
        <li>📈 Uplift >10mm at: {{ alert.summary.gpsStations.join(', ') }}</li>
      </ul>
    </div>
  </div>

  <div ref="mapContainer" style="width: 750px; height: 750px" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import axios from 'axios'

const mapContainer = ref()
const alert = ref(null)
const events = ref([]) // Local ref, not from props

let map = null
let markers = []
let deformationArrows = []

onMounted(async () => {
  console.log('🗺️ Map setup started')

  // Initialize map
  map = L.map(mapContainer.value).setView([40.8, 14.4], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map © OpenStreetMap contributors',
  }).addTo(map)

  // Load deformation data
  try {
    const deformation = await axios.get('/api/deformation/gps')
    deformation.data.forEach((station) => {
      const { coords, uplift, direction, station: name } = station
      const [lat, lon] = coords
      const [dx, dy] = direction

      const arrow = L.polyline(
        [
          [lat, lon],
          [lat + dy / 100000, lon + dx / 100000], // scaled
        ],
        {
          color: 'blue',
          weight: 3,
          opacity: 0.8,
        }
      ).bindPopup(
        `<strong>${name}</strong><br>Uplift: ${uplift.toFixed(
          1
        )} mm<br>ΔE ${dx} mm / ΔN ${dy} mm`
      )
      arrow.addTo(map)
      deformationArrows.push(arrow)
    })
  } catch (e) {
    console.error('Failed to load deformation data:', e)
  }

  // Load seismic events
  try {
    const response = await axios.get('/api/seismic/recent')
    events.value = response.data
  } catch (err) {
    console.error('Failed to fetch seismic events', err)
  }

  // Load alert
  try {
    const response = await axios.get('/api/seismic/alert')
    alert.value = response.data
  } catch (err) {
    console.error('Failed to fetch alert data', err)
  }
})

// Reactively draw markers when events load
watch(
  () => events.value,
  (newEvents) => {
    markers.forEach((m) => m.remove())
    markers = []

    newEvents.forEach((event) => {
      const [lon, lat] = event.coordinates
      const marker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(
          `<strong>M ${event.magnitude}</strong><br>${event.location}<br><small>${new Date(
            event.time
          ).toLocaleString()}</small>`
        )
      markers.push(marker)
    })
  },
  { immediate: true }
)
</script>
