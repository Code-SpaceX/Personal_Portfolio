import React, { useState } from 'react';

export default function LiquidGlassComponents() {
  const options = [
    { label: 'One', icon: '🔘' },
    { label: 'Two', icon: '🔺' },
    { label: 'Three', icon: '⬛' },
  ];

  const [selected, setSelected] = useState('One');

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '24px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.07)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      maxWidth: '240px',
      width: '100%',
      margin: 'auto',
    },
    button: (isActive) => ({
      background: isActive
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(255, 255, 255, 0.05)',
      border: isActive
        ? '2px solid rgba(255, 255, 255, 0.4)'
        : '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: '12px 18px',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      boxShadow: isActive
        ? 'inset 0 0 10px rgba(255, 255, 255, 0.2)'
        : '0 4px 10px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',

      // 🔥 Hover effect
      ...(isActive
        ? {}
        : {
            ':hover': {
              background: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.03)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
          }),
    }),
    icon: {
      fontSize: '1.3rem',
    },
  };

  return (
    <div style={styles.wrapper}>
      {options.map((opt) => (
        <button
          key={opt.label}
          style={styles.button(selected === opt.label)}
          onClick={() => setSelected(opt.label)}
          onMouseEnter={(e) => {
            if (selected !== opt.label)
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (selected !== opt.label)
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <span style={styles.icon}>{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
