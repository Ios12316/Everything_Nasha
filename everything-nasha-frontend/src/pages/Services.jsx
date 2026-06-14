import { motion } from "framer-motion";
import Tattoo from "../assets/Tattoos.png";
import Nails from "../assets/Nails.png";
import Lash from "../assets/Lash1.png";
import Brows from "../assets/Brows.png";
import Footer from "../components/Footer.jsx";

const servicesList = [
  {
    name: "Tattoos",
    image: Tattoo,
    price: "",
    desc: "Premium, custom tattoo designs crafted with expert care, complete sanitation, and deep artistic precision.",
  },
  {
    name: "Nail Installations",
    image: Nails,
    price: "",
    desc: "Luxury nails fixed and styled to perfection. Includes classic designs, custom acrylics, and gel extensions.",
    subServices: {
      "Nail Services": [
        { name: "Stick On Gel Polish", price: "₦9,000" },
        { name: "Gel Polish", price: "₦3,000" },
        { name: "Toe Acrylic", price: "₦6,000" },
        { name: "Plain Acrylic Set", price: "₦11,000" },
        { name: "Short Acrylic", price: "₦10,000" },
        { name: "Medium Acrylic", price: "₦15,000" },
        { name: "Long Acrylic", price: "₦20,000" },
        { name: "Refill and Gel Polish", price: "₦8,000" },
        { name: "Airbrush Set (Long)", price: "₦25,000" },
        { name: "Airbrush Set (Short)", price: "₦15,000" },
        { name: "Soak Off", price: "₦2,000" }
      ],
      "Additional Services": [
        { name: "Basic Pedicure (with Gel Polish)", price: "₦10,000" },
        { name: "Basic Manicure (with Gel Polish)", price: "₦7,000" }
      ]
    }
  },
  {
    name: "Lash Extensions",
    image: Lash,
    price: "",
    desc: "Stunning lash extensions that range from classic natural look to premium hybrid volume for flawless eyes.",
    subServices: {
      "Normal Set": [
        { name: "Classic", price: "₦15,000" },
        { name: "Hybrid", price: "₦20,000" },
        { name: "Volume", price: "₦28,000" },
        { name: "Full Volume", price: "₦30,000" },
        { name: "Mega Volume", price: "₦35,000" },
        { name: "Under Eyes", price: "₦5,000 / ₦10,000" },
        { name: "Lash Removal", price: "₦5,000" },
        { name: "Wispy", price: "₦5,000" }
      ],
      "Custom Set": [
        { name: "Volume/Under Eyes", price: "₦35,000 - ₦40,000" },
        { name: "Mega Volume/Under Eyes", price: "₦65,000" }
      ]
    }
  },
  {
    name: "Semi-Permanent Brows",
    image: Brows,
    price: "",
    desc: "Define your eyes and enhance your eyebrows with professional semi-permanent blading and shading.",
    subServices: {
      "Brows & Shading": [
        { name: "Micro-blading", price: "₦25,000" },
        { name: "Micro-shading", price: "₦35,000" },
        { name: "Combo-brows", price: "₦45,000" }
      ]
    }
  }
];

function Services() {
  return (
    <>
      <div className="min-h-[80vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Our Premium Services
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Choose your service and book your appointment with our top-rated specialists.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {servicesList.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.name}
                      </h2>
                      <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-full whitespace-nowrap">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                      {service.desc}
                    </p>
                    
                    {service.subServices && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/60 space-y-3">
                        {Object.entries(service.subServices).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-1.5">{category}</h4>
                            <div className="grid grid-cols-1 gap-1">
                              {items.map(item => (
                                <div key={item.name} className="flex justify-between text-xs text-gray-650 dark:text-gray-400">
                                  <span className="font-medium">{item.name}</span>
                                  <span className="font-semibold text-gray-800 dark:text-gray-200">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="/bookings"
                    className="block text-center w-full bg-black dark:bg-pink-600 hover:bg-gray-800 dark:hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md"
                  >
                    Book {service.name}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;