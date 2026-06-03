import { motion, AnimatePresence } from "framer-motion";
import useModalStore from "../services/modalStore.js";

export default function GlobalModal() {
  const { isOpen, title, message, type, onConfirm, onCancel, closeModal } = useModalStore();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Overlay click to close only if it is an alert type */}
          <div 
            className="absolute inset-0" 
            onClick={type === "alert" ? closeModal : undefined}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-white dark:bg-slate-850 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-slate-800 z-10"
          >
            {/* Header Icon */}
            <div className="flex justify-center mb-4">
              {type === "confirm" ? (
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-pink-50 dark:bg-pink-950/20 text-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white font-serif mb-2">
              {title}
            </h3>
            
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
              {message}
            </p>

            <div className="flex gap-3">
              {type === "confirm" ? (
                <>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-sm shadow-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-sm shadow-sm"
                >
                  OK
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
