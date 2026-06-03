import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function About() {
  const values = [
    {
      title: "Masterful Precision",
      desc: "Every stroke of ink, every acrylic layer, and every lash mapping is treated as a masterpiece.",
      icon: "✨"
    },
    {
      title: "Hygiene & Care",
      desc: "We practice surgical-grade sanitation and prioritize your skin and nail health above all else.",
      icon: "🛡️"
    },
    {
      title: "Unique Styling",
      desc: "No template styling. We design customized looks matched perfectly to your anatomy and personality.",
      icon: "🎨"
    },
    {
      title: "Luxury Vibe",
      desc: "Relax in a premium, ultra-modern beauty workspace created for your comfort and aesthetic delight.",
      icon: "🌸"
    }
  ];

  return (
    <>
      <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-6 text-gray-900 dark:text-gray-100">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4 text-gray-900 dark:text-white">
              About Everything_Nasha
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
              Where luxury care, creative tattooing, and custom cosmetic artistry unite to amplify your natural aesthetic.
            </p>
          </motion.div>

          {/* Story & Vision Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold font-serif text-gray-950 dark:text-white">
                Our Creative Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Everything_Nasha was founded on a simple principle: beauty is a form of self-expression, not conformity. We specialize in providing a curated menu of bespoke services including custom tattooing, high-end nail grooming, acrylic enhancements, and luxury lash extensions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our studio operates in Abuja, Nigeria, serving clients who value detailed precision, hygienic procedures, and premium styling. Whether you are coming in for an intricate tattoo piece or custom gel extensions, you are in the hands of trained, dedicated professionals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 p-8 flex flex-col justify-center h-full min-h-[300px]"
            >
              <div className="absolute top-4 left-4 text-6xl text-pink-500/10 font-serif">“</div>
              <p className="text-lg md:text-xl italic font-serif text-gray-800 dark:text-gray-200 relative z-10 leading-relaxed mb-6">
                "We do not just perform services; we build confidence. Every client walks out feeling like a work of art."
              </p>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Nasha</h4>
                <p className="text-xs text-pink-500 dark:text-pink-400 font-semibold uppercase tracking-widest mt-1">Founder & Creative Director</p>
              </div>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center font-serif mb-10 text-gray-900 dark:text-white">
              Why Choose Our Studio?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800/40 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-4">{val.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-serif">{val.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 text-white p-8 md:p-12 rounded-3xl text-center shadow-xl border border-gray-850"
          >
            <h3 className="text-2xl md:text-4xl font-bold font-serif mb-4">
              Ready to Enhance Your Style?
            </h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm mb-8 leading-relaxed">
              Book your preferred timeslot online for lashes, nails, or tattoos and let our team transform your look.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/bookings"
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all text-sm cursor-pointer shadow-md"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl border border-white/25 transition-all text-sm cursor-pointer"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
}
