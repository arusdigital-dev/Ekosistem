import { useEffect } from "react";
import Wave1 from "../images/Wave1.png";
import Wave2 from "../images/Wave2.png";
import Wave3 from "../images/Wave3.png";

const cards = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    wave: Wave2,
    title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing",
    desc: "Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    wave: Wave1,
    title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore",
    desc: "Cursus risus malesuada id verius orci morbi eget est tellus.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    wave: Wave3,
    title: "Magna Aliqua Ut Enim Ad Minim Veniam Quis Nostrud",
    desc: "Sit senectus massa risus lectus et viverra faucibus.",
  },
];

const Edukasi = () => {
  return (
    <div className="w-full bg-white mt-20" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="text-center -mt-2">
        <p className="text-blue-500 text-sm font-bold mb-2">
          Edukasi & Konservasi Laut
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
          Eksplorasi tiga penjaga laut kita
        </h1>
      </div>

      {/* Cards Container with Sticky Scroll Effect */}
      <div
        id="cards"
        className="list-none grid grid-cols-1 gap-[2vw] mb-[2vw] p-20"
        style={{
          gridTemplateRows: 'repeat(3, 25vw)',
          paddingBottom: 'calc(3 * 0.5em)'
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className="card sticky top-0"
            style={{
              '--index': index + 1,
              paddingTop: `calc(${index + 1} * 1em)`
            }}
          >
            <div className="card-content relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl p-20">
              {/* background image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

              {/* content */}
              <div className="absolute inset-0 flex items-center ml-10 md:ml-24">
                <div className="max-w-xl px-6 md:px-12 -ml-20">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                    {card.desc}
                  </p>
                  <button className="bg-white text-[#274B9C] px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2">
                    Selengkapnya
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
