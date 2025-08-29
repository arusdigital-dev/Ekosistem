import React from 'react';

const ChevronDownIcon = ({ size = 20, color = 'currentColor', className = '', isOpen = false }) => {
    return (
        <svg 
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''} ${className}`} 
            fill="none" 
            stroke={color} 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
            />
        </svg>
    );
};

export default ChevronDownIcon;