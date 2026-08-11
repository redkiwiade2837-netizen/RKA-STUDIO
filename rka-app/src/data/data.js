// ─── Projects / Furniture / Items ─────────────────────────────────────────
// Photos are picked up automatically from the sibling Projects/Furniture/
// Items folders (see media.js) — rename a product folder there to change
// its number/title on the site, or drop a photo into its Left/Right folder.
// Everything else (price, description, material...) stays here, keyed by
// the product's number. If you renumber a folder, move its entry below to
// match, or a newly-numbered product will just show without this info.
import { projectsMedia, furnitureMedia, itemsMedia } from './media';

const projectsMeta = {
  417: { location: 'Malmö', year: '2024', type: 'Housing', status: 'Production' },
  412: { location: 'Copenhagen', year: '2024', type: 'Public', status: 'Production' },
  398: { location: 'Oslo', year: '2023', type: 'Cultural', status: 'Prototype' },
  385: { location: 'Bergen', year: '2023', type: 'Public', status: 'Concept' },
  371: { location: 'Stockholm', year: '2022', type: 'Research', status: 'Production' },
};

export const projects = projectsMedia.map(({ number, title, img, imgHover, photos, drawings }) => ({
  id: `p${number}`,
  number,
  title,
  img,
  imgHover,
  photos,
  drawings,
  ...projectsMeta[number],
}));

const furnitureMeta = {
  1: {
    location: 'Zurich', year: '2024', type: 'Seating', status: 'Production', price: 1200,
    description: 'A rigorous study in structural honesty. Formed from raw concrete and bent steel rod, this chair refuses ornament, exposing its construction logic entirely.',
    dimensions: '65 × 58 × 82 cm', material: 'Cast Concrete, Steel Rod', ref: '001-BC',
  },
  2: {
    location: 'Milan', year: '2024', type: 'Tables', status: 'Production', price: 3400,
    description: 'Monolithic stone slab on steel I-beam legs. The material weight is the design.',
    dimensions: '200 × 90 × 75 cm', material: 'Belgian Blue Stone, Structural Steel', ref: '002-ST',
  },
  3: {
    location: 'Berlin', year: '2023', type: 'Storage', status: 'Prototype', price: 890,
    description: 'Modular powder-coated steel shelving. Grid-based composition, no concealment.',
    dimensions: '120 × 30 × 180 cm', material: 'Powder-Coated Steel', ref: '003-SU',
  },
  4: {
    location: 'Tokyo', year: '2023', type: 'Lighting', status: 'Production', price: 540,
    description: 'Exposed Edison bulb in a raw aluminum shade. Direct, utilitarian, elegant.',
    dimensions: 'Ø28 × H40 cm', material: 'Raw Aluminum, Braided Cable', ref: '004-PL',
  },
};

export const furniture = furnitureMedia.map(({ number, title, img, imgHover }) => ({
  id: `f${number}`,
  number,
  title,
  img,
  imgHover,
  ...furnitureMeta[Number(number)],
}));

// ─── Items (Stationery / Desk Objects) ─────────────────────────────────────
const itemsMeta = {
  1: {
    location: 'Zurich', type: 'Stationery', status: 'Available', price: 38, ref: '001-PP',
    description: 'A minimalist aluminum mechanical pencil engineered to precision tolerances.',
    details: [{ label: 'Material', value: 'Brushed Aluminum' }, { label: 'Lead', value: '0.5mm HB' }, { label: 'Length', value: '145mm' }],
  },
  2: {
    location: 'Milan', type: 'Desk Objects', status: 'Available', price: 22, ref: '002-SP',
    description: 'Heavy-gauge steel paperclips. Industrial scale, precise geometry.',
    details: [{ label: 'Material', value: 'Heavy-Gauge Steel' }, { label: 'Size', value: '75mm' }, { label: 'Pack', value: '12 pcs' }],
  },
  3: {
    location: 'Berlin', type: 'Desk Objects', status: 'Available', price: 120, ref: '003-CDT',
    description: 'Brutalist concrete desk tray. Geometric, heavy, precise.',
    details: [{ label: 'Material', value: 'Cast Concrete' }, { label: 'Dimensions', value: '240 × 120 × 35mm' }, { label: 'Weight', value: '1.2kg' }],
  },
  4: {
    location: 'Tokyo', type: 'Stationery', status: 'Available', price: 14, ref: '004-GS',
    description: 'Raw unrefined graphite stick for architectural drawing.',
    details: [{ label: 'Grade', value: '6B' }, { label: 'Length', value: '80mm' }, { label: 'Diameter', value: '10mm' }],
  },
  5: {
    location: 'Oslo', type: 'Tools', status: 'Available', price: 85, ref: '005-BR',
    description: 'Solid brass architect scale ruler with etched millimeter markings.',
    details: [{ label: 'Material', value: 'Solid Brass' }, { label: 'Length', value: '300mm' }, { label: 'Scales', value: '1:20, 1:50, 1:100' }],
  },
};

export const items = itemsMedia.map(({ number, title, img, imgHover }) => ({
  id: `i${number}`,
  number,
  title,
  img,
  imgHover,
  ...itemsMeta[Number(number)],
}));

// ─── Gallery (for Gallery Detail page) ───────────────────────────────────────
export const galleryImages = [
  {
    id: 'g1',
    src: 'https://lh3.googleusercontent.com/aida/AP1WRLsaBABTcNn-0SfBfbLSbSdlAu8phK8N_QFWVkI2vGpqh3esqqOpsAQK-z8GgizIoXlY7Y60elpWRejKkhKkh0WCMgDFxgbLveNDjxjhOLRp9IbWDN9ral5Hm7qmbSjvUp0dM1L1CCh8pzklpRQau-uT-aOntSoykUeL377okgcQ5qkcVw7UrTilx1PSn9irZbCQR8g7p9H90pSEoQl8P9AVFgFCen_zaUnaOvZJ_FMHQAzctrYPMq0H6eE',
    caption: 'Architectural Bookshelf Study',
  },
  {
    id: 'g2',
    src: 'https://lh3.googleusercontent.com/aida/AP1WRLvpDM9a7lmO80ehdpXxTjw4t1PFwhJVSz4d3OBPDZduceHuwcj_G3O_llmz03-eMWEMvPS7J-JKPH_wP2Y55IJTJHnUkO-0FpI0_GH8e-NQ4bvI2IXGniFpaVzM-TX99tkfPCEpIaXAHsBujpx7RtE-dUbS4wCtUYDUbprKOO6JHqfU2_78HUMvRua9g1cSb2U58NIYM2YyYublIFnO7k0YFUpJGebj80Ky1W35qBsx0BKkAJKIBf7CrDs',
    caption: 'Landing Page Visual',
  },
  {
    id: 'g3',
    src: 'https://lh3.googleusercontent.com/aida/AP1WRLvNZmFJsqMHWzWLS6_hlUKJfhADeyWb_T0YYNO7yyU59q_GVy4bNAyZzHUOlfwqaHARMGS0nBlwav7PWyFeVBRG_cRtkYZLH9t9GMj42jqdywlaeff0V2LrN6dMxCLJlAzpz3nOAVANWD4vMPZjYOMJttYI2zE_x39qgtyqjVdbHa0HmuDbyMEMtcWf6be_XGE-Tb079LrzfASeVtAPi3_sd5sEuf-MqNZh6Z22STKKJBUD0AHggSrvu94',
    caption: 'Items Collection Overview',
  },
];

// ─── About ────────────────────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    'We will not stop designing until the world arrives where everyone can enjoy and savor art with ease.',
  ],
  team: 'HongMoon Jeong, Gyunho Yang, Heeyun Jung',
  contact: { email: 'RedKiwiAde2837@gmail.com', phone: '+82 010 5436 2837' },
  address: ['18, Yeongdeungpo-ro 11-gil', 'Yeongdeungpo-gu, Seoul', 'South Korea'],
  instagram: '@rka_studio',
  instagramUrl: 'https://www.instagram.com/rka_studio/',
};
