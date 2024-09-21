//This file handles the design of the hero section and also the logic to dynamically add an input field when a button is clicked

import heroImage from './images/vecteezy_smartphone-mobile-gps-navigation-illustration-isolated-map_14501013.png'; 
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faCirclePlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddressAutofill } from '@mapbox/search-js-react';
import React, { useState } from 'react';


const HeroSection = () => {

    const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    //Dynamically add an Input field when the "Add Another Stop" button is clicked 

    // The inputFields state is initialized as an array with one object that represents the first input field.
    // Each object has a 'value' key that will store the content of the input field.
    const [inputFields, setInputFields] = useState([{ value: '' }, { value: '' }]);

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

    
    return ( 
        <section className="h-screen  bg-center bg-no-repeat bg-[url('./images/vecteezy_route-icon-between-two-points-with-dotted-path-and-location-pin_22188254.png')] bg-blend-multiply bg-contain">
            <div className="flex flex-col justify-center items-center max-w-screen-xl px-4 py-8 mx-auto lg:py-16 h-4/5">
                <div className="w-full">
                    <h1 className="mb-4 text-4xl text-center font-extrabold tracking-wide leading-normal md:text-5xl xl:text-6xl dark:text-white gradient-text"> 
                        Let Us<span className='text-teal-500'> Optimize </span> Your Routes
                    </h1>
                    <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">Less Driving = Save Gas. Save Time.</p>
                    
                    <div className="w-full">
                        <form className="flex flex-col max-w-sm mt-10 m-auto">

                        {/* ------------ Renders the input field to the page ------------ */}
                        {inputFields.map((input, index) => (

                            <div key={index} className='flex mt-5'>
                                <div className="flex-grow">
                                    <AddressAutofill accessToken= {MAPBOX_ACCESS_TOKEN}>
                                        <input
                                            type="text"
                                            value={input.value}
                                            onChange={event => handleInputChange(index, event)}
                                            name={"address-"+index} autoComplete="address-line2" 
                                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 placeholder-gray-600" placeholder="Enter Stop Address"
                                        />
                                    </AddressAutofill>
                                </div>

                                 {/* ------- Show Delete Button Only if the input fields are more than 2----------*/}
                                 {inputFields.length > 2 && (
                                    <button onClick={event => handleDeleteField(index, event)} className='flex-none ml-2'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button className='block mt-5 font-medium px-1 tracking-wide' onClick={handleAddField}>
                            <FontAwesomeIcon icon={faCirclePlus} /> Add Another Stop
                        </button>

                        <button className ="text-white bg-gradient-to-l from-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 text-center tracking-wide">
                            Optimize Route  
                            <FontAwesomeIcon icon={faLocationArrow} /> 
                        </button>
                   
                    </form>
                    </div>
                </div>

                {/* <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rotate-12 opacity-80">
                    <img src= {heroImage} alt="mockup" className='h-max'/>
                </div>                 */}
            </div>
        </section>
     );
}//HeroSection{}
 
export default HeroSection;