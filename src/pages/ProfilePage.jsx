import React, { useState } from 'react';
import { Heart, Bookmark, Layers, Plus, Trash2, X, User as UserIcon } from 'lucide-react';
import { getAllItems } from '../data/products';
import { useAuth } from '../context/AuthContext';

const ProfilePage = ({ setSelectedItem, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedForCollection, setSelectedForCollection] = useState(null);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { 
    user, 
    favorites, 
    toggleFavorite, 
    savedItems, 
    toggleSaved,
    collections,
    createUserCollection,
    deleteUserCollection,
    addItemToUserCollection,
    removeItemFromUserCollection
  } = useAuth();

  const allItems = getAllItems();
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));
  const savedItemsList = allItems.filter(item => savedItems.includes(item.id));

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createUserCollection(newCollectionName.trim(), []);
      setNewCollectionName('');
      setShowCreateCollection(false);
    }
  };

  const handleAddToCollection = (collectionId) => {
    if (selectedProductId) {
      addItemToUserCollection(collectionId, selectedProductId);
      setShowAddToCollection(false);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <TabButton 
            active={activeTab === 'favorites'} 
            onClick={() => setActiveTab('favorites')}
          >
            <Heart className="w-5 h-5" />
            Favorites ({favoriteItems.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'saved'} 
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark className="w-5 h-5" />
            Saved ({savedItemsList.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'collections'} 
            onClick={() => setActiveTab('collections')}
          >
            <Layers className="w-5 h-5" />
            My Collections ({collections.length})
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'favorites' && (
            <FavoritesTab 
              items={favoriteItems}
              toggleFavorite={toggleFavorite}
              toggleSaved={toggleSaved}
              savedItems={savedItems}
              setSelectedItem={setSelectedItem}
              setCurrentView={setCurrentView}
              onAddToCollection={(itemId) => {
                setSelectedProductId(itemId);
                setShowAddToCollection(true);
              }}
            />
          )}
          
          {activeTab === 'saved' && (
            <SavedTab 
              items={savedItemsList}
              toggleSaved={toggleSaved}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              setSelectedItem={setSelectedItem}
              setCurrentView={setCurrentView}
              onAddToCollection={(itemId) => {
                setSelectedProductId(itemId);
                setShowAddToCollection(true);
              }}
            />
          )}
          
          {activeTab === 'collections' && (
            <CollectionsTab 
              collections={collections}
              allItems={allItems}
              onCreateCollection={() => setShowCreateCollection(true)}
              onDeleteCollection={deleteUserCollection}
              onRemoveItem={removeItemFromUserCollection}
              setSelectedItem={setSelectedItem}
              setCurrentView={setCurrentView}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              toggleSaved={toggleSaved}
              savedItems={savedItems}
              onAddToCollection={(itemId) => {
                setSelectedProductId(itemId);
                setShowAddToCollection(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New Collection</h2>
              <button 
                onClick={() => setShowCreateCollection(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCollection}>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name (e.g., 'My Favorites', 'Gift Ideas')"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none mb-4"
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateCollection(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg"
                  disabled={!newCollectionName.trim()}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add to Collection Modal */}
      {showAddToCollection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add to Collection</h2>
              <button 
                onClick={() => {
                  setShowAddToCollection(false);
                  setSelectedProductId(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {collections.length === 0 ? (
              <div className="text-center py-8">
                <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600 mb-4">You don't have any collections yet.</p>
                <button
                  onClick={() => {
                    setShowAddToCollection(false);
                    setShowCreateCollection(true);
                  }}
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
                    onClick={() => handleAddToCollection(collection.id)}
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
                  onClick={() => {
                    setShowAddToCollection(false);
                    setShowCreateCollection(true);
                  }}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center text-gray-600 hover:text-amber-600"
                >
                  <Plus className="w-5 h-5 mx-auto mb-1" />
                  Create New Collection
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Favorites Tab
const FavoritesTab = ({ items, toggleFavorite, toggleSaved, savedItems, setSelectedItem, setCurrentView, onAddToCollection }) => {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="w-16 h-16" />}
        title="No favorites yet"
        description="Start adding items to your favorites by clicking the heart icon on products you love!"
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Favorites</h2>
        <p className="text-gray-600">{items.length} items</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onView={() => {
              setSelectedItem(item);
              setCurrentView('item-detail');
            }}
            onToggleFavorite={() => toggleFavorite(item.id)}
            isFavorited={true}
            onToggleSaved={() => toggleSaved(item.id)}
            isSaved={savedItems.includes(item.id)}
            onAddToCollection={() => onAddToCollection(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Saved Tab
const SavedTab = ({ items, toggleSaved, toggleFavorite, favorites, setSelectedItem, setCurrentView, onAddToCollection }) => {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Bookmark className="w-16 h-16" />}
        title="No saved items"
        description="Save items you're interested in by clicking the bookmark icon. Perfect for planning future purchases!"
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Items</h2>
        <p className="text-gray-600">{items.length} items</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onView={() => {
              setSelectedItem(item);
              setCurrentView('item-detail');
            }}
            onToggleFavorite={() => toggleFavorite(item.id)}
            isFavorited={favorites.includes(item.id)}
            onToggleSaved={() => toggleSaved(item.id)}
            isSaved={true}
            onAddToCollection={() => onAddToCollection(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Collections Tab
const CollectionsTab = ({ collections, allItems, onCreateCollection, onDeleteCollection, onRemoveItem, setSelectedItem, setCurrentView, toggleFavorite, favorites, toggleSaved, savedItems, onAddToCollection }) => {
  const [expandedCollection, setExpandedCollection] = useState(null);

  if (collections.length === 0) {
    return (
      <div>
        <EmptyState
          icon={<Layers className="w-16 h-16" />}
          title="No collections yet"
          description="Create custom collections to organize your favorite artworks!"
        />
        <div className="text-center mt-6">
          <button
            onClick={onCreateCollection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Your First Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Collections</h2>
        <button
          onClick={onCreateCollection}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          New Collection
        </button>
      </div>

      <div className="space-y-4">
        {collections.map(collection => {
          const collectionItems = allItems.filter(item => collection.items.includes(item.id));
          const isExpanded = expandedCollection === collection.id;

          return (
            <div key={collection.id} className="border rounded-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-gray-600">{collection.items.length} items</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created {new Date(collection.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedCollection(isExpanded ? null : collection.id)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {isExpanded ? 'Collapse' : 'View Items'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${collection.name}"?`)) {
                          onDeleteCollection(collection.id);
                        }
                      }}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 bg-white">
                  {collectionItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      This collection is empty. Add items from your favorites or saved items!
                    </p>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {collectionItems.map(item => (
                          <div key={item.id} className="relative">
                            <ItemCard
                              item={item}
                              onView={() => {
                                setSelectedItem(item);
                                setCurrentView('item-detail');
                              }}
                              onToggleFavorite={() => toggleFavorite(item.id)}
                              isFavorited={favorites.includes(item.id)}
                              onToggleSaved={() => toggleSaved(item.id)}
                              isSaved={savedItems.includes(item.id)}
                              onAddToCollection={() => onAddToCollection(item.id)}
                            />
                            {/* Remove from Collection button - separate overlay */}
                            <button
                              onClick={() => onRemoveItem(collection.id, item.id)}
                              className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                              title="Remove from this collection"
                            >
                              <X className="w-4 h-4" />
                              <span className="text-sm font-semibold">Remove from Collection</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Item Card Component
const ItemCard = ({ item, onView, onToggleFavorite, isFavorited, onToggleSaved, isSaved, onAddToCollection }) => (
  <div className="group bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-all">
    <div className="relative aspect-square cursor-pointer" onClick={onView}>
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      {!item.inStock && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
          Sold Out
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-amber-600">${item.price}</span>
        <div className="flex gap-2">
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          )}
          {onToggleSaved && (
            <button
              onClick={onToggleSaved}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={isSaved ? "Remove from saved" : "Save for later"}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`} />
            </button>
          )}
          <button
            onClick={onAddToCollection}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Add to collection"
          >
            <Layers className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ icon, title, description }) => (
  <div className="text-center py-16">
    <div className="text-gray-300 mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-600 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

// Tab Button Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
    }`}
  >
    {children}
  </button>
);

export default ProfilePage;
