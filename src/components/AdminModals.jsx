import React, { useState } from 'react';
import { X, Layers, Plus } from 'lucide-react';

// Product Modal Component
export const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    category: product?.category || 'wax',
    subcategory: product?.subcategory || 'candles',
    price: product?.price || '',
    description: product?.description || '',
    longDescription: product?.longDescription || '',
    dimensions: product?.dimensions || '',
    weight: product?.weight || '',
    materials: product?.materials || '',
    burnTime: product?.burnTime || '',
    image: product?.image || '',
    tags: product?.tags?.join(', ') || '',
    featured: product?.featured || false,
    inStock: product?.inStock !== false,
    popularity: product?.popularity || 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      price: Number(formData.price),
      popularity: Number(formData.popularity)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label="Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <FormInput
              label="Price *"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormSelect
              label="Category *"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'wax', label: 'Wax' },
                { value: 'resin', label: 'Resin' }
              ]}
            />
            <FormInput
              label="Subcategory"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              placeholder="candles, coasters, trays, etc."
            />
          </div>

          <FormTextarea
            label="Short Description *"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            required
          />

          <FormTextarea
            label="Long Description"
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            rows={3}
          />

          <div className="grid md:grid-cols-3 gap-4">
            <FormInput
              label="Dimensions"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              placeholder='4" × 6"'
            />
            <FormInput
              label="Weight"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="1.2 lbs"
            />
            <FormInput
              label="Burn Time"
              value={formData.burnTime}
              onChange={(e) => setFormData({ ...formData, burnTime: e.target.value })}
              placeholder="60+ hours"
            />
          </div>

          <FormInput
            label="Materials"
            value={formData.materials}
            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
            placeholder="Soy wax, cotton wick, essential oils"
          />

          <FormInput
            label="Image URL *"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="/images/wax/candle.jpg or https://..."
            required
          />

          <FormInput
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="handmade, natural, sustainable"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <FormCheckbox
              label="Featured on Homepage"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <FormCheckbox
              label="In Stock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
            <FormInput
              label="Popularity (1-100)"
              type="number"
              min="1"
              max="100"
              value={formData.popularity}
              onChange={(e) => setFormData({ ...formData, popularity: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Collection Modal Component
export const CollectionModal = ({ collection, products, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: collection?.name || '',
    items: collection?.items || [],
    featured: collection?.featured || false
  });

  const toggleItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.includes(itemId)
        ? prev.items.filter(id => id !== itemId)
        : [...prev.items, itemId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a collection name');
      return;
    }
    if (formData.items.length === 0) {
      alert('Please select at least one product');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{collection ? 'Edit Collection' : 'Create Collection'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Collection Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Summer Collection, Best Sellers, etc."
          />

          <FormCheckbox
            label="Featured on Homepage"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Products ({formData.items.length} selected)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-4 border rounded-lg">
              {products.map(product => (
                <div
                  key={product.id}
                  onClick={() => toggleItem(product.id)}
                  className={`cursor-pointer p-3 border-2 rounded-lg transition-all ${
                    formData.items.includes(product.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</p>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg"
            >
              {collection ? 'Update' : 'Create'} Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Form Components
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      {...props}
    />
  </div>
);

const FormTextarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      {...props}
    />
  </div>
);

const FormSelect = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const FormCheckbox = ({ label, ...props }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
      {...props}
    />
    <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
  </div>
);
