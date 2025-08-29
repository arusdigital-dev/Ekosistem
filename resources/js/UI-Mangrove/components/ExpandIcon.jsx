import React from 'react';
import { Expand } from 'lucide-react';

const ExpandIcon = ({ onClick, color = '#274B9C', size = 24 }) => {
    return (
        <div 
            className="cursor-pointer transition-transform duration-300 hover:scale-110" 
            onClick={onClick}
        >
            <Expand 
                className={`w-${size/4} h-${size/4} transition-all duration-500 ease-in-out`} 
                style={{ color }} 
                size={size}
            />
        </div>
    );
};

export default ExpandIcon;