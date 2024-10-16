
const BASE_URL = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving-traffic';

export async function ProcessData(data) {

    if (data.length < 2) {
        console.error('At least two entries are required for directions.');
        return;
    }

    // Constructing the coordinates string
    const coordinates = data.map(entry => `${entry.longitude},${entry.latitude}`).join(';');
    const url = `${BASE_URL}/${coordinates}?annotations=distance,duration&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        const returnData = processDirections(result, data);
       console.log("Return Data"+ returnData);
       
        return{
            processedAddresses: returnData[0].map(address => `${address}`),
            optimizedTimeDuration: returnData[1],
            unOptimizedTime: returnData[2],
            timeSaved: returnData[3],
        }

    } 
    catch (error) {
        console.error('Failed to fetch directions:', error);
    }

} // ProcessData()

// Nearest neighbor heuristic 
const processDirections = (directions, address) => {
    // console.log(directions);

    let isVisited = Array(directions.durations.length).fill(false); // boolean array to keep track of visited locations.
    let orderOfVisit = []; //array to store the path
    let optimizedTimeDuration = 0; //  total time duration of the path.
    let currentLocation = 0; // Set the current location as the starting point.
    isVisited[0] = true; //Set the starting point (index 0) as visited
    orderOfVisit[0] = currentLocation; // Add the starting point to the path 

    //While there are unvisited locations (excluding the final destination)
    while(isVisited.includes(false) && isVisited.indexOf(false) !== isVisited.length - 1){

        let indexOfMinimumDistance = - 1;
        let currentMinimumDistance = Number.MAX_SAFE_INTEGER; 

        // Look at the row in the matrix corresponding to the current location.
        // Find the minimum time duration among unvisited locations, excluding the final destination.
        for(let i = 0; i < directions.durations.length - 1; i++ ){
           
            if(directions.durations[currentLocation][i] !== 0 && !isVisited[i] && directions.durations[currentLocation][i] < currentMinimumDistance){
                indexOfMinimumDistance = i;
                currentMinimumDistance = directions.durations[currentLocation][i];
            }
        }

        optimizedTimeDuration += currentMinimumDistance;
        currentLocation = indexOfMinimumDistance; // Update the current location to be this nearest neighbor.

        orderOfVisit[orderOfVisit.length] = currentLocation; // Add the nearest neighbor to the path.
        isVisited[indexOfMinimumDistance] = true; //  Mark the nearest neighbor as visited.
    }//while()

    // Add the final destination (last index) to the path.
    orderOfVisit[orderOfVisit.length] = directions.durations.length-1;
    isVisited[directions.durations.length - 1] = true;
    optimizedTimeDuration += directions.durations[currentLocation][directions.durations.length - 1];

    // console.log(isVisited);
    // console.log('Processing directions:', directions);

   console.log(orderOfVisit);

   // order of visit 
   let returnData = [];
   returnData[0] = [];
   orderOfVisit.map((element, index) => {
        // console.log(address[element].value);
        returnData[0][index] = address[element].value;
   })
   
  
   const unOptimizedTime = directions.durations[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   const timeSaved = unOptimizedTime - optimizedTimeDuration;
   returnData[1] = Math.ceil(optimizedTimeDuration/60);
   returnData[2] = Math.ceil(unOptimizedTime/60);
   returnData[3] = Math.ceil(timeSaved/60);

   //START DEBUG
   console.log("Optimized duration: "+ Math.ceil(optimizedTimeDuration/60));
   console.log("Unoptimized duration: "+ Math.ceil(unOptimizedTime/60));
   console.log("Time Saved: "+ Math.ceil(timeSaved/60));
   //console.log(listOfAddressInOrder);
  // END DEBUG

   return returnData;
}//processDirections()