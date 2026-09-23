"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChefCard } from "./ChefCard";
import { motion } from "framer-motion";

const REVIEWS_DATA = [
  {
    id: "review-1",
    name: "Bryan",
    role: "Local Guide",
    description: "Cozy, Charming and probably the best PIZZAS in town. Add to this the feel of sitting in an art emporium... this one deserves a 5 star rating.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "review-2",
    name: "Poonam S.",
    role: "Coffee Enthusiast",
    description: "It's the only place in Mangalore where you actually get the coffee that's mentioned on the menu! The staff is very friendly too!",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "review-3",
    name: "Siddharth S.",
    role: "Regular Customer",
    description: "Beautiful cozy cafe with a good playlist of soothing blues and jazz. Loved the coffee.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
];

// ─── Mobile Carousel with Pagination Dots ───────────────────────────────────

function MobileChefCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active slide with IntersectionObserver (threshold 0.55 = majority in view)
  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      {
        root: scrollRef.current,
        // A card is "active" when more than 55% of it is visible
        threshold: 0.55,
      }
    );

    items.forEach((item) => observer.observe(item!));
    return () => observer.disconnect();
  }, []);

  // Dot click → programmatic scroll to that card
  const scrollToIndex = useCallback((idx: number) => {
    const el = itemRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full py-8 pb-12">
      {/*
        Carousel track
        ──────────────
        • overflow-x-auto + snap-x: native momentum swipe
        • px-[7vw]: creates the peek effect — the 7vw padding on each side
          allows the adjacent card edges to bleed into view, signalling
          that there are more cards to swipe through
        • scroll-padding-x: keeps the snap target centred within the padded track
        • hide-scrollbar: suppresses the browser scrollbar chrome
      */}
      <div
        ref={scrollRef}
        className="
          flex w-full overflow-x-auto
          snap-x snap-mandatory
          hide-scrollbar
          scroll-smooth
          px-[7vw]
          gap-4
        "
        style={{ scrollPaddingLeft: "7vw", scrollPaddingRight: "7vw" }}
      >
        {REVIEWS_DATA.map((chef, idx) => (
          <div
            key={chef.id}
            ref={(el) => { itemRefs.current[idx] = el; }}
            className="
              snap-center
              shrink-0
              w-[86vw]
              flex flex-col
            "
          >
            <ChefCard chef={chef} />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-[10px] mt-6" role="tablist" aria-label="Chef slides">
        {REVIEWS_DATA.map((chef, idx) => (
          <motion.button
            key={chef.id}
            role="tab"
            aria-label={`Go to ${chef.name}`}
            aria-selected={activeIndex === idx}
            onClick={() => scrollToIndex(idx)}
            animate={{
              width: activeIndex === idx ? 24 : 8,
              opacity: activeIndex === idx ? 1 : 0.35,
              backgroundColor: activeIndex === idx ? "#B96D40" : "#1F1A17",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[8px] rounded-full cursor-pointer border-none p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B96D40]"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Grid (unchanged) ────────────────────────────────────────────────

function DesktopChefGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-6 lg:px-8 py-16">
      {REVIEWS_DATA.map((chef) => (
        <ChefCard key={chef.id} chef={chef} />
      ))}
    </div>
  );
}

// ─── Exported component: mobile carousel below md, desktop grid at md+ ───────

export function ChefGrid() {
  return (
    <>
      {/* Mobile only */}
      <div className="block md:hidden w-full">
        <MobileChefCarousel />
      </div>
      {/* Desktop only */}
      <div className="hidden md:block w-full">
        <DesktopChefGrid />
      </div>
    </>
  );
}

