"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { handleScrollToSection } from "@/lib/utils";
import { useNavbarState } from "./useNavbarState";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { ReserveButton } from "../ui/ReserveButton";

export const Navbar = () => {
  const { navState, activeSection } = useNavbarState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isLight = navState === "solid";
  const isTransparent = navState === "transparent";
  const isHidden = navState === "hidden";

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // ─── Header translateY: hidden = -100%, otherwise 0 ────────────
  const headerY = isHidden ? "-100%" : "0%";

  return (
    <>
      <motion.header
        animate={{ y: headerY }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
        className={`fixed top-0 w-full z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-in-out ${
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-oat-milk/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-black/5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-[height,padding] duration-500 ease-in-out ${
            isTransparent ? "h-28 pt-6" : "h-20"
          }`}
        >
          {/* ── Logo ─────────────────────────────────────────────── */}
          <div className="flex-shrink-0">
            <Link
              href="#hero"
              onClick={(e) => handleScrollToSection(e, "hero")}
              className="outline-none"
            >
              <Image
                src="/branding/tlc-logo.png"
                alt="TLC Cafe"
                width={isTransparent ? 100 : 75}
                height={isTransparent ? 100 : 75}
                className={`object-contain transition-all duration-500 ease-in-out ${
                  isLight ? "brightness-0" : "brightness-100"
                }`}
                priority
              />
            </Link>
          </div>

          {/* ── Desktop Navigation ───────────────────────────────── */}
          <DesktopNav activeSection={activeSection} isLight={isLight} />

          {/* ── Desktop: Reservation Button ──────────────────────── */}
          <div className="hidden lg:flex lg:items-center">
            <ReserveButton
              isLight={isLight}
              isActive={activeSection === "contact"}
            />
          </div>

          {/* ── Mobile: Hamburger Button ─────────────────────────── */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden relative w-10 h-10 flex items-center justify-center transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-crema-orange rounded ${
              isLight
                ? "text-espresso hover:text-crema-orange"
                : "text-white/90 hover:text-crema-orange"
            }`}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Fullscreen Menu ────────────────────────────────── */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} activeSection={activeSection} />
    </>
  );
};
