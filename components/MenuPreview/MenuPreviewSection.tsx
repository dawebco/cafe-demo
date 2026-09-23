"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category, MENU_CATEGORIES } from "./menuData";
import { CategoryTabs } from "./CategoryTabs";
import { MenuGrid } from "./MenuGrid";

export const MenuPreviewSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(MENU_CATEGORIES[0]);

  return (
    <section id="menu" className="relative w-full bg-[#FAF8F4] pt-20 md:pt-24 lg:pt-28 pb-24 lg:pb-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header section */}
        <div className="flex flex-col items-center text-center max-w-[700px] mx-auto mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#B8893C]" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#B8893C]">
              OUR MENU
            </span>
            <div className="w-8 h-[1px] bg-[#B8893C]" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif text-[#1F1B18] leading-[1.1] tracking-wide mb-6">
            Discover Our <br />
            <span className="italic font-light text-[#B8893C]">Signature Collection</span>
          </h2>

          <p className="text-base md:text-lg text-[#1F1B18]/70 font-light leading-relaxed">
            Authentic wood-fired sourdough pizzas, gourmet pita bread, and specialty coffee.
          </p>
        </div>

        {/* Categories */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Menu Grid */}
        <div className="mb-16">
          <MenuGrid activeCategory={activeCategory} />
        </div>

        {/* Footer Button */}
        <div className="flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center justify-center bg-[#B8893C] px-10 py-4 rounded-full text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_-6px_rgba(184,137,60,0.5)] uppercase tracking-[0.2em]"
          >
            View Full Menu
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
