import React from 'react';

const ArrowIcon = ({ size = 16, color = 'currentColor' }) => {
    return (
        <svg 
            className={`w-${size/4} h-${size/4}`} 
            fill={color} 
            viewBox="0 0 20 20"
            style={{ width: size, height: size }}
        >
            <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
            />
        </svg>
    );
};

export default ArrowIcon;