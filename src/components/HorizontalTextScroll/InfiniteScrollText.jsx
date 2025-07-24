import React, { useEffect, useState } from 'react';

const InfiniteScrollText = () => {
  const texts = [
    'Welcome to our website!',
    'Check out the latest features!',
    'Contact us anytime.',
    'Special discounts available now!',
    'Latest component Design.',
  ];

  const speed = 10;
  const animationDuration = `${texts.length * speed}s`;

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDark(darkMode);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

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

          .scroll-text {
            display: inline-block;
            white-space: nowrap;
            animation: scrollText ${animationDuration} linear infinite;
          }

          .scroll-text span {
            display: inline-block;
            margin-right: 60px;
            font-weight: 600;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            user-select: none;
            font-size: 1.4rem;
            color: var(--text-color);
          }

          @media (max-width: 768px) {
            .scroll-text span {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 480px) {
            .scroll-text span {
              font-size: 0.9rem;
            }
          }

          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div
        className="infinite-scroll-text-wrapper"
        style={{
          backgroundColor: isDark ? 'rgba(28, 28, 39, 0.8)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isDark
            ? '0 4px 15px rgba(133, 76, 230, 0.3)'
            : '0 4px 15px rgba(190, 26, 219, 0.15)',
          '--bg-color': isDark ? 'rgba(28, 28, 39, 0.8)' : 'rgba(255, 255, 255, 0.1)',
          '--text-color': isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 17, 17, 0.85)',
        }}
      >
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
