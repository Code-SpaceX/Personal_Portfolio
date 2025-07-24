// Filename: StatsSection.jsx

import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Visited", value: 100, suffix: "+" },
  { label: "Liked", value: 90, suffix: "+" },
  { label: "Suggestion", value: 25, suffix: "+" },
  { label: "Projects", value: 50, suffix: "+" },
];

const CountingCard = () => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    document.documentElement.classList.toggle("dark");
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🔥 Trigger only when 50% of the section is visible
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1, // 90% of the component needs to be in view
  });

  return (
    <div
      ref={ref}
      className="py-10 px-4 md:px-20 transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Our Achievements</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <h3 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={4}
                  suffix={stat.suffix}
                  separator=","
                />
              ) : (
                "0"
              )}
            </h3>
            <p className="mt-2 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountingCard;
