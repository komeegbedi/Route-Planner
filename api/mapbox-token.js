export default function handler(req, res) {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
    
    if (!mapboxToken) {
        return res.status(500).json({ error: 'Mapbox token is not available' });
    }

    // Return the token as JSON
    res.status(200).json({ token: mapboxToken });
}
