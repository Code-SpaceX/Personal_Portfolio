import styled from "styled-components";

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${({ theme }) => theme.text};
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.1rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* pill shape */
  border: 2px solid ${({ theme }) => theme.accent};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.accentHover || theme.accent};
    box-shadow: 0 0 8px ${({ theme }) => theme.accent};
    outline: none;
  }
`;

function SkillSwitcher({ skillsVersion, setSkillsVersion }) {
  return (
    <SwitcherContainer>
      <Label htmlFor="skills-switch">Select Skills Layout:</Label>
      <Select
        id="skills-switch"
        value={skillsVersion}
        onChange={(e) => setSkillsVersion(e.target.value)}
      >
        <option value="original">Original</option>
        <option value="modified">Modified</option>
      </Select>
    </SwitcherContainer>
  );
}

export default SkillSwitcher;
