import React, { useEffect, useRef, useState } from 'react';

const EyeFollowing = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showSmile, setShowSmile] = useState(false);

  const prevAngleRef = useRef(null);
  const rotationSum = useRef(0);
  const hasSmiled = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const faceCenterX = window.innerWidth / 2;
    const faceCenterY = window.innerHeight / 2;

    const dx = cursorPos.x - faceCenterX;
    const dy = cursorPos.y - faceCenterY;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;

    if (prevAngleRef.current !== null) {
      let delta = normalizedAngle - prevAngleRef.current;

      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      rotationSum.current += delta;

      if (Math.abs(rotationSum.current) >= 360 && !hasSmiled.current) {
        hasSmiled.current = true;
        setShowSmile(true);

        setTimeout(() => {
          setShowSmile(false);
          rotationSum.current = 0;
          hasSmiled.current = false;
        }, 2000);
      }
    }

    prevAngleRef.current = normalizedAngle;

    [leftEyeRef, rightEyeRef].forEach((eyeRef, i) => {
      const pupilRef = i === 0 ? leftPupilRef : rightPupilRef;
      const eye = eyeRef.current;
      const pupil = pupilRef.current;

      if (!eye || !pupil) return;

      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = cursorPos.x - centerX;
      const dy = cursorPos.y - centerY;

      const angle = Math.atan2(dy, dx);
      const maxMove = 12;
      const x = Math.cos(angle) * maxMove;
      const y = Math.sin(angle) * maxMove;

      pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, [cursorPos]);

  return (
    <div style={styles.container}>
      <div style={styles.face}>
        <div ref={leftEyeRef} style={styles.eye}>
          <div ref={leftPupilRef} style={styles.pupil}></div>
        </div>
        <div ref={rightEyeRef} style={styles.eye}>
          <div ref={rightPupilRef} style={styles.pupil}></div>
        </div>

        {showSmile && <div style={styles.smile}></div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
  },
  face: {
    position: 'relative',
    width: 260,
    height: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
  },
  eye: {
    width: 80,
    height: 80,
    backgroundColor: 'var(--eye-bg)',
    borderRadius: '50%',
    border: '4px solid var(--eye-border)',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pupil: {
    width: 24,
    height: 24,
    backgroundColor: 'var(--pupil-color)',
    borderRadius: '50%',
    position: 'absolute',
    transition: 'transform 0.05s linear',
  },
  smile: {
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 100,
    height: 40,
    borderBottom: '6px solid var(--smile-color)',
    borderRadius: '0 0 100px 100px',
    animation: 'fadeInOut 2s ease',
  },
};

// Light/Dark mode adaptive CSS variables
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --eye-bg: #fff;
      --eye-border: #333;
      --pupil-color: #000;
      --smile-color: #000;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --eye-bg: #222;
        --eye-border: #ddd;
        --pupil-color: #fff;
        --smile-color: #fff;
      }
    }
  `;
  document.head.appendChild(style);
}

export default EyeFollowing;
