// Testing Purpose new component...

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Props:
 * - title: string - center chip text
 * - nodes: array - node objects { id, x, y, title, subtitle }
 * - height: number - svg height
 * - speed: number - animation speed (seconds)
 * - strokeWidth: number
 * - onNodeClick: fn(node) optional
 */
const defaultNodes = [
  { id: "n1", x: 180, y: 120, title: "Sri Sri Ravishankar", subtitle: "Vidyamandir" },
  { id: "n2", x: 520, y: 220, title: "Podar International", subtitle: "School" },
  { id: "n3", x: 860, y: 140, title: "Savitribai Phule", subtitle: "Pune University" },
];

export default function PoweredByModern({
  title = "Powered By",
  nodes = defaultNodes,
  height = 320,
  speed = 8,
  strokeWidth = 8,
  onNodeClick,
}) {
  const pathRef = useRef(null);
  const [pathLen, setPathLen] = useState(0);
  const [hovered, setHovered] = useState(null);

  // compute path length for dash animation
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        setPathLen(len);
      } catch (e) {
        // fallback
        setPathLen(2000);
      }
    }
  }, []);

  // Smooth bezier path — you can replace this with props.curvePath if you want
  const pathD = "M60,220 C220,80 420,80 520,220 C640,360 860,360 1140,220";

  return (
    <div style={styles.container}>
      {/* small top dots + chip */}
      <div style={{ position: "relative", zIndex: 5, marginBottom: 8 }}>
        <div style={styles.topDots}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={styles.topDot} />
          ))}
        </div>

        <div style={styles.chip}>
          <span style={styles.chipText}>{title}</span>
        </div>
      </div>

      {/* SVG area */}
      <div style={{ width: "100%", maxWidth: 1200, overflow: "visible" }}>
        <svg
          viewBox="0 0 1200 380"
          width="100%"
          height={height}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <defs>
            {/* animated rainbow gradient that slides */}
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff3b30" />
              <stop offset="16%" stopColor="#ff8a00" />
              <stop offset="32%" stopColor="#ffd600" />
              <stop offset="48%" stopColor="#25d366" />
              <stop offset="64%" stopColor="#00b7ff" />
              <stop offset="80%" stopColor="#7b61ff" />
              <stop offset="100%" stopColor="#ff3b30" />
              {/* animate gradient transform to shift across */}
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-1 0"
                to="1 0"
                dur={`${Math.max(3, speed)}s`}
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* soft glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* thin highlight gradient for inner stroke */}
            <linearGradient id="whitefade" x1="0" x2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* faint background subtle arc glow (makes the curve feel embedded) */}
          <path d={pathD} fill="none" stroke="#0b0e12" strokeWidth={strokeWidth + 8} strokeLinecap="round" strokeLinejoin="round" opacity="0.18" />

          {/* main rgb glowing path */}
          <path
            id="mainPath"
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#rg)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            style={{ mixBlendMode: "screen" }}
          />

          {/* subtle inner bright band to add depth */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#whitefade)"
            strokeWidth={Math.max(1, Math.round(strokeWidth / 3))}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
            transform=""
            style={{ filter: "blur(0px)", transformOrigin: "center" }}
          >
            {/* dashed offset animation (white shimmer traveling) */}
            <animate attributeName="stroke-dasharray" values="0 100;100 100;0 100" dur={`${Math.max(3, speed)}s`} repeatCount="indefinite" />
          </path>

          {/* little indicator dot riding the path */}
          <g>
            <circle r="7" fill="#fff" opacity="0.98">
              <animateMotion dur={`${Math.max(3, speed)}s`} repeatCount="indefinite" rotate="auto">
                <mpath href="#mainPath" />
              </animateMotion>
            </circle>
          </g>

          {/* nodes and their interactive circles */}
          {nodes.map((n) => {
            const isHover = hovered === n.id;
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`} style={{ cursor: "pointer" }}>
                {/* outer ring */}
                <motion.circle
                  r={isHover ? 20 : 14}
                  fill="#000"
                  stroke="url(#rg)"
                  strokeWidth={isHover ? 4 : 3}
                  style={{ filter: isHover ? "url(#glow)" : undefined }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onNodeClick && onNodeClick(n)}
                  initial={false}
                  animate={{ r: isHover ? 20 : 14 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                />

                {/* small center */}
                <circle r={6} fill="#0b0e12" stroke="#000" strokeWidth="1" />

                {/* card/tooltip rendered as a foreignObject for rich html */}
                <foreignObject x={-110} y={isHover ? -120 : 24} width={220} height={100} style={{ pointerEvents: isHover ? "auto" : "none", overflow: "visible" }}>
                  <div xmlns="http://www.w3.org/1999/xhtml">
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 6 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        width: 220,
                        background: "rgba(7,8,10,0.86)",
                        borderRadius: 12,
                        padding: "12px 14px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        color: "#fff",
                        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{n.title}</div>
                      <div style={{ color: "#9aa4ad", fontSize: 12, marginTop: 6 }}>{n.subtitle}</div>
                    </motion.div>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* connector from chip to curve (looks like a small black cable) */}
          <path d="M600,90 L600,160 C600,170 580,174 560,176" stroke="#111418" strokeWidth="2" fill="none" strokeLinecap="round" />

        </svg>
      </div>

      {/* small caption under svg */}
      <div style={{ marginTop: 10, color: "#9aa4ad", fontSize: 13, zIndex: 5 }}>
        Hover nodes to preview — click nodes to trigger actions.
      </div>

      {/* inline styling for the component */}
      <style>{`
        /* Responsive tweaks */
        @media (max-width: 900px) {
          svg { height: ${Math.max(220, Math.round(height * 0.7))}px !important; }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const styles = {
  container: {
    width: "100%",
    background: "#0d0f16",
    padding: "36px 18px 46px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  topDots: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  topDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    background: "#525861",
    boxShadow: "0 1px 0 rgba(0,0,0,0.4) inset",
  },
  chip: {
    background: "#050607",
    padding: "10px 30px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },
  chipText: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: 0.4,
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
  },
};
