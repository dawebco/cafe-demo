"use client";

import { motion } from "framer-motion";
import { Pizza, Sandwich, Coffee, CakeSlice } from "lucide-react";
import { Category, MENU_CATEGORIES } from "./menuData";

interface CategoryTabsProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

export const CategoryTabs = ({ activeCategory, onSelect }: CategoryTabsProps) => {
  const getIcon = (category: Category) => {
    switch (category) {
      case "Pizzas":
        return <Pizza className="w-5 h-5 mb-2 transition-transform duration-250 ease-out group-hover:scale-[1.08]" strokeWidth={1.5} />;
      case "Pita Bread":
        return <Sandwich className="w-5 h-5 mb-2 transition-transform duration-250 ease-out group-hover:scale-[1.08]" strokeWidth={1.5} />;
      case "Coffee":
        return <Coffee className="w-5 h-5 mb-2 transition-transform duration-250 ease-out group-hover:scale-[1.08]" strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* ── Mobile Pill Chips Carousel ── */}
      <div 
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 px-6 mb-12 py-1"
        style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
      >
        {MENU_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`relative snap-start shrink-0 flex items-center justify-center h-[44px] px-7 rounded-full border text-sm font-medium tracking-wide transition-colors duration-250 ease-out ${
                isActive
                  ? "border-transparent text-[#1F1B18]"
                  : "bg-[#FDFBF7] border-[#1F1B18]/10 text-[#1F1B18]/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobileCategoryTab"
                  className="absolute inset-0 bg-[#B8893C] rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      {/* ── Desktop Category Grid (unchanged) ── */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-4 mb-16">
        {MENU_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`group relative flex flex-col items-center justify-center px-8 py-4 rounded-[2rem] border text-xs font-medium tracking-[0.1em] uppercase transition-all duration-250 ease-out hover:-translate-y-[2px] ${
                isActive
                  ? "border-transparent text-[#1F1B18]"
                  : "border-[#1F1B18]/10 text-[#1F1B18]/60 hover:bg-[#B8893C] hover:border-[#B8893C] hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-[#B8893C] rounded-[2rem] z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center">
                {getIcon(category)}
                <span className={`transition-opacity duration-250 ease-out ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
                  {category}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
