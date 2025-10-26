import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Package, Users, Plus, Edit, Trash2, TrendingUp, Star, 
  Layers, X, Home as HomeIcon, Eye, Save, Upload, Check 
} from 'lucide-react';
import { getAllItems, addProduct, deleteProduct, updateProduct, loadProductsFromStorage } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { ProductModal, CollectionModal } from '../components/AdminModals';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  
  const { 
    adminCollections, 
    createAdminCollection, 
    deleteAdminCollection, 
    updateAdminCollection 
  } = useAuth();

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    loadProductsFromStorage(); // Load from localStorage
    const allProducts = getAllItems();
    setProducts(allProducts);
  };

  const handleAddProduct = (product) => {
    addProduct(product);
    refreshProducts();
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      refreshProducts();
    }
  };

  const handleUpdateProduct = (productId, updates) => {
    updateProduct(productId, updates);
    refreshProducts();
  };

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your artisan craft business</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <BarChart3 className="w-5 h-5" />
            Overview
          </TabButton>
          <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            <Package className="w-5 h-5" />
            Products
          </TabButton>
          <TabButton active={activeTab === 'collections'} onClick={() => setActiveTab('collections')}>
            <Layers className="w-5 h-5" />
            Collections
          </TabButton>
          <TabButton active={activeTab === 'homepage'} onClick={() => setActiveTab('homepage')}>
            <HomeIcon className="w-5 h-5" />
            Homepage
          </TabButton>
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <Users className="w-5 h-5" />
            Users
          </TabButton>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg">
          {activeTab === 'overview' && (
            <OverviewTab 
              products={products} 
              adminCollections={adminCollections} 
            />
          )}
          
          {activeTab === 'products' && (
            <ProductsTab 
              products={products}
              onAdd={() => { setEditingProduct(null); setShowProductModal(true); }}
              onEdit={(product) => { setEditingProduct(product); setShowProductModal(true); }}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
            />
          )}
          
          {activeTab === 'collections' && (
            <CollectionsTab
              collections={adminCollections}
              products={products}
              onAdd={() => { setEditingCollection(null); setShowCollectionModal(true); }}
              onEdit={(collection) => { setEditingCollection(collection); setShowCollectionModal(true); }}
              onDelete={deleteAdminCollection}
              onUpdate={updateAdminCollection}
            />
          )}
          
          {activeTab === 'homepage' && (
            <HomepageTab
              products={products}
              collections={adminCollections}
              onUpdateProduct={handleUpdateProduct}
              onUpdateCollection={updateAdminCollection}
            />
          )}
          
          {activeTab === 'users' && <UsersTab />}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
          onSave={(product) => {
            if (editingProduct) {
              handleUpdateProduct(editingProduct.id, product);
            } else {
              handleAddProduct({ 
                ...product, 
                id: `custom-${Date.now()}`,
                createdAt: new Date().toISOString()
              });
            }
            setShowProductModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Collection Modal */}
      {showCollectionModal && (
        <CollectionModal
          collection={editingCollection}
          products={products}
          onClose={() => { setShowCollectionModal(false); setEditingCollection(null); }}
          onSave={(collection) => {
            if (editingCollection) {
              updateAdminCollection(editingCollection.id, collection);
            } else {
              createAdminCollection(collection.name, collection.items, collection.featured);
            }
            setShowCollectionModal(false);
            setEditingCollection(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

// ========== TAB COMPONENTS ==========

// Overview Tab
const OverviewTab = ({ products, adminCollections }) => {
  const inStockCount = products.filter(p => p.inStock).length;
  const featuredCount = products.filter(p => p.featured).length;
  
  return (
    <div className="p-8 space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Products" 
          value={products.length} 
          icon={<Package className="w-8 h-8" />} 
          color="blue" 
        />
        <MetricCard 
          title="In Stock" 
          value={inStockCount} 
          icon={<TrendingUp className="w-8 h-8" />} 
          color="green" 
        />
        <MetricCard 
          title="Collections" 
          value={adminCollections.length} 
          icon={<Layers className="w-8 h-8" />} 
          color="purple" 
        />
        <MetricCard 
          title="Featured Items" 
          value={featuredCount} 
          icon={<Star className="w-8 h-8" />} 
          color="amber" 
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <QuickAction 
            icon={<Plus className="w-6 h-6" />} 
            title="Add New Product" 
            description="Create a new artwork listing" 
          />
          <QuickAction 
            icon={<Layers className="w-6 h-6" />} 
            title="Create Collection" 
            description="Group products together" 
          />
          <QuickAction 
            icon={<HomeIcon className="w-6 h-6" />} 
            title="Manage Homepage" 
            description="Feature items and collections" 
          />
          <QuickAction 
            icon={<BarChart3 className="w-6 h-6" />} 
            title="View Analytics" 
            description="Track performance metrics" 
          />
        </div>
      </div>

      {/* Recent Products */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recent Products</h3>
        <div className="space-y-3">
          {products.slice(0, 5).map(product => (
            <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
              <img src={product.image} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-semibold">{product.title}</h4>
                <p className="text-sm text-gray-600">${product.price} • {product.category}</p>
              </div>
              {product.featured && <Star className="w-5 h-5 fill-amber-500 text-amber-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Products Tab
const ProductsTab = ({ products, onAdd, onEdit, onDelete, onUpdate }) => (
  <div className="p-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Product Management</h3>
      <button 
        onClick={onAdd} 
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
      >
        <Plus className="w-5 h-5" />
        Add Product
      </button>
    </div>

    <div className="space-y-3">
      {products.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">
                ${item.price} • {item.category} • {item.inStock ? '✅ In Stock' : '❌ Sold Out'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onUpdate(item.id, { featured: !item.featured })} 
              className="p-2 hover:bg-gray-100 rounded-lg" 
              title="Toggle Featured"
            >
              <Star className={`w-5 h-5 ${item.featured ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
            </button>
            <button 
              onClick={() => onEdit(item)} 
              className="p-2 hover:bg-gray-100 rounded-lg" 
              title="Edit"
            >
              <Edit className="w-5 h-5 text-blue-600" />
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="p-2 hover:bg-gray-100 rounded-lg" 
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Collections Tab  
const CollectionsTab = ({ collections, products, onAdd, onEdit, onDelete, onUpdate }) => (
  <div className="p-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Collection Management</h3>
      <button 
        onClick={onAdd} 
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
      >
        <Plus className="w-5 h-5" />
        Create Collection
      </button>
    </div>

    {collections.length === 0 ? (
      <div className="text-center py-12 text-gray-500">
        <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>No collections yet. Create your first collection!</p>
      </div>
    ) : (
      <div className="space-y-4">
        {collections.map(collection => {
          const collectionProducts = products.filter(p => collection.items.includes(p.id));
          return (
            <div key={collection.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold">{collection.name}</h4>
                  <p className="text-sm text-gray-600">{collection.items.length} products</p>
                  {collection.featured && (
                    <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                      Featured on Homepage
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onUpdate(collection.id, { featured: !collection.featured })} 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Toggle Featured"
                  >
                    <Star className={`w-5 h-5 ${collection.featured ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
                  </button>
                  <button 
                    onClick={() => onEdit(collection)} 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit className="w-5 h-5 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`Delete "${collection.name}"?`)) onDelete(collection.id);
                    }} 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {collectionProducts.slice(0, 4).map(product => (
                  <div key={product.id} className="aspect-square rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                ))}
                {collectionProducts.length > 4 && (
                  <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">+{collectionProducts.length - 4} more</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

// Homepage Tab
const HomepageTab = ({ products, collections, onUpdateProduct, onUpdateCollection }) => {
  const featuredProducts = products.filter(p => p.featured);
  const featuredCollections = collections.filter(c => c.featured);

  return (
    <div className="p-8 space-y-8">
      {/* Featured Products */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Featured Products ({featuredProducts.length})</h3>
        <p className="text-sm text-gray-600 mb-4">These products appear in the "Featured Masterpieces" section</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold mb-2">{product.title}</h4>
                <p className="text-sm text-gray-600 mb-2">${product.price}</p>
                <button
                  onClick={() => onUpdateProduct(product.id, { featured: false })}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove from homepage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Featured Collections ({featuredCollections.length})</h3>
        <p className="text-sm text-gray-600 mb-4">These collections appear on the homepage</p>
        <div className="space-y-4">
          {featuredCollections.map(collection => (
            <div key={collection.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">{collection.name}</h4>
                  <p className="text-sm text-gray-600">{collection.items.length} products</p>
                </div>
                <button
                  onClick={() => onUpdateCollection(collection.id, { featured: false })}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove from homepage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Users Tab
const UsersTab = () => (
  <div className="p-8">
    <h3 className="text-2xl font-bold mb-6">User Management</h3>
    <div className="space-y-4">
      <UserCard name="Admin User" email="admin@artisan.com" role="Admin" joined="Jan 2024" orders={15} />
      <UserCard name="Jane Doe" email="jane@email.com" role="Subscriber" joined="Mar 2024" orders={8} />
      <UserCard name="John Smith" email="john@email.com" role="Subscriber" joined="Feb 2024" orders={12} />
    </div>
  </div>
);

// ========== HELPER COMPONENTS ==========

const TabButton = ({ active, onClick, children }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
      active 
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
    }`}
  >
    {children}
  </button>
);

const MetricCard = ({ title, value, icon, color = 'amber' }) => {
  const colors = {
    amber: 'from-amber-500 to-orange-500',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`text-white bg-gradient-to-br ${colors[color]} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
};

const QuickAction = ({ icon, title, description }) => (
  <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer">
    <div className="flex items-start gap-4">
      <div className="text-amber-600">{icon}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const UserCard = ({ name, email, role, joined, orders }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
    <div className="text-right">
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
      }`}>
        {role}
      </span>
      <p className="text-xs text-gray-500 mt-1">{orders} orders • Joined {joined}</p>
    </div>
  </div>
);
