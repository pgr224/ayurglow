// ─── AyurGlow Category & Filter Taxonomy ────────────────────────────
// Inspired by Foxtale collection-tabs (product type) and
// Dr. Sheth's hdt-filters (skin type / concern / ingredient),
// adapted to an Ayurvedic brand identity.

export interface FilterOption {
  id: string
  label: string
  icon?: string        // emoji or lucide icon name
  color?: string       // tailwind bg class
  textColor?: string   // tailwind text class
}

// ── Product Type (top tab bar – Foxtale style) ──────────────────────
export const PRODUCT_TYPES: FilterOption[] = [
  { id: 'all',         label: 'All Products',  icon: '🌿' },
  { id: 'cleanser',    label: 'Cleansers',     icon: '🧴', color: 'bg-purple-50',  textColor: 'text-purple-700' },
  { id: 'serum',       label: 'Serums & Oils', icon: '💧', color: 'bg-amber-50',   textColor: 'text-amber-700' },
  { id: 'moisturizer', label: 'Moisturizers',  icon: '🧊', color: 'bg-blue-50',    textColor: 'text-blue-700' },
  { id: 'sunscreen',   label: 'Sunscreen',     icon: '☀️', color: 'bg-yellow-50',  textColor: 'text-yellow-700' },
  { id: 'mask',        label: 'Face Masks',    icon: '🎭', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { id: 'toner',       label: 'Toners',        icon: '🌹', color: 'bg-pink-50',    textColor: 'text-pink-700' },
  { id: 'treatment',   label: 'Treatments',    icon: '✨', color: 'bg-teal-50',    textColor: 'text-teal-700' },
  { id: 'haircare',    label: 'Hair Care',     icon: '💆', color: 'bg-orange-50',  textColor: 'text-orange-700' },
  { id: 'bodycare',    label: 'Body Care',     icon: '🧖', color: 'bg-rose-50',    textColor: 'text-rose-700' },
  { id: 'lipcare',     label: 'Lip Care',      icon: '💋', color: 'bg-red-50',     textColor: 'text-red-700' },
]

// ── Skin Type (Dosha-mapped – Dr. Sheth's style) ────────────────────
export const SKIN_TYPES: FilterOption[] = [
  { id: 'dry',         label: 'Dry (Vata)',        icon: '🍂', color: 'bg-orange-50',  textColor: 'text-orange-700' },
  { id: 'oily',        label: 'Oily (Kapha)',      icon: '💧', color: 'bg-green-50',   textColor: 'text-green-700' },
  { id: 'sensitive',   label: 'Sensitive (Pitta)',  icon: '🌸', color: 'bg-pink-50',    textColor: 'text-pink-700' },
  { id: 'normal',      label: 'Normal',            icon: '✅', color: 'bg-blue-50',    textColor: 'text-blue-700' },
  { id: 'combination', label: 'Combination',       icon: '🔄', color: 'bg-purple-50',  textColor: 'text-purple-700' },
]

// ── Concern (Ayurvedic + Modern) ────────────────────────────────────
export const CONCERNS: FilterOption[] = [
  { id: 'acne',          label: 'Acne & Pimples',   icon: '🌿', color: 'bg-green-50',   textColor: 'text-green-700' },
  { id: 'pigmentation',  label: 'Pigmentation',     icon: '☀️', color: 'bg-yellow-50',  textColor: 'text-yellow-700' },
  { id: 'ageing',        label: 'Anti-Ageing',      icon: '✨', color: 'bg-purple-50',  textColor: 'text-purple-700' },
  { id: 'dullness',      label: 'Dullness',         icon: '💫', color: 'bg-amber-50',   textColor: 'text-amber-700' },
  { id: 'dryness',       label: 'Dryness',          icon: '🏜️', color: 'bg-orange-50',  textColor: 'text-orange-700' },
  { id: 'darkspots',     label: 'Dark Spots',       icon: '🔵', color: 'bg-slate-50',   textColor: 'text-slate-700' },
  { id: 'hairfall',      label: 'Hair Fall',        icon: '💇', color: 'bg-red-50',     textColor: 'text-red-700' },
  { id: 'blackheads',    label: 'Blackheads',       icon: '⚫', color: 'bg-gray-50',    textColor: 'text-gray-700' },
  { id: 'tan',           label: 'Tan Removal',      icon: '🌅', color: 'bg-rose-50',    textColor: 'text-rose-700' },
  { id: 'darkcircles',   label: 'Dark Circles',     icon: '👁️', color: 'bg-indigo-50',  textColor: 'text-indigo-700' },
  { id: 'dandruff',      label: 'Dandruff',         icon: '❄️', color: 'bg-sky-50',     textColor: 'text-sky-700' },
]

// ── Key Ingredients (Ayurvedic Hero Ingredients) ────────────────────
export const INGREDIENTS: FilterOption[] = [
  { id: 'turmeric',      label: 'Turmeric (Haldi)',     icon: '🟡', color: 'bg-yellow-50',  textColor: 'text-yellow-700' },
  { id: 'neem',          label: 'Neem',                 icon: '🌿', color: 'bg-green-50',   textColor: 'text-green-700' },
  { id: 'tulsi',         label: 'Tulsi (Holy Basil)',   icon: '🍃', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { id: 'aloevera',      label: 'Aloe Vera',            icon: '🌱', color: 'bg-lime-50',    textColor: 'text-lime-700' },
  { id: 'saffron',       label: 'Saffron (Kesar)',      icon: '🌼', color: 'bg-orange-50',  textColor: 'text-orange-700' },
  { id: 'sandalwood',    label: 'Sandalwood (Chandan)', icon: '🪵', color: 'bg-amber-50',   textColor: 'text-amber-700' },
  { id: 'ashwagandha',   label: 'Ashwagandha',          icon: '💪', color: 'bg-red-50',     textColor: 'text-red-700' },
  { id: 'bhringraj',     label: 'Bhringraj',            icon: '🌿', color: 'bg-teal-50',    textColor: 'text-teal-700' },
  { id: 'amla',          label: 'Amla (Gooseberry)',    icon: '🫒', color: 'bg-green-50',   textColor: 'text-green-700' },
  { id: 'teatree',       label: 'Tea Tree',             icon: '🌲', color: 'bg-cyan-50',    textColor: 'text-cyan-700' },
  { id: 'vitaminc',      label: 'Vitamin C',            icon: '🍊', color: 'bg-orange-50',  textColor: 'text-orange-700' },
  { id: 'rosewater',     label: 'Rose Water (Gulab)',   icon: '🌹', color: 'bg-pink-50',    textColor: 'text-pink-700' },
]
