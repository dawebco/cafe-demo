"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface ChefCardProps {
  chef: {
    id: string;
    name: string;
    role: string;
    description: string;
    imageUrl: string;
  };
}

const imageVariants: Variants = {
  rest: { opacity: 1, scale: 1 },
  hover: { 
    opacity: 0.92,
    scale: 1.02, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

const panelVariants: Variants = {
  rest: { y: 15, opacity: 0 },
  hover: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export function ChefCard({ chef }: ChefCardProps) {
  return (
    <motion.div
      className="relative flex flex-col h-[350px] lg:h-[400px] w-full overflow-hidden group"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Background Image Container */}
      <motion.div 
        className="flex-1 w-full flex items-center justify-center overflow-hidden z-0 py-8" 
        variants={imageVariants}
      >
        <Image
          src={chef.imageUrl}
          alt={chef.name}
          width={300}
          height={300}
          className="w-48 h-48 rounded-full object-cover shadow-2xl"
          priority={false}
        />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 mx-auto top-[50%] -translate-y-[50%] w-[80%] flex flex-col items-center text-center py-6 px-5 z-20 pointer-events-none group-hover:pointer-events-auto bg-[rgba(253,251,247,0.85)] backdrop-blur-3xl rounded-[18px] shadow-[0_0_40px_rgba(185,109,64,0.12)] border border-white/40"
        variants={panelVariants}
      >
        <p className="text-espresso font-bold text-sm italic leading-relaxed tracking-wide">
          "{chef.description}"
        </p>

      </motion.div>

      {/* Permanent Footer */}
      <div className="w-full flex flex-col items-center text-center pt-6 pb-2 z-10">
        <h3 className="font-heading text-2xl lg:text-3xl text-espresso font-bold tracking-wide">
          {chef.name}
        </h3>
        <p className="text-crema-orange font-bold text-xs lg:text-sm tracking-[0.2em] uppercase mt-2">
          {chef.role}
        </p>
      </div>
    </motion.div>
  );
}
