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
  SubTitle,
  ResumeButton,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.jpg";
import Typewriter from "typewriter-effect";
import { Bio } from "../../data/constants";
import HeroSectionVideo from './HeroSectionVideo.jsx';


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
          <HeroSectionVideo />
        </HeroBg>

        <HeroInnerContainer style={{ gap: "3rem" }}>
          {/* Glass effect container for text */}
          <HeroLeftContainer id="Left" style={glassStyle}>
            <Title>Hi I am</Title>
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
            <SubTitle>{Bio.description}</SubTitle>
            <ResumeButton
              href={Bio.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:
                  "rgba(255, 255, 255, 0.25)",
                color: "#000",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "1rem",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")
              }
            >
              Check Resume
            </ResumeButton>
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
                borderRadius: "50%",
                width: "200px",
                height: "200px",
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
