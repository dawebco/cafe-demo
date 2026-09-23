"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { ReserveButton } from "../ui/ReserveButton";

export const ContactSection = () => {
  // Stagger variants for the right column contact info
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FDFBF7] text-[#1F1A17] relative z-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Google Map */}
          {/* Map reveals first as requested */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[400px] lg:h-[550px] rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(31,26,23,0.08)] bg-[#F2EFE9] order-1 lg:order-none"
          >
            <iframe
              src="https://maps.google.com/maps?q=12.8989334,74.8388422&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TLC Cafe Location"
            />
          </motion.div>

          {/* RIGHT: Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start order-2 lg:order-none"
          >
            <motion.span variants={itemVariants} className="text-[#B96D40] text-sm tracking-[0.2em] font-semibold uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#B96D40] block opacity-50" />
              Visit Us
            </motion.span>
            
            <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-6xl leading-[1.1] mb-6">
              TLC Cafe
            </motion.h2>

            <motion.p variants={itemVariants} className="font-sans text-[#756A63] text-lg leading-relaxed mb-12 max-w-[42ch]">
              An intimately crafted space for extraordinary moments. We look forward to welcoming you to our serene and cozy art cafe.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12 w-full">
              {/* Address */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#756A63] mb-3">Address</h4>
                <p className="font-sans text-lg leading-relaxed">
                  2-4-290 & 2-4-291, Moras Mansion<br/>
                  Kottara Cross Road, Bejai<br/>
                  Kapikad, Mangalore
                </p>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#756A63] mb-3">Contact</h4>
                <p className="font-sans text-lg leading-relaxed">
                  +91 84312 33723<br/>
                  reservations@astercafe.com
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div variants={itemVariants} className="sm:col-span-2">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#756A63] mb-3">Opening Hours</h4>
                <p className="font-sans text-lg leading-relaxed">
                  Monday — Sunday: 8am — 11pm<br/>
                  Dinner service begins at 5pm
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8 sm:gap-8 w-full mt-8 sm:mt-4">
              {/* Reusing exact component from Navbar */}
              <ReserveButton 
                text="Reserve a Table" 
                className="w-full sm:w-auto px-10 py-5 text-[0.95rem] sm:text-sm font-semibold tracking-[0.2em]" 
              />

              <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                <a 
                  href="https://www.instagram.com/tlc.art.cafe?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-[#1F1A17] hover:text-[#B96D40] hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-full bg-[#1F1A17]/5 sm:bg-transparent" 
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://wa.me/918431233723" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-[#1F1A17] hover:text-[#B96D40] hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-full bg-[#1F1A17]/5 sm:bg-transparent" 
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
