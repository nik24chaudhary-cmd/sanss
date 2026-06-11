/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ArrowRight, X, Heart, Ruler, MessageSquare } from 'lucide-react';
import { FURNITURE_ITEMS, RESIDENTIAL_PROJECTS } from '../data';
import { FurnitureItem } from '../types';

export default function FurnitureCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sofas' | 'seating' | 'tables'>('all');
  const [activeItem, setActiveItem] = useState<FurnitureItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const filteredItems = selectedCategory === 'all' 
    ? FURNITURE_ITEMS 
    : FURNITURE_ITEMS.filter(item => item.category === selectedCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(item => item !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  return (
    <section id="catalog" className="py-24 bg-[#FAF9F6] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Modernist Column Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#E1DBD5]/40 pb-10">
          <div className="space-y-4 max-w-xl">
            <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-semibold block">
              CURATED COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-light leading-none">
              Bespoke Furniture <br />
              <span className="italic font-serif font-normal text-[#8E7A5F]">Catalog</span>
            </h2>
            <p className="font-sans text-xs text-[#66635F] leading-relaxed font-light">
              Crafted in Sector 82 workshop, Mohali. Highly tailored pieces featuring pristine joinery, selected timbers, and ultra-high-density resilient core comfort layers.
            </p>
          </div>

          {/* Elegant minimalist pill tabs */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
            {(['all', 'sofas', 'seating', 'tables'] as const).map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-sans uppercase tracking-widest transition-all duration-300 focus:outline-none cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#151515] text-[#FAF9F6]'
                    : 'bg-[#F2ECE6] text-[#66635F] hover:bg-[#EAE6DF] hover:text-[#151515]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Furniture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="furniture-grid-list">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                id={`furniture-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer bg-white border border-[#E2DBD5]/60 hover:border-[#8E7A5F]/70 transition-all duration-300 p-3 sm:p-4 flex flex-col justify-between relative shadow-sm"
              >
                
                {/* Image Container with Luxury Overlay */}
                <div className="relative overflow-hidden aspect-[4/3] bg-[#EAE6DF] mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphism Quick Hover button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#FAF9F6] text-[#151515] text-[0.65rem] tracking-widest font-sans uppercase py-3 px-6 shadow-xl flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Configure Details</span>
                    </span>
                  </div>

                  {/* Favorite Like Heart Button overlay */}
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF9F6]/90 backdrop-blur-sm border border-[#E2DBD5] flex items-center justify-center text-[#66635F] hover:text-red-500 transition-colors focus:outline-none"
                    aria-label="Add to wishlist"
                  >
                    <Heart 
                      className={`w-4 h-4 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-current'}`} 
                    />
                  </button>
                </div>

                {/* Info block */}
                <div className="space-y-3 pb-2">
                  <div className="flex items-center justify-between text-[0.62rem] tracking-widest uppercase text-[#8E7A5F]">
                    <span>{item.designer}</span>
                    <span className="font-mono text-[#66635F] normal-case bg-[#F5EFEB] px-2 py-0.5">
                      W: {item.dimensions.width.split(' ')[0]}cm
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg text-[#151515] group-hover:text-[#8E7A5F] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#66635F] line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2DBD5]/40 flex items-center justify-between">
                    <div>
                      <span className="text-[0.55rem] tracking-wider uppercase text-[#8E7A5F] block font-light">
                        Handcrafted From
                      </span>
                      <span className="font-mono text-sm text-[#151515] font-medium">
                        ₹{item.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      id={`furniture-configure-btn-${item.id}`}
                      className="text-xs font-sans uppercase tracking-widest text-[#151515] group-hover:text-[#8E7A5F] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <span>Customise</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Design Consultation Callout banner */}
        <div className="mt-20 bg-[#F5EFEB] border border-[#E2DBD5] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#8E7A5F] font-bold block">
              BESPOKE INTERIOR COMMISSION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#151515]">
              Looking for tailored space planning or custom-built wardrobes?
            </h3>
            <p className="text-xs text-[#66635F] max-w-2xl leading-relaxed font-light">
              Our residential designer team headed by <strong className="font-semibold text-[#151515]">Harneet</strong> will take physical site measurements, provide precise 3D custom furniture visualizations, and coordinate complete on-site white-glove execution in Sector 82, Mohali.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a
              id="whatsapp-catalog-banner"
              href="https://wa.me/919041544437?text=Hi%20Sanssa%20Home%2C%20I%20would%20love%20to%20discuss%20a%20whole-home%20furniture%20and%20interior%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] text-center py-4 px-6 text-xs font-sans tracking-widest uppercase transition-colors duration-500 cursor-pointer w-full"
            >
              Book Free Site Visit
            </a>
            <button
              onClick={() => {
                const element = document.getElementById('calculator');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-[#151515] hover:bg-[#151515] hover:text-[#FAF9F6] text-[#151515] text-center py-4 px-6 text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer w-full"
            >
              Estimate Project Cost
            </button>
          </div>
        </div>

      </div>

      {/* Catalog Item Spec Drawer/Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm" id="furniture-modal-overlay">
            
            {/* Click outside target */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveItem(null)} />
            
            <motion.div
              id="furniture-modal-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              
              {/* Drawer Close */}
              <button
                id="furniture-modal-close"
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-[#FAF9F6] border border-[#E2DBD5] text-[#151515] hover:text-[#8E7A5F] transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12 space-y-10">
                
                {/* Visual Header */}
                <div className="space-y-4">
                  <span className="text-[0.62rem] tracking-widest uppercase text-[#8E7A5F] font-bold block">
                    Product Specifications
                  </span>
                  <h2 className="font-serif text-3xl text-[#151515]">
                    {activeItem.name}
                  </h2>
                  <p className="font-sans text-xs italic text-[#66635F]">
                    "{activeItem.tagline}"
                  </p>
                </div>

                {/* Main Product Render */}
                <div className="border border-[#E2DBD5] p-1.5 bg-white">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full aspect-[16/10] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Dimensions & Structure Details */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <span className="text-[0.6rem] tracking-widest uppercase text-[#8E7A5F] flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5" /> Dimensions
                    </span>
                    <ul className="text-xs font-mono text-[#151515] space-y-0.5">
                      <li>Width: {activeItem.dimensions.width}</li>
                      <li>Depth: {activeItem.dimensions.depth}</li>
                      <li>Height: {activeItem.dimensions.height}</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[0.6rem] tracking-widest uppercase text-[#8E7A5F] block">
                      Fine Workmanship
                    </span>
                    <span className="text-xs text-[#151515] block">
                      Lead Designer: {activeItem.designer}
                    </span>
                    <span className="text-[0.65rem] text-[#66635F] italic">
                      Workshop: Sector 82, JLPL Industrial Area, Mohali
                    </span>
                  </div>
                </div>

                {/* Sub-description */}
                <div className="space-y-3">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#151515]">
                    Design Rationale
                  </h4>
                  <p className="text-xs text-[#66635F] leading-relaxed font-light">
                    {activeItem.description}
                  </p>
                </div>

                {/* Premium Features Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#151515]">
                    Construction Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#66635F] font-light">
                    {activeItem.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#8E7A5F] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-8 sm:p-12 bg-white border-t border-[#E2DBD5] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[0.55rem] tracking-wider uppercase text-[#8E7A5F] block">
                    Bespoke Base Quote
                  </span>
                  <span className="font-mono text-2xl text-[#151515] font-semibold">
                    ₹{activeItem.basePrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      const element = document.getElementById('customizer');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-none border border-[#151515] hover:bg-[#151515] hover:text-[#FAF9F6] text-[#151515] py-4 px-8 text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Customise Material
                  </button>

                  <a
                    id="modal-whatsapp-cta"
                    href={`https://wa.me/919041544437?text=Hi%20Sanssa%20Home%2C%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(activeItem.name)}.%20Please%23consult.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none text-center bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] py-4 px-8 text-xs font-sans tracking-widest uppercase transition-colors duration-500 cursor-pointer"
                  >
                    Reserve / Order
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
