import express from 'express'
import dotenv from 'dotenv'
import seismicRoutes from './routes/seismic.js'
import deformationRoutes from './routes/deformation.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/api/seismic', seismicRoutes)
app.use('/api/deformation', deformationRoutes)

app.get('/api/ping', (req, res) => res.send('pong'))

app.listen(PORT, () => {
    console.log(`🌋 VolcanSight backend running on port ${PORT}`)
})
