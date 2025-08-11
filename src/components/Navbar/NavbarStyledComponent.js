import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';
export const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: ${({ shrink }) => (shrink ? '45px' : '54px')};

  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'rgba(28, 28, 39, 0.5)'   // dark translucent glass
      : 'rgba(255, 255, 255, 0.3)' // light translucent glass
  };
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.1)'};

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  transition: all 0.3s ease;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  z-index: 1;
  width: 100%;
  padding: 0 2px;
  max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: ${({ shrink }) => (shrink ? '1.5rem' : '2rem')};
  transition: font-size 0.3s ease;
`;

export const Span = styled.div`
  padding: 0 4px;
  font-weight: bold;
  font-size: ${({ shrink }) => (shrink ? '16px' : '18px')};
  color: ${({ theme }) => theme.text_primary};
  transition: font-size 0.3s ease;
`;

// NAV ITEMS
export const NavItemsWrapper = styled.div`
  background: rgba(128, 128, 128, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 6px 14px;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0;
  list-style: none;
    @media screen and (max-width: 768px) {
    display: none; /* Hide NavItems on mobile */
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const ButtonContainer = styled.div`
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px; /* Spacing between buttons */
  padding: 0 4px;
  margin: 25%;
  transition: all 0.3s ease;

  /* Light transparent white background */
  background: ${({ theme }) =>
    theme.bg === '#1C1C27'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.5)'};
  backdrop-filter: blur(12px); /* Optional, gives a glass effect */
  -webkit-backdrop-filter: blur(12px); /* For Safari compatibility */

  /* Ensure the background is light, with transparency */
  border-radius: 10px;

  /* Set the color based on theme */
  color: ${({ theme }) =>
    theme.bg === '#1C1C27' ? 'white' : theme.text_primary}; /* White in dark mode, text_primary in light mode */

  /* 🔻 Hide on mobile */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;



export const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  /* Responsive Design for Mobile */
  @media screen and (max-width: 768px) {
    gap: 8px; /* Reduce gap on smaller screens */
  }
`;

export const GitHubButton = styled.a`
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(249, 245, 245, 0.99)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${({ theme }) => (theme.mode === 'dark' ? 'white' : theme.accent)}; /* Change text color based on dark/light mode */

  padding: 7px 15px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.white};  /* Hover text color will be white */
    box-shadow: 0 6px 20px ${({ theme }) => theme.accent + '55'};
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    font-size: 13.5px;
    padding: 8px 14px;
  }
`;

export const ThemeToggleButton = styled.button`
 background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(249, 245, 245, 0.99)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${({ theme }) => (theme.mode === 'dark' ? 'white' : theme.accent)}; /* Change text color based on dark/light mode */

  padding: 7px 15px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.white};  /* Hover text color will be white */
    box-shadow: 0 6px 20px ${({ theme }) => theme.accent + '55'};
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    font-size: 13.5px;
    padding: 8px 14px;
  }
`;


export const StarButton = styled.button`
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'};
  color: ${({ theme }) => (theme.mode === 'dark' ? 'grey' : theme.accent)};
  border: 1px solid ${({ theme }) => theme.accent};
  padding: 8px 14px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.white};
    box-shadow: 0 6px 20px ${({ theme }) => theme.accent + '55'};
  }

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;


// MOBILE ICON
export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`;

// MOBILE MENU
export const MobileMenu = styled.div`
  /* Layout & positioning */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem; /* 16px */
  position: absolute;
  top: 80px;
  right: 30px;
  width: 100%;
  max-width: 360px; /* Limit max width on larger screens */
  padding: 1rem 2rem 1.5rem 2rem; /* Responsive padding */
  margin: 0 auto;

  /* Visual styling */
  background: rgba(30, 30, 30, 0.9); /* Dark translucent for modern vibe */
  backdrop-filter: blur(14px); /* Stronger frosted glass */
  border-radius: 0 0 1.5rem 1.5rem; /* Rounded bottom corners */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3); /* Deeper shadow */

  /* Text styling */
  color: #f0f0f0; /* Light text for contrast */
  font-weight: 600;
  font-size: 1.1rem;

  /* Animation & visibility */
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-110%)")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  z-index: 1000;

  /* Responsive tweaks */
  @media (max-width: 400px) {
    max-width: 100%;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    font-size: 1rem;
  }
`;

// MOBILE NAVIGATION ITEMS
export const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
  height: 100%;
`;

export const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;

  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;

  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;

export const MobileThemeToggleButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.toggle_bg};
  color: ${({ theme }) => theme.toggle_text};
  border: 1.5px solid ${({ theme }) => theme.toggle_border};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    background: ${({ theme }) => theme.toggle_hover_bg};
    color: ${({ theme }) => theme.white};
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;
