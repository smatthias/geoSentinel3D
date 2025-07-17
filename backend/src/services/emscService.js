import axios from 'axios'

const EMSC_FEED_URL = 'https://www.seismicportal.eu/fdsnws/event/1/query?limit=100&format=json'

export async function fetchRecentSeismicEvents() {
    try {
        const { data } = await axios.get(EMSC_FEED_URL)

        return data.features.map((f) => ({
            id: f.id,
            time: f.properties.time,
            magnitude: f.properties.mag,
            location: f.properties.flynn_region,
            coordinates: f.geometry.coordinates, // [lon, lat, depth]
        }))
    } catch (err) {
        console.error('❌ Failed to fetch EMSC data:', err.message)
        throw err
    }
}
