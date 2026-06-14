import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import api from "../services/axios.js";
import useModalStore from "../services/modalStore.js";

function Reviews() {
  const { showConfirm, showAlert } = useModalStore();
  
  // Reviews states
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    fullName: "",
    service: "General",
    rating: 5,
    comment: ""
  });
  const [reviewMsg, setReviewMsg] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingComment, setEditingComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await api.get("/reviews");
      if (res.data?.success) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/reviews", reviewForm);
      if (res.data?.success) {
        setReviewMsg("Thank you! Review posted.");
        const editToken = res.data.editToken;
        const reviewId = res.data.review?._id;
        if (editToken && reviewId) {
          localStorage.setItem(`review_edit_token_${reviewId}`, editToken);
        }
        setReviewForm({ fullName: "", service: "General", rating: 5, comment: "" });
        setTimeout(() => setReviewMsg(""), 4000);
        fetchReviews();
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      showAlert("Error", "Failed to submit review. Please try again.");
    }
  };

  const handleReviewEditSubmit = async (id) => {
    try {
      const editToken = localStorage.getItem(`review_edit_token_${id}`);
      if (!editToken) {
        showAlert("Error", "You are not authorized to edit this review.");
        return;
      }
      const res = await api.put(`/reviews/${id}`, {
        comment: editingComment,
        editToken
      });
      if (res.data?.success) {
        setEditingReviewId(null);
        setEditingComment("");
        fetchReviews();
      }
    } catch (err) {
      console.error("Error editing review:", err);
      showAlert("Error", err.response?.data?.message || "Failed to update review.");
    }
  };

  const handleDeleteReview = (id) => {
    showConfirm(
      "Delete Review",
      "Are you sure you want to permanently delete this customer review?",
      async () => {
        try {
          const token = localStorage.getItem("token");
          await api.delete(`/reviews/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          fetchReviews();
        } catch (err) {
          console.error("Error deleting review:", err);
          showAlert("Error", "Failed to delete review. Please verify admin status.");
        }
      }
    );
  };

  return (
    <>
      <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white font-serif">
              Client Reviews & Feedback
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Read what our clients have to say, or share your own experience with Everything_Nasha.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            
            {/* Write Review Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 bg-gray-50/50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Share Your Experience</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">Your feedback helps us maintain our premium quality.</p>
              
              {reviewMsg && (
                <p className="mb-4 text-xs font-semibold text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  {reviewMsg}
                </p>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={reviewForm.fullName}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Service</label>
                    <select
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm transition-all cursor-pointer"
                    >
                      <option value="General">General</option>
                      <option value="Tattoo">Tattoo</option>
                      <option value="Nails">Nails</option>
                      <option value="Lash Extension">Lash Extension</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Rating</label>
                    <div className="flex gap-1 h-[50px] items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className="text-2xl focus:outline-none hover:scale-110 transition-transform cursor-pointer text-amber-500"
                        >
                          {star <= reviewForm.rating ? "★" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Comment</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your review details..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-slate-700 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>

            {/* Reviews List */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3 space-y-4 max-h-[650px] overflow-y-auto pr-2"
            >
              {loadingReviews ? (
                <div className="text-center py-12">
                  <div className="w-10 h-10 border-4 border-black dark:border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl bg-gray-50/30 dark:bg-slate-800/10">
                  <span className="text-4xl">💬</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Be the first to review our services!</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div 
                    key={rev._id}
                    className="relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <h4 className="font-bold text-gray-900 dark:text-white text-base">{rev.fullName}</h4>
                        <span className="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-semibold px-2 py-0.5 rounded-full mr-6">
                          {rev.service}
                        </span>
                      </div>
                      
                      <div className="flex text-amber-500 text-sm mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                        ))}
                      </div>

                      {editingReviewId === rev._id ? (
                        <div className="mt-3 space-y-2">
                          <textarea
                            value={editingComment}
                            onChange={(e) => setEditingComment(e.target.value)}
                            className="w-full border border-gray-200 dark:border-slate-700 p-2.5 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none"
                            rows="2"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingReviewId(null)}
                              className="text-xs text-gray-500 hover:text-gray-700 font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReviewEditSubmit(rev._id)}
                              className="text-xs text-white bg-pink-600 hover:bg-pink-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pr-6 whitespace-pre-wrap">
                          "{rev.comment}"
                        </p>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1">
                      {localStorage.getItem(`review_edit_token_${rev._id}`) && (
                        <button
                          onClick={() => {
                            setEditingReviewId(rev._id);
                            setEditingComment(rev.comment);
                          }}
                          className="text-pink-600 hover:text-pink-700 transition-colors p-1.5 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950/20 cursor-pointer"
                          title="Edit Review"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="text-rose-500 hover:text-rose-700 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                          title="Delete Review"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reviews;
