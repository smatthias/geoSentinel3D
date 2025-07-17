import express from 'express'
const router = express.Router()

// Simulated GPS deformation data
router.get('/gps', (req, res) => {
    const stations = [
        { station: 'CF01', coords: [40.85, 14.35] },
        { station: 'CF02', coords: [40.83, 14.37] },
        { station: 'CF03', coords: [40.86, 14.33] },
        { station: 'CF04', coords: [40.84, 14.38] },
        { station: 'CF05', coords: [40.82, 14.34] },
    ]

    const data = stations.map((s) => ({
        ...s,
        uplift: parseFloat((Math.random() * 20 - 5).toFixed(1)), // -5 to +15 mm
        direction: [
            parseFloat((Math.random() * 4 - 2).toFixed(2)), // -2 to +2 mm E
            parseFloat((Math.random() * 4 - 2).toFixed(2)), // -2 to +2 mm N
        ],
    }))

    res.json(data)
})

export default router
