/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';
import { FURNITURE_ITEMS, MATERIALS } from '../data';
import { FurnitureItem, MaterialOption } from '../types';

export default function SofaCustomizer() {
  const customizerFurniture = FURNITURE_ITEMS; // 3 core iconic items
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem>(customizerFurniture[0]);
  
  // Customization choices
  const [selectedStructure, setSelectedStructure] = useState<MaterialOption>(
    MATERIALS.find(m => m.id === selectedFurniture.materials.structures[0]) || MATERIALS[0]
  );
  const [selectedFabric, setSelectedFabric] = useState<MaterialOption>(
    MATERIALS.find(m => m.id === selectedFurniture.materials.fabrics[0]) || MATERIALS[3]
  );
  const [selectedFinish, setSelectedFinish] = useState<MaterialOption>(
    MATERIALS.find(m => m.id === (selectedFurniture.materials.finishes?.[0] || '')) || MATERIALS[7]
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [whatsappSent, setWhatsappSent] = useState<boolean>(false);

  // Quick reset on furniture toggle
  const handleFurnitureChange = (item: FurnitureItem) => {
    setSelectedFurniture(item);
    setSelectedStructure(MATERIALS.find(m => m.id === item.materials.structures[0]) || MATERIALS[0]);
    setSelectedFabric(MATERIALS.find(m => m.id === item.materials.fabrics[0]) || MATERIALS[3]);
    setSelectedFinish(MATERIALS.find(m => m.id === (item.materials.finishes?.[0] || '')) || MATERIALS[7]);
    setIsSaved(false);
    setWhatsappSent(false);
  };

  // Compute overall estimated price
  const totalBespokePrice = (selectedFurniture.basePrice + selectedStructure.priceModifier + selectedFabric.priceModifier + (selectedFurniture.materials.finishes ? selectedFinish.priceModifier : 0)) * quantity;

  // Swatch element renderer
  const renderSwatch = (material: MaterialOption, active: boolean, onClick: () => void) => {
    return (
      <button
        key={material.id}
        onClick={onClick}
        className={`group relative flex flex-col items-center p-3 border rounded-none transition-all duration-300 focus:outline-none cursor-pointer ${
          active 
            ? 'border-[#8E7A5F] bg-[#F5EFEB]' 
            : 'border-[#E2DBD5] bg-white hover:border-[#8E7A5F]/60'
        }`}
      >
        <div className="relative w-8 h-8 rounded-full border border-black/10 overflow-hidden shadow-sm">
          <div 
            className="w-full h-full"
            style={{ backgroundColor: material.colorHex || '#ccc' }}
          />
          {active && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <Check className="w-4.5 h-4.5 text-white stroke-[2.5]" />
            </div>
          )}
        </div>
        <span className="text-[0.62rem] font-sans uppercase tracking-widest text-center mt-2.5 font-medium text-[#151515] group-hover:text-[#8E7A5F] transition-colors leading-tight">
          {material.name.replace('Selected ', '').replace('Bespoke ', '')}
        </span>
        <span className="text-[0.58rem] font-mono text-[#66635F] mt-0.5">
          {material.priceModifier > 0 ? `+₹${material.priceModifier.toLocaleString()}` : 'Included'}
        </span>

        {/* Floating tooltip */}
        <div className="absolute bottom-[105%] hidden group-hover:block w-48 bg-[#151515] text-[#FAF9F6] p-2 text-[0.6rem] leading-normal font-sans tracking-wide shadow-xl z-20 left-1/2 -translate-x-1/2">
          {material.description}
        </div>
      </button>
    );
  };

  const sharePayload = () => {
    const message = `Hi Sanssa Home, I customized a bespoke item on your website:%0A%0A*Model:* ${selectedFurniture.name}%0A*Base Frame:* ${selectedStructure.name}%0A*Fabric Selection:* ${selectedFabric.name}%0A${selectedFurniture.materials.finishes ? `*Accents:* ${selectedFinish.name}%0A` : ''}*Qty:* ${quantity}%0A*Estimated Bespoke Pricing:* ₹${totalBespokePrice.toLocaleString()}%0A%0AI would love to chat regarding real fabric swatches and consultation schedule!`;
    window.open(`https://wa.me/919041544437?text=${message}`, '_blank');
    setWhatsappSent(true);
  };

  return (
    <section id="customizer" className="py-24 bg-[#EAE6DF]/30 border-y border-[#E2DBD5]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-semibold block">
            THE ATELIER STUDIO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-light leading-tight">
            Interactive Material Studio
          </h2>
          <div className="w-12 h-1 bg-[#8E7A5F] mx-auto opacity-30" />
          <p className="font-sans text-xs text-[#66635F] leading-relaxed font-light">
            Design details dictate character. Instantly customize our bespoke, heritage collection by toggling sustainable forest woods, custom imports textiles, and hardware finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Interactive Preview Canvas - Left Block */}
          <div className="lg:col-span-7 space-y-6" id="customizer-visual-canvas">
            
            {/* Main Showroom Image Frame */}
            <div className="relative bg-[#FAF9F6] border border-[#E2DBD5] p-2 overflow-hidden shadow-sm">
              
              {/* Image with subtle fade animation on change using motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFurniture.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF9F6]"
                >
                  <img
                    src={selectedFurniture.image}
                    alt={selectedFurniture.name}
                    className="w-full h-full object-cover filter brightness-[0.98]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Status Spec Badges Overlay */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                <span className="bg-[#151515] text-[#FAF9F6] text-[0.6rem] tracking-widest font-sans uppercase px-3 py-1 font-semibold">
                  {selectedFurniture.category}
                </span>
                <span className="bg-[#FAF9F6]/90 backdrop-blur-sm border border-[#E2DBD5] text-[#151515] text-[0.6rem] tracking-wider font-sans px-3 py-1 uppercase">
                  Designer Studio Selection
                </span>
              </div>

              {/* Detail specs drawer at base */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#151515]/90 via-[#151515]/80 to-transparent p-6 text-[#FAF9F6] pt-12">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-[0.55rem] tracking-widest uppercase text-[#8E7A5F] font-semibold block mb-0.5">
                      {selectedFurniture.tagline}
                    </span>
                    <h3 className="font-serif text-lg tracking-wide">{selectedFurniture.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.6rem] tracking-wider uppercase text-[#8E7A5F] block font-light">
                      Bespoke Estimate
                    </span>
                    <span className="font-mono text-xl text-white">
                      ₹{totalBespokePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FAF9F6] border border-[#E2DBD5]/60 p-4 space-y-1">
                <span className="text-[0.6rem] uppercase tracking-widest text-[#8E7A5F] block">Atelier Designer</span>
                <span className="text-xs font-sans text-[#151515] font-medium">{selectedFurniture.designer}</span>
              </div>
              <div className="bg-[#FAF9F6] border border-[#E2DBD5]/60 p-4 space-y-1">
                <span className="text-[0.6rem] uppercase tracking-widest text-[#8E7A5F] block">Standard Dimensions</span>
                <span className="text-xs font-mono text-[#151515]">
                  W: {selectedFurniture.dimensions.width} • D: {selectedFurniture.dimensions.depth} • H: {selectedFurniture.dimensions.height}
                </span>
              </div>
              <div className="bg-[#FAF9F6] border border-[#E2DBD5]/60 p-4 space-y-1">
                <span className="text-[0.6rem] uppercase tracking-widest text-[#8E7A5F] block">Origin & Quality</span>
                <span className="text-xs font-sans text-[#151515] font-medium">JLPL Sector 82, Handcrafted</span>
              </div>
            </div>

            {/* Real wood/fabric combinations statement */}
            <div className="bg-white/50 border border-[#E2DBD5]/60 p-5 flex items-start space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-[#8E7A5F] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-sans font-semibold text-[#151515] uppercase tracking-wider">Premium Material Warranty</h4>
                <p className="text-[0.68rem] font-sans text-[#66635F] leading-relaxed">
                  Every Sanssa piece uses grade-tested kiln-dried framing and performance anti-stain woven wool. Includes a 5-year bespoke frame structure replacement warranty in Chandigarh Tricity.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Customization Dashboard - Right Block */}
          <div className="lg:col-span-5 bg-white border border-[#E2DBD5] p-6 sm:p-8 space-y-8" id="customizer-controls">
            
            <div className="space-y-2">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#8E7A5F]">Configure Heritage</span>
              <h3 className="font-serif text-xl text-[#151515]">Material Palette</h3>
              <p className="text-xs font-light text-[#66635F]">
                Select the base piece below to begin customization.
              </p>
            </div>

            {/* Selector: Choose Furniture Base */}
            <div className="space-y-3">
              <label className="text-[0.65rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                1. Select Silhouette Base
              </label>
              <div className="grid grid-cols-3 gap-2">
                {customizerFurniture.map((item) => (
                  <button
                    key={item.id}
                    id={`btn-select-${item.id}`}
                    onClick={() => handleFurnitureChange(item)}
                    className={`p-2.5 text-[0.68rem] font-sans tracking-wide border transition-all truncate focus:outline-none cursor-pointer ${
                      selectedFurniture.id === item.id 
                        ? 'border-[#151515] bg-[#151515] text-[#FAF9F6]' 
                        : 'border-[#E2DBD5] bg-[#FAF9F6] text-[#66635F] hover:border-[#151515]/40 hover:text-[#151515]'
                    }`}
                  >
                    {item.name.replace('The ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector: Frame / Timber */}
            <div className="space-y-3">
              <label className="text-[0.65rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                2. Solid Hardwood Structure
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MATERIALS.filter(m => m.type === 'structure' && selectedFurniture.materials.structures.includes(m.id)).map((mat) => (
                  renderSwatch(mat, selectedStructure.id === mat.id, () => setSelectedStructure(mat))
                ))}
              </div>
              <span className="text-[0.62rem] text-[#66635F] italic block">
                Selected wood: <strong className="font-semibold text-[#151515]">{selectedStructure.name}</strong> - {selectedStructure.description}
              </span>
            </div>

            {/* Selector: Fabric Swatch */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[0.65rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                  3. Premium Tactile Upholstery
                </label>
                <div className="flex items-center space-x-1 text-[#8E7A5F] cursor-help">
                  <Info className="w-3 h-3" />
                  <span className="text-[0.55rem] font-sans tracking-widest uppercase">Water repellent</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MATERIALS.filter(m => m.type === 'fabric' && selectedFurniture.materials.fabrics.includes(m.id)).map((mat) => (
                  renderSwatch(mat, selectedFabric.id === mat.id, () => setSelectedFabric(mat))
                ))}
              </div>
              <span className="text-[0.62rem] text-[#66635F] italic block">
                Selected fabric: <strong className="font-semibold text-[#151515]">{selectedFabric.name}</strong> - {selectedFabric.description}
              </span>
            </div>

            {/* Selector: Metal Accents (Only if present) */}
            {selectedFurniture.materials.finishes && (
              <div className="space-y-3">
                <label className="text-[0.65rem] font-sans tracking-widest uppercase font-semibold text-[#151515] block">
                  4. Hand-Brushed Metal Trim
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MATERIALS.filter(m => m.type === 'finish' && selectedFurniture.materials.finishes?.includes(m.id)).map((mat) => (
                    renderSwatch(mat, selectedFinish.id === mat.id, () => setSelectedFinish(mat))
                  ))}
                </div>
                <span className="text-[0.62rem] text-[#66635F] italic block">
                  Chosen detailing: <strong className="font-semibold text-[#151515]">{selectedFinish.name}</strong>
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-4 border-t border-[#E2DBD5]/70 flex items-center justify-between">
              <span className="text-xs font-sans tracking-wider uppercase font-medium text-[#151515]">Collection Quantity</span>
              <div className="flex items-center border border-[#E2DBD5]">
                <button 
                  id="qty-minus"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-3 py-1.5 hover:bg-[#F5EFEB] disabled:opacity-40 transition-colors focus:outline-none focus:ring-0 text-sm font-mono cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 font-mono font-medium text-xs text-[#151515]">{quantity}</span>
                <button 
                  id="qty-plus"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-[#F5EFEB] transition-colors focus:outline-none focus:ring-0 text-sm font-mono cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Core Action Callouts */}
            <div className="space-y-3 pt-2">
              <button
                id="btn-whatsapp-customizer"
                onClick={sharePayload}
                className="w-full bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] py-4 text-xs font-sans tracking-widest uppercase transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Custom Fabric Swatches</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-save-customizer-spec"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`py-3 text-[0.65rem] font-sans tracking-widest uppercase border transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-[#8E7A5F] bg-[#FAF9F6] text-[#8E7A5F]'
                      : 'border-[#E2DBD5] bg-white text-[#151515] hover:border-[#151515]'
                  }`}
                >
                  {isSaved ? '✓ Configuration Locked' : '♥ Save Configuration'}
                </button>

                <button
                  id="btn-sample-swatch"
                  onClick={() => {
                    alert(`Sample fabric swatches for "${selectedFabric.name}" and timber cards for "${selectedStructure.name}" have been added to your bespoke mood board palette summary!`);
                  }}
                  className="border border-[#E2DBD5] hover:border-[#151515] bg-white text-[#151515] py-3 text-[0.65rem] font-sans tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Order Physical Swatch
                </button>
              </div>

              {whatsappSent && (
                <p className="text-[0.65rem] text-[#8E7A5F] font-sans text-center bg-[#FAF9F6] p-2.5 border border-[#E2DBD5] animate-fade-in-up">
                  ✓ Consultation message sent! Our designers will touch base inside Whatsapp instantly.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
