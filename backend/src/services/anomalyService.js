import { fetchRecentSeismicEvents } from './emscService.js'
import { fetchMockDeformationData } from './deformationService.js'

const CAMPI_FLEGREI_COORDS = [40.827, 14.139]
const MAX_DISTANCE_KM = 100
const MAG_THRESHOLD = 3.5
const TIME_WINDOW_HOURS = 6
const UPLIFT_THRESHOLD = 10

function getDistanceKm([lat1, lon1], [lat2, lon2]) {
    const R = 6371
    const toRad = (d) => (d * Math.PI) / 180
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function checkForAnomalies() {
    const events = await fetchRecentSeismicEvents()
    const gps = await fetchMockDeformationData()
    const now = Date.now()

    // Filter quakes
    const significantQuakes = events.filter((e) => {
        const t = new Date(e.time).getTime()
        const dist = getDistanceKm(CAMPI_FLEGREI_COORDS, [e.coordinates[1], e.coordinates[0]])
        return (
            e.magnitude >= MAG_THRESHOLD &&
            (now - t) / (1000 * 60 * 60) <= TIME_WINDOW_HOURS &&
            dist <= MAX_DISTANCE_KM
        )
    })

    // Check if any GPS station shows uplift > threshold
    const highUplift = gps.filter((s) => {
        const dist = getDistanceKm(CAMPI_FLEGREI_COORDS, s.coords)
        return s.uplift >= UPLIFT_THRESHOLD && dist <= MAX_DISTANCE_KM
    })

    return {
        alert: significantQuakes.length >= 3 && highUplift.length >= 1,
        quakes: significantQuakes,
        deformation: highUplift,
        summary: {
            quakeCount: significantQuakes.length,
            gpsStations: highUplift.map((s) => s.station),
        },
    }
}
