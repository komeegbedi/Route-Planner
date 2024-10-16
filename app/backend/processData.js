
const BASE_URL = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving-traffic';

export async function ProcessData(data) {

    if (data.length < 2) {
        console.error('At least two entries are required for directions.');
        return;
    }
    //TODO: Make sure to check that the addresses are not more than 20

    // Constructing the coordinates string
    const coordinates = data.map(entry => `${entry.longitude},${entry.latitude}`).join(';');
    const url = `${BASE_URL}/${coordinates}?annotations=distance,duration&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        const routeOptimizationResults = optimizeRouteWithNearestNeighbor(result, data);
       
        return{
            processedAddresses: routeOptimizationResults[0].map(address => `${address}`),
            optimizedTimeDuration: routeOptimizationResults[1],
            unOptimizedTime: routeOptimizationResults[2],
            timeSaved: routeOptimizationResults[3],
        }

    } 
    catch (error) {
        console.error('Failed to fetch directions:', error);
    }

} // ProcessData()

/*
    * This function implements the Nearest neighbor heuristic -> Start from the starting point (the first address). 
        Find the vertex that is closest (more precisely, has the minimum distance) to the current position 
        but is not yet part of the route, and add it into the route. Repeat until the route includes each vertex.

    * Returns an array containing the optimized path (array), the time duration of the optimized path, 
        the time duration of the un optimized path and the total time saved 
*/
const optimizeRouteWithNearestNeighbor = (routeMetrics, address) => {
    // console.log(directions);

    let isVisited = Array(routeMetrics.durations.length).fill(false); // boolean array to keep track of visited locations.
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
        for(let i = 0; i < routeMetrics.durations.length - 1; i++ ){
           
            if(routeMetrics.durations[currentLocation][i] !== 0 && !isVisited[i] && routeMetrics.durations[currentLocation][i] < currentMinimumDistance){
                indexOfMinimumDistance = i;
                currentMinimumDistance = routeMetrics.durations[currentLocation][i];
            }
        }

        optimizedTimeDuration += currentMinimumDistance;
        currentLocation = indexOfMinimumDistance; // Update the current location to be this nearest neighbor.

        orderOfVisit[orderOfVisit.length] = currentLocation; // Add the nearest neighbor to the path.
        isVisited[indexOfMinimumDistance] = true; //  Mark the nearest neighbor as visited.
    }//while()

    // Add the final destination (last index) to the path.
    orderOfVisit[orderOfVisit.length] = routeMetrics.durations.length-1;
    isVisited[routeMetrics.durations.length - 1] = true;
    optimizedTimeDuration += routeMetrics.durations[currentLocation][routeMetrics.durations.length - 1];

    // ===================== START DEBUG =====================
    // console.log(isVisited);
    // console.log('Processing directions:', directions);
   console.log(orderOfVisit);
   //===================== END DEBUG =====================

   // order of visit 
   let routeOptimizationResults = [];
   routeOptimizationResults[0] = [];
   orderOfVisit.map((element, index) => {
        // console.log(address[element].value);
        routeOptimizationResults[0][index] = address[element].value;
   })
   
  
   const unOptimizedTime = routeMetrics.durations[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   const timeSaved = unOptimizedTime - optimizedTimeDuration;
   routeOptimizationResults[1] = Math.ceil(optimizedTimeDuration/60);
   routeOptimizationResults[2] = Math.ceil(unOptimizedTime/60);
   routeOptimizationResults[3] = Math.ceil(timeSaved/60);

   //===================== START DEBUG =====================
   console.log("Optimized duration: "+ Math.ceil(optimizedTimeDuration/60));
   console.log("Unoptimized duration: "+ Math.ceil(unOptimizedTime/60));
   console.log("Time Saved: "+ Math.ceil(timeSaved/60));
   //console.log(listOfAddressInOrder);
  // ===================== END DEBUG =====================

   return routeOptimizationResults;
}//processDirections()