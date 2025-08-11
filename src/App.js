// App.js

import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme, starTheme as starThemeObject } from './utils/Themes.js'; // Rename to avoid collision
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
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
import styled from "styled-components";
import InfiniteScrollText from "./components/HorizontalTextScroll/InfiniteScrollText.jsx";
import CountingCard from "./components/CountingCard/CountingCard.jsx";
import AboutCard from "./components/About/AboutCard.jsx";
import BowAndArrowGame from "./components/ReusableUI/BowAndArrowGame.jsx";
import Certifications from "./components/Certifications/Certifications.jsx";

// Animation HOC
import withAnimateOnView from './components/ReusableUI/withAnimatedOnView.jsx';

// Intersection Observer
import { useInView } from 'react-intersection-observer';
import SkillsModified from "./components/Skills/Skills.modified.jsx";
import SkillSwitcher from "./components/ReusableUI/SkillSwitcher.jsx";

// Styled wrappers
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  background: linear-gradient(
    38.73deg,
    rgba(204, 0, 187, 0.15) 0%,
    rgba(201, 32, 184, 0) 50%
  ),
  linear-gradient(
    141.27deg,
    rgba(0, 70, 209, 0) 50%,
    rgba(0, 70, 209, 0.15) 100%
  );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

// Animated components
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
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  // Theme toggling function
  const toggleTheme = () => {
    setIsStarTheme(false); // Turn off star theme if switching manually
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Handle Star Theme toggle
  const toggleStar = () => {
    const newStarTheme = !isStarTheme;
    setIsStarTheme(newStarTheme);
    if (newStarTheme) {
      setDarkMode(false); // Ensure darkMode is off
      localStorage.setItem('theme', 'star');
      document.documentElement.classList.add('dark');
    } else {
      const savedDark = localStorage.getItem('theme') === 'dark';
      setDarkMode(savedDark);
      document.documentElement.classList.toggle('dark', savedDark);
      localStorage.setItem('theme', savedDark ? 'dark' : 'light');
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    const isDark = saved === 'dark';
    const isStar = saved === 'star';
    setDarkMode(isDark);
    setIsStarTheme(isStar);
    document.documentElement.classList.toggle('dark', isDark || isStar);
  }, []);

  // Intersection observer for Contact section
  const [contactRef, contactInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const [skillsVersion, setSkillsVersion] = useState("original");

  return (
    <ThemeProvider theme={isStarTheme ? starThemeObject : darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar toggleTheme={toggleTheme} toggleStar={toggleStar} />
        <Body>
          {/* Render Star background if star theme is active */}
          {isStarTheme && <StarTheme />}

          <AlertNotification />

          <AnimatedHeroSection />
          <AnimatedAboutCard />
          <AnimatedAbout />
          <AnimatedCountingCard />

          <Wrapper>

            <AnimatedInfiniteScrollText />
            <SkillSwitcher skillsVersion={skillsVersion} setSkillsVersion={setSkillsVersion} />
  {skillsVersion === "original" ? (
    <AnimatedSkills />
  ) : (
    <SkillsModified />
  )}
            <AnimatedEducation1 />
            <AnimatedEducation />
            <AnimatedExperience />
          </Wrapper>

          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Certifications />

          <Wrapper>
            <div ref={contactRef}>
              <AnimatedContact />
            </div>
          </Wrapper>

          {contactInView && (
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <BowAndArrowGame />
            </div>
          )}

          <Footer />

          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
