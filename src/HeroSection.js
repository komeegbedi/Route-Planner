import heroImage from './hero.png'; 
import './App.css';
const HeroSection = () => {
    return ( 
        <section className="hero bg-[url('./hero.png')] relative min-h-screen bg-map bg-fade text-white flex items-center p-10  bg-no-repeat bg-left bg-contain">
            <div className="absolute right-20">
                <div className='w-full max-w-md'>
                    <h1 className="text-6xl font-bold mb-4 leading-tight break-words">
                        Let Us <span className='text-lime-400'>Optimize</span> Your Routes, Save Time.
                    </h1>
                    <p className="text-lg mb-8">This essay contains a description of a thing/situation so that the reader seems to see.</p>
                </div>

               
               
            </div>
        </section>
     );
}
 
/*
 <div className='hidden lg:mt-0 lg:col-span-5 lg:flex faded faded-left faded-right opacity-70'>
                    <img src={heroImage} alt="" />
                </div>
*/
export default HeroSection;