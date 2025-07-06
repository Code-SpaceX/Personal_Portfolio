"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "../../utils/cn";

const education1 = [
  {
    id: 1,
    title: "Graphic Era Hill University, Bhimtal",
    desc: "Worked on modern UI/UX design systems and responsive applications.",
    thumbnail: "/images/company1.png",
  },
  {
    id: 2,
    title: "Backend Developer",
    desc: "Built REST APIs and managed databases.",
    thumbnail: "/images/company2.png",
  },
];

const Education1 = () => {
  return (
    <div className="py-20 w-full" id="experience">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
          Future Learning / Experience I Will Take
        </h1>
      </div>

      <div className="w-full mt-12 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 px-4">
        {education1.map((card) => (
          <CardItem
            key={card.id}
            title={card.title}
            desc={card.desc}
            thumbnail={card.thumbnail}
            duration={Math.floor(Math.random() * 10000) + 10000}
          />
        ))}
      </div>
    </div>
  );
};

const CardItem = ({ title, desc, thumbnail, duration }) => {
  const [ballOpacity, setBallOpacity] = useState(1);

  const handleProgress = (progressPercent) => {
    // Corners at 0%, 25%, 50%, 75%
    const corners = [0, 0.25, 0.5, 0.75];
    // Smaller tolerance for tighter fade near corners
    const tolerance = 0.0; 

    const p = progressPercent % 1;

    // Determine opacity based on distance to nearest corner
    let opacity = 1;

    for (const corner of corners) {
      // Distance normalized considering wrap-around (circle)
      const dist = Math.min(
        Math.abs(p - corner),
        Math.abs(p - corner + 1),
        Math.abs(p - corner - 1)
      );
      if (dist < tolerance) {
        // Smooth fade: opacity goes from 1 at tolerance edge to 0 at center (corner)
        opacity = Math.min(opacity, dist / tolerance);
      }
    }

    setBallOpacity(opacity);
  };

  return (
    <Button
      borderRadius="1.75rem"
      duration={duration}
      className="flex-1"
      ballOpacity={ballOpacity}
      onProgress={handleProgress}
    >
      <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-4">
        <img
          src={thumbnail}
          alt={title}
          className="lg:w-32 md:w-24 w-20 object-contain"
        />
        <div className="lg:ms-5">
          <h1 className="text-start text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="text-start mt-3 font-medium text-gray-600 dark:text-gray-300">
            {desc}
          </p>
        </div>
      </div>
    </Button>
  );
};

const Button = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ballOpacity = 1,
  onProgress,
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 rounded-[1.75rem]"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%" onProgress={onProgress}>
          <motion.div
            style={{
              opacity: ballOpacity,
              transition: "opacity 0.15s ease",
            }}
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#CBACF9_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

const MovingBorder = ({ children, duration = 2000, rx, ry, onProgress, ...otherProps }) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      const newProgress = (time * pxPerMillisecond) % length;
      progress.set(newProgress);

      if (onProgress) {
        onProgress(newProgress / length);
      }
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
          pointerEvents: "none",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Education1;
