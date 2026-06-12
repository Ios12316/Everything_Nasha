import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center shadow-md">
      <a href="/" className="text-xl md:text-2xl font-bold tracking-tight hover:text-pink-400 transition-colors">
        Everything_Nasha
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 font-medium">
        <a href="/" className="hover:text-pink-400 transition-colors">Home</a>
        <a href="/services" className="hover:text-pink-400 transition-colors">Services</a>
        <a href="/gallery" className="hover:text-pink-400 transition-colors">Gallery</a>
        <a href="/about" className="hover:text-pink-400 transition-colors">About</a>
        <a href="/contact" className="hover:text-pink-400 transition-colors">Contact</a>
        
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-all text-base focus:outline-none cursor-pointer"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <a
          href="/bookings"
          className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-xl transition-colors font-semibold"
        >
          Book Now
        </a>
      </div>

      {/* Mobile Controls */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-all text-base focus:outline-none cursor-pointer"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-all focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 flex flex-col items-center gap-4 py-6 md:hidden shadow-xl z-40 overflow-hidden"
          >
            <a href="/" className="hover:text-pink-400 transition-colors text-lg py-1 w-full text-center">Home</a>
            <a href="/services" className="hover:text-pink-400 transition-colors text-lg py-1 w-full text-center">Services</a>
            <a href="/gallery" className="hover:text-pink-400 transition-colors text-lg py-1 w-full text-center font-medium">Gallery</a>
            <a href="/about" className="hover:text-pink-400 transition-colors text-lg py-1 w-full text-center">About</a>
            <a href="/contact" className="hover:text-pink-400 transition-colors text-lg py-1 w-full text-center">Contact</a>
            
            <a
              href="/bookings"
              className="bg-pink-500 hover:bg-pink-600 px-6 py-2.5 rounded-xl transition-colors font-semibold mt-2 shadow-md w-[80%] text-center"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;