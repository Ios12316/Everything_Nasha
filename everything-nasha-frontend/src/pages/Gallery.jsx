import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/axios.js";
import Footer from "../components/Footer.jsx";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadData, setUploadData] = useState({
    type: "image",
    caption: "",
    url: ""
  });
  const [fileBase64, setFileBase64] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

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
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Detect type based on file mimetype
    const fileType = file.type.startsWith("video/") ? "video" : "image";
    setUploadData(prev => ({ ...prev, type: fileType }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const targetUrl = fileBase64 || uploadData.url;

    if (!targetUrl) {
      setMessage({ text: "Please select a file or paste a URL", isError: true });
      return;
    }

    setUploading(true);
    setMessage({ text: "", isError: false });

    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/gallery", {
        url: targetUrl,
        type: uploadData.type,
        caption: uploadData.caption
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data?.success) {
        setMessage({ text: "Media uploaded successfully!", isError: false });
        setUploadData({ type: "image", caption: "", url: "" });
        setFileBase64("");
        // Reset file input
        const fileInput = document.getElementById("gallery-file-input");
        if (fileInput) fileInput.value = "";
        fetchGallery();
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Upload failed. Verify you are logged in as admin.";
      setMessage({ text: errMsg, isError: true });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data?.success) {
        fetchGallery();
      }
    } catch (err) {
      alert("Error deleting item");
    }
  };

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

          {/* Admin Upload Section */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 bg-gray-50 dark:bg-slate-800/40 p-6 md:p-8 rounded-3xl border border-dashed border-pink-300 dark:border-pink-900/60 max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                💅 Admin Upload Center
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Upload images or videos of recent work directly. File size limit is automatically handled.
              </p>

              <AnimatePresence>
                {message.text && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-4 p-3 rounded-xl text-xs font-semibold text-center border ${
                      message.isError
                        ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/45"
                        : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-900/45"
                    }`}
                  >
                    {message.text}
                  </motion.p>
                )}
              </AnimatePresence>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Media Type</label>
                    <select
                      value={uploadData.type}
                      onChange={(e) => setUploadData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Upload File</label>
                    <input
                      id="gallery-file-input"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="w-full border border-gray-200 dark:border-slate-700 p-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none cursor-pointer text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Or Paste Image/Video URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={uploadData.url}
                    onChange={(e) => {
                      setUploadData(prev => ({ ...prev, url: e.target.value }));
                      setFileBase64(""); // Clear file upload if url is typed
                    }}
                    className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Caption / Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Fresh sets of acrylic nail fixing"
                    value={uploadData.caption}
                    onChange={(e) => setUploadData(prev => ({ ...prev, caption: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Add to Gallery"}
                </button>
              </form>
            </motion.div>
          )}

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

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer z-10"
                        title="Delete Media"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
