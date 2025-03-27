'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md shadow-lg p-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link 
                    href="/" 
                    className="flex items-center space-x-3 group transition-all duration-300 ease-in-out"
                >
                    <FontAwesomeIcon 
                        icon={faRoute} 
                        className="text-teal-500 text-2xl group-hover:rotate-45 group-hover:text-teal-400 transition-all duration-300"
                    />
                    <span className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
                        Route Planner
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu}
                        className="text-white hover:text-teal-300 focus:outline-none"
                    >
                        <svg 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link 
                        href="/about" 
                        className="text-white hover:text-teal-300 transition-colors duration-300 px-3 py-2 rounded-md"
                    >
                        About
                    </Link>
                    <Link 
                        href="/login" 
                        className="text-white hover:text-teal-300 transition-colors duration-300 px-3 py-2 rounded-md"
                    >
                        Log in
                    </Link>
                    <Link 
                        href="/GetStarted" 
                        className="bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg 
                        hover:bg-teal-400 transition-all duration-300 
                        hover:shadow-lg hover:scale-105 transform"
                    >
                        Sign up
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link 
                            href="/about" 
                            className="text-white block hover:bg-gray-800 hover:text-teal-300 transition-all duration-300 px-3 py-2 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link 
                            href="/login" 
                            className="text-white block hover:bg-gray-800 hover:text-teal-300 transition-all duration-300 px-3 py-2 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Log in
                        </Link>
                        <Link 
                            href="/GetStarted" 
                            className="block w-full text-center bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg 
                            hover:bg-teal-400 transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
    );
}
 
export default Navbar;