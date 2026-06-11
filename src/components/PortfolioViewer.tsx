/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Shield, Award, Layout, Zap, CheckCircle } from 'lucide-react';
import { RESIDENTIAL_PROJECTS } from '../data';
import { DesignProject } from '../types';

export default function PortfolioViewer() {
  const [activeProjIndex, setActiveProjIndex] = useState<number>(0);
  const activeProj = RESIDENTIAL_PROJECTS[activeProjIndex];

  const handleNext = () => {
    setActiveProjIndex((prev) => (prev + 1) % RESIDENTIAL_PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveProjIndex((prev) => (prev - 1 + RESIDENTIAL_PROJECTS.length) % RESIDENTIAL_PROJECTS.length);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#FAF9F6] border-t border-[#E1DBD5]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 pb-10 border-b border-[#E1DBD5]/40">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-semibold block">
              FINE ARCHITECTURE & PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-light leading-tight">
              Spaces Designed For <br className="hidden sm:inline" />
              <span className="italic font-serif font-normal text-[#8E7A5F]">Modern Living</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex justify-between lg:justify-end gap-4">
            <button
              id="portfolio-prev-btn"
              onClick={handlePrev}
              className="w-12 h-12 bg-white border border-[#E2DBD5] text-[#151515] hover:border-[#8E7A5F] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              id="portfolio-next-btn"
              onClick={handleNext}
              className="w-12 h-12 bg-white border border-[#E2DBD5] text-[#151515] hover:border-[#8E7A5F] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label="Next Project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Immersive Selected Project Display Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#E2DBD5]/60 p-6 sm:p-10 shadow-sm">
          
          {/* Main Showcase Image Area with transitions */}
          <div className="lg:col-span-7 relative group overflow-hidden" id="portfolio-project-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProj.id}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] w-full bg-[#EAE6DF]"
              >
                <img
                  src={activeProj.heroImage}
                  alt={activeProj.title}
                  className="w-full h-full object-cover filter brightness-[0.98] hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Float details ribbon */}
            <div className="absolute top-4 left-4 bg-[#FAF9F6]/90 backdrop-blur-sm px-4 py-2 border border-[#E2DBD5] text-[0.6rem] font-sans uppercase tracking-widest text-[#151515]">
              Active Project {activeProjIndex + 1} of {RESIDENTIAL_PROJECTS.length}
            </div>
          </div>

          {/* Project Details Content Area */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8" id="portfolio-project-text">
            
            {/* Meta */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[0.62rem] font-sans uppercase tracking-[0.2em] text-[#8E7A5F]">
                <span>SANSSA ARCHITECTURE</span>
                <span>•</span>
                <span>{activeProj.location}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                {activeProj.title}
              </h3>

              <p className="text-xs text-[#66635F] leading-relaxed font-light">
                {activeProj.description}
              </p>
            </div>

            {/* Scope of Execution Bullets */}
            <div className="space-y-3.5 pt-2">
              <span className="text-[0.65rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                Execution Deliverables
              </span>
              <ul className="grid grid-cols-2 gap-3 text-[0.72rem] text-[#66635F] font-light">
                {activeProj.scope.map((item, id) => (
                  <li key={id} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#8E7A5F] shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep elegant client block quote with rating */}
            <div className="bg-[#FAF9F6] border border-[#E2DBD5]/60 p-5 space-y-2 relative">
              <span className="font-serif text-3xl text-[#8E7A5F]/20 absolute top-2 right-4 leading-none">“</span>
              <p className="font-serif italic text-xs text-[#66635F] leading-relaxed pr-6">
                "{activeProj.quote.text}"
              </p>
              <div className="text-[0.62rem] tracking-wider uppercase font-sans text-[#151515]">
                — {activeProj.quote.client}
              </div>
            </div>

            {/* Inline Action */}
            <div className="flex items-center gap-4 pt-2">
              <a
                id={`btn-portfolio-whatsapp-${activeProj.id}`}
                href={`https://wa.me/919041544437?text=Hi%20Sanssa%20Home%2C%20I%20am%20so%20inspired%20by%20${encodeURIComponent(activeProj.title)}%20in%20${encodeURIComponent(activeProj.location)}.%20Would%20love%20to%20consult.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] px-6 py-3.5 text-xs font-sans tracking-widest uppercase transition-colors duration-500 cursor-pointer"
              >
                Inquire About Project
              </a>
              <button 
                onClick={() => {
                  alert(`We will prepare a customizable presentation slide pack of "${activeProj.title}" floorplans, material samples, and before-after layout transformations, and send it directly to your email.`);
                }}
                className="border border-[#E2DBD5] hover:border-[#151515] text-[#151515] hover:bg-[#FAF9F6] px-6 py-3.5 text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer"
              >
                Request Floorplans
              </button>
            </div>

          </div>
        </div>

        {/* Studio DNA Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" id="dna-pillars">
          <div className="bg-white border border-[#E2DBD5]/40 p-6 flex items-start space-x-4">
            <Layout className="w-8 h-8 text-[#8E7A5F] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-serif text-base text-[#151515]">Space Optimisation</h4>
              <p className="text-[0.68rem] font-sans text-[#66635F] leading-relaxed">
                We believe in architectural flow. Every floorplan is meticulously tailored to delete awkward gaps, maximize structural sunlight depths, and double storage efficiency.
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#E2DBD5]/40 p-6 flex items-start space-x-4">
            <Shield className="w-8 h-8 text-[#8E7A5F] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-serif text-base text-[#151515]">Bespoke Joinery</h4>
              <p className="text-[0.68rem] font-sans text-[#66635F] leading-relaxed">
                Executed in our Sector 82 Industrial area atelier. We never utilize raw pre-lams. We hand-veneer, soft-close wrap, and finish with organic non-toxic German protective resins.
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#E2DBD5]/40 p-6 flex items-start space-x-4">
            <Award className="w-8 h-8 text-[#8E7A5F] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-serif text-base text-[#151515]">Premium Execution</h4>
              <p className="text-[0.68rem] font-sans text-[#66635F] leading-relaxed">
                Headed on-site by Harneet. Fully structured timelines with transparent billing, weekly client reviews, and direct white-glove warranty support across Mohali and Chandigarh.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
