import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import tinycolor from "tinycolor2";
// Utility: Check if color is light or dark
function isColorLight(color) {
  if (!color || typeof color !== "string" || !color.startsWith("#")) {
    return false; // default to dark
  }

  let r, g, b;
  try {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else if (color.length === 7) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else {
      return false;
    }

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
  } catch (error) {
    console.warn("Invalid color passed to isColorLight:", color);
    return false;
  }
}

const SkillsModified = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const skillsData = [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
    },
    {
      category: "Frontend",
      items: ["React", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "MySQL", "MongoDB"],
    },
    {
      category: "Tools & Version Control",
      items: ["Git"],
    },
    {
      category: "LLM & AI",
      items: ["LangChain", "OpenAI API", "Hugging Face"],
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getInverseTextColor = () => {
    if (!theme || !theme.text) return "#000"; // Fallback
    return isColorLight(theme.text) ? "#000000" : "#ffffff";
  };
  const isLightMode = tinycolor(theme.bg).isLight();

  return (
    <section
      className={`py-10 px-6 rounded-3xl shadow-2xl max-w-3xl mx-auto transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: theme.bgSecondary,
        color: theme.text,
        backdropFilter: "blur(8px)",
        border: `1px solid ${theme.border}`,
      }}
    >
<h2
  className="text-3xl font-extrabold mb-8 border-b pb-3"
  style={{
    borderColor: theme.border,
    ...(isLightMode
      ? {
          color: "#000000", // Light mode: solid readable black text
        }
      : {
          backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }),
  }}
>
  Skills
</h2>


      <div className="space-y-8">
        {skillsData.map((group, idx) => (
          <div key={idx}>
            <h3
              className="text-lg font-semibold tracking-wide mb-4"
              style={{ color: theme.accent }}
            >
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform shadow-md cursor-default"
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = `linear-gradient(to right, ${theme.accent}, ${theme.text})`;
                    e.currentTarget.style.color = getInverseTextColor(); // safe call
                    e.currentTarget.style.border = "none";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.card;
                    e.currentTarget.style.color = theme.text;
                    e.currentTarget.style.border = `1px solid ${theme.border}`;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsModified;
