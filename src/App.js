// App.js
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

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

// Styled wrappers
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
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
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  // Theme toggling
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    const isDark = saved === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Intersection observer for Contact section
  const [contactRef, contactInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Body>
          <AlertNotification />

          <AnimatedHeroSection />
          <AnimatedAboutCard />
          <AnimatedAbout />
          <AnimatedCountingCard />

          <Wrapper>
            <AnimatedInfiniteScrollText />
            <AnimatedSkills />
            <AnimatedEducation1 />
            <AnimatedEducation />
            <AnimatedExperience />
          </Wrapper>

          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Certifications />

          <Wrapper>
            {/* 👇 Observe this div wrapping the Contact section */}
            <div ref={contactRef}>
              <AnimatedContact />
            </div>
          </Wrapper>

          {/* 👇 Load the game only when Contact is in view */}
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
