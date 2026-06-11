/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, Phone, MapPin, Send, HelpCircle, Shield, Globe, Award } from 'lucide-react';

interface FooterProps {
  onNavClick: (val: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#151515] text-[#FAF9F6] pt-20 pb-12 overflow-hidden border-t border-[#8E7A5F]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#FAF9F6]/10 pb-16">
        
        {/* Foot Col 1: Brand Space */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl tracking-[0.2em] text-white">SANSSA</h3>
            <span className="text-[0.62rem] tracking-[0.3em] uppercase text-[#8E7A5F] font-bold block">
              HOME & INTERIOR ATELIER
            </span>
          </div>

          <p className="text-xs text-[#E2DBD5]/80 leading-relaxed max-w-sm font-light">
            We transform ideas into physical premium spaces. Based in Sector 82 JLPL Industrial Area Mohali, we design high-end, bespoke minimalist furniture and execute architecture concepts across Chandigarh, Panchkula and Mohali.
          </p>

          {/* Core business status tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[0.58rem] tracking-wider uppercase bg-[#FAF9F6]/5 text-[#8E7A5F] px-3 py-1.5 border border-[#FAF9F6]/10">
              ✓ Women-Owned Studio
            </span>
            <span className="text-[0.58rem] tracking-wider uppercase bg-[#FAF9F6]/5 text-[#8E7A5F] px-3 py-1.5 border border-[#FAF9F6]/10">
              ✓ LGBTQ+ Friendly Space
            </span>
          </div>
        </div>

        {/* Foot Col 2: Navigation map */}
        <div className="md:col-span-3 space-y-6">
          <h4 className="text-[0.65rem] font-sans tracking-[0.25em] uppercase text-white font-bold">
            Atelier Directories
          </h4>
          <ul className="space-y-3.5 text-xs text-[#E2DBD5]/75 font-light" id="footer-directory">
            {[
              { id: 'hero', label: 'Overview Design' },
              { id: 'catalog', label: 'Bespoke Curations' },
              { id: 'customizer', label: 'Interactive Swatches' },
              { id: 'portfolio', label: 'Chandigarh Residences' },
              { id: 'reviews', label: 'Customer Stories' },
              { id: 'calculator', label: 'Estimate Invoicing' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavClick(item.id)}
                  className="hover:text-white hover:translate-x-1.5 transition-all focus:outline-none cursor-pointer text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Foot Col 3: Business Listing Contacts */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="text-[0.65rem] font-sans tracking-[0.25em] uppercase text-white font-bold">
            Business Coordinates
          </h4>
          
          <ul className="space-y-4 text-xs text-[#E2DBD5]/85" id="footer-coordinates">
            
            {/* Address */}
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8E7A5F] shrink-0 mt-0.5" />
              <div className="font-light space-y-1">
                <span className="font-sans font-medium text-white block">Physical Atelier:</span>
                <span>Plot no : 1710, Sector 82, JLPL Industrial Area, Sahibzada Ajit Singh Nagar, Punjab 140306</span>
                <span className="font-mono text-[0.6rem] text-[#8E7A5F] block pt-0.5">Plus Code: JPXM+9F Mohali</span>
              </div>
            </li>

            {/* Hours */}
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#8E7A5F] shrink-0 mt-0.5" />
              <div className="font-light">
                <span className="font-sans font-medium text-white block">Showroom Timings:</span>
                <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                <span className="text-[#8E7A5F] block font-medium">Sunday: Closed</span>
              </div>
            </li>

            {/* Direct Phone line */}
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#8E7A5F] shrink-0 mt-0.5" />
              <div>
                <span className="font-sans font-medium text-white block">Secure Direct Dial:</span>
                <a href="tel:09041544437" className="font-mono hover:text-[#8E7A5F] transition-all">
                  090415 44437
                </a>
              </div>
            </li>

          </ul>
        </div>

      </div>

      {/* Credits Bottom Block */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[0.68rem] text-[#66635F] gap-4">
        <div>
          © {new Date().getFullYear()} SANSSA Interiors & Sanssa Home. All Rights Reserved.
        </div>
        <div className="flex space-x-6 text-[#E2DBD5]/50">
          <a href="https://sanssahome.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">sanssahome.com</a>
          <span>•</span>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Official WhatsApp Desk</a>
        </div>
      </div>
    </footer>
  );
}
