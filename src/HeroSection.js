import heroImage from './images/vecteezy_smartphone-mobile-gps-navigation-illustration-isolated-map_14501013.png'; 
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const HeroSection = () => {
    return ( 
        <section className="bg-center bg-no-repeat bg-[url('./images/vecteezy_route-icon-between-two-points-with-dotted-path-and-location-pin_22188254.png')] bg-blend-multiply bg-contain h-screen place-items-center">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 h-4/5">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-normal leading-normal md:text-5xl xl:text-6xl dark:text-white"> Let Us <span className='text-teal-500'>Optimize</span> Your Routes</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Less Driving = Save Gas. Save Time.</p>
                    
                    <form class="max-w-sm mt-8">
                    <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 placeholder-gray-700" value="Enter Starting Point (e.g. 123 Main St)"/>
                    <input type="text" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 placeholder-gray-400" value="Enter Stop Address (e.g. 456 Oak Ave)" />
                    <button className='block mt-5 font-medium px-1 tracking-wide'><FontAwesomeIcon icon={faCirclePlus} /> Add Another Stop</button>
                    <button className ="text-white bg-gradient-to-l from-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 text-center">Optimize Route <FontAwesomeIcon icon={faLocationArrow} /> </button>
                    </form>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rotate-12 opacity-80 faded faded-left faded-right">
                    <img src= {heroImage} alt="mockup"/>
                </div>                
            </div>
        </section>
     );
}
 
export default HeroSection;