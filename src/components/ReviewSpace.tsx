/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, Filter, ThumbsUp, Send } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function ReviewSpace() {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [submittedReview, setSubmittedReview] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState('');
  const [reviewCountRating, setReviewCountRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const filterTags = ['All', 'space optimisation', 'material selection', 'home renovation', 'clear communication'];

  const filteredReviews = activeTag === 'All'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter(rev => rev.tags.includes(activeTag));

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;
    setSubmittedReview(true);
    setTimeout(() => {
      // Clear forms
      setAuthorName('');
      setReviewText('');
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#FAF9F6] border-y border-[#E1DBD5]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 pb-10 border-b border-[#E1DBD5]/40">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-semibold block">
              CLIENT TESTIMONIAL STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-light">
              Trust Built On <br />
              <span className="italic font-serif font-normal text-[#8E7A5F]">Pristine Execution</span>
            </h2>
            <p className="font-sans text-xs text-[#66635F] leading-relaxed max-w-xl font-light">
              Don’t take our word for it. Read the verified Google Maps rating (4.8 Stars, 34 Reviews) from client home transformations across Sector 82 Mohali and Greater Tricity.
            </p>
          </div>

          {/* Social Proof Stats Card */}
          <div className="lg:col-span-4 bg-[#F5EFEB] border border-[#E2DBD5] p-6 flex flex-col items-center justify-center text-center space-y-2">
            <span className="font-serif text-5xl text-[#151515] font-semibold">4.8</span>
            <div className="flex text-[#8E7A5F]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#66635F]">
              34 Verified Customer Reviews
            </span>
          </div>
        </div>

        {/* Sorting and Tag Filters */}
        <div className="flex flex-wrap items-center gap-3.5 mb-12">
          <span className="text-[0.62rem] font-sans tracking-widest uppercase font-semibold text-[#151515] flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#8E7A5F]" /> Filter Stories:
          </span>
          {filterTags.map((tag) => (
            <button
              key={tag}
              id={`review-tag-${tag.replace(' ', '-')}`}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 text-xs font-sans tracking-wide transition-all duration-300 focus:outline-none cursor-pointer ${
                activeTag === tag
                  ? 'border border-[#151515] bg-[#151515] text-[#FAF9F6]'
                  : 'border border-[#E2DBD5] bg-white text-[#66635F] hover:border-[#151515]/30 hover:text-[#151515]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="reviews-card-grid">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-[#E2DBD5]/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative"
              >
                {/* Quote symbol */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#8E7A5F]/10 stroke-[1.5]" />

                <div className="space-y-4">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#8E7A5F]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[0.6rem] text-[#66635F] font-mono">{rev.timeAgo}</span>
                  </div>

                  {/* Body Content */}
                  <p className="text-xs text-[#151515] leading-relaxed font-light font-serif">
                    "{rev.content}"
                  </p>

                  {/* Reply from Owner card */}
                  <div className="border-l-2 border-[#8E7A5F]/30 bg-[#FAF9F6] p-4 space-y-1">
                    <span className="text-[0.55rem] tracking-widest uppercase font-bold text-[#8E7A5F] block">
                      Response from the owner (3 months ago)
                    </span>
                    <p className="text-[0.65rem] text-[#66635F]">
                      Thank you for your thoughtful review. Designing your premium interiors in Chandigarh/Mohali is always a deep pleasure. We remain dedicated to high-end sustainable material curation!
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="pt-4 border-t border-[#E2DBD5]/40 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="text-xs font-sans font-semibold text-[#151515]">{rev.author}</h4>
                    <span className="text-[0.6rem] text-[#8E7A5F] uppercase tracking-wider">{rev.role}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {rev.tags.map((tag) => (
                      <span key={tag} className="text-[0.52rem] font-sans tracking-wider uppercase bg-[#F5EFEB] text-[#8E7A5F] px-2 py-0.5">
                        {tag.replace(' ', ' • ')}
                      </span>
                    ))}
                    <button
                      id={`btn-like-review-${rev.id}`}
                      onClick={() => handleLike(rev.id)}
                      className="text-xs text-[#66635F] hover:text-[#151515] transition-colors flex items-center gap-1 focus:outline-none"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono text-[0.68rem]">{(likes[rev.id] || 0) + 12}</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Review Action Panel - Write Review (Simulated Client Experience Form) */}
        <div className="mt-16 max-w-3xl mx-auto bg-[#F5EFEB]/50 border border-[#E2DBD5]/80 p-6 sm:p-10 space-y-8" id="write-client-experience">
          
          <div className="text-center space-y-2">
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8E7A5F] font-semibold">
              SHARE YOUR EXPERIENCES
            </span>
            <h3 className="font-serif text-xl text-[#151515]">
              Did We Transform Together?
            </h3>
            <p className="text-xs text-[#66635F] max-w-lg mx-auto leading-relaxed font-light">
              We highly value every client feedback. Submit your experience to share with our Mohali Sector 82 woodshop crew.
            </p>
          </div>

          {submittedReview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-[#E2DBD5] p-6 text-center text-xs text-[#8E7A5F]"
            >
              ✓ Thank you for submitting your wonderful SANSSA Home review! Our master designers and workshop carpenters will read it today.
            </motion.div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[0.6rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g., Harpreet Sangha"
                    className="w-full bg-white border border-[#E2DBD5] px-4 py-3 text-xs font-sans text-[#151515] placeholder-[#c4bfb9] focus:outline-none focus:border-[#151515]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[0.6rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                    Your Rating Score
                  </label>
                  <select
                    value={reviewCountRating}
                    onChange={(e) => setReviewCountRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#E2DBD5] px-4 py-3 text-xs font-sans text-[#151515] focus:outline-none focus:border-[#151515]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                    <option value="4">⭐⭐⭐⭐ Highly Impressive (4 Stars)</option>
                    <option value="3">⭐⭐⭐ Satisfactory (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.6rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                  How was your design and renovation journey with Harneet & Crew?
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Detail your space optimization, wood finish feel, or layout feedback here..."
                  className="w-full bg-white border border-[#E2DBD5] px-4 py-3 text-xs font-sans text-[#151515] placeholder-[#c4bfb9] focus:outline-none focus:border-[#151515]"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  id="btn-submit-review"
                  className="bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] py-3.5 px-8 text-xs font-sans tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Review</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
