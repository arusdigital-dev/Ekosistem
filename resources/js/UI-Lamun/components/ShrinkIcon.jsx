import React from 'react';
import { Shrink } from 'lucide-react';

const ShrinkIcon = ({ onClick, color = '#274B9C', size = 24 }) => {
    return (
        <div 
            className="cursor-pointer transition-transform duration-300 hover:scale-110" 
            onClick={onClick}
        >
            <Shrink 
                className="transition-all duration-500 ease-in-out" 
                style={{ color, width: size, height: size }} 
            />
        </div>
    );
};

export default ShrinkIcon;