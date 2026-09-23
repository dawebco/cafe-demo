"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";

export const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Local scroll tracking for precise parallax within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const shouldReduceMotion = useReducedMotion();

  // Floating Cup Parallax & Rotation
  // Spring physics make it feel grounded and physical rather than linear
  // Reduced by 40% on mobile to maintain elegance in smaller viewports
  const rawCupY = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["15px", "-20px"] : ["30px", "-40px"]
  );
  const rawCupRotate = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["-1deg", "1deg"] : ["-2deg", "2deg"]
  );
  const rawCupScale = useTransform(
    scrollYProgress, 
    [0.3, 0.7, 1], 
    isMobile ? [0.99, 1.01, 0.995] : [0.98, 1.02, 0.99]
  );

  const cupY = useSpring(rawCupY, { stiffness: 40, damping: 20 });
  const cupRotate = useSpring(rawCupRotate, { stiffness: 40, damping: 25 });
  const cupScale = useSpring(rawCupScale, { stiffness: 30, damping: 15 });

  // Main Image Parallax
  const rawImageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageY = useSpring(rawImageY, { stiffness: 50, damping: 25 });

  return (
    <div ref={containerRef} className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 md:pt-32 pb-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-20 items-center relative">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start relative z-20"
        >
          <span className="text-[#B96D40] text-sm tracking-[0.2em] font-semibold uppercase mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#B96D40] block opacity-50" />
            About TLC Cafe
          </span>
          
          <h2 className="font-serif text-[#1F1A17] text-[2.75rem] md:text-6xl lg:text-7xl leading-[1.05] mb-8 max-w-[15ch]">
            A serene, peaceful space.
          </h2>
          
          <p className="font-sans text-[#756A63] text-lg md:text-xl leading-relaxed mb-12 max-w-[42ch]">
            TLC Cafe is a charming, cozy art cafe with a warm wooden theme. We offer specialty coffee, authentic wood-fired sourdough pizzas, and gourmet pita bread. It is a serene, peaceful space perfect for reading, working, and listening to soothing blues and jazz.
          </p>

          {/* Luxury CTA Button */}
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="group relative px-8 py-4 bg-[#121110] text-[#FDFBF7] font-sans tracking-widest text-sm uppercase rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 ease-out"
          >
            <span className="relative z-10 transition-colors duration-500 text-white/90 group-hover:text-white">
              Discover Our Menu
            </span>
            <div className="absolute inset-0 bg-[#2C3625] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1] z-0" />
          </motion.button>
        </motion.div>

        {/* RIGHT COLUMN: Premium Image Wrapper */}
        <div className="relative w-full z-10">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full aspect-[4/5] overflow-hidden rounded-[8px] shadow-[0_24px_60px_rgba(31,26,23,0.08)]"
          >
            <motion.div
              className="absolute inset-[-10%] w-[120%] h-[120%] origin-center will-change-transform"
              style={{ y: shouldReduceMotion ? 0 : imageY }}
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/about/cafe-interior.png"
                alt="Aster Cafe Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#1F1A17]/10 to-transparent mix-blend-overlay" />
            </motion.div>
          </motion.div>

          {/* Floating Cup (Mobile + Desktop) */}
          <motion.div
            className="absolute z-30 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] -right-4 -top-12 lg:right-auto lg:top-1/2 lg:-left-20 xl:-left-24 lg:-translate-y-1/2"
            style={{ 
              translateY: shouldReduceMotion ? 0 : cupY,
              rotate: shouldReduceMotion ? 0 : cupRotate,
              scale: shouldReduceMotion ? 1 : cupScale
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Soft shadow under the cup */}
            <div className="absolute bottom-[-5%] left-[15%] right-[15%] h-[10px] bg-[#1F1A17]/10 blur-xl rounded-full" />
            <Image
              src="/images/about/floating-cup.png"
              alt="Aster Cafe Signature Cup"
              fill
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              sizes="(max-width: 1024px) 150px, 240px"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};
