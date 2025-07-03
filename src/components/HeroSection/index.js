import React from "react";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.jpg";
import Typewriter from "typewriter-effect";
import { Bio } from "../../data/constants";
import { ActionButtons, ContactInfo, SocialLinks } from './Bio.jsx';
import openToWork from '../../images/openToWork.png'; 
import openToWorkAlt from '../../images/HeroImage.jpg'; 
import PopupProfileCard from "../../components/ProfileCard/PopupProfileCard.jsx";
import LinktreeOne from "../LinktreeCard/LinktreeOne.jsx";

const glassStyle = {
  background: "rgba(132, 119, 119, 0.09)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(197, 128, 19, 0.37)",
  backdropFilter: "blur(60px)",
  WebkitBackdropFilter: "blur(70px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
  padding: "2rem",
};

const HeroSection = () => {
  return (
    <div id="about" style={{ position: "relative", overflow: "hidden" }}>
      <HeroContainer>
        <HeroBg>{/* Optional background video */}</HeroBg>

        <HeroInnerContainer style={{ gap: "3rem", position: 'relative' }}>
          <HeroLeftContainer id="Left" style={{ ...glassStyle, position: 'relative' }}>
            <button
              className="text-sm font-medium border rounded px-6 py-2 transition-colors duration-300"
              style={{
                position: 'absolute',
                top: '-1.2rem',
                right: '-17%',
                transform: 'translateX(-50%)',
                width: '180px',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 128, 0, 0.15)',
                color: '#32CD32',
                backdropFilter: 'blur(80px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1.5px solid rgba(50, 205, 50, 0.5)',
                boxShadow: '0 4px 15px rgba(50, 205, 50, 0.6)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 128, 0, 0.3)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(52, 25, 228, 0.9)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(66, 206, 23, 0.6)';
              }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#915eff]"></span>
              </span>
              Open for Work
            </button>

            <div className="inline-block bg-blue-100 dark:bg-blue-900/50 backdrop-blur-sm text-blue-600 dark:text-blue-300 text-sm font-medium px-4 py-2 rounded-full">
              Hey! <span className="inline-block origin-[70%_70%] animate-wave">👋</span> I'm
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              ATUL OLI
            </h1>

            <TextLoop>
              <Title>
                <Span>
                  <Typewriter
                    options={{
                      strings: Bio.roles,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </Span>
              </Title>
            </TextLoop>

            <ContactInfo />
            <ActionButtons />
            <div className="flex items-center gap-4">
              <SocialLinks />
            </div>

            <PopupProfileCard
              originalImage={openToWork}
              activeImage={openToWorkAlt}
              imageSize={200}
              hoverToOpen={false}
              clickToOpen={true}
            />
          </HeroLeftContainer>

          <HeroRightContainer
  id="Right"
  style={{
    ...glassStyle,
    padding: "0rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "420px",
    height: "520px",
  }}
>
  <LinktreeOne />
</HeroRightContainer>

          
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
