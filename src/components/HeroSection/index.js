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
import HeroSectionVideo from './HeroSectionVideo.jsx';
import { ActionButtons, ContactInfo, SocialLinks } from './Bio.jsx';
import { FitScreen } from "@mui/icons-material";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.15)", // translucent white
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)", // for Safari
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
  padding: "2rem",
};

const HeroSection = () => {
  return (
    <div id="about" style={{ position: "relative", overflow: "hidden" }}>
      <HeroContainer>
        <HeroBg>
          {/* <HeroSectionVideo /> */}
        </HeroBg>

        <HeroInnerContainer style={{ gap: "3rem" }}>
          {/* Glass effect container for text */}
          <HeroLeftContainer id="Left" style={glassStyle}>
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
            <SocialLinks />
          </HeroLeftContainer>

          <HeroRightContainer
            id="Right"
            style={{
              ...glassStyle,
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "220px",
              height: "220px",
            }}
          >
            <Img
              src={HeroImg}
              alt="profile"
              style={{
                borderRadius: FitScreen ? "10%": "16%",
                width: "500px",
                height: "220px",
                objectFit: "cover",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
