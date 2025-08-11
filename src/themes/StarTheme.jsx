// StarTheme.jsx
import styled, { keyframes } from 'styled-components';

const starMovement = keyframes`
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(100vh) translateX(100vw); }
`;

const StarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  overflow: hidden;
  z-index: -1; /* keep behind all content */
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
  animation: ${starMovement} ${({ speed }) => `${speed}s`} linear infinite;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  opacity: ${({ opacity }) => opacity};
  animation-delay: ${({ delay }) => `${delay}s`};
`;

const StarTheme = () => {
  const stars = [];

  for (let i = 0; i < 100; i++) {
    stars.push(
      <Star
        key={i}
        top={Math.random() * 100}
        left={Math.random() * 100}
        opacity={Math.random() * 0.5 + 0.5}
        delay={Math.random() * 2}
        speed={Math.random() * 5 + 3}
      />
    );
  }

  return <StarWrapper>{stars}</StarWrapper>;
};

export default StarTheme;
