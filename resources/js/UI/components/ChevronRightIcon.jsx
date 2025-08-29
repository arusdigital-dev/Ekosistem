import React from 'react';

const ChevronRightIcon = ({ size = 24, color = 'currentColor', className = '', onClick }) => {
    return (
        <svg 
            className={`w-6 h-6 ${className}`} 
            fill="none" 
            stroke={color} 
            viewBox="0 0 24 24"
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
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

export default ChevronRightIcon;