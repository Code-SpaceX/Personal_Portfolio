import { CloseRounded, GitHub, LinkedIn } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 1300;
  padding: 20px;
`;

const Wrapper = styled.div`
  max-width: 960px;
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const CloseIcon = styled(CloseRounded)`
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 32px !important;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: rotate(90deg);
  }
`;

const Left = styled.div`
  flex: 1;
  max-height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    max-height: 450px;
    object-fit: cover;
    border-radius: 0;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;

  @media only screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.primary + '33'};
  color: ${({ theme }) => theme.primary};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const Desc = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberImage = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const MemberName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  flex: 1;
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: auto;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.a`
  flex: 1;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ dull, theme }) =>
    dull ? theme.bgLight : theme.primary};
  color: ${({ dull, theme }) =>
    dull ? theme.text_secondary : theme.text_primary};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ dull, theme }) =>
      dull ? theme.bg : theme.primary + 'cc'};
  }
`;

const ProjectModal = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;

  if (!project) return null;

  return (
    <Modal
      open={openModal?.state}
      onClose={() => setOpenModal({ state: false, project: null })}
    >
      <Container>
        <Wrapper>
          <CloseIcon onClick={() => setOpenModal({ state: false, project: null })} />
          <Left>
            <img src={project.image} alt={project.title} />
          </Left>
          <Right>
            <Title>{project.title}</Title>
            <Date>{project.date}</Date>
            <Tags>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            <Desc>{project.description}</Desc>

            {project.member?.length > 0 && (
              <>
                <Label>Team Members</Label>
                <Members>
                  {project.member.map((member, i) => (
                    <Member key={i}>
                      <MemberImage src={member.img} />
                      <MemberName>{member.name}</MemberName>
                      {member.github && (
                        <IconLink href={member.github} target="_blank" rel="noreferrer">
                          <GitHub />
                        </IconLink>
                      )}
                      {member.linkedin && (
                        <IconLink href={member.linkedin} target="_blank" rel="noreferrer">
                          <LinkedIn />
                        </IconLink>
                      )}
                    </Member>
                  ))}
                </Members>
              </>
            )}

            <ButtonGroup>
              {project.github && (
                <Button dull href={project.github} target="_blank" rel="noreferrer">
                  View Code
                </Button>
              )}
              {project.webapp && (
                <Button href={project.webapp} target="_blank" rel="noreferrer">
                  Live App
                </Button>
              )}
            </ButtonGroup>
          </Right>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ProjectModal;
