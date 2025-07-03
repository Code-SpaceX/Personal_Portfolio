import React from 'react';

const InfiniteScrollText = () => {
  const texts = [
    'Welcome to our website!',
    'Check out the latest features!',
    'Contact us anytime.',
    'Special discounts available now!',
    'Shop our latest collection.',
  ];

  const speed = 10;
  const animationDuration = `${texts.length * speed}s`;

  return (
    <>
      <style>
        {`
          .infinite-scroll-text-wrapper {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            padding: 20px;
            border-radius: 12px;
            margin: 20px auto;
            max-width: 100vw;
            user-select: none;
            --bg-color: rgba(28,28,39,0.8);
          }

          .infinite-scroll-text-wrapper::before,
          .infinite-scroll-text-wrapper::after {
            content: "";
            position: absolute;
            top: 0; bottom: 0;
            width: 50px;
            pointer-events: none;
            z-index: 2;
          }

          .infinite-scroll-text-wrapper::before {
            left: 0;
            background: linear-gradient(to right, var(--bg-color), transparent);
          }

          .infinite-scroll-text-wrapper::after {
            right: 0;
            background: linear-gradient(to left, var(--bg-color), transparent);
          }

          .infinite-scroll-text-wrapper .scroll-text {
            display: inline-block;
            white-space: nowrap;
            animation: scrollText ${animationDuration} linear infinite;
          }

          .infinite-scroll-text-wrapper .scroll-text span {
            display: inline-block;
            margin-right: 60px;
            font-weight: 600;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            user-select: none;
            font-size: 1.4rem;
          }

          @media (max-width: 768px) {
            .infinite-scroll-text-wrapper .scroll-text span {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 480px) {
            .infinite-scroll-text-wrapper .scroll-text span {
              font-size: 0.9rem;
            }
          }

          @media (prefers-color-scheme: dark) {
            .infinite-scroll-text-wrapper {
              background-color: rgba(28, 28, 39, 0.8);
              color: rgba(255, 255, 255, 0.9);
              box-shadow: 0 4px 15px rgba(133, 76, 230, 0.3);
              --bg-color: rgba(28, 28, 39, 0.8);
            }
            .infinite-scroll-text-wrapper .scroll-text span {
              color: rgba(255, 255, 255, 0.9);
            }
          }

          @media (prefers-color-scheme: light) {
            .infinite-scroll-text-wrapper {
              background-color: rgba(255, 255, 255, 0.1);
              color: rgba(128, 128, 128, 0.85);
              box-shadow: 0 4px 15px rgba(190, 26, 219, 0.15);
              --bg-color: rgba(255, 255, 255, 0.8);
            }
            .infinite-scroll-text-wrapper .scroll-text span {
              color: rgba(17, 17, 17, 0.85);
            }
          }

          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div className="infinite-scroll-text-wrapper">
        <div className="scroll-text">
          {[...texts, ...texts].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScrollText;
