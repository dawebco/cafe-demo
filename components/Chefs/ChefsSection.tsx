import { ChefGrid } from "./ChefGrid";

export const ChefsSection = () => {
  return (
    <section id="chefs" className="relative w-full bg-background pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-espresso mb-8 tracking-tight">
          What Our <br className="hidden md:block" />
          <span className="italic font-light text-crema-orange">Customers Say</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-latte-gray font-sans font-light leading-relaxed">
          "Experience the best of TLC Cafe through the words of our guests."
        </p>
      </div>

      <ChefGrid />
    </section>
  );
};
