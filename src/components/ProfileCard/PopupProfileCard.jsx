import { useState, useRef, useEffect } from 'react';
import defaultAvatar from '../../images/openToWork.png';
import myPhoto from '../../images/HeroImage.jpg';

const glassStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
  padding: "2rem",
  width: "90%",
  maxWidth: "700px",
  minHeight: "50vh",
  animation: "fadeInScale 0.3s ease-out",
};

// Optional animation (add to global CSS or a <style> tag if not using Tailwind)
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  const fadeInScaleKeyframes = `
    @keyframes fadeInScale {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  if ([...styleSheet.cssRules].findIndex(r => r.name === "fadeInScale") === -1) {
    styleSheet.insertRule(fadeInScaleKeyframes, styleSheet.cssRules.length);
  }
}

const PopupProfileCard = ({
  originalImage = defaultAvatar,
  activeImage = defaultAvatar,
  popupContent,
  imageSize = 200,
  hoverToOpen = true,
  clickToOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const defaultPopupContent = (
    <div className="text-center text-white dark:text-gray-200">
      <img
        src={myPhoto}
        alt="Atul Oli"
        className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-md"
      />
      <h2 className="text-3xl font-semibold mb-3">Atul Oli</h2>
      <p className="text-base px-4">
        I'm Atul Oli, a creative full-stack developer who enjoys crafting elegant,
        fast, and responsive user experiences using modern web technologies and AI tools.
      </p>
    </div>
  );

  return (
    <>
      {/* 👇 Trigger Image (You can move this anywhere) */}
      <div style={{ position: 'absolute', top: '14rem', right: '1rem', zIndex: 20 }}>
        <img
          src={isOpen ? activeImage : originalImage}
          alt="Profile"
          className="rounded-full object-cover cursor-pointer select-none shadow-lg border-4 border-white dark:border-gray-700"
          style={{
            width: imageSize,
            height: imageSize,
            transition: 'opacity 0.3s ease',
          }}
          onClick={() => clickToOpen && setIsOpen(true)}
          onMouseEnter={() => hoverToOpen && setIsOpen(true)}
          onMouseLeave={() => hoverToOpen ? setIsOpen(false) : undefined}
        />
      </div>

      {/* 👇 Popup Layer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4">
          <div
            ref={popupRef}
            style={glassStyle}
            className="rounded-xl shadow-2xl relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>
            {popupContent || defaultPopupContent}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupProfileCard;
