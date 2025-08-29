import React from 'react';

const CloseIcon = ({ onClick, className = "text-gray-500 hover:text-gray-700 text-2xl" }) => {
    return (
        <button onClick={onClick} className={className}>
            ✕
        </button>
    );
};

export default CloseIcon;