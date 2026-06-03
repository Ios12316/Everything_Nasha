import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/axios.js";
import Footer from "../components/Footer.jsx";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      if (res.data?.success) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error("Error loading gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <>
      <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-4 text-gray-900 dark:text-white">
              Studio Gallery
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Explore our latest masterpieces of nail designs, custom tattoos, and lash mappings.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10">
            {["all", "image", "video"].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  filter === t 
                    ? "bg-black dark:bg-pink-600 border-black dark:border-pink-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-black dark:border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading media gallery...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">No items available in the gallery yet.</p>
          ) : (
            <motion.div 
              layout
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-white dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 group shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div 
                      onClick={() => setSelectedMedia(item)}
                      className="cursor-pointer aspect-[4/3] w-full overflow-hidden relative bg-black flex items-center justify-center"
                    >
                      {item.type === "video" ? (
                        <div className="relative w-full h-full">
                          <video src={item.url} className="w-full h-full object-cover pointer-events-none" muted playsInline />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/25 transition-all">
                            <div className="w-12 h-12 bg-white/90 dark:bg-pink-600/90 rounded-full flex items-center justify-center text-black dark:text-white shadow-lg transition-transform group-hover:scale-110">
                              ▶
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={item.url} 
                          alt={item.caption || "Gallery work"} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      )}
                    </div>

                    {item.caption && (
                      <div className="p-4 border-t border-gray-50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-800/50">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lightbox / Media Viewer */}
          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedMedia(null)}
              >
                <button 
                  className="absolute top-6 right-6 text-white text-3xl font-extrabold focus:outline-none hover:text-pink-400 transition-colors cursor-pointer"
                  onClick={() => setSelectedMedia(null)}
                >
                  ✕
                </button>

                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedMedia.type === "video" ? (
                    <video src={selectedMedia.url} className="max-h-[70vh] rounded-2xl shadow-2xl border border-gray-800" controls autoPlay playsInline />
                  ) : (
                    <img src={selectedMedia.url} alt={selectedMedia.caption} className="max-h-[70vh] rounded-2xl shadow-2xl object-contain border border-gray-800" />
                  )}
                  {selectedMedia.caption && (
                    <p className="text-white mt-4 text-lg font-medium tracking-wide bg-black/60 px-5 py-2.5 rounded-full border border-gray-800/80">
                      {selectedMedia.caption}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
      <Footer />
    </>
  );
}
