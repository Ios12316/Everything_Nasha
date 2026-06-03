import { useState, useEffect } from "react";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
    <nav className="sticky top-0 z-50 bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        Everything_Nasha
      </h1>

      <div className="flex items-center gap-6">
        <a href="/" className="hover:text-pink-400 transition-colors">Home</a>
        <a href="/services" className="hover:text-pink-400 transition-colors">Services</a>
        <a href="/gallery" className="hover:text-pink-400 transition-colors font-medium">Gallery</a>
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
          className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded transition-colors"
        >
          Book Now
        </a>
      </div>
    </nav>
  );
}

export default Navbar;