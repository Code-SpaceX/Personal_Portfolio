import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaProjectDiagram, FaArrowUp, FaSun, FaMoon } from 'react-icons/fa';

const BottomNav = styled.div`
  position: fixed;
  bottom: ${({ show }) => (show ? '20px' : '-80px')};  /* floating 20px above bottom */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 420px;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'rgba(20, 20, 20, 0.7)'   /* dark translucent */
      : 'rgba(255, 255, 255, 0.6)'}; /* light translucent */
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: ${({ isDarkMode }) =>
    isDarkMode
      ? '0 8px 24px rgba(0, 0, 0, 0.8)'
      : '0 8px 24px rgba(0, 0, 0, 0.1)'};
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  z-index: 1000;
  transition: bottom 0.4s ease-in-out, background 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const BottomNavButton = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const BottomThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const BottomNavbar = ({ toggleTheme, isDarkMode }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
      } else if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up or near top
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BottomNav show={show} isDarkMode={isDarkMode}>
      <BottomNavButton href="#about" aria-label="About">
        <FaHome />
      </BottomNavButton>
      <BottomNavButton href="#projects" aria-label="Projects">
        <FaProjectDiagram />
      </BottomNavButton>
      <BottomThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </BottomThemeToggle>
      <BottomNavButton href="#" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FaArrowUp />
      </BottomNavButton>
    </BottomNav>
  );
};

export default BottomNavbar;
