import React from "react";

const HeroSectionVideo = () => {
  const sparkles = Array.from({ length: 30 }).map((_, i) => {
    const top = Math.random();
    const left = Math.random();
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    const duration = 5 + Math.random() * 5;

    return (
      <div
        key={i}
        className="sparkle"
        style={{
          '--top': top,
          '--left': left,
          '--x': `${x}vw`,
          '--y': `${y}vh`,
          '--duration': `${duration}s`,
        }}
      />
    );
  });

  return (
    <div className="hero-container">
      {/* Sparkles behind */}
      <div className="sparkle-container">{sparkles}</div>

      <div className="image-wrapper">
        <img src="/moon.png" alt="Moon" className="hero-image" />
        <div className="fade-overlay" />
      </div>

      <style>{`
        .hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: rgb(28, 28, 39);
        }

        .sparkle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          box-shadow: 0 0 8px white;
          top: calc(var(--top) * 100%);
          left: calc(var(--left) * 100%);
          animation: sparkleMove var(--duration) linear infinite;
        }

        @keyframes sparkleMove {
          from {
            transform: translate(0, 0);
            opacity: 1;
          }
          to {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fade-overlay {
          pointer-events: none;
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          z-index: 2;

          background: radial-gradient(
            ellipse at center,
            rgba(28, 28, 39, 0) 60%,
            rgba(28, 28, 39, 1) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default HeroSectionVideo;
