/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaterialOption, FurnitureItem, DesignProject, ReviewItem } from './types';

export const MATERIALS: MaterialOption[] = [
  // Structures & Woods
  {
    id: 'mat-walnut',
    name: 'Selected Black Walnut',
    type: 'structure',
    colorHex: '#3E2F26',
    description: 'Sustainably sourced North American Black Walnut, seasoned and finished with organic matte oils.',
    priceModifier: 25000,
  },
  {
    id: 'mat-oak',
    name: 'Natural White Oak',
    type: 'structure',
    colorHex: '#D1BC9D',
    description: 'Finest Grade-A European White Oak, brushed lightly to emphasize the raw grain texturing.',
    priceModifier: 15000,
  },
  {
    id: 'mat-ash-charcoal',
    name: 'Soot Charcoal Ash',
    type: 'structure',
    colorHex: '#1E1E1E',
    description: 'Deeply scorched ashwood with visible silvery grain accents, sealed with ultra-matte protective varnish.',
    priceModifier: 18000,
  },
  // Fabrics
  {
    id: 'fab-boucle-cream',
    name: 'Parisian Cream Bouclê',
    type: 'fabric',
    colorHex: '#F6F2EC',
    description: 'Heavy, luxurious tactile bouclê looped fabric woven from premium organic wool and premium cotton threads.',
    priceModifier: 35000,
  },
  {
    id: 'fab-linen-fog',
    name: 'Belgian Fog Linen',
    type: 'fabric',
    colorHex: '#D5D1CB',
    description: 'Stonewashed 100% Belgian flax linen with a perfectly relaxed elegance and breezy feel.',
    priceModifier: 20000,
  },
  {
    id: 'fab-tweed-charcoal',
    name: 'Textured Charcoal Tweed',
    type: 'fabric',
    colorHex: '#2C2B2A',
    description: 'Resilient and rich multi-tonal tweed weaving together graphite, onyx, and raw charcoal fibers.',
    priceModifier: 24000,
  },
  {
    id: 'fab-velvet-sage',
    name: 'Bespoke Muted Sage Velvet',
    type: 'fabric',
    colorHex: '#8C978B',
    description: 'Subtly distressed low-pile cotton velvet with a gorgeous mineral wash, extremely soft.',
    priceModifier: 28000,
  },
  // Metal Finishes / Accents
  {
    id: 'fin-brass',
    name: 'Brushed Satin Brass',
    type: 'finish',
    colorHex: '#C5A059',
    description: 'Artisanal hand-brushed brass detailing that radiates a soft, understated warm luster.',
    priceModifier: 10000,
  },
  {
    id: 'fin-pewter',
    name: 'Smoked Gunmetal Pewter',
    type: 'finish',
    colorHex: '#4E4E4E',
    description: 'Acid-etched brushed gunmetal with dark undertones, bringing structural sharpness.',
    priceModifier: 8000,
  }
];

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 'furn-modular-sofa',
    name: 'The Lumina Modular Sofa',
    category: 'sofas',
    image: '/src/assets/images/sanssa_sofa_1781154440015.png',
    tagline: 'Infinite configuration. Unrivaled lounging comfort.',
    description: 'Architectural lines meet absolute cushion plushness in the Lumina modular system. Engineered with variable-density memory foams and structured by a steel frame wrapped in solid ash wood. A pure centerpiece of modern living.',
    designer: 'Harneet Singh & SANSSA Studio',
    basePrice: 185000,
    dimensions: {
      width: '320 cm',
      depth: '105 cm',
      height: '68 cm',
    },
    features: [
      'Flexible modular layout (chaise, island, or deep corner presets)',
      'Subtle brushed metal legs with soft non-marring protective base',
      'Filled with certified hypoallergenic down feather blend toppers',
      'Removable cover system for dynamic dry cleaning options'
    ],
    materials: {
      structures: ['mat-walnut', 'mat-ash-charcoal'],
      fabrics: ['fab-boucle-cream', 'fab-linen-fog', 'fab-tweed-charcoal', 'fab-velvet-sage'],
      finishes: ['fin-brass', 'fin-pewter']
    }
  },
  {
    id: 'furn-dining-set',
    name: 'The Atelier Oak Dining Set',
    category: 'tables',
    image: '/src/assets/images/sanssa_dining_1781154452714.png',
    tagline: 'Organic contours. High craftsmanship gatherings.',
    description: 'Crafted entirely from select natural white oak, the Atelier table is a tribute to pure Scandinavian and Japanese interior minimalism. Featuring hand-turned soft cylindrical legs and a gently curved organic tabletop profile.',
    designer: 'Harneet Singh',
    basePrice: 145000,
    dimensions: {
      width: '240 cm',
      depth: '95 cm',
      height: '75 cm',
    },
    features: [
      'Comfortably seats 8-10 with perfect leg room clearance',
      'Zero-VOC natural hardwax oil treatment for warm raw look and water resistance',
      'Tension-relieving micro-undercut beveling underneath the slab',
      'Handmade matched wooden standard chairs in paper cord weave included'
    ],
    materials: {
      structures: ['mat-oak', 'mat-walnut'],
      fabrics: ['fab-linen-fog'],
      finishes: ['fin-pewter']
    }
  },
  {
    id: 'furn-walnut-lounge',
    name: 'The Silhouette Lounge Chair',
    category: 'seating',
    image: '/src/assets/images/sanssa_lounge_1781154465426.png',
    tagline: 'The ultimate reading corner solitude statement.',
    description: 'Our award-winning design contours of steam-molded premium wood with rich structural wool fabrics. The Silhouette acts as a stunning geometric sculpture while offering highly researched therapeutic lumbar positioning.',
    designer: 'SANSSA Craft Lab',
    basePrice: 72000,
    dimensions: {
      width: '78 cm',
      depth: '85 cm',
      height: '92 cm',
    },
    features: [
      '18-layer cross-laminated walnut veneer structure for elastic strength',
      'Deep responsive pocket seat suspension core',
      'Comes with standard matching premium minimalist throw pillow block',
      'Includes brass authenticity metal branding plate underside'
    ],
    materials: {
      structures: ['mat-walnut', 'mat-oak', 'mat-ash-charcoal'],
      fabrics: ['fab-boucle-cream', 'fab-tweed-charcoal', 'fab-velvet-sage'],
      finishes: ['fin-brass']
    }
  }
];

export const RESIDENTIAL_PROJECTS: DesignProject[] = [
  {
    id: 'proj-sector-82',
    title: 'The Sector 82 Residence',
    location: 'JLPL Industrial Area, Mohali',
    category: 'residential',
    description: 'An expansive modern residential concept celebrating pure shapes, raw concrete textures, beautiful plaster, and bespoke timber panels. Focused deeply on maximizing interior sunlight depth and beautiful storage integration.',
    heroImage: '/src/assets/images/sanssa_hero_1781154425296.png',
    additionalImages: [
      '/src/assets/images/sanssa_sofa_1781154440015.png',
      '/src/assets/images/sanssa_lounge_1781154465426.png'
    ],
    scope: ['Bespoke Foyer Architecture', 'Lumina Modular Sofa Integration', 'Concealed Walk-In Closets', 'Soft Plaster Wall Coating'],
    quote: {
      text: 'Working with Harneet from Sanssa Interiors has been an exceptional experience. His sense of design, understanding of space, and attention to detail truly set him apart in the Mohali, Chandigarh Tricity region.',
      client: 'Talosian Realm'
    }
  },
  {
    id: 'proj-chd-minimal-penthouse',
    title: 'Minimalist Penthouse Sec-9',
    location: 'Sector 9, Chandigarh',
    category: 'penthouse',
    description: 'A masterpiece in warm minimalism. Utilizing very decent and soft off-white colors, custom linear lighting strips, and open sightlines to achieve perfect space optimisation and a peaceful sanctuary feeling.',
    heroImage: '/src/assets/images/sanssa_dining_1781154452714.png',
    additionalImages: [
      '/src/assets/images/sanssa_hero_1781154425296.png'
    ],
    scope: ['Spacious Open Floor Kitchen', 'Japanese White Oak Dining Setup', 'Integrated Architectural Acoustics', 'Smart Soft Lighting Scenes'],
    quote: {
      text: 'They transformed my space exactly the way I imagined—actually, even better. The clear communication and high fidelity 3D presentations made everything so secure.',
      client: 'Divyansh Wadhwa'
    }
  },
  {
    id: 'proj-tricity-villa',
    title: 'The Tricity Modern Villa',
    location: 'Sahibzada Ajit Singh Nagar, Punjab',
    category: 'villa',
    description: 'A 4BHK architectural design featuring deep earthy materials, rich stone slabs, and double-height ceilings. Intended for absolute comfort, low-maintenance premium durability, and dynamic family activities.',
    heroImage: '/src/assets/images/sanssa_sofa_1781154440015.png',
    additionalImages: [
      '/src/assets/images/sanssa_dining_1781154452714.png',
      '/src/assets/images/sanssa_lounge_1781154465426.png'
    ],
    scope: ['High Ceilings Framing Accent', 'Durable Stone Kitchen Island', 'Four Bespoke Bedrooms Execution', 'Curated Art Placement Advice'],
    quote: {
      text: 'We recently got the interiors of our 4BHK home designed and executed by Sanssa Home, and the entire experience has been nothing short of excellent. Our designer, Harneet, deserves special mention.',
      client: 'Nik, 4BHK Homeowner'
    }
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Talosian Realm',
    role: 'Homeowner, Sector 82',
    rating: 5,
    timeAgo: '6 months ago',
    content: 'Working with Harneet from Sanssa Interiors has been an exceptional experience. His sense of design, understanding of space, and attention to detail truly set him apart in the Mohali/Tricity region.',
    tags: ['clear communication', 'space optimisation', 'home renovation']
  },
  {
    id: 'rev-2',
    author: 'Divyansh Wadhwa',
    role: 'Penthouse Owner, Sec-9 No.',
    rating: 5,
    timeAgo: '6 months ago',
    content: 'Transforming my home with Sanssa Home felt like watching a dream come to life! Their team has an incredible eye for details, textures, and premium material selection.',
    tags: ['material selection', 'home renovation']
  },
  {
    id: 'rev-3',
    author: 'Nik (4BHK Owner)',
    role: 'Luxury Villa, Mohali',
    rating: 5,
    timeAgo: '6 months ago',
    content: 'We recently got the interiors of our 4BHK home designed and executed by Sanssa Home, and the entire experience has been nothing short of excellent. Our interior designer, Harneet, deserves special mention for the way she handled everything with absolute patience and premium precision.',
    tags: ['space optimisation', 'clear communication', 'home renovation']
  },
  {
    id: 'rev-4',
    author: 'Raman Sharma',
    role: 'Bespoke Lounge Client',
    rating: 5,
    timeAgo: '2 months ago',
    content: 'Hands down the best luxury designer in Chandigarh and Mohali. They catch the ideas and needs of the customer, select extremely high durability wood/lacquer finishes, and execute absolutely flawless woodwork.',
    tags: ['material selection', 'clear communication']
  },
  {
    id: 'rev-5',
    author: 'Parul Chawla',
    role: 'Duplex Villa, Chandigarh',
    rating: 5,
    timeAgo: '1 year ago',
    content: 'What sets Sanssa Home apart is their material selection. They do not compromise. The final furniture polish, timber quality, and boucle linen texture are premium and look immaculate.',
    tags: ['material selection', 'space optimisation']
  }
];
