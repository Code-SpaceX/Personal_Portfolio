import React from 'react'
import { AboutContainer, AboutCard, AboutText, BorderGlow, SectionTitle } from './AboutStyle';
import { SocialMediaIcons, SocialMediaIcon } from '../Navbar/NavbarStyledComponent';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
const About = () => {
  return (
  <AboutContainer id="about">
      <SectionTitle>About Me</SectionTitle>
      <AboutCard>
        <BorderGlow />
        <AboutText>
          Hi, I'm a passionate full-stack developer with experience in building web applications using modern technologies like React, Node.js, and MongoDB. I love creating beautiful and functional user experiences and enjoy solving complex problems with clean, scalable code.

          <br /><br />
          I'm always exploring new tools and best practices to stay sharp and push boundaries.
        </AboutText>
        <SocialMediaIcons>
          <SocialMediaIcon href="https://github.com" target="_blank"><FaGithub /></SocialMediaIcon>
          <SocialMediaIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialMediaIcon>
          <SocialMediaIcon href="https://twitter.com" target="_blank"><FaTwitter /></SocialMediaIcon>
        </SocialMediaIcons>
      </AboutCard>
    </AboutContainer>
  );
};


export default About;