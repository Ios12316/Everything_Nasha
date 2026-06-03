import { motion } from "framer-motion";
import Tattoo from "../assets/Tattoos.png";
import Nails from "../assets/Nails.png";
import Lash from "../assets/Lash1.png";
import Footer from "../components/Footer.jsx";

const servicesList = [
  {
    name: "Tattoos",
    image: Tattoo,
    price: "From $100",
    desc: "Premium, custom tattoo designs crafted with expert care, complete sanitation, and deep artistic precision.",
  },
  {
    name: "Nail Fixing",
    image: Nails,
    price: "From $40",
    desc: "Luxury nails fixed and styled to perfection. Includes classic designs, custom acrylics, and gel extensions.",
  },
  {
    name: "Lash Extensions",
    image: Lash,
    price: "From $60",
    desc: "Stunning lash extensions that range from classic natural look to premium hybrid volume for flawless eyes.",
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {service.desc}
                    </p>
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