import React, { useState } from 'react';
import { lamunCardsData, lamunConfig } from './data/lamunData';
import ExpandIcon from './components/ExpandIcon';
import ShrinkIcon from './components/ShrinkIcon';
import ArrowIcon from './components/ArrowIcon';

// Custom styles for animations
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }
`;

// Constants
const CARD_STYLES = {
    base: 'rounded-2xl p-8 shadow-sm relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer',
    expanded: {
        transform: 'scale(1.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '2px solid #dbeafe'
    },
    normal: {
        transform: 'scale(1)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent'
    },
    hover: {
        transform: 'scale(1.02)'
    }
};

const BUTTON_STYLES = {
    base: 'font-medium text-white px-6 py-3 rounded-full text-sm flex items-center space-x-2 transition-colors hover:opacity-90'
};

const LamunSections = () => {
    const [expandedCards, setExpandedCards] = useState({});

    // Event handlers
    const handleToggleCard = (cardId) => {
        setExpandedCards(prev => {
            const isCurrentlyExpanded = prev[cardId];
            if (isCurrentlyExpanded) {
                // If currently expanded, collapse it
                return { [cardId]: false };
            } else {
                // If not expanded, expand only this card and hide others
                return { [cardId]: true };
            }
        });
    };

    const handleMouseEnter = (e, cardId) => {
        if (!expandedCards[cardId]) {
            e.target.style.transform = CARD_STYLES.hover.transform;
        }
    };

    const handleMouseLeave = (e, cardId) => {
        if (!expandedCards[cardId]) {
            e.target.style.transform = CARD_STYLES.normal.transform;
        }
    };

    const getCardStyle = (cardId) => {
        const isExpanded = expandedCards[cardId];
        return {
            ...CARD_STYLES.normal,
            ...(isExpanded ? CARD_STYLES.expanded : {}),
            backgroundColor: isExpanded ? lamunConfig.expandedBackgroundColor : lamunConfig.backgroundColor,
            border: isExpanded ? `2px solid ${lamunConfig.borderColor}` : '2px solid transparent'
        };
    };
    return (
        <div className="px-16 py-16 bg-white">
            <style>{customStyles}</style>
            {/* Title */}
            <h2 className="font-bold text-4xl text-center mb-16" style={{ color: lamunConfig.primaryColor }}>
                {lamunConfig.title}
            </h2>

            {/* Grid Layout */}
            <div className={`grid gap-8 max-w-6xl mx-auto transition-all duration-500 ease-in-out ${
                Object.values(expandedCards).some(expanded => expanded)
                    ? 'grid-cols-1'
                    : 'grid-cols-2'
            }`}>
                {lamunCardsData.map((card) => (
                    (!Object.values(expandedCards).some(expanded => expanded) || expandedCards[card.id]) && (
                        <div
                            key={card.id}
                            className={CARD_STYLES.base}
                            style={getCardStyle(card.id)}
                            onMouseEnter={(e) => handleMouseEnter(e, card.id)}
                            onMouseLeave={(e) => handleMouseLeave(e, card.id)}
                        >
                            <div className="absolute top-6 right-6">
                                {expandedCards[card.id] ? (
                                    <ShrinkIcon 
                                        onClick={() => handleToggleCard(card.id)} 
                                        color={lamunConfig.primaryColor} 
                                    />
                                ) : (
                                    <ExpandIcon 
                                        onClick={() => handleToggleCard(card.id)} 
                                        color={lamunConfig.primaryColor} 
                                    />
                                )}
                            </div>
                            <h3 className="font-bold text-2xl mb-4" style={{ color: lamunConfig.primaryColor }}>
                                {card.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {card.shortDescription}
                                {expandedCards[card.id] && (
                                    <span className="inline-block animate-fadeIn">
                                        {card.expandedDescription}
                                    </span>
                                )}
                            </p>
                            {card.hasButton && (
                                <button
                                    className={BUTTON_STYLES.base}
                                    style={{ backgroundColor: lamunConfig.primaryColor }}
                                >
                                    <span>{card.buttonText}</span>
                                    <ArrowIcon size={16} />
                                </button>
                            )}
                        </div>
                    )
                ))}


            </div>
        </div>
    )
}

export default LamunSections