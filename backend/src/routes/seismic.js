// routes/seismic.js or inside server.js
import express from 'express'
import axios from 'axios'

const router = express.Router()

// Bounding box for Campi Flegrei
const inCampiFlegrei = ([lon, lat]) =>
    lat >= 40.75 && lat <= 40.9 && lon >= 14.0 && lon <= 14.3

router.get('/events', async (req, res) => {
    try {
        const { range = 'day', region } = req.query

        const urlMap = {
            day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
            week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
            month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
        }

        const url = urlMap[range] || urlMap['day']
        const response = await axios.get(url)

        let events = response.data.features.map((e) => ({
            id: e.id,
            magnitude: e.properties.mag,
            time: e.properties.time,
            location: e.properties.place,
            coordinates: e.geometry.coordinates, // [lon, lat, depth]
        }))

        // Optional filtering
        if (region === 'campi') {
            events = events.filter((e) => inCampiFlegrei(e.coordinates))
        }

        res.json(events)
    } catch (err) {
        console.error('Error fetching seismic events', err)
        res.status(500).json({ error: 'Failed to fetch data' })
    }
})

export default router
