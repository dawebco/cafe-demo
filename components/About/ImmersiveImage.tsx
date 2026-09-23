"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const ImmersiveImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      <motion.div 
        className="absolute top-[-20%] left-0 right-0 bottom-[-20%] w-full h-[140%] will-change-transform"
        style={{ y }}
      >
        <Image
          src="/gallery/gallery2.png"
          alt="TLC Cafe Architecture"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle dark gradient at the bottom to assist the visual transition into the Contact section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121110]/80" />
      </motion.div>
    </div>
  );
};
