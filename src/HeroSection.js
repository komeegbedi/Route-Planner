import heroImage from './images/vecteezy_smartphone-and-route-pin-coordinates-in-the-maps-application_9378328.png'; 
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const HeroSection = () => {
    return ( 
        <section>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> Let Us <span className='text-teal-500'>Optimize</span> Your Routes, Save Time.</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">This essay contains a description of a thing/situation so that the reader seems to see.</p>
                    <Link to="/GetStarted" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-l from-teal-400">
                        Get started  <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rotate-12 opacity-80 faded faded-left faded-right">
                    <img src= {heroImage} alt="mockup"/>
                </div>                
            </div>
        </section>
     );
}
 
export default HeroSection;