import styled, { keyframes } from 'styled-components';

export const AboutContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background: ${({ theme }) => theme.colors.background1};
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text1};
  margin-bottom: 40px;
`;

export const AboutCard = styled.div`
  position: relative;
  padding: 2rem;
  max-width: 800px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1;
`;

export const AboutText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  z-index: 2;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const BorderGlow = styled.div`
  position: absolute;
  inset: -2px;
  z-index: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(45deg, #854CE6, #00F6FF, #FF00C8, #854CE6);
  background-size: 300% 300%;
  animation: ${rotate} 6s linear infinite;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
  pointer-events: none;
`;
