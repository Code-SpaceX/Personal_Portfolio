import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function GlassEffectNotify() {
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef();

  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-wrapper">
            <div className="popup-content" ref={popupRef}>
              {/* Embedded Navbar */}
              <div className="navbar-container">
                <nav className="navbar">
                  <Link to="/" className="heading">
                    <h3 className="title">UTTARAKHAND CULTURE</h3>
                  </Link>
                  <Link to="/login" className="link">LOGIN</Link>
                </nav>
              </div>

              {/* Popup Text */}
              <div className="popup-text">
                <h3>Welcome to My Portfolio</h3>
                <p>Explore Uttarakhand's rich cultural heritage & the creator's journey.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .popup-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          animation: slideUp 0.6s ease-out forwards;
        }

        .popup-content {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          width: 90%;
          max-width: 600px;
          margin-bottom: 6rem;
          opacity: 0;
          transform: translateY(100px);
          animation: fadeSlide 0.6s ease-out forwards;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .popup-text {
          text-align: center;
          margin-top: 1.2rem;
        }

        .popup-text h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .popup-text p {
          font-size: 1rem;
          color: #444;
        }

        .navbar-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 1.2rem;
        }

        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
        }

        .heading {
          text-decoration: none;
        }

        .title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          text-transform: uppercase;
        }

        .link {
          font-size: 14px;
          font-weight: bold;
          color: #007bff;
          text-decoration: none;
        }

        .link:hover {
          color: #0056b3;
        }

        @keyframes fadeSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }

        @media (max-width: 640px) {
          .popup-content {
            padding: 1.5rem;
          }

          .popup-text h3 {
            font-size: 1.25rem;
          }

          .popup-text p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
