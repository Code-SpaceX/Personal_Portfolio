import React from 'react';
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
} from './NavbarStyledComponent';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shrink, setShrink] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
          <GitHubButton shrink={shrink} href={Bio.github} target="_blank" rel="noopener noreferrer">
            Github Profile
          </GitHubButton>
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
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
