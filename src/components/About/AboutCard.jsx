import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(44,56,98,0.09);
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  width: 100%;
  padding: 2rem 2.5rem;
  transition: background 0.3s;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    padding: 1.2rem;
    gap: 1.8rem;
  }
`;

/* Add your other styled components here, unchanged */
const PhotoBlock = styled.div`
  min-width: 260px;
  width: 320px;
  max-width: 90vw;
  display: flex;
  align-items: flex-start;
`;
const PhotoFrame = styled.div`
  border-radius: 18px 18px 20px 24px;
  border: 4px solid ${({ theme }) => theme.accent};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.accent} 54%,
    ${({ theme }) => theme.accent2} 69%
  );
  padding: 5px;
  box-shadow: 0 4px 32px 0 rgba(44,56,98,0.13);
`;
const Photo = styled.img`
  display: block;
  border-radius: 14px 14px 16px 20px;
  width: 250px;
  height: 270px;
  object-fit: cover;
`;
const InfoBlock = styled.div`
  flex: 1 1 350px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Chips = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
`;

const Chip = styled.span`
 background: ${({ variant, theme }) =>
    variant === "blue"
      ? "#edf4fe"
      : variant === "purple"
      ? "#ebebff"
      : variant === "gold"
      ? "#fdf6dd"
      : theme.chipBg};
  color: ${({ variant, theme }) =>
    variant === "blue"
      ? "#567bee"
      : variant === "purple"
      ? "#6562cc"
      : variant === "gold"
      ? "#a28411"
      : theme.chipText};
  font-size: 0.93rem;
  border-radius: 16px;
  padding: 0.23rem 0.95rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10;
  }
`;
const Desc = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  line-height: 1.56;
  font-size: 1.09rem;
`;
const CardsRow = styled.div`
  display: flex;
  gap: 1.7rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;
`;
const SmallCard = styled.div`
  background: ${({ theme }) => theme.mainBg};
  border-radius: 14px;
  box-shadow: 0 4px 20px -8px ${({ theme }) => theme.accent}13;
  padding: 1.1rem 1.2rem;
  min-width: 230px;
  flex: 1 1 210px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px -4px ${({ theme }) => theme.accent}66;
    z-index: 5;
  }
`;
const CardTitle = styled.h4`
  font-size: 1.09rem;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;
const EduExpList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const EduExpItem = styled.li`
  margin-bottom: 0.7rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Bold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
`;
const Secondary = styled.span`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.98em;
`;
const StatsRow = styled.div`
  display: flex;
  gap: 2.4rem;
  margin-top: 1.7rem;
  flex-wrap: wrap;
`;
const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StatValue = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
`;
const StatLabel = styled.div`
  font-size: 1.01rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 0.18rem;
`;

export default function AboutCard() {
  return (
      <Card>
        <PhotoBlock>
          <PhotoFrame>
            <Photo
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=500&h=500&facepad=1&q=80"
              alt="Profile"
            />
          </PhotoFrame>
        </PhotoBlock>
        <InfoBlock>
          <Chips>
            <Chip variant="blue">GSSOC Contributer</Chip>
            <Chip variant="purple">Experienced BCA Graduate</Chip>
            <Chip variant="gold">
              Jr. Devops Engineer ( Aiops / MLops)
            </Chip>
          </Chips>
          <Desc>
            I am a dedicated Devops professional with a passion for
            understanding system needs and creating robust CI/CD pipelines. My expertise in building the pipelines for different System, and make system more easy to use &gt;  system hardening, allowing me to identify and
            mitigate potential security risks before they can be exploited.
          </Desc>
          <CardsRow>
            <SmallCard>
              <CardTitle>Education</CardTitle>
              <EduExpList>
                <EduExpItem>
                  <Bold>Ongoing MCA</Bold>
                  <br />
                  <Secondary>Lovely Professional University (2025-2027)</Secondary>
                </EduExpItem>
                <EduExpItem>
                  <Bold>Bachelors of Computer Application</Bold>
                  <br />
                  <Secondary>Graphic Era Hill University (2022-2025)</Secondary>
                </EduExpItem>
              </EduExpList>
            </SmallCard>
            <SmallCard>
              <CardTitle>Experience</CardTitle>
              <EduExpList>
                <EduExpItem>
                  <Bold>TBI Geu</Bold>
                  <br />
                  <Secondary>Mentor and Contributor</Secondary>
                </EduExpItem>
                <EduExpItem>
                  <Bold>We Code CLub Member</Bold>
                  <br />
                  <Secondary>Learning in Collabration , Work on real world life Project of College </Secondary>
                </EduExpItem>
              </EduExpList>
            </SmallCard>
          </CardsRow>
          <StatsRow>
            <Stat>
              <StatValue>5+</StatValue>
              <StatLabel>Real Life Projects</StatLabel>
            </Stat>
            <Stat>
              <StatValue>30%</StatValue>
              <StatLabel>Performance Increment</StatLabel>
            </Stat>
            <Stat>
              <StatValue style={{ color: "#ffc300" }}>99.9%</StatValue>
              <StatLabel>Learning Rate With Practical PRojects</StatLabel>
            </Stat>
          </StatsRow>
        </InfoBlock>
      </Card>
  );
}
