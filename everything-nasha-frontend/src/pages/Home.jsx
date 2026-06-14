import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tattoo from "../assets/Tattoos.png";
import Nails from "../assets/Nails.png";
import Lash from "../assets/Lash1.png";
import Brows from "../assets/Brows.png";
import HeroImage from "../assets/hero_beauty_studio.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const heroImages = [HeroImage, Tattoo, Nails, Lash];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] bg-gradient-to-r from-pink-50 via-pink-100/30 to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-pink-600 dark:text-pink-400 font-semibold mb-3 tracking-wider uppercase text-sm">
              Welcome To Everything_Nasha
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white tracking-tight font-serif">
              Beauty.
              <br />
              Confidence.
              <br />
              Style.
            </h1>

            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-lg leading-relaxed">
              Professional Tattoos, Nail Fixing and Lash Extensions
              designed to help you express your unique beauty and confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/bookings"
                className="bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] text-center"
              >
                Book Appointment
              </Link>

              <Link
                to="/services"
                className="border border-black dark:border-gray-700 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] text-center"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Everything Nasha Hero ${index}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95"
                  }`}
                />
              ))}
            </div>
            
            {/* Slide Indicators */}
            <div className="flex gap-2 mt-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "bg-pink-600 w-6" 
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-pink-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white font-serif">
              Our Beauty Services
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Discover our specialized aesthetic treatments tailored just for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img src={Tattoo} alt="Tattoos" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white font-serif">Tattoos</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Custom tattoo designs crafted with creativity, precision and safety. Express your story.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img src={Nails} alt="Nail Fixing" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white font-serif">Nail Fixing</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Elegant nail designs and professional nail care services for a polished, confident look.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img src={Lash} alt="Lash Extensions" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white font-serif">Lash Extensions</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Beautiful lash extensions that enhance your eyes and add drama to your natural beauty.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img src={Brows} alt="Semi-Permanent Brows" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white font-serif">Semi-Permanent Brows</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Professional semi-permanent brow shading and blading techniques to define and enhance your natural eyebrows.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 dark:bg-slate-950/60 py-24 px-6 border-y border-gray-100 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white font-serif">
              Why Choose Everything_Nasha?
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We are dedicated to providing a premium studio experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 text-xl font-bold mb-6">
                ⭐
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-serif">
                Professional Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                High-quality beauty treatments delivered by experienced, licensed professionals.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 text-xl font-bold mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-serif">
                Quality Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We use premium, sanitary materials and top-tier products for the safest, best-looking results.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 text-xl font-bold mb-6">
                ❤️
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-serif">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your beauty, absolute comfort, and satisfaction are always our number one priority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;