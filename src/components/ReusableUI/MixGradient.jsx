import React, { useState, useRef, useEffect } from 'react';

const ColorMixer = () => {
  const [colors, setColors] = useState([
    { color: '#ff0000', alpha: 0.5 },
    { color: '#00ff00', alpha: 0.5 },
    { color: '#0000ff', alpha: 0.5 },
    { color: '#ffff00', alpha: 0.5 },
    { color: '#ff00ff', alpha: 0.5 },
  ]);

  const [gradient, setGradient] = useState('');
  const [copied, setCopied] = useState(false);
  const [layout, setLayout] = useState('gradient-text');
  const [animate, setAnimate] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const fileInputRef = useRef();

  // Detect theme (assuming system/project adds `dark` class to <html>)
  useEffect(() => {
    const checkTheme = () => {
      const htmlClass = document.documentElement.className;
      setIsDark(htmlClass.includes('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index].color = value;
    setColors(newColors);
  };

  const handleAlphaChange = (index, value) => {
    const newColors = [...colors];
    newColors[index].alpha = parseFloat(value);
    setColors(newColors);
  };

  const rgba = (hex, alpha) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generateGradient = () => {
    const gradientString = `linear-gradient(135deg, ${colors
      .map((c) => rgba(c.color, c.alpha))
      .join(', ')})`;
    setGradient(gradientString);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (gradient) {
      navigator.clipboard.writeText(`background: ${gradient};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const getPreviewBackground = () => {
    if (layout === 'gradient-text') return gradient;
    if (layout === 'image-in-text') return 'transparent';
    return 'transparent';
  };

  const previewStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
    background: getPreviewBackground(),
    transition: 'all 0.5s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    animation: animate ? 'moveGradient 6s ease infinite alternate' : 'none',
    backgroundSize: animate ? '200% 200%' : 'initial',
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Inter, sans-serif',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
        color: isDark ? '#f1f1f1' : '#111',
        backgroundColor: isDark ? '#111' : '#f9f9f9',
        transition: 'all 0.3s ease',
      }}
    >
      <style>{`
        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <h2 style={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center' }}>
        🎨 ColorMixer {isDark ? '🌙' : '☀️'}
      </h2>

      {/* Color pickers with transparency */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        {colors.map((c, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <input
              type="color"
              value={c.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              style={{
                width: '60px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={c.alpha}
              onChange={(e) => handleAlphaChange(index, e.target.value)}
              style={{ width: '60px' }}
            />
            <small>{Math.round(c.alpha * 100)}%</small>
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button onClick={generateGradient} style={buttonStyle('#333', '#fff')}>
          Generate
        </button>
        <button onClick={copyToClipboard} style={buttonStyle('#fff', '#333', true)}>
          {copied ? 'Copied!' : 'Copy CSS'}
        </button>
        <button onClick={handleUploadClick} style={buttonStyle('#0057D9', '#fff')}>
          Upload Image
        </button>
        <button onClick={() => setAnimate(!animate)} style={buttonStyle('#6c2bd9', '#fff')}>
          {animate ? 'Stop Animation' : 'Animate'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Layout selection */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          userSelect: 'none',
        }}
      >
        <label>
          <input
            type="radio"
            name="layout"
            value="gradient-text"
            checked={layout === 'gradient-text'}
            onChange={(e) => setLayout(e.target.value)}
          />{' '}
          Gradient + Text
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="image-bg-text"
            checked={layout === 'image-bg-text'}
            onChange={(e) => setLayout(e.target.value)}
          />{' '}
          Image BG + Text
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="text-bg-image"
            checked={layout === 'text-bg-image'}
            onChange={(e) => setLayout(e.target.value)}
          />{' '}
          Text BG + Image
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="image-in-text"
            checked={layout === 'image-in-text'}
            onChange={(e) => setLayout(e.target.value)}
            disabled={!customImage}
          />{' '}
          Image inside Text
        </label>
      </div>

      {/* Final preview box */}
      <div style={previewStyle}>
        {/* Image BG or overlay */}
        {layout === 'image-bg-text' && customImage && (
          <img src={customImage} alt="Custom BG" style={imageStyle(0)} />
        )}
        {layout === 'text-bg-image' && customImage && (
          <img src={customImage} alt="Overlay" style={imageStyle(2, 0.6)} />
        )}

        {/* Gradient overlay (if not primary) */}
        {layout !== 'gradient-text' && layout !== 'image-in-text' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: gradient,
              zIndex: layout === 'text-bg-image' ? 1 : 0,
              pointerEvents: 'none',
              borderRadius: '16px',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Text overlay or masked text */}
        {layout !== 'image-in-text' && (
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              padding: '1rem 2rem',
              background:
                layout === 'text-bg-image'
                  ? 'rgba(255 255 255 / 0.3)'
                  : 'rgba(0 0 0 / 0.3)',
              color: isDark ? '#fff' : '#222',
              fontSize: '1.8rem',
              fontWeight: '700',
              borderRadius: '12px',
              userSelect: 'none',
              textAlign: 'center',
              maxWidth: '80%',
              boxShadow:
                layout === 'text-bg-image'
                  ? '0 4px 20px rgba(255, 255, 255, 0.3)'
                  : '0 4px 20px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            Your Awesome Text Here
          </div>
        )}

        {/* Image inside text using SVG */}
        {layout === 'image-in-text' && customImage && (
          <svg
            viewBox="0 0 800 200"
            style={{
              width: '80%',
              height: 'auto',
              userSelect: 'none',
              cursor: 'default',
            }}
            aria-label="Image inside text preview"
          >
            <defs>
              <pattern
                id="imagePattern"
                patternUnits="userSpaceOnUse"
                width="800"
                height="200"
              >
                <image
                  href={customImage}
                  x="0"
                  y="0"
                  width="800"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="80"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
              fill="url(#imagePattern)"
              stroke={isDark ? '#fff' : '#222'}
              strokeWidth="1"
              style={{ userSelect: 'none' }}
            >
              Your Awesome Text Here
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};

// Button styling helper
const buttonStyle = (bg, color, outlined = false) => ({
  backgroundColor: outlined ? 'transparent' : bg,
  color: outlined ? bg : color,
  border: outlined ? `2px solid ${bg}` : 'none',
  padding: '0.5rem 1.25rem',
  fontSize: '1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: '600',
  boxShadow: outlined ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)',
});

const imageStyle = (zIndex = 0, opacity = 1) => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '16px',
  zIndex,
  opacity,
  userSelect: 'none',
  pointerEvents: 'none',
});

export default ColorMixer;
