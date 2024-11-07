// src/components/Landing.js
import React from 'react';

function Landing() {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center h-screen text-white">
            <div className="text-center space-y-8">
                <h1 className="text-4xl font-bold">Send your E-certificates fast and easy</h1>
                
                {/* Styled Get Started Button with White Background */}
                <a
                    href="/login" // Adjust to the actual login route if different
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none flex items-center justify-center space-x-2 shadow-lg"
                >
                    <span>Get Started</span>
                    
                    {/* SVG Arrow Rotated to Point Upward-Right */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-1 arrow-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M12 5l7 7-7 7"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Landing;


