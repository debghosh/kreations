import React from 'react';
import { ChevronRight, Star, Users, TrendingUp, ShoppingBag } from 'lucide-react';
import { getFeaturedItems } from '../data/products';
import { SAMPLE_ITEMS } from '../data/products';

const HomePage = ({ setCurrentView, setSelectedCategory, setSelectedItem }) => {
  const featuredItems = getFeaturedItems();

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
                  setSelectedItem(item);
                  setCurrentView('item-detail');
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

export default HomePage;
