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

// GITHUB BUTTON (Updated Colors)
export const GitHubButton = styled.a`
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.accent + '22'};
  border: 1.5px solid ${({ theme }) => theme.accent};
  border-radius: 12px;
  padding: 8px 18px;
  color: ${({ theme }) => theme.accent};
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.white};
    box-shadow: 0 4px 20px ${({ theme }) => theme.accent + '44'};
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

// DARK/LIGHT MODE TOGGLE BUTTON
export const ThemeToggleButton = styled.button`
  margin-left: 12px;
  padding: 8px 16px;
  border-radius: 12px;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.accent + '22'};
  border: 1.5px solid ${({ theme }) => theme.accent};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.white};
    box-shadow: 0 4px 20px ${({ theme }) => theme.accent + '44'};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// BUTTON CONTAINER
export const ButtonContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: none;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: rgba(128, 128, 128, 0.3);
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};
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

export const StarButton = styled.button`
  background: ${({ theme }) => theme.primary};  // Use primary color for background
  color: ${({ theme }) => theme.text_primary};  // Text color for the button
  border: none;
  padding: 12px 24px;  // Add padding (top-bottom: 12px, left-right: 24px)
  border-radius: 8px;   // Optional: Add rounded corners
  font-size: 1rem;      // Adjust font size as needed
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  margin-left: 16px;    // Add left margin to create a gap between buttons
  margin-right: 16px;   // Optional: Add right margin for symmetry (adjust as needed)

  &:hover {
    background: ${({ theme }) => theme.primary + 'cc'};  // Slightly darker on hover
    color: ${({ theme }) => theme.bg};  // Light text on hover
  }

  &:focus {
    outline: none;  // Remove default focus outline
  }
`;