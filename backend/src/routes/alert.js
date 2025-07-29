// routes/alert.js
import express from 'express'
import axios from 'axios'
const router = express.Router()

// Define thresholds
const MAG_THRESHOLD = 3.5
const QUAKE_COUNT_THRESHOLD = 5
const UPLIFT_THRESHOLD_MM = 10

router.get('/', async (req, res) => {
    try {
        // Fetch recent seismic data
        const quakeRes = await axios.get('http://localhost:3000/api/seismic/recent')
        const quakes = quakeRes.data || []

        // Fetch deformation data
        const deformationRes = await axios.get('http://localhost:3000/api/deformation/gps')
        const gpsStations = deformationRes.data || []

        // Check how many strong quakes occurred recently
        const strongQuakes = quakes.filter(q => q.magnitude >= MAG_THRESHOLD)

        // Check which stations have uplift > threshold
        const upliftedStations = gpsStations.filter(st => st.uplift >= UPLIFT_THRESHOLD_MM)

        // Build alert response if thresholds are exceeded
        const alertActive = strongQuakes.length >= QUAKE_COUNT_THRESHOLD || upliftedStations.length > 0

        const alert = {
            alert: alertActive,
            summary: {
                quakeCount: strongQuakes.length,
                gpsStations: upliftedStations.map(st => st.station),
            },
            timestamp: new Date().toISOString()
        }

        res.json(alert)
    } catch (err) {
        console.error('[Alert] Error:', err.message)
        res.status(500).json({ error: 'Failed to evaluate alert conditions' })
    }
})

export default router
