import express from 'express'
import { fetchRecentSeismicEvents } from '../services/emscService.js'
import { checkForAnomalies } from '../services/anomalyService.js'

const router = express.Router()

router.get('/recent', async (req, res) => {
    try {
        const events = await fetchRecentSeismicEvents()
        res.json(events)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch seismic data' })
    }
})

router.get('/alert', async (req, res) => {
    try {
        const alert = await checkForAnomalies()
        res.json(alert)
    } catch (err) {
        res.status(500).json({ error: 'Anomaly detection failed' })
    }
})

export default router
