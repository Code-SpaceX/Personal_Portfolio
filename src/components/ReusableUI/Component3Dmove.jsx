// ReusableUI/Component3Dmove.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import styled from 'styled-components';

const TiltWrapper = styled(motion.div)`
  perspective: 1000px;
  will-change: transform;
  display: inline-block;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
`;

const InnerTilt = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
`;

const Component3Dmove = ({ children, intensity = 15 }) => {
  const wrapperRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateAmountX = ((y - centerY) / centerY) * -intensity;
    const rotateAmountY = ((x - centerX) / centerX) * intensity;

    rotateX.set(rotateAmountX);
    rotateY.set(rotateAmountY);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { type: 'spring', stiffness: 120 });
    animate(rotateY, 0, { type: 'spring', stiffness: 120 });
  };

  return (
    <TiltWrapper
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <InnerTilt style={{ rotateX, rotateY }}>
        {children}
      </InnerTilt>
    </TiltWrapper>
  );
};

export default Component3Dmove;
