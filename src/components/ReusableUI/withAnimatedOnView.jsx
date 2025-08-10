import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes, css } from 'styled-components';

// Slide-up + fade-in animation
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedWrapper = styled.div`
  opacity: 0;
  transform: translateY(50px);
  ${({ animate }) =>
    animate &&
    css`
      animation: ${slideUp} 0.7s ease-out forwards;
    `}
`;

const withAnimateOnView = (WrappedComponent) => {
  return function AnimatedComponent(props) {
    const { ref, inView } = useInView({
      threshold: 0.3,      // Trigger when 30% visible
      triggerOnce: false,  // 👈 allow re-triggering
    });

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      if (inView) {
        setAnimate(true);
      } else {
        setAnimate(false); // 👈 reset so animation can replay when visible again
      }
    }, [inView]);

    return (
      <div ref={ref}>
        <AnimatedWrapper animate={animate}>
          <WrappedComponent {...props} />
        </AnimatedWrapper>
      </div>
    );
  };
};

export default withAnimateOnView;
