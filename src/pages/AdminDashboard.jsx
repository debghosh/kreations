import React, { useState, useEffect } from 'react';
import { 
  Users, Package, Folder, Home as HomeIcon, BarChart3, 
  Plus, Edit, Trash2, Star, Eye, Search, X, Check,
  TrendingUp, ShoppingBag, Layers, Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getAllItems, 
  addProduct, 
  deleteProduct, 
  updateProduct,
  loadProductsFromStorage 
} from '../data/products';

const AdminDashboard = () => {
  const { user, adminCollections, createAdminCollection, deleteAdminCollection, updateAdminCollection } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCollection, setEditingCollection] = useState(null);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    loadProductsFromStorage();
    setProducts(getAllItems());
  };

  // Mock users data (in production, this would come from a database)
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'subscriber', joinedDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'subscriber', joinedDate: '2024-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@test.com', role: 'admin', joinedDate: '2023-12-01' },
  ];

  const metrics = {
    totalProducts: products.length,
    totalCollections: adminCollections.length,
    totalUsers: mockUsers.length,
    featuredProducts: products.filter(p => p.featured).length,
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredProducts = products.filter(p => p.featured);
  const featuredCollections = adminCollections.filter(c => c.featured);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your store content and users</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BarChart3 className="w-4 h-4" />}>
            Overview
          </Tab>
          <Tab active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<Package className="w-4 h-4" />}>
            Products
          </Tab>
          <Tab active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} icon={<Folder className="w-4 h-4" />}>
            Collections
          </Tab>
          <Tab active={activeTab === 'homepage'} onClick={() => setActiveTab('homepage')} icon={<HomeIcon className="w-4 h-4" />}>
            Homepage
          </Tab>
          <Tab active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users className="w-4 h-4" />}>
            Users
          </Tab>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && (
            <OverviewTab metrics={metrics} products={products} />
          )}
          
          {activeTab === 'products' && (
            <ProductsTab 
              products={filteredProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAddProduct={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              onEditProduct={(product) => {
                setEditingProduct(product);
                setShowProductModal(true);
              }}
              onDeleteProduct={(productId) => {
                if (confirm('Delete this product?')) {
                  deleteProduct(productId);
                  refreshProducts();
                }
              }}
              onToggleFeatured={(productId, currentState) => {
                updateProduct(productId, { featured: !currentState });
                refreshProducts();
              }}
            />
          )}
          
          {activeTab === 'collections' && (
            <CollectionsTab 
              collections={adminCollections}
              onAddCollection={() => {
                setEditingCollection(null);
                setShowCollectionModal(true);
              }}
              onEditCollection={(collection) => {
                setEditingCollection(collection);
                setShowCollectionModal(true);
              }}
              onDeleteCollection={(collectionId) => {
                if (confirm('Delete this collection?')) {
                  deleteAdminCollection(collectionId);
                }
              }}
            />
          )}
          
          {activeTab === 'homepage' && (
            <HomepageTab 
              featuredProducts={featuredProducts}
              featuredCollections={featuredCollections}
              onUnfeatureProduct={(productId) => {
                updateProduct(productId, { featured: false });
                refreshProducts();
              }}
              onUnfeatureCollection={(collectionId) => {
                updateAdminCollection(collectionId, { featured: false });
              }}
            />
          )}
          
          {activeTab === 'users' && (
            <UsersTab users={mockUsers} />
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowProductModal(false)}
          onSave={(productData) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, productData);
            } else {
              addProduct({
                id: `custom-${Date.now()}`,
                ...productData,
                createdAt: new Date().toISOString()
              });
            }
            refreshProducts();
            setShowProductModal(false);
          }}
        />
      )}

      {/* Collection Modal */}
      {showCollectionModal && (
        <CollectionModal
          collection={editingCollection}
          products={products}
          onClose={() => setShowCollectionModal(false)}
          onSave={(collectionData) => {
            if (editingCollection) {
              updateAdminCollection(editingCollection.id, collectionData);
            } else {
              createAdminCollection(collectionData.name, collectionData.items, collectionData.featured);
            }
            setShowCollectionModal(false);
          }}
        />
      )}
    </div>
  );
};

// Tab Component
const Tab = ({ children, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
      active 
        ? 'bg-amber-500 text-white shadow-md' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

// Overview Tab
const OverviewTab = ({ metrics, products }) => {
  const recentProducts = products.slice(-5).reverse();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Package className="w-8 h-8 text-blue-500" />}
          title="Total Products"
          value={metrics.totalProducts}
          color="blue"
        />
        <MetricCard
          icon={<Folder className="w-8 h-8 text-purple-500" />}
          title="Collections"
          value={metrics.totalCollections}
          color="purple"
        />
        <MetricCard
          icon={<Users className="w-8 h-8 text-green-500" />}
          title="Total Users"
          value={metrics.totalUsers}
          color="green"
        />
        <MetricCard
          icon={<Star className="w-8 h-8 text-amber-500" />}
          title="Featured Items"
          value={metrics.featuredProducts}
          color="amber"
        />
      </div>

      {/* Recent Products */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
        <div className="space-y-3">
          {recentProducts.map(product => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h4 className="font-medium">{product.title}</h4>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${product.price}</p>
                {product.featured && (
                  <span className="text-xs text-amber-600 flex items-center">
                    <Star className="w-3 h-3 mr-1" /> Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, color }) => (
  <div className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-50 rounded-lg`}>
        {icon}
      </div>
      <TrendingUp className={`w-5 h-5 text-${color}-500`} />
    </div>
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

// Products Tab
const ProductsTab = ({ products, searchTerm, setSearchTerm, onAddProduct, onEditProduct, onDeleteProduct, onToggleFeatured }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <button
          onClick={onAddProduct}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 flex-1">
              <img src={product.image} alt={product.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.category} • ${product.price}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleFeatured(product.id, product.featured)}
                className={`p-2 rounded-lg transition-colors ${
                  product.featured 
                    ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                title={product.featured ? 'Remove from featured' : 'Add to featured'}
              >
                <Star className={`w-5 h-5 ${product.featured ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => onEditProduct(product)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Edit product"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                title="Delete product"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

// Collections Tab
const CollectionsTab = ({ collections, onAddCollection, onEditCollection, onDeleteCollection }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Collections Management</h2>
        <button
          onClick={onAddCollection}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <div key={collection.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Layers className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{collection.name}</h3>
                  <p className="text-sm text-gray-600">{collection.items?.length || 0} items</p>
                </div>
              </div>
              {collection.featured && (
                <Star className="w-5 h-5 text-amber-500 fill-current" />
              )}
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onEditCollection(collection)}
                className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteCollection(collection.id)}
                className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No collections yet</p>
        </div>
      )}
    </div>
  );
};

// Homepage Tab
const HomepageTab = ({ featuredProducts, featuredCollections, onUnfeatureProduct, onUnfeatureCollection }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Homepage Management</h2>

      {/* Featured Products */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded mb-3" />
              <h4 className="font-medium mb-2">{product.title}</h4>
              <p className="text-sm text-gray-600 mb-3">${product.price}</p>
              <button
                onClick={() => onUnfeatureProduct(product.id)}
                className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Remove from Homepage
              </button>
            </div>
          ))}
        </div>
        {featuredProducts.length === 0 && (
          <p className="text-gray-500 text-center py-8">No featured products</p>
        )}
      </div>

      {/* Featured Collections */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Featured Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCollections.map(collection => (
            <div key={collection.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Layers className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">{collection.name}</h4>
                  <p className="text-sm text-gray-600">{collection.items?.length || 0} items</p>
                </div>
              </div>
              <button
                onClick={() => onUnfeatureCollection(collection.id)}
                className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Remove from Homepage
              </button>
            </div>
          ))}
        </div>
        {featuredCollections.length === 0 && (
          <p className="text-gray-500 text-center py-8">No featured collections</p>
        )}
      </div>
    </div>
  );
};

// Users Tab
const UsersTab = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="subscriber">Subscriber</option>
        </select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{user.name[0]}</span>
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user.role}
                </span>
                <p className="text-xs text-gray-500 mt-1">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
              </div>
              <button
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="View details"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
};

// Product Modal
const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    category: product?.category || 'wax',
    subcategory: product?.subcategory || '',
    price: product?.price || '',
    description: product?.description || '',
    image: product?.image || '',
    featured: product?.featured || false,
    inStock: product?.inStock !== false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="wax">Wax</option>
                <option value="resin">Resin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
            <input
              type="text"
              value={formData.subcategory}
              onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., candles, trays, coasters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="https://..."
              required
            />
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured on Homepage</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
              />
              <span className="text-sm font-medium text-gray-700">In Stock</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Collection Modal
const CollectionModal = ({ collection, products, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: collection?.name || '',
    items: collection?.items || [],
    featured: collection?.featured || false,
  });

  const handleToggleProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.includes(productId)
        ? prev.items.filter(id => id !== productId)
        : [...prev.items, productId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold">{collection ? 'Edit Collection' : 'Create Collection'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Collection Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
              placeholder="e.g., Best Sellers, New Arrivals"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
              />
              <span className="text-sm font-medium text-gray-700">Feature on Homepage</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Products ({formData.items.length} selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {products.map(product => (
                <label
                  key={product.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.items.includes(product.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.items.includes(product.id)}
                    onChange={() => handleToggleProduct(product.id)}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                  />
                  <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.title}</p>
                    <p className="text-xs text-gray-600">${product.price}</p>
                  </div>
                  {formData.items.includes(product.id) && (
                    <Check className="w-5 h-5 text-amber-600" />
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              {collection ? 'Update Collection' : 'Create Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
