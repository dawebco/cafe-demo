"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { handleScrollToSection } from "@/lib/utils";
import { ReserveButton } from "../ui/ReserveButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const MENU_ITEMS = [
  { name: "Home", id: "hero" },
  { name: "Menu", id: "menu" },
  { name: "Reviews", id: "chefs" },
  { name: "Gallery", id: "gallery" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// 1. Backdrop fades and blurs
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.2 },
  },
};

// 2. Panel slides
const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.1 },
  },
};

// Container for staggered elements
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

// Top/Logo fade
const topVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
};

// Nav items slide up
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
};

export const MobileMenu = ({ isOpen, onClose, activeSection }: MobileMenuProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      handleScrollToSection(e, id);
      setTimeout(onClose, 200);
    },
    [onClose]
  );

  // ─── Body Scroll Lock ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ─── Keyboard: Escape to close ─────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ─── Focus Trap ────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = overlay.querySelectorAll<HTMLElement>(focusableSelector);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          key="mobile-menu-overlay"
          variants={shouldReduceMotion ? undefined : backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] bg-black/35"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Stop click propagation on the panel itself */}
          <motion.div
            variants={shouldReduceMotion ? undefined : panelVariants}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 bottom-0 w-[82%] max-w-[380px] bg-[#FDFBF7] shadow-2xl flex flex-col"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col h-full px-8 py-10"
            >
              {/* ── TOP: Logo & Close ───────────────────────────────── */}
              <motion.div variants={shouldReduceMotion ? undefined : topVariants} className="flex items-center justify-between mb-16">
                <Link
                  href="#hero"
                  onClick={(e) => handleNavigate(e, "hero")}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-crema-orange rounded"
                >
                  <Image
                    src="/branding/tlc-logo.png"
                    alt="TLC Cafe"
                    width={80}
                    height={80}
                    className="object-contain brightness-0"
                    priority
                  />
                </Link>

                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-[#1F1A17] hover:text-[#B96D40] transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-crema-orange rounded-full"
                  aria-label="Close navigation menu"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>

              {/* ── MIDDLE: Navigation Links ────────────────────────── */}
              <nav className="flex flex-col gap-7 flex-1" aria-label="Mobile navigation">
                {MENU_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.div key={item.id} variants={shouldReduceMotion ? undefined : itemVariants}>
                      <Link
                        href={`#${item.id}`}
                        onClick={(e) => handleNavigate(e, item.id)}
                        className={`block font-serif text-[2.5rem] leading-none transition-colors duration-300 outline-none focus-visible:text-[#B96D40] ${
                          isActive ? "text-[#B96D40]" : "text-[#1F1A17] hover:text-[#B96D40]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* ── BOTTOM: CTA & Socials ───────────────────────────── */}
              <motion.div variants={shouldReduceMotion ? undefined : itemVariants} className="mt-8 flex flex-col gap-8">
                <ReserveButton 
                  text="Reserve a Table" 
                  className="w-full py-4 text-[11px]" 
                />

                <div className="flex items-center gap-6 pb-4">
                  <a
                    href="https://www.instagram.com/tlc.art.cafe?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1F1A17] hover:text-[#B96D40] hover:scale-110 transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-crema-orange rounded"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href="https://wa.me/918431233723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1F1A17] hover:text-[#B96D40] hover:scale-110 transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-crema-orange rounded"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={22} />
                  </a>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
