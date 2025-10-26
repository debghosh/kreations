import React, { useState } from 'react';
import { Search, Grid, List, Heart, Bookmark, Layers, X, Plus } from 'lucide-react';
import { getAllItems } from '../data/products';
import { useAuth } from '../context/AuthContext';

const PortfolioPage = ({ setSelectedItem, setCurrentView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const { user, favorites, toggleFavorite, savedItems, toggleSaved, collections, addItemToUserCollection } = useAuth();

  const allItems = getAllItems();

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
              Showing <span className="font-semibold">{filteredItems.length}</span> artworks
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
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <PortfolioCard
                key={item.id}
                item={item}
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
        ) : (
          <div className="space-y-4">
            {filteredItems.map(item => (
              <PortfolioListItem
                key={item.id}
                item={item}
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
        )}
      </div>
    </div>
  );
};

const PortfolioCard = ({ item, onClick, user, favorites, toggleFavorite, savedItems, toggleSaved, collections, addItemToUserCollection }) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
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
                title="Save for later"
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

const PortfolioListItem = ({ item, onClick, user, favorites, toggleFavorite, savedItems, toggleSaved, collections, addItemToUserCollection }) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  return (
    <>
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
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Favorite"
                    >
                      <Heart
                        className={`w-6 h-6 ${
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
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Save for later"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${
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
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Add to collection"
                    >
                      <Layers className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
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

export default PortfolioPage;
