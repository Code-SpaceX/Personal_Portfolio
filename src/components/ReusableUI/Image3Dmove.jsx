import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import HeroImg from '../../assests/images/CloudComputing.png'; 

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  margin-bottom: 50px;

  @media (max-width: 960px) {
    order: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
    padding-right: 0px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const TiltWrapper = styled(motion.div)`
  width: 350px;
  height: 350px;
  perspective: 1000px;

  @media (max-width: 640px) {
    width: 250px;
    height: 250px;
  }
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  transition: box-shadow 0.3s ease;
  will-change: transform;
`;

const Image3Dmove = () => {
  const containerRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateAmountX = ((y - centerY) / centerY) * -15;
    const rotateAmountY = ((x - centerX) / centerX) * 15;

    rotateX.set(rotateAmountX);
    rotateY.set(rotateAmountY);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { type: 'spring', stiffness: 150 });
    animate(rotateY, 0, { type: 'spring', stiffness: 150 });
  };

  return (
    <HeroRightContainer>
      <TiltWrapper
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      >
        <Img src={HeroImg} alt="Akshat Farkya" />
      </TiltWrapper>
    </HeroRightContainer>
  );
};

export default Image3Dmove;
