/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'catalog', label: 'Bespoke Furniture' },
    { id: 'customizer', label: 'Atelier Studio' },
    { id: 'portfolio', label: 'Architecture & Projects' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'calculator', label: 'Quotation Planner' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E1DBD5]/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            id="nav-logo"
            onClick={() => { onNavClick('hero'); setIsOpen(false); }}
            className="flex flex-col items-start focus:outline-none cursor-pointer group"
          >
            <span className="font-display text-2xl tracking-[0.2em] text-[#151515] group-hover:text-[#8E7A5F] transition-colors duration-300">
              SANSSA
            </span>
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[#66635F] -mt-0.5">
              HOME & ATELIER
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10" id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavClick(item.id)}
                className={`text-xs font-sans tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-pointer relative py-2 ${
                  activeSection === item.id 
                    ? 'text-[#8E7A5F] font-medium' 
                    : 'text-[#66635F] hover:text-[#151515]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8E7A5F]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="mailto:design@sanssahome.com"
              className="text-xs font-sans tracking-widest uppercase text-[#66635F] hover:text-[#151515] transition-colors duration-300 mr-2"
            >
              sanssahome.com
            </a>
            <a
              id="cta-whatsapp-nav"
              href="https://wa.me/919041544437?text=Hi%20Sanssa%20Home%2C%20I%20visited%20your%20website%20and%20would%20love%20to%20discuss%20a%20furnished%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#151515] hover:bg-[#8E7A5F] text-[#FAF9F6] px-5 py-2.5 rounded-none text-xs font-sans tracking-widest uppercase transition-colors duration-500 flex items-center gap-2 focus:outline-none shadow-sm cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Connect Live</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <a
              href="https://wa.me/919041544437?text=Hi%20Sanssa%20Home..."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#151515] text-[#FAF9F6] p-2.5 rounded-none focus:outline-none"
              title="Whatsapp Connect"
            >
              <PhoneCall className="w-3.5 h-3.5" />
            </a>
            
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#151515] focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-20 z-40 bg-[#FAF9F6] border-b border-[#E1DBD5] shadow-xl lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-sm font-sans tracking-widest uppercase text-left py-2 border-b border-[#E1DBD5]/30 ${
                    activeSection === item.id 
                      ? 'text-[#8E7A5F] font-semibold pl-2 border-l border-[#8E7A5F]' 
                      : 'text-[#66635F]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 flex flex-col space-y-4">
                <div className="text-xs text-[#66635F] italic">
                  Plot no: 1710, Sector 82, JLPL Industrial Area, Mohali
                </div>
                <a
                  href="https://wa.me/919041544437?text=Hi%20Sanssa%20Home%2C%20I%20am%20interested%20in%20high-end%20furniture."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#151515] text-center text-[#FAF9F6] py-3.5 text-xs font-sans tracking-widest uppercase transition-colors"
                >
                  WhatsApp: 090415 44437
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
