import { useEffect } from "react";
import { edukasiData, edukasiConfig } from './data/edukasiData.js';
import ArrowIcon from './components/ArrowIcon.jsx';

const Edukasi = () => {
  return (
    <div className="w-full bg-white mt-20">
      {/* Header */}
      <div className="text-center -mt-2">
        <p className="text-sm font-bold mb-2" style={{ color: edukasiConfig.subtitleColor }}>
          {edukasiData.header.subtitle}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: edukasiConfig.primaryColor }}>
          {edukasiData.header.title}
        </h1>
      </div>

      {/* Cards Container with Sticky Scroll Effect */}
      <div
        id="cards"
        className="list-none grid grid-cols-1 mb-[2vw] p-20"
        style={{
          gap: edukasiConfig.animation.gridGap,
          gridTemplateRows: edukasiConfig.animation.gridRows,
          paddingBottom: edukasiConfig.animation.paddingBottom
        }}
      >
        {edukasiData.cards.map((card, index) => (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className="card sticky top-0"
            style={{
              '--index': index + 1,
              paddingTop: `calc(${index + 1} * 1em)`
            }}
          >
            <div className={`card-content relative w-full overflow-hidden p-20 ${edukasiConfig.borderRadius} ${edukasiConfig.shadowClass}`} style={{ height: edukasiConfig.cardHeight }}>
              {/* background image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* gradient overlay */}
              <div className={`absolute inset-0 ${edukasiConfig.gradientOverlay}`} />

              {/* content */}
              <div className="absolute inset-0 flex items-center ml-10 md:ml-24">
                <div className="max-w-xl px-6 md:px-12 -ml-20">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                    {card.desc}
                  </p>
                  <button 
                    className="px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2"
                    style={{ 
                      backgroundColor: edukasiConfig.buttonColor,
                      color: edukasiConfig.buttonTextColor
                    }}
                  >
                    {card.buttonText}
                    <ArrowIcon color={edukasiConfig.buttonTextColor} />
                  </button>
                </div>
              </div>

              {/* wave icon */}
              <div className="absolute top-8 right-8 z-10">
                <img src={card.wave} alt="Wave icon" className="w-12 h-12 opacity-80" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for scroll animation */}
      <style jsx>{`
        @supports (animation-timeline: works) {
          @scroll-timeline cards-element-scrolls-in-body {
            source: selector(body);
            scroll-offsets: 
              selector(#cards) start 1,
              selector(#cards) start 0;
            start: selector(#cards) start 1;
            end: selector(#cards) start 0;
            time-range: 4s;
          }

          .card {
            --index0: calc(var(--index) - 1);
            --reverse-index: calc(3 - var(--index0));
            --reverse-index0: calc(var(--reverse-index) - 1);
          }

          .card-content {
            transform-origin: 50% 0%;
            will-change: transform;
            --duration: calc(var(--reverse-index0) * 1s);
            --delay: calc(var(--index0) * 1s);
            animation: var(--duration) linear scale var(--delay) forwards;
            animation-timeline: cards-element-scrolls-in-body;
          }

          @keyframes scale {
            to {
              transform: scale(calc(1.1 - calc(0.1 * var(--reverse-index))));
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Edukasi;
