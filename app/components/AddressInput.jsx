'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faCirclePlus, faXmark} from '@fortawesome/free-solid-svg-icons';

const DynamicAddressAutofill = dynamic(
    () => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill),
    { ssr: false }
);

const AddressInput = () =>{
    const [location, setLocation] = useState({ longitude: null, latitude: null });
    const [mapboxToken, setMapboxToken] = useState('');
    const [processedData, setProcessedData] = useState(null);
    
    //Dynamically add an Input field when the "Add Another Stop" button is clicked 

    // The inputFields state is initialized as an array with one object that represents the first input field.
    // Each object has a 'value' key that will store the content of the input field.
    const [inputFields, setInputFields] = useState([{ value: '' }, { value: '' }]);
    
    //TODO: think of a better name for this array
    const [finalInputFields, setFinalInputFileds] = useState([...inputFields]);

   

    // handleAddField is a function that adds a new input field.
    // It updates the state by spreading the current inputFields array and adding a new object with an empty value.
    const handleAddField = (event) => {
        event.preventDefault();
        setInputFields([...inputFields, { value: '' }]);
    };

    // handleInputChange is a function that updates the value of a specific input field.
    // It takes the index of the input field to update and the event from the input field.
    // A copy of the inputFields array is created, the specific value is updated, and then the state is set with the new array.
    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
    };

    // handleDeleteField is a function that removes the input field at the specified index.
   // It creates a copy of the inputFields array, removes the element at the index using splice, and updates the state.
    const handleDeleteField = (index, event) => {
        const values = [...inputFields];
        event.preventDefault();
        
        if(values.length > 2){
            values.splice(index, 1);
            setInputFields(values);
        }
    };

    const handleSuggestionSelect = (suggestion, index) => {
        
        const features = suggestion.features[0];
        const { place_name, context } = features.properties;  // Get the full place object
        const [longitude, latitude] = features.geometry.coordinates;
    
       
        let city = "";
        let country = "";
        let postalCode = "";
    
        // Extract the required details (city, country, postal code) from the context
        context.forEach((component) => {
            if (component.id.includes('place')) {
                city = component.text_en;  // Extract city name
            }
            if (component.id.includes('country')) {
                country = component.text_en;  // Extract country name
            }
            if (component.id.includes('postcode')) {
                postalCode = component.text_en;  // Extract postal code
            }
        });
    
    
        // Update the specific input field with full address details
        const updatedFields = [...finalInputFields];
        updatedFields[index] = {
            ...updatedFields[index],
            value: place_name,  
            city,              
            country,            
            postalCode,          
            longitude,
            latitude
        };
        
        setFinalInputFileds(updatedFields); 
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: this is dependent on the user clicking the suggestion box, what if the user doesn't click it
        // check that the number of inputFields === finalInputFields
        // TODO: Form Validation (Addresses are valid, check that Form is not empty, Sanitize inputs etc)
        await processAddresses();
    };

    const processAddresses = async () => {
       
       
        try {
            const response = await fetch('/api/process-addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                next:{
                    revalidate:0 //opt out of using cache
                },
                body: JSON.stringify(finalInputFields),
            });

            const data = await response.json();
            setProcessedData(data.result);
            console.log('Processed', data.result); //  PRINT: To console for now since frontend is not fully implemented yet

        } 
        catch (error) {
            console.error('Error processing addresses:', error);
        } 
    };

    
    useEffect(()=>{
        const geoLocationOptions = {
            enableHighAccuracy: true, // More precise but may take longer and use more battery
            timeout: 5000,            // Maximum time allowed to get location
            maximumAge: 0             // No cached location data
        };

        // Fetch the token from the backend
        const fetchMapboxToken = async () => {
            try{
                const response = await fetch('/api/mapbox');
                if (!response.ok) {
                  throw new Error('Failed to fetch Mapbox token');
                }
                const data = await response.json();
                setMapboxToken(data.token);
            }catch (err) {
                console.log(err.message);
            }
       }

        navigator.geolocation.getCurrentPosition((
            position) =>{
                const {longitude , latitude} = position.coords;
                setLocation({ longitude , latitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }, geoLocationOptions)
        
        fetchMapboxToken();
    }, []);


    if (!mapboxToken) return null;  // Wait for the token to be loaded

    return(
        <form className="flex flex-col max-w-sm mt-10 m-auto" onSubmit={handleSubmit}>

            {/* ------------ Renders the input field to the page ------------ */}
            {inputFields.map((input, index) => (

                <div key={index} className='flex mt-5'>
                    <div className="flex-grow">
                    {/*----------------- 
                        The AddressAutofill which abstracts away the need to manually handle HTTP requests. 
                        This component automatically sends the necessary requests to the Mapbox Geocoding API behind the scenes when users type into the input field. 
                        It takes care of making the necessary API calls  
                    -------------------*/}
                        <DynamicAddressAutofill 
                            accessToken= {mapboxToken}
                            onRetrieve={(suggestion) => handleSuggestionSelect(suggestion, index)}  // Capture full response when suggestion is selected
                            options={
                                location.longitude && location.latitude ? {
                                    proximity: `${location.longitude}, ${location.latitude}`
                                 }:{ /* no proximity, Mapbox will rank suggestions based on the user’s IP-based location approximation */}
                            }
                        > 
                            <input
                                type="address"
                                value={input.value}
                                onChange={event => handleInputChange(index, event)}
                                name={"address-"+index} autoComplete={"address-line-"+index}
                                className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-lg 
                                    border border-white/20 text-white 
                                    focus:ring-2 focus:ring-teal-500 
                                    transition-all duration-300 
                                    group-hover:scale-[1.02]" placeholder="Enter Stop Address"
                                required
                            />
                        </DynamicAddressAutofill>
                    </div>

                    {/* ------- Show Delete Button Only if the input fields are more than 2----------*/}
                    {inputFields.length > 2 && (
                        <button onClick={event => handleDeleteField(index, event)} className='flex-none ml-2'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </div>
            ))}

            <button className='w-full p-3 text-teal-300 
                        hover:text-teal-200 
                        bg-white/5 rounded-xl 
                        transition-all duration-300
                        active:scale-95 
                        hover:scale-[1.05] mt-5' onClick={handleAddField}>
                <FontAwesomeIcon icon={faCirclePlus} /> Add Another Stop
            </button>

            <button className ="text-white bg-gradient-to-l from-teal-400 hover:bg-gradient-to-r font-medium rounded-lg text-sm px-5 py-2.5 mt-8 text-center tracking-wide optimize transition-all duration-300 
                        active:scale-95 
                        hover:scale-[1.05]">
                Optimize Route  
                <FontAwesomeIcon icon={faLocationArrow} /> 
            </button>
                   
        </form>
    )
}

export default AddressInput;