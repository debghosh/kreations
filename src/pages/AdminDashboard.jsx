import React, { useState } from 'react';
import { BarChart3, Package, Users, Plus, Edit, Trash2, Eye, TrendingUp, Star } from 'lucide-react';
import { getAllItems } from '../data/products';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const allItems = getAllItems();

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
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
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <Users className="w-5 h-5" />
            Users
          </TabButton>
        </div>

        {/* Content */}
        {activeTab === 'overview' && <OverviewTab allItems={allItems} />}
        {activeTab === 'products' && <ProductsTab allItems={allItems} />}
        {activeTab === 'users' && <UsersTab />}
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ allItems }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        title="Total Products" 
        value={allItems.length} 
        icon={<Package className="w-8 h-8" />}
        color="blue"
      />
      <MetricCard 
        title="In Stock" 
        value={allItems.filter(i => i.inStock).length} 
        icon={<TrendingUp className="w-8 h-8" />}
        color="green"
      />
      <MetricCard 
        title="Total Revenue" 
        value="$12,450" 
        icon={<Star className="w-8 h-8" />}
        color="amber"
      />
      <MetricCard 
        title="Active Users" 
        value="247" 
        icon={<Users className="w-8 h-8" />}
        color="purple"
      />
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6">Top Performing Products</h3>
      <div className="space-y-4">
        {allItems
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 5)
          .map((item, index) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-amber-600 w-8">#{index + 1}</span>
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">${item.price} • {item.category}</p>
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

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4">Sales by Category</h3>
        <div className="space-y-4">
          <CategoryBar label="Wax Creations" percentage={58} value="$7,200" />
          <CategoryBar label="Resin Artworks" percentage={42} value="$5,250" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <ActivityItem time="2 hours ago" text="New order: Galaxy Resin Tray" />
          <ActivityItem time="4 hours ago" text="Product added: Lavender Dreams" />
          <ActivityItem time="6 hours ago" text="New subscriber: jane@email.com" />
          <ActivityItem time="1 day ago" text="Order fulfilled: Amber Sunset Candle" />
        </div>
      </div>
    </div>
  </div>
);

// Products Tab
const ProductsTab = ({ allItems }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Product Management</h3>
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all">
        <Plus className="w-5 h-5" />
        Add Product
      </button>
    </div>

    <div className="mb-4 text-sm text-gray-600">
      <p className="mb-2">💡 <strong>Tip:</strong> To add your own products, edit the <code className="bg-gray-100 px-2 py-1 rounded">src/data/products.js</code> file.</p>
      <p>See the <strong>ADD-YOUR-ARTWORK-GUIDE.md</strong> for detailed instructions.</p>
    </div>

    <div className="space-y-3">
      {allItems.map(item => (
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
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
              <Eye className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
              <Edit className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Users Tab
const UsersTab = () => (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h3 className="text-2xl font-bold mb-6">User Management</h3>
    
    <div className="space-y-4">
      <UserCard 
        name="Admin User" 
        email="admin@artisan.com" 
        role="Admin" 
        joined="Jan 2024"
        orders={15}
      />
      <UserCard 
        name="Jane Doe" 
        email="jane@email.com" 
        role="Subscriber" 
        joined="Mar 2024"
        orders={8}
      />
      <UserCard 
        name="John Smith" 
        email="john@email.com" 
        role="Subscriber" 
        joined="Feb 2024"
        orders={12}
      />
      <UserCard 
        name="Sarah Wilson" 
        email="sarah@email.com" 
        role="Subscriber" 
        joined="Apr 2024"
        orders={5}
      />
    </div>

    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <p className="text-sm text-amber-800">
        <strong>Note:</strong> This is a demo. In production, you would integrate with a real user management system and database.
      </p>
    </div>
  </div>
);

// Helper Components
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
    <div className="bg-white rounded-2xl shadow-lg p-6">
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

const CategoryBar = ({ label, percentage, value }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const ActivityItem = ({ time, text }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
    <div>
      <p className="text-sm text-gray-900">{text}</p>
      <p className="text-xs text-gray-500">{time}</p>
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

export default AdminDashboard;
