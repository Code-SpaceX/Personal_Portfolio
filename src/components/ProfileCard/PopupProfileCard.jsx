import React, { useState, useRef, useEffect } from 'react';
import defaultAvatar from '../../images/openToWork.png'; // fallback
import myPhoto from '../../images/HeroImage.jpg'; // your actual photo

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
    <div className="text-center text-gray-800 dark:text-gray-200">
      <img
        src={myPhoto}
        alt="My Photo"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
      />
      <h2 className="text-2xl font-semibold mb-2">Atul Oli</h2>
      <p className="text-sm">
        I'm Atul Oli, a creative full-stack developer who enjoys crafting elegant,
        fast, and responsive user experiences using modern web technologies and AI tools.
      </p>
    </div>
  );

  return (
    <>
      <div style={{ position: 'absolute', top: '14rem', right: '1rem' }}>
        <img
          src={isOpen ? activeImage : originalImage}
          alt="Profile"
          className="rounded-full object-cover cursor-pointer select-none shadow-lg border-4 border-white dark:border-gray-700"
          style={{
            width: imageSize,
            height: imageSize,
            transition: 'opacity 0.3s ease',
            zIndex: 100,
          }}
          onClick={() => clickToOpen && setIsOpen(true)}
          onMouseEnter={() => hoverToOpen && setIsOpen(true)}
          onMouseLeave={() => hoverToOpen ? setIsOpen(false) : undefined}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-md mx-4 relative"
            style={{ minWidth: 300 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
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
