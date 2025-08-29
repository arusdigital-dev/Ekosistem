import React, { useState } from 'react';
import { faqData, faqConfig } from './data/faqData.js';
import ChevronDownIcon from './components/ChevronDownIcon.jsx';

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`bg-white ${faqConfig.containerPadding}`}>
            <div className={`${faqConfig.maxWidth} mx-auto`}>
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-sm font-bold mb-2" style={{ color: faqConfig.subtitleColor }}>
                        {faqData.header.subtitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: faqConfig.primaryColor }}>
                        {faqData.header.title}
                    </h2>
                    <p className="max-w-2xl mx-auto font-bold" style={{ color: faqConfig.primaryColor }}>
                        {faqData.header.description}
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className={`grid ${faqConfig.gridCols} gap-6 items-start`}>
                    {faqData.questions.map((faq, index) => (
                        <div key={index} className="bg-white border-b" style={{ borderBottomColor: faqConfig.borderColor, borderBottomWidth: '1px' }}>
                            <button
                                onClick={() => handleToggleAccordion(index)}
                                className={`w-full px-6 pt-4 pb-2 text-left flex justify-between items-start transition-colors ${faqConfig.animation.transitionDuration}`}
                                style={{ ':hover': { backgroundColor: faqConfig.hoverColor } }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = faqConfig.hoverColor}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <span
                                    className="font-semibold text-sm md:text-base pr-4 leading-relaxed"
                                    style={{ color: faqConfig.primaryColor }}
                                >
                                    {faq.question}
                                </span>
                                <ChevronDownIcon 
                                    color={faqConfig.primaryColor} 
                                    isOpen={openIndex === index}
                                />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="px-6 pb-4">
                                    <p className="text-sm md:text-base leading-relaxed" style={{ color: faqConfig.textColor }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;