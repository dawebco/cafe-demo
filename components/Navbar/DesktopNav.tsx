"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { handleScrollToSection } from "@/lib/utils";

interface DesktopNavProps {
  activeSection: string;
  isLight: boolean; // true = dark text on cream, false = white text on transparent
}

const NAV_ITEMS = [
  { name: "Home", id: "hero" },
  { name: "Menu", id: "menu" },
  { name: "Reviews", id: "chefs" },
  { name: "Gallery", id: "gallery" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export const DesktopNav = ({ activeSection, isLight }: DesktopNavProps) => {
  const textColor = isLight ? "text-espresso" : "text-white/90";

  return (
    <nav className="hidden lg:flex lg:gap-x-10" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <Link
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleScrollToSection(e, item.id)}
            className={`relative text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 outline-none py-2 ${
              isActive
                ? "text-crema-orange"
                : `${textColor} hover:text-crema-orange`
            }`}
          >
            {item.name}

            {/* Traveling underline — layoutId makes it physically glide between items */}
            {isActive && (
              <motion.span
                layoutId="navbar-underline"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-crema-orange"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
