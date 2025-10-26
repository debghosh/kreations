import React, { useState } from 'react';
import { ArrowLeft, Heart, Bookmark, Layers, ShoppingCart, Share2, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ItemDetailPage = ({ item, setCurrentView }) => {
  const [selectedImage, setSelectedImage] = useState(item.image);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  
  const { 
    user, 
    favorites, 
    toggleFavorite, 
    savedItems, 
    toggleSaved,
    collections,
    addItemToUserCollection,
    createUserCollection
  } = useAuth();

  if (!item) {
    return (
      <div className="pt-32 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Item not found</h2>
          <button
            onClick={() => setCurrentView('portfolio')}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('portfolio')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Portfolio</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={selectedImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Additional images could go here */}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-amber-600">${item.price}</span>
                {!item.inStock && (
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    Sold Out
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600">{item.description}</p>
            </div>

            {/* Action Buttons */}
            {user && (
              <div className="flex gap-3">
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    favorites.includes(item.id)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(item.id) ? 'fill-red-500' : ''
                    }`}
                  />
                  {favorites.includes(item.id) ? 'Favorited' : 'Favorite'}
                </button>

                <button
                  onClick={() => toggleSaved(item.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    savedItems.includes(item.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      savedItems.includes(item.id) ? 'fill-blue-500' : ''
                    }`}
                  />
                  {savedItems.includes(item.id) ? 'Saved' : 'Save'}
                </button>

                <button
                  onClick={() => setShowCollectionModal(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-amber-500 hover:bg-amber-50 text-gray-700 transition-all"
                >
                  <Layers className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Purchase Button (if in stock) */}
            {item.inStock && (
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            )}

            {/* Long Description */}
            {item.longDescription && (
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-4">About This Piece</h2>
                <p className="text-gray-700 leading-relaxed">{item.longDescription}</p>
              </div>
            )}

            {/* Specifications */}
            <div className="pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {item.dimensions && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                    <p className="font-semibold">{item.dimensions}</p>
                  </div>
                )}
                {item.weight && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Weight</p>
                    <p className="font-semibold">{item.weight}</p>
                  </div>
                )}
                {item.materials && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Materials</p>
                    <p className="font-semibold">{item.materials}</p>
                  </div>
                )}
                {item.burnTime && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Burn Time</p>
                    <p className="font-semibold">{item.burnTime}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-semibold capitalize">{item.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subcategory</p>
                  <p className="font-semibold capitalize">{item.subcategory}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
          createUserCollection={createUserCollection}
        />
      )}
    </div>
  );
};

// Add to Collection Modal Component
const AddToCollectionModal = ({ item, collections, onAdd, onClose, createUserCollection }) => {
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

export default ItemDetailPage;
