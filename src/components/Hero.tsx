/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, MapPin, Eye, Star } from 'lucide-react';

interface HeroProps {
  onExploreClick: (target: string) => void;
  heroImg: string;
}

export default function Hero({ onExploreClick, heroImg }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] bg-[#FAF9F6] flex flex-col justify-between overflow-hidden">
      
      {/* Absolute Background Ambient Blur Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5EFEB] rounded-full filter blur-[100px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 pb-16 items-center flex-grow">
        
        {/* Typographic Introduction Area: Left */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 z-10" id="hero-left-content">
          
          <div className="inline-flex items-center space-x-2 bg-[#F5EFEB] border border-[#E2DBD5] py-1.5 px-3.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7A5F] animate-pulse" />
            <span className="text-[0.65rem] font-sans tracking-widest uppercase text-[#8E7A5F] font-semibold">
              Premium Interior Atelier & Furniture
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#151515] leading-[1.1] tracking-tight">
              A Dream Come <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#8E7A5F] font-serif">to Life</span>.
            </h1>
            <p className="font-sans text-sm text-[#66635F] leading-relaxed max-w-lg font-light">
              Designing premium interior architectures and crafting high-end minimalist furniture pieces for the Tricity. We elevate residences in Mohali, Chandigarh and Beyond.
            </p>
          </div>

          {/* Social Proof Quote - Elegant Display Box */}
          <div className="border-l-2 border-[#8E7A5F]/40 pl-5 py-2 block">
            <p className="font-serif text-sm italic text-[#66635F]">
              "Transforming my home with Sanssa Home felt like watching a dream come to life! An extraordinary eye for custom space optimisation."
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <div className="flex text-[#8E7A5F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[0.68rem] tracking-wider text-[#151515] font-sans uppercase font-medium">
                4.8 Rating (34 Google Reviews)
              </span>
            </div>
          </div>

          {/* Core Interactive Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              id="hero-explore-btn"
              onClick={() => onExploreClick('catalog')}
              className="bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] px-8 py-4 text-xs font-sans tracking-widest uppercase transition-colors duration-500 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore The Atelier</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            
            <button
              id="hero-planner-btn"
              onClick={() => onExploreClick('calculator')}
              className="border border-[#E2DBD5] hover:border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-[#FAF9F6] px-8 py-4 text-xs font-sans tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Bespoke Estimate</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Showcase Area: Right */}
        <div className="lg:col-span-7 relative group" id="hero-right-visual">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden bg-[#E2DBD5]"
          >
            <img
              src={heroImg}
              alt="Sanssa Home Luxury Residence Living Space"
              className="w-full aspect-[4/3] object-cover filter brightness-[0.97] hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/30 via-transparent to-transparent opacity-80" />

            {/* Float Badge inside the image */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#FAF9F6]/95 backdrop-blur-sm p-5 border border-[#E2DBD5] flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#8E7A5F] font-semibold block">
                  Latest Architecture Showcase
                </span>
                <span className="font-serif text-base text-[#151515]">
                  The Sector 82 Residence, Mohali
                </span>
              </div>
              <button 
                id="hero-badge-cta"
                onClick={() => onExploreClick('portfolio')}
                className="flex items-center space-x-1.5 text-xs font-sans uppercase tracking-widest text-[#151515] hover:text-[#8E7A5F] transition-colors focus:outline-none"
              >
                <span>View project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Artistic floating coordinates element */}
          <div className="absolute -top-6 -right-6 hidden xl:block w-36 h-36 border border-[#E2DBD5]/40 opacity-50 -z-10" />
        </div>
      </div>

      {/* Decorative Brand Ribbons */}
      <div className="border-t border-[#E2DBD5]/50 bg-[#F5EFEB] py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-y-4 items-center justify-between text-[#66635F]">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm tracking-widest font-semibold text-[#8E7A5F]">SANSSA</span>
            <span className="text-xs font-light text-[#66635F]">| Minimalist High-End Furniture</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-light tracking-wide">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8E7A5F]" /> Mohali & Chandigarh Tricity
            </span>
            <span className="hidden md:inline">• Handcrafted Premium Materials</span>
            <span className="hidden sm:inline">• 100% Client Visual Customiser Included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
