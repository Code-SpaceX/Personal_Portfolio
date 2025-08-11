import React from 'react';

const About = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const styles = {
    aboutItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    aboutItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      listStyle: 'none',
      backgroundImage: 'linear-gradient(90deg, rgba(165,215,232,0.42) 0%, rgba(255,255,255,0) 100%)',
      backgroundSize: '0% 100%',
      backgroundRepeat: 'no-repeat',
      transition: 'background-size 0.4s ease-in-out',
      cursor: 'pointer',
    },
    aboutItemHover: {
      backgroundSize: '100% 100%',
    },
    imageIcon: {
      width: '40px',
      height: '40px',
    },
    aboutItemText: {
      marginLeft: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
    },
    description: {
      fontSize: '16px',
      marginTop: '5px',
    }
  };

  const aboutData = [
    {
      title: 'Software Engineer',
      description: 'I am a software engineer with an internship experience at Microsoft',
    },
    {
      title: 'Frontend Developer',
      description: 'I am a frontend developer with various projects on HTML, CSS and React',
    },
    {
      title: 'Content Creator',
      description: 'I am a technical content creator with 8k+ subscribers on YouTube',
    },
  ];

  return (
    <ul style={styles.aboutItems}>
      {aboutData.map((item, index) => (
        <li
          key={index}
          style={{
            ...styles.aboutItem,
            ...(hoveredIndex === index ? styles.aboutItemHover : {})
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div style={styles.aboutItemText}>
            <h3 style={styles.title}>{item.title}</h3>
            <p style={styles.description}>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default About;
