export async function fetchMockDeformationData() {
    // Simulated data (station, lat, lon, uplift in mm, direction)
    return [
        {
            station: 'RITE',
            coords: [40.827, 14.139],
            uplift: 12.4, // mm in last 7 days
            direction: [2.3, -1.1], // east/north mm drift
        },
        {
            station: 'OCPI',
            coords: [40.82, 14.15],
            uplift: 9.1,
            direction: [0.7, -0.5],
        },
        {
            station: 'SOLO',
            coords: [40.835, 14.12],
            uplift: 15.2,
            direction: [1.5, 1.0],
        },
    ]
}
