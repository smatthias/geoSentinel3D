import express from 'express'
import dotenv from 'dotenv'
import seismicRoutes from './routes/seismic.js'
import deformationRoutes from './routes/deformation.js'
import loginRoutes from './routes/auth/login.js'
import alertRoutes from './routes/alert.js'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(bodyParser.json());
app.use(cors);
app.use('/api/seismic', seismicRoutes)
app.use('/api/deformation', deformationRoutes)
app.use('/api/alert', alertRoutes)
app.use('api/auth', loginRoutes)
app.get('/api/ping', (req, res) => res.send('pong'))

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌋 VolcanSight backend running on port ${PORT}`)
})
