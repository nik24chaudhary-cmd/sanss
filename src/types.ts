/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaterialOption {
  id: string;
  name: string;
  type: 'structure' | 'fabric' | 'finish';
  colorHex?: string;
  imageFallback?: string;
  description: string;
  priceModifier: number;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'sofas' | 'seating' | 'tables' | 'lighting';
  image: string;
  tagline: string;
  description: string;
  designer: string;
  basePrice: number;
  dimensions: {
    width: string;
    depth: string;
    height: string;
  };
  features: string[];
  materials: {
    structures: string[]; // references MaterialOption ids
    fabrics: string[];    // references MaterialOption ids
    finishes?: string[];  // references MaterialOption ids
  };
}

export interface DesignProject {
  id: string;
  title: string;
  location: string;
  category: 'residential' | 'penthouse' | 'villa' | 'commercial';
  description: string;
  heroImage: string;
  additionalImages: string[];
  scope: string[];
  quote: {
    text: string;
    client: string;
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  timeAgo: string;
  content: string;
  tags: string[];
}
