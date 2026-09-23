import Link from "next/link";
import Image from "next/image";
import { HeroAmbientGlow } from "./HeroAmbientGlow";
import { AnimatedElement } from "./AnimatedElement";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#1F1B18]">
        <Image
          src="/images/hero/hero1.webp"
          alt="TLC Cafe Interior"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#1F1B18]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1F1B18]/80" />
      </div>

      {/* Ambient Glow */}
      <HeroAmbientGlow />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-20 sm:pt-24">
        <AnimatedElement as="h1" delay={0.15} duration={0.8} yOffset={15} className="text-[2.75rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#F8F5F0] tracking-wide mb-6">
          Specialty Coffee & <br className="hidden sm:block" />
          <span className="text-[#B8893C] italic">Gourmet Pizzas</span>
        </AnimatedElement>
        
        <AnimatedElement as="p" delay={0.3} duration={0.6} yOffset={10} className="max-w-2xl text-[1.05rem] sm:text-lg md:text-xl text-[#F8F5F0]/90 font-light mb-10 leading-relaxed px-2">
          Step into a charming, cozy art cafe with a warm wooden theme. Enjoy authentic wood-fired sourdough pizzas, gourmet pita bread, and our signature coffee in a serene space perfect for reading, working, and listening to soothing blues and jazz.
        </AnimatedElement>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center px-4 sm:px-0">
          <AnimatedElement delay={0.45} duration={0.5} yOffset={10} className="flex w-full sm:w-auto">
            <Link
              href="#reservation"
              className="inline-flex w-full items-center justify-center bg-[#B8893C] px-8 py-4 sm:py-3.5 text-[0.85rem] sm:text-sm font-medium text-white hover:bg-[#a07632] transition-colors uppercase tracking-[0.2em] rounded-sm"
            >
              Book a Table
            </Link>
          </AnimatedElement>
          <AnimatedElement delay={0.55} duration={0.5} yOffset={10} className="flex w-full sm:w-auto">
            <Link
              href="#menu"
              className="inline-flex w-full items-center justify-center border border-[#F8F5F0]/50 bg-transparent px-8 py-4 sm:py-3.5 text-[0.85rem] sm:text-sm font-medium text-[#F8F5F0] hover:bg-[#F8F5F0] hover:text-[#1F1B18] transition-colors uppercase tracking-[0.2em] rounded-sm"
            >
              Explore Menu
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};
