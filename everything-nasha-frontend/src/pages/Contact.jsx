import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import useModalStore from "../services/modalStore.js";

export default function Contact() {
  const { showAlert } = useModalStore();
  const contactLinks = [
    {
      name: "Shop Address",
      value: "Plot 1204, Aminu Kano Crescent, Wuse 2, Abuja, Nigeria",
      subtext: "Open daily: 9:00 AM - 7:00 PM",
      link: "https://maps.google.com/?q=Plot+1204,+Aminu+Kano+Crescent,+Wuse+2,+Abuja,+Nigeria",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
      btnText: "Get Directions"
    },
    {
      name: "WhatsApp Us",
      value: "+234 801 234 5678",
      subtext: "Instant response during working hours",
      link: "https://wa.me/2348012345678",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
      btnText: "Chat Now"
    },
    {
      name: "Direct Call",
      value: "+234 801 234 5678",
      subtext: "Call us directly for reservations",
      link: "tel:+2348012345678",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: "bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-900/30",
      btnText: "Call Phone"
    },
    {
      name: "Instagram",
      value: "@everything_nasha",
      subtext: "View our portfolio and latest designs",
      link: "https://instagram.com/everything_nasha",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" />
        </svg>
      ),
      color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
      btnText: "Follow Us"
    },
    {
      name: "TikTok",
      value: "@everything_nasha",
      subtext: "Watch our clips and studio sessions",
      link: "https://tiktok.com/@everything_nasha",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 3.68-.01 7.36-.02 11.03-.1 2.45-1.13 4.86-3.05 6.4-2.07 1.75-4.91 2.43-7.54 1.95-2.73-.42-5.23-2.18-6.62-4.63-1.63-2.78-1.76-6.42-.4-9.29 1.19-2.6 3.73-4.57 6.6-4.97.12-.02.25-.02.37-.04v4.08c-1.29.17-2.52.88-3.21 2.01-.84 1.3-.87 3.09-.15 4.45.69 1.34 2.19 2.21 3.7 2.15 1.55.02 3.01-.98 3.53-2.45.36-.93.33-1.97.34-2.95V.02z" />
        </svg>
      ),
      color: "bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/30",
      btnText: "Watch Clips"
    }
  ];

  return (
    <>
      <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Connect With Us
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Have questions, styling suggestions, or want to book? Reach out to us through any of our channels.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactLinks.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${item.color}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-all max-w-[220px]">
                    {item.value}
                  </p>
                  
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">
                    {item.subtext}
                  </p>
                </div>

                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-2.5 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-black hover:text-white dark:hover:bg-pink-600 dark:hover:text-white border border-gray-200 dark:border-slate-700/80 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300"
                >
                  {item.btnText}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Quick Message Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/80 p-8 rounded-3xl shadow-xl text-left"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Send a Quick Message
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Fill out the form below and our customer care team will get back to you shortly.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); showAlert('Success', 'Message sent successfully!'); e.target.reset(); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all" 
                  required 
                />
              </div>

              <textarea 
                rows="4" 
                placeholder="How can we help you?" 
                className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all resize-none" 
                required
              />

              <button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
}
