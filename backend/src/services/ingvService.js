import axios from 'axios'

// TODO: Replace with a real INGV feed
const SAMPLE_FEED_URL = 'https://webservices.ingv.it/fdsnws/event/1/query?format=geojson&limit=10'

export async function fetchRecentEvents() {
    const { data } = await axios.get(SAMPLE_FEED_URL)
    return data
}
