//This file handles the design of the hero section

// import '';
import AddressInput from './AddressInput';


const HeroSection = () => {
    return ( 
        <section className="h-screen">
            <div className="flex flex-col justify-center items-center max-w-screen-xl px-4 py-8 mx-auto lg:py-16 h-4/5">
                <div className="w-full">
                    <h1 className="text-6xl text-center font-extrabold tracking-wider leading-normal md:text-5xl xl:text-6xl dark:text-white gradient-text"> 
                        Let Us<span className='text-teal-500'> Optimize </span> Your Routes
                    </h1>
                    <p className="mb-3 font-light lg:mb-4 text-sm md:text-lg text-gray-400 text-center">Less Driving = Save Gas. Save Time.</p>
                    
                    <div className="w-full">
                        <AddressInput/>
                    </div>
                </div>
            </div>
        </section>
     );
}//HeroSection{}
 
export default HeroSection;