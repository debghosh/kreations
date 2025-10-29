import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, TrendingUp, ShoppingBag, Heart, Bookmark, Layers, X, Plus } from 'lucide-react';
import { getFeaturedItems } from '../data/products';
import { SAMPLE_ITEMS } from '../data/products';
import { useAuth } from '../context/AuthContext';

const HomePage = ({ setCurrentView, setSelectedCategory, setSelectedItem }) => {
  const featuredItems = getFeaturedItems();
  const { user, favorites, toggleFavorite, savedItems, toggleSaved, collections, addItemToUserCollection } = useAuth();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    'https://images.unsplash.com/photo-1602874801006-90c27c6e0ca5?w=1920&q=80',
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1920&q=80',
    'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1920&q=80',
    'https://images.unsplash.com/photo-1621784564315-d2a91e3bb134?w=1920&q=80',
    'https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=1920&q=80'
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          </div>
        ))}
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl animate-fade-in leading-tight">
            Handcrafted
            <br />
            With Soul
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your spaces with unique resin and wax collections
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

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => prev === 0 ? carouselImages.length - 1 : prev - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              } rounded-full`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
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
                  setSelectedItem(item);
                  setCurrentView('item-detail');
                }}
                user={user}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                savedItems={savedItems}
                toggleSaved={toggleSaved}
                collections={collections}
                addItemToUserCollection={addItemToUserCollection}
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

const FeaturedCard = ({ item, index, onClick, user, favorites, toggleFavorite, savedItems, toggleSaved, collections, addItemToUserCollection }) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  return (
    <>
      <div
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative h-80 overflow-hidden" onClick={onClick}>
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
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Sold Out
            </div>
          )}
          {user && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                title="Favorite"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(item.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaved(item.id);
                }}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                title="Save"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    savedItems.includes(item.id)
                      ? 'fill-blue-500 text-blue-500'
                      : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCollectionModal(true);
                }}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                title="Add to collection"
              >
                <Layers className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
        <div className="p-6" onClick={onClick}>
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

      {/* Add to Collection Modal */}
      {showCollectionModal && (
        <AddToCollectionModal
          item={item}
          collections={collections}
          onAdd={(collectionId) => {
            addItemToUserCollection(collectionId, item.id);
            setShowCollectionModal(false);
          }}
          onClose={() => setShowCollectionModal(false)}
        />
      )}
    </>
  );
};

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

// Add to Collection Modal Component
const AddToCollectionModal = ({ item, collections, onAdd, onClose }) => {
  const { createUserCollection } = useAuth();
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreateAndAdd = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      const newCollection = createUserCollection(newCollectionName.trim(), [item.id]);
      setNewCollectionName('');
      setShowCreateNew(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add to Collection</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {showCreateNew ? (
          <form onSubmit={handleCreateAndAdd}>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowCreateNew(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg"
                disabled={!newCollectionName.trim()}
              >
                Create & Add
              </button>
            </div>
          </form>
        ) : (
          <>
            {collections.length === 0 ? (
              <div className="text-center py-8">
                <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600 mb-4">You don't have any collections yet.</p>
                <button
                  onClick={() => setShowCreateNew(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg"
                >
                  Create Your First Collection
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {collections.map(collection => (
                  <button
                    key={collection.id}
                    onClick={() => onAdd(collection.id)}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{collection.name}</h3>
                        <p className="text-sm text-gray-600">{collection.items.length} items</p>
                      </div>
                      <Layers className="w-5 h-5 text-amber-600" />
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setShowCreateNew(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center text-gray-600 hover:text-amber-600"
                >
                  <Plus className="w-5 h-5 mx-auto mb-1" />
                  Create New Collection
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
