import React from 'react';

const ArrowIcon = ({ size = 12, color = 'currentColor', className = '' }) => {
    return (
        <svg 
            className={`w-${size/4} h-${size/4} ${className}`} 
            fill="none" 
            stroke={color} 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
            />
        </svg>
    );
};

export default ArrowIcon;