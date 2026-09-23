"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/gallery/gallery1.png",
    caption: "Grand Entrance",
  },
  {
    src: "/gallery/gallery2.png",
    caption: "The Heart of TLC Cafe",
  },
  {
    src: "/gallery/gallery3.png",
    caption: "The Coffee Experience",
  },
  {
    src: "/gallery/gallery4.png",
    caption: "Golden Hour Evenings",
  },
];

export const GallerySection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 70 }, // Smooth transition ~700ms
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Embla Carousel Container */}
        <div className="relative group">
          {/* touch-pan-y allows normal vertical scrolling while dragging horizontally */}
          <div className="overflow-hidden rounded-[24px] shadow-2xl bg-black/5" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {slides.map((slide, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                  {/* Cinematic Aspect Ratio Container */}
                  <div className="relative w-full aspect-[4/5] max-h-[70vh] md:max-h-none md:h-[80vh] md:aspect-video overflow-hidden">
                    {/* Ken Burns effect on the active slide */}
                    <div 
                      className="absolute inset-0 transition-transform duration-[5000ms] ease-out"
                      style={{ 
                        transform: selectedIndex === index ? "scale(1.02)" : "scale(1)",
                        transformOrigin: "center center" 
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1400px) 100vw, 1400px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (visible on hover on desktop) */}
          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-espresso flex items-center justify-center shadow-lg opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-espresso flex items-center justify-center shadow-lg opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Captions and Dots */}
        <div className="mt-10 flex flex-col items-center">
          <div className="h-8 relative w-full flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-lg md:text-xl font-serif text-espresso absolute"
              >
                {slides[selectedIndex].caption}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-500 rounded-full ${
                  selectedIndex === index 
                    ? "w-8 h-2 bg-crema-orange" 
                    : "w-2 h-2 bg-espresso/20 hover:bg-espresso/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
