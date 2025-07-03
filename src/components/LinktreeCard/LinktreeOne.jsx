import React from "react";
import {
  Github,
  Linkedin,
  FileText,
  Globe,
  Heart,
  MessageCircle,
  Bug,
} from "lucide-react";
import heroImage from "../../images/HeroImage.jpg";
import openToWork from "../../images/openToWork.png"
const links = [
  { icon: <Globe />, label: "Portfolio", url: "https://yourportfolio.com" },
  { icon: <Github />, label: "GitHub", url: "https://github.com/username" },
  { icon: <Linkedin />, label: "LinkedIn", url: "https://linkedin.com/in/username" },
  { icon: <FileText />, label: "Resume", url: "/resume.pdf" },
];

export default function LinktreeOne() {
  return (
    <div className="w-full h-full">
      <div className="bg-white dark:bg-gray-900 w-full h-full rounded-xl flex flex-col items-center overflow-hidden relative transition-colors">
       
  <div
    className="w-full h-36 bg-cover bg-center relative"
    style={{
      backgroundImage: `url(${heroImage})`,  // ✅ Load banner
    }}
  ></div>

  {/* Profile Image */}
  <div className="relative -top-10 z-10">
     <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
   style={{
      backgroundImage: `url(${openToWork})`,
       backgroundSize: "cover",       
      backgroundPosition: "center",  
      backgroundRepeat: "no-repeat", 
    }}
    > </div>  

  </div>
        {/* Name & Role */}
        <div className="text-center mt-[-1rem] z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pulkit</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Full Stack Developer & OSS Enthusiast
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4 z-10">
          <button className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:scale-105 transition">
            <Heart size={16} />
            Like
          </button>
          <button className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:scale-105 transition">
            <MessageCircle size={16} />
            Comment
          </button>
          <button className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-red-200 dark:bg-red-800 text-red-800 dark:text-white hover:scale-105 transition">
            <Bug size={16} />
            Report
          </button>
        </div>

        {/* Linktree Links */}
        <div className="z-10 mt-5 w-full px-4 space-y-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white rounded-md py-2 px-3 hover:scale-105 transition"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
