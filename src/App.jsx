import React, { useState, useEffect, createContext, useContext } from 'react';
import { Camera, Heart, User, LogIn, LogOut, Menu, X, Search, ShoppingBag, Star, TrendingUp, Grid, List, ChevronRight, Home, Package, Settings, BarChart3, Users, Plus, Edit, Trash2, Eye, Filter, SortAsc } from 'lucide-react';

// Authentication & User Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [collections, setCollections] = useState([]);

  const login = (email, password, role = 'subscriber') => {
    const userData = { 
      id: Date.now(), 
      email, 
      role,
      name: email.split('@')[0],
      joinedDate: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setCollections([]);
    localStorage.removeItem('user');
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCollection = (collectionName, itemId) => {
    setCollections(prev => {
      const collection = prev.find(c => c.name === collectionName);
      if (collection) {
        return prev.map(c => 
          c.name === collectionName 
            ? { ...c, items: [...new Set([...c.items, itemId])] }
            : c
        );
      }
      return [...prev, { name: collectionName, items: [itemId], createdAt: new Date() }];
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      favorites, 
      toggleFavorite, 
      collections, 
      addToCollection 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Sample Data - Enhanced Collections
const SAMPLE_ITEMS = {
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

// Main App Component
const ArtisanCraftWebsite = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const { user, logout } = useAuth();

  const allItems = [...SAMPLE_ITEMS.wax, ...SAMPLE_ITEMS.resin];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedItem]);

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navigation 
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        logout={logout}
      />

      <main className="relative">
        {currentView === 'home' && (
          <HomePage 
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        
        {currentView === 'portfolio' && (
          <PortfolioView 
            items={filteredItems}
            setSelectedItem={setSelectedItem}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {currentView === 'item-detail' && selectedItem && (
          <ItemDetailView 
            item={selectedItem}
            setCurrentView={setCurrentView}
            allItems={allItems}
            setSelectedItem={setSelectedItem}
          />
        )}

        {currentView === 'profile' && user && (
          <ProfileView user={user} />
        )}

        {currentView === 'admin' && user?.role === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
};

// Navigation Component
const Navigation = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen, user, logout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan Crafts
              </h1>
              <p className="text-xs text-gray-600">Handcrafted Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink onClick={() => setCurrentView('home')} active={currentView === 'home'}>
              <Home className="w-4 h-4" />
              Home
            </NavLink>
            <NavLink onClick={() => setCurrentView('portfolio')} active={currentView === 'portfolio'}>
              <Grid className="w-4 h-4" />
              Portfolio
            </NavLink>
            
            {user ? (
              <>
                <NavLink onClick={() => setCurrentView('profile')} active={currentView === 'profile'}>
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
                {user.role === 'admin' && (
                  <NavLink onClick={() => setCurrentView('admin')} active={currentView === 'admin'}>
                    <Settings className="w-4 h-4" />
                    Admin
                  </NavLink>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <LoginModal />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <MobileNavLink onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>
              <Home className="w-5 h-5" />
              Home
            </MobileNavLink>
            <MobileNavLink onClick={() => { setCurrentView('portfolio'); setMobileMenuOpen(false); }}>
              <Grid className="w-5 h-5" />
              Portfolio
            </MobileNavLink>
            {user ? (
              <>
                <MobileNavLink onClick={() => { setCurrentView('profile'); setMobileMenuOpen(false); }}>
                  <User className="w-5 h-5" />
                  Profile
                </MobileNavLink>
                {user.role === 'admin' && (
                  <MobileNavLink onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}>
                    <Settings className="w-5 h-5" />
                    Admin
                  </MobileNavLink>
                )}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <LoginModal mobile onClose={() => setMobileMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
      active 
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
  >
    {children}
  </button>
);

// Login Modal Component
const LoginModal = ({ mobile, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('subscriber');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (mobile) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all font-medium"
      >
        <LogIn className="w-5 h-5" />
        <span>Login / Sign Up</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all font-medium"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSignup ? 'Join our community of art lovers' : 'Login to access exclusive features'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="subscriber">Subscriber</option>
                    <option value="admin">Admin (Demo)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {isSignup ? 'Create Account' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Home Page Component
const HomePage = ({ setCurrentView, setSelectedCategory }) => {
  const featuredItems = [...SAMPLE_ITEMS.wax, ...SAMPLE_ITEMS.resin].filter(item => item.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent animate-fade-in leading-tight">
            Handcrafted
            <br />
            With Soul
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover unique wax and resin artworks that transform spaces into sanctuaries of beauty and warmth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('portfolio')}
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Collections</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentView('portfolio')}
              className="px-8 py-4 bg-white text-amber-600 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all border-2 border-amber-500"
            >
              View Portfolio
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Featured Masterpieces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each piece is meticulously handcrafted with passion and precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <FeaturedCard 
                key={item.id} 
                item={item} 
                index={index}
                onClick={() => {
                  setCurrentView('item-detail');
                  window.selectedItem = item;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Collections
            </h2>
            <p className="text-xl text-gray-600">
              Explore our diverse range of handcrafted artworks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <CollectionCard
              title="Wax Creations"
              description="Candles, coasters, and decorative pieces crafted from premium wax"
              count={SAMPLE_ITEMS.wax.length}
              image="https://images.unsplash.com/photo-1602874801006-90c27c6e0ca5?w=800"
              onClick={() => {
                setSelectedCategory('wax');
                setCurrentView('portfolio');
              }}
            />
            <CollectionCard
              title="Resin Artworks"
              description="Stunning resin pieces featuring nature, cosmos, and abstract designs"
              count={SAMPLE_ITEMS.resin.length}
              image="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800"
              onClick={() => {
                setSelectedCategory('resin');
                setCurrentView('portfolio');
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Star className="w-8 h-8" />} number="500+" label="Artworks Created" />
            <StatCard icon={<Users className="w-8 h-8" />} number="1,000+" label="Happy Clients" />
            <StatCard icon={<TrendingUp className="w-8 h-8" />} number="95%" label="Satisfaction Rate" />
            <StatCard icon={<ShoppingBag className="w-8 h-8" />} number="50+" label="New Items Monthly" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeaturedCard = ({ item, index, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="relative h-80 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm line-clamp-2">{item.description}</p>
        </div>
      </div>
      {!item.inStock && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Sold Out
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors">
        {item.title}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-amber-600">${item.price}</span>
        <div className="flex gap-2">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CollectionCard = ({ title, description, count, image, onClick }) => (
  <div
    onClick={onClick}
    className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/90 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-amber-300 font-semibold">{count} Items</span>
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, number, label }) => (
  <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full text-white mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

// Portfolio View Component
const PortfolioView = ({ 
  items, 
  setSelectedItem, 
  setCurrentView,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600">Explore our complete collection of handcrafted artworks</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="all">All Collections</option>
                <option value="wax">Wax Creations</option>
                <option value="resin">Resin Artworks</option>
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold">{items.length}</span> artworks
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid/List */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <PortfolioCard
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentView('item-detail');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <PortfolioListItem
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentView('item-detail');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PortfolioCard = ({ item, onClick }) => {
  const { user, favorites, toggleFavorite } = useAuth();

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden" onClick={onClick}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!item.inStock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Sold Out
          </div>
        )}
        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.includes(item.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`}
            />
          </button>
        )}
      </div>
      <div className="p-6" onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors flex-1">
            {item.title}
          </h3>
          <span className="text-2xl font-bold text-amber-600 ml-4">${item.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const PortfolioListItem = ({ item, onClick }) => {
  const { user, favorites, toggleFavorite } = useAuth();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!item.inStock && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Sold Out
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-amber-600">${item.price}</span>
              {user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(item.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{item.category === 'wax' ? '🕯️ Wax' : '💎 Resin'}</span>
            <span>•</span>
            <span>{item.dimensions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Item Detail View Component
const ItemDetailView = ({ item, setCurrentView, allItems, setSelectedItem }) => {
  const { user, favorites, toggleFavorite, collections, addToCollection } = useAuth();
  const [selectedImage, setSelectedImage] = useState(item.image);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const relatedItems = allItems
    .filter(i => i.id !== item.id && (i.category === item.category || i.tags.some(tag => item.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={() => setCurrentView('home')} className="hover:text-amber-600">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => setCurrentView('portfolio')} className="hover:text-amber-600">Portfolio</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-amber-600 font-medium">{item.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {!item.inStock && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                  Sold Out
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                {user && (
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-7 h-7 ${
                        favorites.includes(item.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-amber-600">${item.price}</span>
                <span className="text-gray-500">USD</span>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">{item.longDescription}</p>
            </div>

            {/* Specifications */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Specifications</h3>
              <div className="space-y-3">
                <SpecRow label="Dimensions" value={item.dimensions} />
                <SpecRow label="Weight" value={item.weight} />
                <SpecRow label="Materials" value={item.materials} />
                {item.burnTime && <SpecRow label="Burn Time" value={item.burnTime} />}
                <SpecRow label="Category" value={item.category === 'wax' ? 'Wax Creations' : 'Resin Artworks'} />
                <SpecRow label="Availability" value={item.inStock ? '✅ In Stock' : '❌ Sold Out'} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {user && (
                <button
                  onClick={() => setShowCollectionModal(true)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Collection
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedItems.map(relatedItem => (
                <div
                  key={relatedItem.id}
                  onClick={() => {
                    setSelectedItem(relatedItem);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                    <img
                      src={relatedItem.image}
                      alt={relatedItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                    {relatedItem.title}
                  </h3>
                  <span className="text-xl font-bold text-amber-600">${relatedItem.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold mb-6">Add to Collection</h3>
            
            <div className="space-y-3 mb-6">
              {collections.map(collection => (
                <button
                  key={collection.name}
                  onClick={() => {
                    addToCollection(collection.name, item.id);
                    setShowCollectionModal(false);
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all text-left"
                >
                  <div className="font-semibold">{collection.name}</div>
                  <div className="text-sm text-gray-600">{collection.items.length} items</div>
                </button>
              ))}
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Create New Collection</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Collection name..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={() => {
                    if (newCollectionName.trim()) {
                      addToCollection(newCollectionName, item.id);
                      setNewCollectionName('');
                      setShowCollectionModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowCollectionModal(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

// Profile View Component
const ProfileView = ({ user }) => {
  const { favorites, collections } = useAuth();
  const allItems = [...SAMPLE_ITEMS.wax, ...SAMPLE_ITEMS.resin];
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-amber-100 text-lg">{user.email}</p>
              <p className="text-amber-200 text-sm mt-2">
                {user.role === 'admin' ? '👑 Administrator' : '⭐ Subscriber'}
              </p>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            ❤️ My Favorites ({favoriteItems.length})
          </h2>
          {favoriteItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No favorites yet</p>
              <p className="text-gray-500">Start exploring and save your favorite artworks</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-amber-600 text-2xl font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            📚 My Collections ({collections.length})
          </h2>
          {collections.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No collections yet</p>
              <p className="text-gray-500">Create collections to organize your favorite artworks</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {collections.map(collection => {
                const collectionItems = allItems.filter(item => collection.items.includes(item.id));
                return (
                  <div key={collection.name} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{collection.name}</h3>
                      <span className="text-gray-600">{collection.items.length} items</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {collectionItems.map(item => (
                        <div key={item.id} className="aspect-square rounded-lg overflow-hidden shadow-md">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const allItems = [...SAMPLE_ITEMS.wax, ...SAMPLE_ITEMS.resin];

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <BarChart3 className="w-5 h-5" />
            Overview
          </TabButton>
          <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            <Package className="w-5 h-5" />
            Products
          </TabButton>
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <Users className="w-5 h-5" />
            Users
          </TabButton>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard title="Total Products" value={allItems.length} icon={<Package className="w-8 h-8" />} />
              <MetricCard title="In Stock" value={allItems.filter(i => i.inStock).length} icon={<TrendingUp className="w-8 h-8" />} />
              <MetricCard title="Total Revenue" value="$12,450" icon={<Star className="w-8 h-8" />} />
              <MetricCard title="Active Users" value="247" icon={<Users className="w-8 h-8" />} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Top Performing Products</h3>
              <div className="space-y-4">
                {allItems.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-amber-600">#{index + 1}</span>
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Popularity</div>
                      <div className="text-lg font-bold text-amber-600">{item.popularity}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Product Management</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all">
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
            <div className="space-y-3">
              {allItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">${item.price} • {item.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">User Management</h3>
            <p className="text-gray-600">User management features would be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
        : 'bg-white text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-amber-600">{icon}</div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

// Footer Component
const Footer = ({ setCurrentView }) => (
  <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Artisan Crafts</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Handcrafted excellence in every piece. Creating beauty that transforms spaces.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <FooterLink onClick={() => setCurrentView('home')}>Home</FooterLink>
            <FooterLink onClick={() => setCurrentView('portfolio')}>Portfolio</FooterLink>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Contact</FooterLink>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Collections</h4>
          <div className="space-y-2">
            <FooterLink>Wax Creations</FooterLink>
            <FooterLink>Resin Artworks</FooterLink>
            <FooterLink>Custom Orders</FooterLink>
            <FooterLink>Gift Sets</FooterLink>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="space-y-2">
            <FooterLink>Instagram</FooterLink>
            <FooterLink>Pinterest</FooterLink>
            <FooterLink>Facebook</FooterLink>
            <FooterLink>Newsletter</FooterLink>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Artisan Crafts. All rights reserved. Crafted with ❤️ and passion.</p>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ children, onClick }) => (
  <button onClick={onClick} className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">
    {children}
  </button>
);

// Main Export with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <ArtisanCraftWebsite />
    </AuthProvider>
  );
}