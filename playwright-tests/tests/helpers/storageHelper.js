/**
 * Storage Helper - Utilities for localStorage operations and data management
 */

export class StorageHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Clear all localStorage
   */
  async clearAll() {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @returns {any} Parsed value or null
   */
  async getItem(key) {
    return await this.page.evaluate((storageKey) => {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : null;
    }, key);
  }

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  async setItem(key, value) {
    await this.page.evaluate(
      ({ storageKey, storageValue }) => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
      },
      { storageKey: key, storageValue: value }
    );
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  async removeItem(key) {
    await this.page.evaluate((storageKey) => {
      localStorage.removeItem(storageKey);
    }, key);
  }

  /**
   * Get all localStorage items
   * @returns {Object} All localStorage items
   */
  async getAllItems() {
    return await this.page.evaluate(() => {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
          items[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          items[key] = localStorage.getItem(key);
        }
      }
      return items;
    });
  }

  /**
   * Check if key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} True if key exists
   */
  async hasItem(key) {
    return await this.page.evaluate((storageKey) => {
      return localStorage.getItem(storageKey) !== null;
    }, key);
  }

  /**
   * Get localStorage size in bytes
   * @returns {number} Size in bytes
   */
  async getSize() {
    return await this.page.evaluate(() => {
      let size = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        size += key.length + value.length;
      }
      return size;
    });
  }

  /**
   * Backup current localStorage state
   * @returns {Object} Backup of all localStorage items
   */
  async backup() {
    return await this.getAllItems();
  }

  /**
   * Restore localStorage from backup
   * @param {Object} backup - Backup object from backup()
   */
  async restore(backup) {
    await this.clearAll();
    for (const [key, value] of Object.entries(backup)) {
      await this.setItem(key, value);
    }
  }

  // ========== FAVORITES ==========

  /**
   * Get favorites array
   * @returns {Array} Favorites array
   */
  async getFavorites() {
    return (await this.getItem('favorites')) || [];
  }

  /**
   * Set favorites array
   * @param {Array} favorites - Favorites array
   */
  async setFavorites(favorites) {
    await this.setItem('favorites', favorites);
  }

  /**
   * Add item to favorites
   * @param {string} itemId - Item ID
   */
  async addFavorite(itemId) {
    const favorites = await this.getFavorites();
    if (!favorites.includes(itemId)) {
      favorites.push(itemId);
      await this.setFavorites(favorites);
    }
  }

  /**
   * Remove item from favorites
   * @param {string} itemId - Item ID
   */
  async removeFavorite(itemId) {
    const favorites = await this.getFavorites();
    const filtered = favorites.filter(id => id !== itemId);
    await this.setFavorites(filtered);
  }

  /**
   * Check if item is favorited
   * @param {string} itemId - Item ID
   * @returns {boolean} True if favorited
   */
  async isFavorited(itemId) {
    const favorites = await this.getFavorites();
    return favorites.includes(itemId);
  }

  /**
   * Get favorites count
   * @returns {number} Number of favorites
   */
  async getFavoritesCount() {
    const favorites = await this.getFavorites();
    return favorites.length;
  }

  // ========== SAVED ITEMS ==========

  /**
   * Get saved items array
   * @returns {Array} Saved items array
   */
  async getSavedItems() {
    return (await this.getItem('savedItems')) || [];
  }

  /**
   * Set saved items array
   * @param {Array} savedItems - Saved items array
   */
  async setSavedItems(savedItems) {
    await this.setItem('savedItems', savedItems);
  }

  /**
   * Add item to saved
   * @param {string} itemId - Item ID
   */
  async addSaved(itemId) {
    const saved = await this.getSavedItems();
    if (!saved.includes(itemId)) {
      saved.push(itemId);
      await this.setSavedItems(saved);
    }
  }

  /**
   * Remove item from saved
   * @param {string} itemId - Item ID
   */
  async removeSaved(itemId) {
    const saved = await this.getSavedItems();
    const filtered = saved.filter(id => id !== itemId);
    await this.setSavedItems(filtered);
  }

  /**
   * Check if item is saved
   * @param {string} itemId - Item ID
   * @returns {boolean} True if saved
   */
  async isSaved(itemId) {
    const saved = await this.getSavedItems();
    return saved.includes(itemId);
  }

  /**
   * Get saved items count
   * @returns {number} Number of saved items
   */
  async getSavedCount() {
    const saved = await this.getSavedItems();
    return saved.length;
  }

  // ========== COLLECTIONS ==========

  /**
   * Get collections array
   * @returns {Array} Collections array
   */
  async getCollections() {
    return (await this.getItem('collections')) || [];
  }

  /**
   * Set collections array
   * @param {Array} collections - Collections array
   */
  async setCollections(collections) {
    await this.setItem('collections', collections);
  }

  /**
   * Create a collection
   * @param {string} name - Collection name
   * @param {Array} items - Array of item IDs
   * @returns {Object} Created collection
   */
  async createCollection(name, items = []) {
    const collections = await this.getCollections();
    const newCollection = {
      id: `collection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      items,
      createdAt: new Date().toISOString(),
    };
    collections.push(newCollection);
    await this.setCollections(collections);
    return newCollection;
  }

  /**
   * Delete a collection
   * @param {string} collectionId - Collection ID
   */
  async deleteCollection(collectionId) {
    const collections = await this.getCollections();
    const filtered = collections.filter(c => c.id !== collectionId);
    await this.setCollections(filtered);
  }

  /**
   * Add item to collection
   * @param {string} collectionId - Collection ID
   * @param {string} itemId - Item ID
   */
  async addItemToCollection(collectionId, itemId) {
    const collections = await this.getCollections();
    const collection = collections.find(c => c.id === collectionId);
    if (collection && !collection.items.includes(itemId)) {
      collection.items.push(itemId);
      await this.setCollections(collections);
    }
  }

  /**
   * Remove item from collection
   * @param {string} collectionId - Collection ID
   * @param {string} itemId - Item ID
   */
  async removeItemFromCollection(collectionId, itemId) {
    const collections = await this.getCollections();
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      collection.items = collection.items.filter(id => id !== itemId);
      await this.setCollections(collections);
    }
  }

  /**
   * Get collection by ID
   * @param {string} collectionId - Collection ID
   * @returns {Object|null} Collection object or null
   */
  async getCollectionById(collectionId) {
    const collections = await this.getCollections();
    return collections.find(c => c.id === collectionId) || null;
  }

  /**
   * Get collections count
   * @returns {number} Number of collections
   */
  async getCollectionsCount() {
    const collections = await this.getCollections();
    return collections.length;
  }

  // ========== PRODUCTS ==========

  /**
   * Get products
   * @returns {Array|null} Products array
   */
  async getProducts() {
    return await this.getItem('products');
  }

  /**
   * Set products
   * @param {Array} products - Products array
   */
  async setProducts(products) {
    await this.setItem('products', products);
  }

  /**
   * Get products count
   * @returns {number} Number of products
   */
  async getProductsCount() {
    const products = await this.getProducts();
    return products ? products.length : 0;
  }

  // ========== ADMIN COLLECTIONS ==========

  /**
   * Get admin collections
   * @returns {Array} Admin collections array
   */
  async getAdminCollections() {
    return (await this.getItem('adminCollections')) || [];
  }

  /**
   * Set admin collections
   * @param {Array} collections - Admin collections array
   */
  async setAdminCollections(collections) {
    await this.setItem('adminCollections', collections);
  }

  /**
   * Get admin collections count
   * @returns {number} Number of admin collections
   */
  async getAdminCollectionsCount() {
    const collections = await this.getAdminCollections();
    return collections.length;
  }

  // ========== USER ==========

  /**
   * Get user object
   * @returns {Object|null} User object
   */
  async getUser() {
    return await this.getItem('user');
  }

  /**
   * Set user object
   * @param {Object} user - User object
   */
  async setUser(user) {
    await this.setItem('user', user);
  }

  /**
   * Remove user (logout)
   */
  async removeUser() {
    await this.removeItem('user');
  }

  // ========== VALIDATION ==========

  /**
   * Verify data integrity
   * @returns {Object} Validation results
   */
  async verifyDataIntegrity() {
    const storage = await this.getAllItems();
    
    return {
      hasUser: storage.user !== null && storage.user !== undefined,
      hasFavorites: Array.isArray(storage.favorites),
      hasSavedItems: Array.isArray(storage.savedItems),
      hasCollections: Array.isArray(storage.collections),
      favoritesCount: storage.favorites?.length || 0,
      savedCount: storage.savedItems?.length || 0,
      collectionsCount: storage.collections?.length || 0,
    };
  }

  /**
   * Seed test data for development/testing
   * @param {Object} options - Seeding options
   */
  async seedTestData(options = {}) {
    const {
      favorites = ['1', '2', '3'],
      saved = ['4', '5'],
      collections = [
        { id: 'col1', name: 'My Favorites', items: ['1', '2'] },
        { id: 'col2', name: 'Wishlist', items: ['3', '4', '5'] },
      ],
    } = options;

    await this.setFavorites(favorites);
    await this.setSavedItems(saved);
    await this.setCollections(collections);
  }
}
