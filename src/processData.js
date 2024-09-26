// Probably do this in Node JS
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const BASE_URL = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving';

async function ProcessData(data) {
    if (data.length < 2) {
        console.error('At least two entries are required for directions.');
        return;
    }

    // Constructing the coordinates string
    const coordinates = data.map(entry => `${entry.longitude},${entry.latitude}`).join(';');
    const url = `${BASE_URL}/${coordinates}?annotations=distance,duration&access_token=${MAPBOX_ACCESS_TOKEN}`;

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
}

function processDirections(directions) {
    // Implement your data processing logic here
    console.log('Processing directions:', directions);
    // You can extract specific data or perform calculations
}

export default ProcessData;