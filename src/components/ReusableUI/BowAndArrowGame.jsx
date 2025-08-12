import React, { useRef, useState, useEffect, useMemo } from 'react';

const BowAndArrowGame = () => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [arrow, setArrow] = useState(null);
  const [angle, setAngle] = useState(0);
  const [hit, setHit] = useState(null);
  const [points, setPoints] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 300 });
  const [targetY, setTargetY] = useState(100);
  const [targetDirection, setTargetDirection] = useState(1);

  // Instead of just system theme, store user preference or fallback to system
  const getSystemPrefersDark = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [prefersDark, setPrefersDark] = useState(getSystemPrefersDark());

  // Update theme dynamically on system theme change only if user hasn't toggled manually
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setPrefersDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoize colors for stable reference
  const colors = useMemo(() => ({
    background: prefersDark ? '#1e1e1e' : '#f9f9f9',
    text: prefersDark ? '#ffffff' : '#2c3e50',
    bow: prefersDark ? '#ecf0f1' : '#2c3e50',
    aim: '#3498db',
    arrow: '#2ecc71',
    hit: '#27ae60',
    miss: '#e74c3c',
    king: '#f39c12',
    border: prefersDark ? '#555' : '#ccc',
  }), [prefersDark]);

  const bowX = 100;
  const bowY = canvasSize.height / 2;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const speed = 10;
    setArrow({
      x: bowX,
      y: bowY,
      vx: Math.cos(toRadians(angle)) * speed,
      vy: Math.sin(toRadians(angle)) * speed,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - bowX;
    const dy = e.clientY - rect.top - bowY;
    setAngle(clamp((Math.atan2(dy, dx) * 180) / Math.PI, -90, 90));
  };

  const resetGame = () => {
    setArrow(null);
    setHit(null);
    setAngle(0);
    setPoints(0);
  };

  // User toggle for dark/light mode
  const toggleTheme = () => {
    setPrefersDark(d => !d);
  };

  useEffect(() => {
    const resize = () => {
      setCanvasSize({
        width: Math.min(800, window.innerWidth - 40),
        height: Math.min(300, window.innerHeight - 150),
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    let animationId;

    const render = () => {
      updateTarget();
      updateArrow();
      draw();
      animationId = requestAnimationFrame(render);
    };

    const updateTarget = () => {
      const speed = 0.01;
      const newY = targetY + targetDirection * speed;
      if (newY > canvasSize.height - 30 || newY < 30) {
        setTargetDirection(-targetDirection);
      } else {
        setTargetY(newY);
      }
    };

    const updateArrow = () => {
      if (!arrow) return;
      const newX = arrow.x + arrow.vx;
      const newY = arrow.y + arrow.vy;
      const dx = canvasSize.width - 100 - newX;
      const dy = targetY - newY;
      const dist = Math.hypot(dx, dy);

      if (dist < 30) {
        setHit(true);
        setPoints(p => p + 1);
        setArrow(null);
      } else if (
        newX > canvasSize.width ||
        newY > canvasSize.height ||
        newX < 0 ||
        newY < 0
      ) {
        setHit(false);
        setPoints(0);
        setArrow(null);
      } else {
        setArrow({ ...arrow, x: newX, y: newY });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      ctx.beginPath();
      ctx.arc(canvasSize.width - 100, targetY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = hit === null ? colors.miss : hit ? colors.hit : colors.miss;
      ctx.fill();

      ctx.save();
      ctx.translate(bowX, bowY);
      ctx.rotate(toRadians(angle));
      ctx.strokeStyle = colors.bow;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 30, Math.PI / 2, -Math.PI / 2);
      ctx.stroke();

      if (isDragging) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = colors.aim;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        let px = bowX,
          py = bowY;
        const vx0 = Math.cos(toRadians(angle)) * 10;
        const vy0 = Math.sin(toRadians(angle)) * 10;
        ctx.moveTo(px, py);
        for (let i = 0; i < 50; i++) {
          px += vx0;
          py += vy0;
          ctx.lineTo(px, py);
          if (
            px > canvasSize.width ||
            py > canvasSize.height ||
            px < 0 ||
            py < 0
          )
            break;
        }
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.stroke();
      }
      ctx.restore();

      if (arrow) {
        ctx.save();
        ctx.translate(arrow.x, arrow.y);
        ctx.rotate(Math.atan2(arrow.vy, arrow.vx));
        ctx.strokeStyle = colors.arrow;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, 0);
        ctx.stroke();
        ctx.restore();
      }

      ctx.fillStyle = colors.text;
      ctx.font = 'bold 20px Segoe UI';
      ctx.fillText(`Score: ${points}`, 20, 30);

      if (hit === true) {
        ctx.fillStyle = colors.hit;
        ctx.font = 'bold 24px Segoe UI';
        ctx.fillText('🎯 HIT!', canvasSize.width / 2 - 50, 50);
      } else if (hit === false) {
        ctx.fillStyle = colors.miss;
        ctx.font = 'bold 24px Segoe UI';
        ctx.fillText('💥 Oops! Missed!', canvasSize.width / 2 - 90, 50);
      }

      if (points >= 10) {
        ctx.fillStyle = colors.king;
        ctx.font = 'bold 28px Segoe UI';
        ctx.fillText(
          '👑 King of this game!',
          canvasSize.width / 2 - 150,
          canvasSize.height - 20
        );
      }
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [
    arrow,
    angle,
    isDragging,
    hit,
    points,
    canvasSize,
    targetY,
    targetDirection,
    colors,
    bowY,
  ]);

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <h2 style={styles.title}>🏹 Bow and Arrow Game</h2>
      
      {/* Toggle button for dark/light mode */}
      <button
        onClick={toggleTheme}
        style={{
          ...styles.button,
          backgroundColor: prefersDark ? '#f39c12' : '#3498db',
          marginBottom: '15px',
        }}
        aria-label="Toggle dark/light mode"
      >
        Switch to {prefersDark ? 'Light' : 'Dark'} Mode
      </button>

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ ...styles.canvas, borderColor: colors.border }}
      />
      <button onClick={resetGame} style={styles.button}>
        Reset
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    boxSizing: 'border-box',
  },
  title: { marginBottom: '10px' },
  canvas: {
    border: '2px solid',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'crosshair',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BowAndArrowGame;
