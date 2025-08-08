import React, { useRef, useState, useEffect } from 'react';

const BowAndArrowGame = () => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [arrow, setArrow] = useState(null);
  const [angle, setAngle] = useState(0);
  const [hit, setHit] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const bowX = 100;
  const bowY = canvasSize.height / 2;
  const target = { x: canvasSize.width - 100, y: canvasSize.height / 2, radius: 30 };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const speed = 10;
    const vx = Math.cos(toRadians(angle)) * speed;
    const vy = Math.sin(toRadians(angle)) * speed;

    setArrow({ x: bowX, y: bowY, vx, vy });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - bowX;
    const dy = mouseY - bowY;
    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    deg = clamp(deg, -90, 90);
    setAngle(deg);
  };

  const resetGame = () => {
    setArrow(null);
    setHit(null);
    setAngle(0);
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const width = Math.min(800, window.innerWidth - 40);
      const height = Math.min(600, window.innerHeight - 150);
      setCanvasSize({ width, height });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const render = () => {
      updateArrow();
      draw(ctx);
      animationId = requestAnimationFrame(render);
    };

    const updateArrow = () => {
      if (!arrow) return;

      const newX = arrow.x + arrow.vx;
      const newY = arrow.y + arrow.vy;

      const dx = target.x - newX;
      const dy = target.y - newY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < target.radius) {
        setHit(true);
        setArrow(null);
      } else if (
        newX > canvasSize.width ||
        newY > canvasSize.height ||
        newX < 0 ||
        newY < 0
      ) {
        setHit(false);
        setArrow(null);
      } else {
        setArrow({ ...arrow, x: newX, y: newY });
      }
    };

    const draw = (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Target
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.fillStyle = hit === true ? '#27ae60' : '#e74c3c';
      ctx.fill();

      // Bow
      ctx.save();
      ctx.translate(bowX, bowY);
      ctx.rotate(toRadians(angle));
      ctx.beginPath();
      ctx.arc(0, 0, 30, Math.PI / 2, -Math.PI / 2);
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 5;
      ctx.stroke();

      if (isDragging) {
        // Aim line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 0);
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#3498db';
        ctx.stroke();
        ctx.setLineDash([]);

        // Live preview trajectory
        ctx.beginPath();
        let px = bowX;
        let py = bowY;
        const vx = Math.cos(toRadians(angle)) * 10;
        const vy = Math.sin(toRadians(angle)) * 10;
        ctx.moveTo(px, py);
        for (let i = 0; i < 50; i++) {
          px += vx;
          py += vy;
          ctx.lineTo(px, py);
          if (px > canvasSize.width || py > canvasSize.height || px < 0 || py < 0) break;
        }
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.stroke();
      }

      ctx.restore();

      // Arrow
      if (arrow) {
        ctx.save();
        ctx.translate(arrow.x, arrow.y);
        const arrowAngle = Math.atan2(arrow.vy, arrow.vx);
        ctx.rotate(arrowAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, 0);
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
      }

      // Status message
      if (hit === true) {
        ctx.fillStyle = '#27ae60';
        ctx.font = 'bold 24px Segoe UI';
        ctx.fillText('🎯 HIT!', canvasSize.width / 2 - 50, 50);
      } else if (hit === false) {
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 24px Segoe UI';
        ctx.fillText('💥 Oops! Missed!', canvasSize.width / 2 - 90, 50);
      }
    };

    render();

    return () => cancelAnimationFrame(animationId);
 }, [arrow, angle, isDragging, hit, canvasSize, target.x, target.y, target.radius, bowY]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏹 Bow and Arrow Game</h2>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={styles.canvas}
      />
      <button onClick={resetGame} style={styles.button}>Reset</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '10px',
    color: '#2c3e50',
  },
  canvas: {
    border: '2px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'crosshair',
    maxWidth: '100%',
    height: 'auto',
  },
  button: {
    marginTop: '15px',
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
