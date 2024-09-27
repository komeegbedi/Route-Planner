export default function handler(req, res) {
    // Return the token from environment variables
    res.status(200).json({ token: process.env.MAPBOX_ACCESS_TOKEN });
}