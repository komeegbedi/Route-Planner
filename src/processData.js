// Probably do this in Node JS
const BASE_URL = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving';

async function fetchMapboxToken() {
    try {
        const response = await fetch('mapbox-token'); //TODO: update for vercel 
        if (!response.ok) {
            throw new Error(`Error fetching token: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.token; 
    } catch (error) {
        console.error('Failed to fetch the Mapbox token:', error);
        return null;
    }
}//fetchMapboxToken()

async function ProcessData(data) {
    if (data.length < 2) {
        console.error('At least two entries are required for directions.');
        return;
    }

    const mapboxToken = await fetchMapboxToken();
    if (!mapboxToken) {
        console.error('Mapbox token could not be retrieved.');
        return;
    }

    // Constructing the coordinates string
    const coordinates = data.map(entry => `${entry.longitude},${entry.latitude}`).join(';');
    const url = `${BASE_URL}/${coordinates}?annotations=distance,duration&access_token=${mapboxToken}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        processDirections(result); // Call your processing function here
    } catch (error) {
        console.error('Failed to fetch directions:', error);
    }
} // ProcessData()

function processDirections(directions) {
    // Implement your data processing logic here
    console.log('Processing directions:', directions);
    // You can extract specific data or perform calculations
}//processDirections()

export default ProcessData;