/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Hammer, ShieldCheck, Download, Send, ArrowRight, HelpCircle } from 'lucide-react';

interface ComponentOption {
  id: string;
  name: string;
  category: 'kitchen' | 'wardrobes' | 'decor' | 'furniture';
  baseCost: number;
  info: string;
}

export default function QuotationCalculator() {
  const [bhk, setBhk] = useState<'2bhk' | '3bhk' | '4bhk' | 'custom'>('3bhk');
  const [tier, setTier] = useState<'premium' | 'luxury' | 'couture'>('luxury');
  
  // Custom furniture components to toggle
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'add-kitchen', 'add-sofa', 'add-closets'
  ]);

  const SERVICE_ADDONS: ComponentOption[] = [
    { id: 'add-kitchen', name: 'Bespoke Modular Kitchen (Sector 82 PU Finish)', category: 'kitchen', baseCost: 195000, info: 'Equipped with quiet soft-closing Blum runners, high gloss anti-scratch acrylic shutters.' },
    { id: 'add-closets', name: 'Integrated Walk-In Wardrobes (With Glass)', category: 'wardrobes', baseCost: 145000, info: 'Floor-to-ceiling sleek profile with internal soft sensor LED strip lighting.' },
    { id: 'add-sofa', name: 'Lumina Modular Sectional (Parisian Cream)', category: 'furniture', baseCost: 185000, info: 'A flagship premium modular sofa with comfortable down feather toppers.' },
    { id: 'add-dining', name: 'Atelier Solid Oak Dining Set (Seats 8)', category: 'furniture', baseCost: 145000, info: 'Curved Japanese oak tabletop paired with matching custom paper-cord woven chairs.' },
    { id: 'add-paneling', name: 'Timber Wall Paneling & Fluted Cladding', category: 'decor', baseCost: 85000, info: 'High-density fiber core fluted panels finished with water-resistant walnut oil.' },
    { id: 'add-lighting', name: 'Ambient Linear Ceiling Lighting Design', category: 'decor', baseCost: 45000, info: 'Curated architectural dimmable warm COB strips with trimless housing profile.' }
  ];

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Pricing engine calculations
  const getBhkMultiplier = () => {
    switch (bhk) {
      case '2bhk': return 0.85;
      case '3bhk': return 1.0;
      case '4bhk': return 1.35;
      case 'custom': return 0.5;
    }
  };

  const getTierMultiplier = () => {
    switch (tier) {
      case 'premium': return 0.9;
      case 'luxury': return 1.15;
      case 'couture': return 1.5;
    }
  };

  const calculateSubtotal = () => {
    const addonsCost = SERVICE_ADDONS
      .filter(item => selectedAddons.includes(item.id))
      .reduce((acc, curr) => acc + curr.baseCost, 0);

    const baseConstructionFee = 250000 * getBhkMultiplier();
    return Math.round((baseConstructionFee + addonsCost) * getTierMultiplier());
  };

  const subtotal = calculateSubtotal();
  const designerSupervisionFee = Math.round(subtotal * 0.08); // 8% Design consulting fee
  const gstTax = Math.round((subtotal + designerSupervisionFee) * 0.18); // 18% standard GST
  const grandTotal = subtotal + designerSupervisionFee + gstTax;

  const handleShareEstimate = () => {
    const itemsList = SERVICE_ADDONS
      .filter(item => selectedAddons.includes(item.id))
      .map(item => `- ${item.name}`)
      .join('%0A');

    const message = `Hi Sanssa Home, I generated an estimate package on your website.%0A%0A*Project details:*%0A*Scope:* ${bhk.toUpperCase()}%0A*Tier:* ${tier.toUpperCase()}%0A*Selected deliverables:*%0A${itemsList}%0A%0A*Estimated Invoice details:*%0A*Subtotal:* ₹${subtotal.toLocaleString()}%0A*Architect Fee (8%):* ₹${designerSupervisionFee.toLocaleString()}%0A*Grand Total (GST Inc):* ₹${grandTotal.toLocaleString()}%0A%0AI would love to request real site measurements in Tricity.`;
    window.open(`https://wa.me/919041544437?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 bg-[#EAE6DF]/30 border-t border-[#E2DBD5]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-semibold block">
            TRANSPARENT VALUE ENGINE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-light">
            Interactive Estimate Planner
          </h2>
          <div className="w-12 h-1 bg-[#8E7A5F] mx-auto opacity-30" />
          <p className="font-sans text-xs text-[#66635F] leading-relaxed font-light">
            Plan your complete interior renovation budget transparently. Toggle options below to instantly calculate your customizable modular layouts, materials, and artisan supervising fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Planner - Left Column */}
          <div className="lg:col-span-7 bg-white border border-[#E2DBD5] p-6 sm:p-10 space-y-8" id="calculator-form-area overflow-hidden">
            
            <div className="space-y-3">
              <label className="text-[0.62rem] font-sans tracking-[0.25em] uppercase font-bold text-[#151515] block">
                1. SELECT SPACE LAYOUT (BHK SCALE)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['2bhk', '3bhk', '4bhk', 'custom'] as const).map((b) => (
                  <button
                    key={b}
                    id={`btn-calc-bhk-${b}`}
                    onClick={() => setBhk(b)}
                    className={`py-3 text-[0.68rem] font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                      bhk === b 
                        ? 'border-[#151515] bg-[#151515] text-[#FAF9F6]' 
                        : 'border-[#E2DBD5] bg-[#FAF9F6] text-[#66635F] hover:border-[#8E7A5F]'
                    }`}
                  >
                    {b === 'custom' ? 'Custom Room' : b.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-[0.62rem] text-[#66635F] italic">
                {bhk === '2bhk' && 'Ideal for cozy boutique apartments (Typical carpet size 1100 - 1300 sq.ft)'}
                {bhk === '3bhk' && 'Standard luxury residence scope (Typical carpet size 1600 - 1950 sq.ft)'}
                {bhk === '4bhk' && 'Sizable modern duplex or villa estate (Typical carpet size 2400 - 3200 sq.ft)'}
                {bhk === 'custom' && 'Bespoke single-room modular renovation (Lounge study or walk-in closet commission)'}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-[0.62rem] font-sans tracking-[0.25em] uppercase font-bold text-[#151515] block">
                2. CHOOSE SPECIFICATION & FINISH TIER
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'premium', label: 'Premium', highlight: 'Korean acrylic, high-density composites' },
                  { id: 'luxury', label: 'Luxury (Recommended)', highlight: 'German hardware, premium White Oak, heavy linens' },
                  { id: 'couture', label: 'Haute Couture', highlight: 'Solid American Walnut, metal inserts, silk blends' }
                ].map((t) => (
                  <button
                    key={t.id}
                    id={`btn-calc-tier-${t.id}`}
                    onClick={() => setTier(t.id as any)}
                    className={`p-3.5 text-left border transition-all flex flex-col justify-between h-24 cursor-pointer focus:outline-none ${
                      tier === t.id 
                        ? 'border-[#8E7A5F] bg-[#F5EFEB]' 
                        : 'border-[#E2DBD5] bg-white hover:border-[#8E7A5F]/60'
                    }`}
                  >
                    <span className="text-[0.68rem] font-sans tracking-wider uppercase font-bold text-[#151515]">
                      {t.label}
                    </span>
                    <span className="text-[0.55rem] text-[#66635F] leading-tight font-light">
                      {t.highlight}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[0.62rem] font-sans tracking-[0.25em] uppercase font-bold text-[#151515] block">
                3. SELECT DELIVERABLE PACKAGES
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="calc-deliverables-checklist">
                {SERVICE_ADDONS.map((item) => {
                  const active = selectedAddons.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleAddon(item.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                        active 
                          ? 'border-[#8E7A5F]/70 bg-[#FAF9F6]/80' 
                          : 'border-[#E2DBD5]/60 bg-white hover:border-[#8E7A5F]/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        readOnly
                        className="mt-0.5 accent-[#8E7A5F] shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-xs font-sans font-medium text-[#151515] block leading-tight">
                          {item.name.split(' (')[0]}
                        </span>
                        <span className="text-[0.6rem] text-[#66635F] font-light leading-normal block">
                          {item.info}
                        </span>
                        <span className="text-[0.62rem] font-mono text-[#8E7A5F] block pt-1 font-semibold">
                          ₹{item.baseCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quality Note */}
            <div className="bg-[#FAF9F6] border border-[#E2DBD5]/60 p-5 flex items-start space-x-3.5">
              <Hammer className="w-5 h-5 text-[#8E7A5F] shrink-0 mt-0.5" />
              <p className="text-[0.68rem] text-[#66635F] leading-relaxed font-light">
                <strong className="font-semibold text-[#151515]">Tricity White-Glove Execution:</strong> Estimates include full delivery, structural installation by Sector 82 workshop team, and clean site handover. No surprise hidden carpentry costs.
              </p>
            </div>

          </div>

          {/* Dynamic Invoice Quotation - Right Column */}
          <div className="lg:col-span-5 bg-[#151515] text-[#FAF9F6] p-6 sm:p-8 flex flex-col justify-between space-y-8 sticky top-24 shadow-xl" id="calculator-receipt">
            
            <div className="space-y-6">
              
              {/* Receipt Header */}
              <div className="border-b border-[#FAF9F6]/20 pb-5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-[0.25em] text-white">SANSSA</span>
                  <span className="text-[0.55rem] font-mono text-[#8E7A5F] bg-[#FAF9F6] px-2 py-0.5 uppercase">Draft Invoice</span>
                </div>
                <div className="flex justify-between text-[0.58rem] text-[#66635F] uppercase tracking-wider">
                  <span>Mohali Tricity Office</span>
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Param Breakdown summary */}
              <div className="space-y-3.5 text-xs font-light text-[#E2DBD5]/90">
                <h4 className="text-[0.55rem] tracking-widest uppercase text-[#8E7A5F] font-bold">Project Configuration</h4>
                
                <div className="flex justify-between py-1 border-b border-[#FAF9F6]/10">
                  <span>Premises Scale:</span>
                  <span className="font-mono text-white font-medium">{bhk === 'custom' ? 'Custom Single Room' : `${bhk.toUpperCase()} Residence`}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#FAF9F6]/10">
                  <span>Materials & Spec Level:</span>
                  <span className="font-mono text-white font-medium capitalize">{tier}</span>
                </div>
              </div>

              {/* Selected Addon Items detailed list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[0.55rem] tracking-widest uppercase text-[#8E7A5F] font-bold">Selected Deliverables</h4>
                
                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-2">
                  
                  {/* Base construction line */}
                  <div className="flex justify-between text-[0.68rem]">
                    <span className="truncate pr-4 text-[#E2DBD5]/80">Modular Framing & Site Assembly Base</span>
                    <span className="font-mono text-white">₹{(250000 * getBhkMultiplier()).toLocaleString()}</span>
                  </div>

                  {/* Addon lists */}
                  {SERVICE_ADDONS.filter(item => selectedAddons.includes(item.id)).map((item) => (
                    <div key={item.id} className="flex justify-between text-[0.68rem]">
                      <span className="truncate pr-4 text-[#E2DBD5]/80">{item.name.split(' (')[0]}</span>
                      <span className="font-mono text-white">₹{item.baseCost.toLocaleString()}</span>
                    </div>
                  ))}

                </div>
              </div>

              {/* Taxation & Total Stack */}
              <div className="pt-6 border-t border-[#FAF9F6]/20 space-y-3 text-xs">
                
                <div className="flex justify-between text-[#FAF9F6]/80 text-[0.68rem]">
                  <span>Subtotal Construction:</span>
                  <span className="font-mono text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-[#FAF9F6]/80 text-[0.68rem]">
                  <span>Architect Supervision Fee (8%):</span>
                  <span className="font-mono text-white">₹{designerSupervisionFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#FAF9F6]/80 text-[0.68rem]">
                  <span>GST Taxation (18%):</span>
                  <span className="font-mono text-white">₹{gstTax.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-[#FAF9F6]/40 flex justify-between items-baseline">
                  <span className="font-sans text-xs tracking-widest uppercase font-bold text-white">EST. INVESTMENT:</span>
                  <div className="text-right">
                    <span className="font-mono text-xl text-[#8E7A5F] font-semibold block leading-none">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-[0.55rem] text-[#66635F] italic mt-1 block">inclusive of site assembly fee</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Receipt Footer CTA */}
            <div className="space-y-3 pt-4 border-t border-[#FAF9F6]/10">
              
              <button
                id="btn-calc-share-estimate"
                onClick={handleShareEstimate}
                className="w-full bg-[#FAF9F6] text-[#151515] hover:bg-[#8E7A5F] hover:text-[#FAF9F6] py-4 text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Consult On This Quote</span>
              </button>

              <button
                id="btn-print-estimate"
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-transparent border border-[#FAF9F6]/30 hover:border-[#FAF9F6] text-[#FAF9F6] py-3 text-[0.65rem] font-sans tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Print Copy</span>
              </button>

              <span className="block text-[0.55rem] text-center text-[#66635F]">
                * Estimates are calculated real-time and valid for 30 days. Final quote issued post Sector 82 site surveys.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
