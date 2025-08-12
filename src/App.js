// App.js

import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import {
  darkTheme,
  lightTheme,
  starTheme as starThemeObject,
} from "./utils/Themes.js";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import StarTheme from "./themes/StarTheme.jsx";
import HeroSection from "./components/HeroSection";
import About from "./components/About/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education1 from "./components/Education/Education1.jsx";
import Education from "./components/Education/index.js";
import AlertNotification from "./components/Notification/AlertNotification.jsx";
import ProjectDetails from "./components/ProjectDetails";
import styled, { createGlobalStyle } from "styled-components";
import InfiniteScrollText from "./components/HorizontalTextScroll/InfiniteScrollText.jsx";
import CountingCard from "./components/CountingCard/CountingCard.jsx";
import AboutCard from "./components/About/AboutCard.jsx";
import BowAndArrowGame from "./components/ReusableUI/BowAndArrowGame.jsx";
import Certifications from "./components/Certifications/Certifications.jsx";
import withAnimateOnView from "./components/ReusableUI/withAnimatedOnView.jsx";
import { useInView } from "react-intersection-observer";
import SkillsModified from "./components/Skills/Skills.modified.jsx";
import SkillSwitcher from "./components/ReusableUI/SkillSwitcher.jsx";
import ColorMixer from "./components/ReusableUI/MixGradient.jsx";
import SelectGame from "./components/Games/GamesStart/GameStart.jsx";

// Global style for blur effect
const GlobalStyle = createGlobalStyle`
  body.modal-open {
    overflow: hidden;
  }
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  transition: filter 0.3s ease;

  &.blurred {
    filter: blur(5px);
    pointer-events: none;
    user-select: none;
  }
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const ComponentToggleWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto 3rem;
  padding: 0 1rem;
  text-align: center;
`;

const ToggleButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ToggleButton = styled.button`
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : theme.bgLight || "#e0e7ff"};
  color: ${({ active, theme }) => (active ? "#fff" : theme.primary)};
  box-shadow: ${({ active }) =>
    active ? "0 6px 16px rgba(79, 70, 229, 0.6)" : "none"};
  transition: all 0.3s ease;

  width: 250px;
  max-width: 100%;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.primary : "#c7d2fe"};
    color: ${({ active }) => (active ? "#fff" : "#3730a3")};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Modal Content
const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.bgLight || "#fff"};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 16px;
  width: 80%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
`;

// Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const AnimatedHeroSection = withAnimateOnView(HeroSection);
const AnimatedAboutCard = withAnimateOnView(AboutCard);
const AnimatedAbout = withAnimateOnView(About);
const AnimatedCountingCard = withAnimateOnView(CountingCard);
const AnimatedInfiniteScrollText = withAnimateOnView(InfiniteScrollText);
const AnimatedSkills = withAnimateOnView(Skills);
const AnimatedEducation1 = withAnimateOnView(Education1);
const AnimatedEducation = withAnimateOnView(Education);
const AnimatedExperience = withAnimateOnView(Experience);
const AnimatedContact = withAnimateOnView(Contact);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isStarTheme, setIsStarTheme] = useState(false);
  const [openModal, setOpenModal] = useState({ state: false, component: null });
  const isModalOpen = openModal.state;
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [projectModal, setProjectModal] = useState({ state: false, project: null });

  const [prefersDark, setPrefersDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = () => {
    setIsStarTheme(false);
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const toggleStar = () => {
    const newStarTheme = !isStarTheme;
    setIsStarTheme(newStarTheme);
    if (newStarTheme) {
      setDarkMode(false);
      localStorage.setItem("theme", "star");
      document.documentElement.classList.add("dark");
    } else {
      const savedDark = localStorage.getItem("theme") === "dark";
      setDarkMode(savedDark);
      document.documentElement.classList.toggle("dark", savedDark);
      localStorage.setItem("theme", savedDark ? "dark" : "light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    const isDark = saved === "dark";
    const isStar = saved === "star";
    setDarkMode(isDark);
    setIsStarTheme(isStar);
    document.documentElement.classList.toggle("dark", isDark || isStar);
  }, []);

  const [contactRef] = useInView({ threshold: 0.5, triggerOnce: false });
  const [skillsVersion, setSkillsVersion] = useState("original");

  const renderComponent = () => {
    switch (openModal.component) {
      case "colorMixer":
        return <ColorMixer />;
      case "bowGame":
        return <BowAndArrowGame prefersDark={prefersDark} />;
      case "selectGame":
        return <SelectGame />;
      default:
        return null;
    }
  };

  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalOpen);
  }, [isModalOpen]);

  const [gamesRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setHasBeenVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ThemeProvider theme={isStarTheme ? starThemeObject : darkMode ? darkTheme : lightTheme}>
      <Router>
        <GlobalStyle />
        <Navbar toggleTheme={toggleTheme} toggleStar={toggleStar} />
        <Body className={isModalOpen ? "blurred" : ""}>
          {isStarTheme && <StarTheme />}
          <AlertNotification />
          <AnimatedHeroSection />
          <AnimatedAboutCard />
          <AnimatedAbout />
          <AnimatedCountingCard />

          <Wrapper>
            <AnimatedInfiniteScrollText />
            <SkillSwitcher skillsVersion={skillsVersion} setSkillsVersion={setSkillsVersion} />
            {skillsVersion === "original" ? <AnimatedSkills /> : <SkillsModified />}
            <AnimatedEducation1 />
            <AnimatedEducation />
            <AnimatedExperience />
          </Wrapper>

          <Projects openModal={projectModal} setOpenModal={setProjectModal} />
          <Certifications />

          <Wrapper>
            <div ref={contactRef}>
              <AnimatedContact />
            </div>
          </Wrapper>

          <div ref={gamesRef}>
            {hasBeenVisible && (
              <ComponentToggleWrapper>
                <ToggleButtons>
                  <ToggleButton onClick={() => setOpenModal({ state: true, component: "colorMixer" })}>
                    Color Mixer
                  </ToggleButton>
                  <ToggleButton onClick={() => setOpenModal({ state: true, component: "bowGame" })}>
                    Bow & Arrow Game
                  </ToggleButton>
                  <ToggleButton onClick={() => setOpenModal({ state: true, component: "selectGame" })}>
                    Select Game
                  </ToggleButton>
                </ToggleButtons>
              </ComponentToggleWrapper>
            )}
          </div>

          <Footer />

          {projectModal.state && (
            <ProjectDetails openModal={projectModal} setOpenModal={setProjectModal} />
          )}
        </Body>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={() => setOpenModal({ state: false, component: null })}>
                Close
              </CloseButton>
              {renderComponent()}
            </ModalContent>
          </ModalOverlay>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
