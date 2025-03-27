//This file handles the design of the hero section

// import '';
'use client';

import AddressInput from './AddressInput';
import React, { useState, useEffect } from 'react';


const HeroSection = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return ( 
        <section className="min-h-screen flex items-center relative overflow-hidden">
         {/* Dynamic Background Gradient */}
         <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,255,255,0.4), transparent 50%)`,
                }}
            />

            {/* Floating Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div 
                    className="absolute top-20 left-20 w-32 h-32 bg-teal-500 rounded-full blur-2xl 
                    animate-pulse duration-[5000ms]"
                />
                <div 
                    className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl 
                    animate-pulse duration-[6000ms] delay-500"
                />
            </div>
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center bg-clip-text text-transparent tracking-wider leading-normal dark:text-white gradient-text"> 
                        <span className='text-teal-500'> Optimize </span> Your Routes
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium tracking-wide">Less Driving = Save Gas. Save Time.</p>
                    
                    <div className="w-full max-w-md mx-auto">
                        <AddressInput/>
                    </div>
                </div>
            </div>
        </section>
     );
}//HeroSection{}
 
export default HeroSection;