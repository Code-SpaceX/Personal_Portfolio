import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
  NavItemsWrapper,
  ThemeToggleButton,
  MobileThemeToggleButton,
} from './NavbarStyledComponent';

import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaHome, FaProjectDiagram, FaArrowUp, FaSun, FaMoon } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import styled from 'styled-components';

const BottomNav = styled.div`
  position: fixed;
  bottom: ${({ show }) => (show ? '0' : '-80px')};
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.bg + 'ee'};
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  z-index: 1000;
  transition: bottom 0.4s ease-in-out;

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

const Navbar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const theme = useTheme();
  const isDarkMode = theme.bg === "#1C1C27";

  // Handle scroll for top navbar shrinking
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll for bottom navbar visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowBottomNav(true);
      } else if (window.scrollY > lastScrollY) {
        setShowBottomNav(false); // scrolling down
      } else {
        setShowBottomNav(true); // scrolling up
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav shrink={shrink}>
        <NavbarContainer>
          <NavLogo to='/' shrink={shrink}>
            <DiCssdeck size="2rem" />
            <Span shrink={shrink}>Portfolio</Span>
          </NavLogo>

          <MobileIcon>
            <FaBars onClick={() => setIsOpen(!isOpen)} />
          </MobileIcon>

          <NavItemsWrapper>
            <NavItems>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#education">Education</NavLink>
            </NavItems>
          </NavItemsWrapper>

          <ButtonContainer>
            <GitHubButton
              shrink={shrink}
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </GitHubButton>
            <ThemeToggleButton onClick={toggleTheme}>Theme</ThemeToggleButton>
          </ButtonContainer>

          {isOpen && (
            <MobileMenu isOpen={isOpen}>
              <MobileLink href="#about" onClick={() => setIsOpen(false)}>About</MobileLink>
              <MobileLink href="#skills" onClick={() => setIsOpen(false)}>Skills</MobileLink>
              <MobileLink href="#experience" onClick={() => setIsOpen(false)}>Experience</MobileLink>
              <MobileLink href="#projects" onClick={() => setIsOpen(false)}>Projects</MobileLink>
              <MobileLink href="#education" onClick={() => setIsOpen(false)}>Education</MobileLink>

              <GitHubButton
                style={{
                  padding: '10px 16px',
                  background: theme.card_light + '99',
                  color: theme.primary,
                  backdropFilter: 'blur(10px)',
                  border: `1.5px solid ${theme.primary}`,
                }}
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Profile
              </GitHubButton>

              <MobileThemeToggleButton
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </MobileThemeToggleButton>
            </MobileMenu>
          )}
        </NavbarContainer>
      </Nav>

      {/* Bottom Navbar (Mobile Only) */}
      <BottomNav show={showBottomNav}>
        <BottomNavButton href="#about">
          <FaHome />
        </BottomNavButton>
        <BottomNavButton href="#projects">
          <FaProjectDiagram />
        </BottomNavButton>
        <BottomThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </BottomThemeToggle>
        <BottomNavButton href="#">
          <FaArrowUp onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </BottomNavButton>
      </BottomNav>
    </>
  );
};

export default Navbar;
