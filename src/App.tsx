/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FurnitureCatalog from './components/FurnitureCatalog';
import SofaCustomizer from './components/SofaCustomizer';
import PortfolioViewer from './components/PortfolioViewer';
import ReviewSpace from './components/ReviewSpace';
import QuotationCalculator from './components/QuotationCalculator';
import Footer from './components/Footer';

// Generated Premium Image Assets
const ASS_HERO = '/src/assets/images/sanssa_hero_1781154425296.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll handler
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Set active link on scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'catalog', 'customizer', 'portfolio', 'reviews', 'calculator'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased bg-[#FAF9F6] selection:bg-[#8E7A5F] selection:text-white" id="root-app-container">
      
      {/* Prime Header Space */}
      <Navbar onNavClick={handleNavClick} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        
        {/* 1. Hero Block Showcase */}
        <Hero onExploreClick={handleNavClick} heroImg={ASS_HERO} />

        {/* 2. Premium Furniture Catalog Grid */}
        <FurnitureCatalog />

        {/* 3. Interactive Swatch & Material Studio */}
        <SofaCustomizer />

        {/* 4. Fine Projects Architectural Portfolio */}
        <PortfolioViewer />

        {/* 5. Real Customer Google Review Space */}
        <ReviewSpace />

        {/* 6. Professional Cost & Invoicing Planner */}
        <QuotationCalculator />

      </main>

      {/* Footer Navigation & Coord Details */}
      <Footer onNavClick={handleNavClick} />

    </div>
  );
}
