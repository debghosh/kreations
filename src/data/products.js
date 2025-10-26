// Sample product data - Replace with your actual products
export const SAMPLE_ITEMS = {
  wax: [
    {
      id: 'w1',
      title: 'Amber Sunset Pillar Candle',
      category: 'wax',
      subcategory: 'candles',
      price: 45,
      description: 'Hand-poured soy wax candle with natural amber essence. Each piece features unique swirls reminiscent of a golden sunset, creating warm ambient lighting that transforms any space.',
      longDescription: 'Crafted with premium sustainable soy wax and infused with pure essential oils, this pillar candle burns for over 60 hours. The amber coloring comes from natural mineral pigments, ensuring an eco-friendly product that enriches your home with both light and fragrance.',
      dimensions: '4" diameter × 6" height',
      weight: '1.2 lbs',
      materials: 'Soy wax, cotton wick, essential oils',
      burnTime: '60+ hours',
      image: 'https://images.unsplash.com/photo-1602874801006-90c27c6e0ca5?w=800',
      tags: ['sustainable', 'handmade', 'aromatherapy'],
      featured: true,
      inStock: true,
      popularity: 95
    },
    {
      id: 'w2',
      title: 'Honeycomb Beeswax Taper Set',
      category: 'wax',
      subcategory: 'candles',
      price: 32,
      description: 'Pure beeswax tapers with natural honeycomb texture. Burns clean with a subtle honey aroma, perfect for elegant dining or meditation spaces.',
      longDescription: 'These tapers are rolled from 100% pure beeswax sheets harvested from local apiaries. The natural hexagonal pattern and golden hue celebrate the artistry of nature itself. Beeswax naturally purifies the air as it burns.',
      dimensions: '0.75" diameter × 10" height (pair)',
      weight: '8 oz',
      materials: '100% pure beeswax, cotton wick',
      burnTime: '8 hours per taper',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800',
      tags: ['natural', 'beeswax', 'elegant'],
      featured: true,
      inStock: true,
      popularity: 88
    },
    {
      id: 'w3',
      title: 'Geometric Wax Coaster Set',
      category: 'wax',
      subcategory: 'coasters',
      price: 28,
      description: 'Modern hexagonal coasters with embedded botanicals. Each coaster is a unique piece of functional art featuring pressed flowers and leaves.',
      longDescription: 'These statement coasters blend form and function beautifully. Made from durable wax composite with real pressed botanicals, they protect surfaces while adding natural elegance to your coffee table or workspace.',
      dimensions: '4" hexagon × 0.5" thick (set of 4)',
      weight: '12 oz',
      materials: 'Wax composite, pressed botanicals, cork backing',
      image: 'https://images.unsplash.com/photo-1565123409695-7b5ef23ec3b5?w=800',
      tags: ['modern', 'botanical', 'functional'],
      featured: false,
      inStock: true,
      popularity: 76
    },
    {
      id: 'w4',
      title: 'Lavender Dreams Votive Collection',
      category: 'wax',
      subcategory: 'candles',
      price: 38,
      description: 'Set of six hand-poured lavender votives in frosted glass holders. Perfect for creating a calming atmosphere with gentle fragrance.',
      longDescription: 'Each votive in this collection features layers of purple hues, from deep violet to soft lilac. Infused with pure lavender essential oil from Provence, these candles promote relaxation and peaceful sleep.',
      dimensions: '2" diameter × 2.5" height each',
      weight: '1.5 lbs total',
      materials: 'Coconut-soy blend, lavender essential oil, frosted glass',
      burnTime: '15 hours per votive',
      image: 'https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=800',
      tags: ['aromatherapy', 'relaxation', 'gift-set'],
      featured: false,
      inStock: true,
      popularity: 82
    },
    {
      id: 'w5',
      title: 'Sculptural Sphere Candle',
      category: 'wax',
      subcategory: 'candles',
      price: 52,
      description: 'Award-winning spherical candle with intricate surface patterns. A true statement piece that doubles as modern sculpture.',
      longDescription: 'This museum-quality piece took months to perfect. Cast in a custom silicone mold, each sphere features complex geometric patterns inspired by sacred geometry. The candle burns from the inside out, creating a mesmerizing glow effect.',
      dimensions: '5" diameter',
      weight: '1.8 lbs',
      materials: 'Premium paraffin-soy blend, internal wick system',
      burnTime: '40 hours',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      tags: ['sculpture', 'luxury', 'statement-piece'],
      featured: true,
      inStock: false,
      popularity: 92
    },
    {
      id: 'w6',
      title: 'Ocean Wave Wax Tray',
      category: 'wax',
      subcategory: 'trays',
      price: 42,
      description: 'Flowing resin-wax hybrid tray with turquoise and white swirls. Perfect for jewelry, keys, or as decorative centerpiece.',
      longDescription: 'This tray captures the essence of ocean waves with its dynamic color blend. The combination of resin and wax creates a unique texture that is both durable and beautiful. Each piece has slightly different wave patterns.',
      dimensions: '8" × 6" × 1" deep',
      weight: '14 oz',
      materials: 'Resin-wax composite, mica pigments, gold leaf accents',
      image: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=800',
      tags: ['functional-art', 'ocean', 'organizer'],
      featured: false,
      inStock: true,
      popularity: 79
    }
  ],
  resin: [
    {
      id: 'r1',
      title: 'Galaxy Resin Catchall Tray',
      category: 'resin',
      subcategory: 'trays',
      price: 55,
      description: 'Deep space-inspired resin tray with swirling nebula colors and holographic glitter accents. A cosmic masterpiece for your entryway.',
      longDescription: 'This tray brings the universe to your home. Created using multiple pours of pigmented resin with carefully placed metallic and holographic elements, each tray is truly one-of-a-kind. The depth and dimension achieved make it look like you are gazing into deep space.',
      dimensions: '10" × 8" × 1.5" deep',
      weight: '1.3 lbs',
      materials: 'Premium epoxy resin, mica pigments, holographic glitter, gold leaf',
      image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800',
      tags: ['galaxy', 'cosmic', 'statement'],
      featured: true,
      inStock: true,
      popularity: 94
    },
    {
      id: 'r2',
      title: 'Pressed Flower Resin Coasters',
      category: 'resin',
      subcategory: 'coasters',
      price: 36,
      description: 'Set of four circular coasters with real pressed flowers suspended in crystal-clear resin. Nature preserved forever.',
      longDescription: 'Each coaster in this set features different wildflowers carefully pressed and arranged before being encased in archival-quality resin. The flowers maintain their color and beauty indefinitely, creating functional art that celebrates nature.',
      dimensions: '4" diameter × 0.5" thick (set of 4)',
      weight: '10 oz',
      materials: 'Epoxy resin, pressed wildflowers, cork backing',
      image: 'https://images.unsplash.com/photo-1621784564315-d2a91e3bb134?w=800',
      tags: ['botanical', 'nature', 'preserved'],
      featured: true,
      inStock: true,
      popularity: 89
    },
    {
      id: 'r3',
      title: 'Agate Slice Resin Serving Board',
      category: 'resin',
      subcategory: 'boards',
      price: 85,
      description: 'Luxury serving board featuring real agate slice edge with food-safe resin surface. Perfect for charcuterie and entertaining.',
      longDescription: 'This extraordinary piece combines natural agate crystal with functional design. The agate edge is carefully selected for its vibrant colors and patterns, then incorporated into a smooth resin surface that is both beautiful and practical for food service.',
      dimensions: '16" × 10" × 0.75" thick',
      weight: '2.5 lbs',
      materials: 'Food-safe epoxy resin, natural agate, cork feet',
      image: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=800',
      tags: ['luxury', 'functional', 'entertaining'],
      featured: true,
      inStock: true,
      popularity: 91
    },
    {
      id: 'r4',
      title: 'Abstract Art Resin Wall Panel',
      category: 'resin',
      subcategory: 'art',
      price: 125,
      description: 'Large format abstract resin art panel with flowing alcohol ink patterns. Ready to hang statement piece.',
      longDescription: 'This wall art piece pushes the boundaries of resin art. Multiple layers of alcohol inks create organic flowing patterns that seem to move before your eyes. The high-gloss finish and dimensional quality make it a true focal point.',
      dimensions: '24" × 18" × 2" deep',
      weight: '4 lbs',
      materials: 'Epoxy resin, alcohol inks, wood backing, hanging hardware',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      tags: ['abstract', 'wall-art', 'statement'],
      featured: false,
      inStock: true,
      popularity: 86
    },
    {
      id: 'r5',
      title: 'Ocean Waves Resin Cheese Board',
      category: 'resin',
      subcategory: 'boards',
      price: 68,
      description: 'Beach-inspired cheese board with layered blue and white resin waves. Includes walnut wood handle.',
      longDescription: 'Bring the serenity of the ocean to your table. This cheese board features realistic wave patterns created through meticulous layering technique. The walnut handle provides beautiful contrast and practical functionality.',
      dimensions: '14" × 8" × 0.75" thick',
      weight: '1.8 lbs',
      materials: 'Food-safe resin, walnut wood, mineral oil finish',
      image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800',
      tags: ['ocean', 'functional', 'entertaining'],
      featured: false,
      inStock: true,
      popularity: 83
    },
    {
      id: 'r6',
      title: 'Geode Resin Jewelry Tray',
      category: 'resin',
      subcategory: 'trays',
      price: 48,
      description: 'Sparkling geode-style tray with crushed glass and metallic pigments. Perfect for displaying jewelry and treasures.',
      longDescription: 'Inspired by natural geode formations, this tray features layers of crushed glass and mica that create incredible depth and sparkle. The metallic gold rim adds luxurious detail.',
      dimensions: '7" × 5" × 1" deep',
      weight: '12 oz',
      materials: 'Epoxy resin, crushed glass, mica pigments, metallic leaf',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
      tags: ['geode', 'sparkle', 'jewelry'],
      featured: false,
      inStock: true,
      popularity: 77
    }
  ]
};

export const getAllItems = () => {
  return [...SAMPLE_ITEMS.wax, ...SAMPLE_ITEMS.resin];
};

export const getItemById = (id) => {
  return getAllItems().find(item => item.id === id);
};

export const getItemsByCategory = (category) => {
  if (category === 'all') return getAllItems();
  return SAMPLE_ITEMS[category] || [];
};

export const getFeaturedItems = () => {
  return getAllItems().filter(item => item.featured);
};
