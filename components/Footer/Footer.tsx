import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-espresso text-oat-milk py-20 px-6 sm:px-6 lg:px-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-6">
          <Link href="/">
            <Image 
              src="/branding/tlc-logo.png" 
              alt="TLC Cafe" 
              width={140} 
              height={140} 
              className="object-contain"
            />
          </Link>
          <p className="text-[0.95rem] md:text-sm text-latte-gray font-sans max-w-xs leading-relaxed">
            Where culinary craftsmanship meets an unforgettable dining experience.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-4">
          <h4 className="font-heading text-2xl md:text-xl text-crema-orange">Explore</h4>
          <nav className="flex flex-col font-sans text-base md:text-sm text-latte-gray w-full">
            <Link href="/#about" className="py-3 md:py-1 hover:text-crema-orange transition-colors">About Us</Link>
            <Link href="/#menu" className="py-3 md:py-1 hover:text-crema-orange transition-colors">Our Menu</Link>
            <Link href="/#chefs" className="py-3 md:py-1 hover:text-crema-orange transition-colors">Reviews</Link>
          </nav>
        </div>

        {/* Hours & Contact */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-4">
          <h4 className="font-heading text-2xl md:text-xl text-crema-orange">Visit Us</h4>
          <div className="flex flex-col font-sans text-base md:text-sm text-latte-gray">
            <p className="py-2 md:py-1">2-4-290 & 2-4-291, Moras Mansion, Kottara Cross Road, Bejai, Kapikad, Mangalore</p>
            <p className="py-2 md:py-1">+91 84312 33723</p>
            <p className="py-2 md:py-1">reservations@tlccafe.com</p>
            <div className="pt-4 md:pt-2">
              <p className="text-white/80 font-medium py-1">Opening Hours</p>
              <p className="py-1">Mon - Thu: 8AM - 10PM</p>
              <p className="py-1">Fri - Sun: 8AM - 11PM</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-4">
          <h4 className="font-heading text-2xl md:text-xl text-crema-orange">Follow Us</h4>
          <div className="flex flex-wrap justify-center space-x-6 md:space-x-4 font-sans text-base md:text-sm text-latte-gray">
            <a href="https://www.instagram.com/tlc.art.cafe?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="py-3 hover:text-crema-orange transition-colors">Instagram</a>
            <a href="https://wa.me/918431233723" target="_blank" rel="noopener noreferrer" className="py-3 hover:text-crema-orange transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-latte-gray font-sans">
        <p>&copy; {new Date().getFullYear()} TLC Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
}
