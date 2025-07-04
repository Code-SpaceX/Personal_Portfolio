import React, { useState, useEffect, useRef } from "react";
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
import openToWork from "../../images/openToWork.png";
import openToWorkAlt from "../../images/HeroImage.jpg";

const links = [
  { icon: <Globe />, label: "Latest Updates", url: "https://yourportfolio.com" },
  { icon: <Github />, label: "Blog", url: "https://github.com/username" },
  { icon: <Linkedin />, label: "Medium", url: "https://linkedin.com/in/username" },
  { icon: <FileText />, label: "AI Agents knowledge", url: "/resume.pdf" },
];

export default function LinktreeOne() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isReported, setIsReported] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const storedLikes = parseInt(localStorage.getItem("likes")) || 0;
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const storedReport = localStorage.getItem("reported") === "true";

    setLikes(storedLikes);
    setComments(storedComments);
    setIsReported(storedReport);
  }, []);

  useEffect(() => {
    localStorage.setItem("likes", likes);
    localStorage.setItem("comments", JSON.stringify(comments));
    localStorage.setItem("reported", isReported.toString());
  }, [likes, comments, isReported]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setIsOnline(hour >= 9 && hour < 17);
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const updatedComments = [...comments, comment.trim()];
      setComments(updatedComments);
      setComment("");
      localStorage.setItem("comments", JSON.stringify(updatedComments));
    }
  };

  const handleReport = () => {
    setIsReported(true);
    alert("Thanks for reporting! We'll look into it.");
  };

  return (
    <div className="w-full h-full relative z-0">
      {showPopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"></div>
          <div
            ref={popupRef}
            className="relative bg-white dark:bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border border-white/20 z-[99999]"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={openToWorkAlt}
              alt="Popup"
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Atul Oli</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              I'm a full-stack developer who loves clean UI and smart interactions.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 w-full h-full rounded-xl flex flex-col items-center overflow-hidden relative transition-colors">
        {/* Hero banner */}
        <div
          className="w-full h-36 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        {/* Profile Image with hover effect and ping */}
        <div className="relative -top-10 z-10">
          <div
            onClick={() => setShowPopup(true)}
            className="group w-24 h-24 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <div
              className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 shadow-lg transform transition duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105"
              style={{
                backgroundImage: `url(${openToWork})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {/* Ping and label */}
            <div className={`absolute bottom-0 -right-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full shadow-md ${
              isOnline ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
            }`}>
              <span className={`relative block w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}>
                <span className={`absolute inline-flex h-full w-full rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"} opacity-75 animate-ping`}></span>
              </span>
              <span className={`text-xs font-semibold ${isOnline ? "text-green-700 dark:text-green-200" : "text-red-700 dark:text-red-200"}`}>{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center mt-[-2.5rem] z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-none">
            Atul Oli
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-tight">
            Full Stack Developer & Tech Enthusiast
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 items-center mt-[-0.01rem] z-10 w-full px-4">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`flex items-center justify-center gap-2 px-4 py-2 w-full rounded-md text-sm ${
              isLiked ? "bg-pink-300 dark:bg-pink-700" : "bg-gray-200 dark:bg-gray-800"
            } text-gray-800 dark:text-white hover:scale-105 transition`}
          >
            <Heart size={16} /> Like ({likes})
          </button>

          <div className="w-full flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              className="flex-grow px-2 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-md hover:scale-105 transition"
            >
              <MessageCircle size={16} />
            </button>
          </div>

          <button
            onClick={handleReport}
            disabled={isReported}
            className={`flex items-center justify-center gap-2 px-4 py-2 w-full rounded-md text-sm ${
              isReported ? "bg-red-300 dark:bg-red-700" : "bg-red-200 dark:bg-red-800"
            } text-red-800 dark:text-white hover:scale-105 transition`}
          >
            <Bug size={16} /> {isReported ? "Reported" : "Report Bug"}
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
