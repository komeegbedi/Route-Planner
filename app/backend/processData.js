
const BASE_URL = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving-traffic';

export async function ProcessData(data) {

    if (data.length < 2) {
        console.error('At least two entries are required for directions.');
        return;
    }
    //TODO: Make sure to check that the addresses are not more than 20 and they are more than 4 addresses

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

    // Add the final stop (last index) to the path array and mark as visited
    orderOfVisit[orderOfVisit.length] = routeMetrics.durations.length-1;
    isVisited[routeMetrics.durations.length - 1] = true;

    // Add the time duration from the current location to the final stop
    optimizedTimeDuration += routeMetrics.durations[currentLocation][routeMetrics.durations.length - 1];

    // Apply the 2-opt local search algorithm to find a more optimal route by swapping edges
    // in the current path and checking for improvements. Run only if Addresses > 3
   
    if(address.length > 3){
        console.log("Before: "+ orderOfVisit);
        console.log("Time: "+ optimizedTimeDuration);

        let twoOptResult = localSearchWithTwoOpt(orderOfVisit, optimizedTimeDuration , routeMetrics);
        orderOfVisit = twoOptResult[0];
        optimizedTimeDuration = twoOptResult[1];
        console.log("================================");
    }

   
   let routeOptimizationResults = [];
   routeOptimizationResults[0] = [];

    // Convert the indices in the path array to their corresponding human-readable addresses.
    // For example: [0, 2, 4, 7] becomes ['91 Pembina Hwy', '72 King St', '97 Main St', '828 Silverstone']
   orderOfVisit.map((element, index) => {
        routeOptimizationResults[0][index] = address[element].value;
   })
   
  
   const unOptimizedTime = costOfPath(Array(orderOfVisit.length).fill(0).map((_, i) => i), routeMetrics);
   const timeSaved = unOptimizedTime - optimizedTimeDuration;

   // These values are in seconds 
   routeOptimizationResults[1] = optimizedTimeDuration;
   routeOptimizationResults[2] = unOptimizedTime;
   routeOptimizationResults[3] = timeSaved;

   //===================== PRINT: To console for now since frontend is not fully implemented yet =====================
   console.log(`Optimized duration: ${Math.floor(optimizedTimeDuration / 60)} minutes and ${(optimizedTimeDuration % 60).toFixed(2)} seconds`);
   console.log(`Unoptimized duration: ${Math.floor(unOptimizedTime / 60)} minutes and ${(unOptimizedTime % 60).toFixed(2)} seconds`);
   console.log(`Time Saved: ${Math.floor(timeSaved / 60)} minutes and ${(timeSaved % 60).toFixed(2)} seconds`);
   //console.log(listOfAddressInOrder);
  // ===================== END PRINT =====================

   return routeOptimizationResults;
}//processDirections()


/*
    How the 2-Opt Local Search Algorithm works 

    Original path: 0 → 2 → 4 → 1 → 3 → 5
    Choose 2 non-adjacent edges (connections between addresses that don't share a common address.)to swap:
    Let's say edges (2→4) and (1→3)

    Before swap:
    0 → 2 → 4 → 1 → 3 → 5
        |____|____|
        edges to swap

    After swap:
    0 → 2 → 1 → 4 → 3 → 5
    Note: the segment between swaps gets reversed

    Original:
    0 → 2 → 4 → 1 → 3 → 5
        \_____/\_____/
        Edge2  Edge4

    Step 1: Break these two edges:
    0 → 2    4 → 1    3 → 5

    Step 2: The segment between our cuts (4,1) gets reversed to (1,4):
    0 → 2 → 1 → 4 → 3 → 5
*/

const localSearchWithTwoOpt = (nearestNeighbourSolution, nearestNeighbourCost, routeMetrics) =>{


    if(nearestNeighbourSolution.length < 3) // no point in 2-opt otherwise because it will contain "Starting point, One stop Address and Ending Point"
        return;
    
    let bestImprovementFound; 
    let bestPathFound;
    let bestImprovementCostFound = nearestNeighbourCost;


}

// const localSearchWithTwoOpt = (nearestNeighbourSolution, nearestNeighbourCost, routeMetrics) =>{
//     const MAX_ITERATIONS = 100;
//     const MIN_IMPROVEMENT = 10; //in percentage
//     const epsilon = 1e-10; // Small tolerance value
//     let noImprovementCounter = 0;
//     let currentIterationNumber = 0;
//     let bestImprovement = nearestNeighbourSolution;
//     let bestImprovementCost = nearestNeighbourCost;
//     let improvementFound = true;

//     if(nearestNeighbourSolution.length > 3){

//         // while(currentIterationNumber < MAX_ITERATIONS && noImprovementCounter < 3){
//             // improvementFound = false;
   
//            // Check all possible 2-opt swaps:
//            for(let i = 0; i < nearestNeighbourSolution.length - 2; i++){
//                for(let j = i + 2; j < nearestNeighbourSolution.length-1; j ++){
   
//                    let arraySegment = nearestNeighbourSolution.slice(i+1, j+1); 
//                    let reversedSubArray = [...arraySegment].reverse(); // get the sement between our swap and reverse it
//                 //    let newPath = [...nearestNeighbourSolution.slice(0, i+1), ... reversedSubArray , ...nearestNeighbourSolution.slice(j+1)];
//                    let reversedPathCost = costOfPath(reversedSubArray, routeMetrics);
//                    let segmentPathCost = costOfPath(arraySegment, routeMetrics);

//                     console.log("================================");
//                     console.log("i: " +i + " j: "+ j);
//                     console.log("Reversed Array: "+reversedSubArray );
//                     console.log("New Path: "+ newPath);
//                     console.log("Cost: "+ pathCost);

//                    //TODO: Ignore micro improvements (less than 10%). If each of the improvements gets better by less than 10%,
//                    // we can ignore those mocro improvement
//                    if(reversedPathCost < bestImprovementCost){
//                        improvementFound = true; 
//                        bestImprovement = newPath;
//                        noImprovementCounter = 0;
//                        bestImprovementCost = pathCost;
//                    }
//                }
   
//             //    if(!improvementFound){
//             //        noImprovementCounter++;
//             //    }
//            }
//           // currentIterationNumber++;
//        //}

//     }
    
//     return [bestImprovement, bestImprovementCost];
// }

// Calculate the total cost of the path
const costOfPath = (path, routeMetrics) =>{
    let sum = 0;
    for(let i=0; i < path.length - 1; i++){
        sum += routeMetrics.durations[path[i]][path[i+1]];
    }

    return sum; 
}