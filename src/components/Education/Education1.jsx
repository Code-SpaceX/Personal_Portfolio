"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "../../utils/cn";
import useIsMobile from "./useIsMobile";

const education1 = [
  {
    id: 1,
    title: "Electronic and Mechanical Engineering",
    desc: "Work on modern UI/UX design to look futuristic design for systems.",
    thumbnail: "",
  },
  {
    id: 2,
    title: "Future of Real AI and ML",
    desc: "Built APIs and managed databases from scratch to integrate well with humans.",
    thumbnail: "",
  },
  {
    id: 3,
    title: "Advanced Cloud DevOps",
    desc: "Automating infrastructure and deployments for global scale.",
    thumbnail: "",
  },
];

const Education1 = () => {
  const pathRef = useRef(null);
  const scrollX = useMotionValue(0); // horizontal scroll position
  const progress = useMotionValue(0); // border animation progress
  const scrollRef = useRef(0); // actual numeric value for scroll
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const duration = 15000; // full loop in 15s
  const scrollWidthRef = useRef(0);

  const loopedData = [...education1, ...education1];

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 2;
      scrollWidthRef.current = width;
    }
  }, []);

  useAnimationFrame((time, delta) => {
    if (isHovered || !scrollWidthRef.current) return;

    const speed = scrollWidthRef.current / duration; // px per ms
    scrollRef.current += speed * delta;

    // Loop: reset if we've scrolled past half (since data is doubled)
    if (scrollRef.current >= scrollWidthRef.current) {
      scrollRef.current -= scrollWidthRef.current;
    }

    scrollX.set(scrollRef.current);

    // For border animation
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMsBorder = length / duration;
      const newProgress = (time * pxPerMsBorder) % length;
      progress.set(newProgress);
    }
  });

  return (
    <div className="py-20 w-full overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
          Future Learning / Experience I Will Take
        </h1>
      </div>

      <div
        className="overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-10 mt-12 w-max px-4"
          ref={containerRef}
          style={{
            x: useTransform(scrollX, (val) => `-${val}px`),
          }}
        >
          {loopedData.map((card, index) => (
            <CardItem
              key={`${card.id}-${index}`}
              title={card.title}
              desc={card.desc}
              thumbnail={card.thumbnail}
              progress={progress}
              pathRef={pathRef}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const CardItem = ({ title, desc, thumbnail, progress, pathRef }) => {
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Button borderRadius="1.75rem" progress={progress} pathRef={pathRef}>
      <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-4 w-[500px]">
        {!isMobile && (!imageError && thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="lg:w-32 md:w-24 w-20 object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="lg:w-32 md:w-24 w-20 h-20 flex items-center justify-center text-white bg-gray-700 rounded">
            Hello
          </div>
        ))}
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
  className,
  progress,
  pathRef,
  ...otherProps
}) => {
  return (
    <button
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden"
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 rounded-[1.75rem]"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder progress={progress} rx="30%" ry="30%" pathRef={pathRef}>
          <motion.div className="h-20 w-20 bg-[radial-gradient(#CBACF9_40%,transparent_60%)]" />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </button>
  );
};

const MovingBorder = ({ children, progress, rx, ry, pathRef }) => {
  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val)?.x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val)?.y
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
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
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
