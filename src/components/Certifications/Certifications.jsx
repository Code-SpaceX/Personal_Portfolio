import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Award, ExternalLink } from "lucide-react";
import cloudImg from "../../assests/images/CloudComputing.png";
import projectImg from "../../assests/images/ProjectManagement.png";

const certifications = [
  {
    title: "Cloud Computing",
    issuer: "AWS",
    date: "Apr 2024",
    link: "https://drive.google.com/drive/folders/1XLy3xJ-XTJ-Kpq_H3Se2A0zouA9_YUzj",
    image: cloudImg,
  },
  {
    title: "Project Management",
    issuer: "NPTEL",
    date: "Sept 2024",
    link: "https://drive.google.com/drive/folders/1XLy3xJ-XTJ-Kpq_H3Se2A0zouA9_YUzj",
    image: projectImg,
  },
];

function Certifications() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    centerMode: true,
    centerPadding: "0px",
    adaptiveHeight: true,
    arrows: false, // Hide default arrows
  };

  const SectionTitle = ({ children }) => (
    <h2
      style={{
        fontSize: "2rem",
        textAlign: "center",
        marginBottom: "3rem",
        fontWeight: "bold",
        background: "linear-gradient(to right, #2563eb, #7c3aed)",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </h2>
  );

  const CertificationCard = ({ title, issuer, date, link, image }) => (
    <div
      style={{
        position: "relative",
        background: isDark ? "#1f1d2c" : "#ffffff", // updated dark background color
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 10px 15px rgba(255, 255, 255, 0.05)"
          : "0 10px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        maxWidth: "600px",
        margin: "0 auto",
      }}
      className="group"
    >
      <img
        src={image}
        alt={`${title} certification`}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "cover",
          transition: "transform 0.5s",
        }}
        className="group-hover:scale-105"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="group-hover:opacity-80"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          padding: "2rem",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="group-hover:opacity-100"
      >
        <div
          style={{
            backgroundColor: "#2563eb",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <Award size={32} />
        </div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#d1d5db",
            marginBottom: "0.25rem",
          }}
        >
          {issuer}
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#9ca3af",
            marginBottom: "1rem",
          }}
        >
          {date}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #2563eb",
            color: "#fff",
            textDecoration: "none",
            backgroundColor: "transparent",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span>Verify</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );

  return (
    <div
      style={{
        padding: "5rem 1rem",
        backgroundColor: isDark ? "#1f1d2c" : "#f9fafb", // updated dark background color
        transition: "background-color 0.3s",
      }}
      id="certifications"
    >
      <style>
        {`
          .slick-slider {
            position: relative;
            display: block;
            box-sizing: border-box;
            user-select: none;
          }

          .slick-slide {
            display: inline-block;
            padding: 0 1rem;
          }

          .slick-dots {
            position: absolute;
            bottom: -30px;
            display: flex !important;
            justify-content: center;
            list-style: none;
            width: 100%;
            padding: 0;
             font-size: 0; 
          }

          .slick-dots li {
            margin: 0 5px;
          }

          .slick-dots button {
            border: none;
            background: #d1d5db;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            padding: 0;
            cursor: pointer;
          }
          .slick-dots button::before {
  font-size: 10px; /* Show the dot itself */
  line-height: 10px;
  color: #d1d5db; /* Normal dot color */
  opacity: 1;
}

.slick-dots .slick-active button::before {
  color: #2563eb; /* Active dot color */
}
          .slick-dots .slick-active button {
            background: #2563eb;
          }
        `}
      </style>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <SectionTitle>Certifications</SectionTitle>
        <Slider {...settings}>
          {certifications.map((cert) => (
            <div key={cert.title}>
              <CertificationCard {...cert} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Certifications;
