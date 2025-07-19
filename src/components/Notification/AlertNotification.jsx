import React, { useState, useEffect, useRef } from 'react';

const AlertNotification = () => {
  const [notification, setNotification] = useState(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      showNotification("Congrats! You've just spent 10 seconds exploring our amazing website! 🚀");
    }, 10000);

    const secondTimer = setTimeout(() => {
      showNotification("We hope you're enjoying here! 🌟");
    }, 12000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  const showNotification = (message) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setNotification(null); // Reset to re-trigger animation
    setTimeout(() => {
      setNotification(message);
      playEntrySound();
    }, 10);

    closeTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const playEntrySound = () => {
  const audio = new Audio('/public/sounds/bell-alert.mp3');
  audio.volume = 0.3;
  audio.play().catch((err) => console.error("Audio play failed:", err));
};

  return (
     <>
    {notification && (
      <div style={styles.notification} className="water-drop-alert">
        <div style={styles.notificationContent}>
          <p style={styles.message}>{notification}</p>
        </div>
      </div>
    )}
  </>
  );
};

const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '16px 20px',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    maxWidth: '320px',
    color: '#fff',
    width: 'auto',
    animation: 'waterDropInBounce 1.2s ease forwards',
    transformOrigin: 'top right',
  },
  notificationContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    borderRadius: 0,
    background: 'transparent',
  },
  message: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
  },
};

const waterDropKeyframes = `
  @keyframes waterDropInBounce {
    0% {
      transform: translate(100%, -100%) scale(0.3);
      opacity: 0;
    }
    50% {
      transform: translate(0, 10px) scale(1.1, 0.9);
      opacity: 1;
    }
    70% {
      transform: translate(0, -5px) scale(0.95, 1.05);
    }
    85% {
      transform: translate(0, 2px) scale(1.02, 0.98);
    }
    100% {
      transform: translate(0, 0) scale(1);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleTagId = 'realistic-water-drop-style';
  if (!document.getElementById(styleTagId)) {
    const style = document.createElement('style');
    style.id = styleTagId;
    style.innerHTML = waterDropKeyframes;
    document.head.appendChild(style);
  }
}

export default AlertNotification;
