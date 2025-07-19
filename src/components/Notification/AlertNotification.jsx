import React, { useState, useEffect, useRef } from 'react';

const AlertNotification = () => {
  const [notification, setNotification] = useState(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    // Show first notification after 10 seconds
    const firstTimer = setTimeout(() => {
      showNotification("Congrats! You've just spent 10 seconds exploring our amazing website! 🚀");
    }, 10000);

    // Show second notification 1 second after first notification
    const secondTimer = setTimeout(() => {
      showNotification("We hope you're enjoying here! 🌟");
    }, 12000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Function to show notification and set auto-close after 2 seconds
  const showNotification = (message) => {
    // Clear any existing close timer so previous notification disappears immediately
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    setNotification(message);

    // Auto-close notification after 2 seconds
    closeTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <>
      {notification && (
        <div style={styles.notification}>
          <div style={styles.notificationContent}>
            <p style={styles.message}>{notification}</p>
          </div>
        </div>
      )}
    </>
  );
};

// CSS-in-JS Styling
const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    transition: 'all 0.5s ease-out',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    width: 'auto',
    animation: 'slideIn 0.5s ease forwards',
  },
  notificationContent: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
  message: {
    fontSize: '16px',
    color: '#fff',
    margin: 0,
    padding: 0,
    fontWeight: '600',
  },
};

// Keyframe for slide-in animation
const slideInAnimation = `
  @keyframes slideIn {
    0% {
      right: -100%;
      opacity: 0;
    }
    100% {
      right: 20px;
      opacity: 1;
    }
  }
`;

// Append animation to the document head once
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  // Check if rule is already inserted to avoid duplicates
  let alreadyInserted = false;
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (styleSheet.cssRules[i].name === 'slideIn') {
      alreadyInserted = true;
      break;
    }
  }
  if (!alreadyInserted) {
    styleSheet.insertRule(slideInAnimation, styleSheet.cssRules.length);
  }
}

export default AlertNotification;
