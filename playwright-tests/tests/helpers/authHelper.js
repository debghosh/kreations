/**
 * Auth Helper - Utilities for authentication and session management
 */

export class AuthHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Login as subscriber
   * @returns {Object} User object
   */
  async loginAsSubscriber() {
    await this.page.evaluate(() => {
      const user = {
        email: 'subscriber@test.com',
        role: 'subscriber',
        name: 'Test Subscriber',
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(user));
    });

    // Initialize subscriber data structures
    await this.initializeSubscriberData();

    return await this.getUser();
  }

  /**
   * Login as admin
   * @returns {Object} User object
   */
  async loginAsAdmin() {
    await this.page.evaluate(() => {
      const user = {
        email: 'admin@test.com',
        role: 'admin',
        name: 'Test Admin',
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(user));
    });

    return await this.getUser();
  }

  /**
   * Initialize subscriber data structures in localStorage
   */
  async initializeSubscriberData() {
    await this.page.evaluate(() => {
      // Initialize empty arrays if they don't exist
      if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
      }
      if (!localStorage.getItem('savedItems')) {
        localStorage.setItem('savedItems', JSON.stringify([]));
      }
      if (!localStorage.getItem('collections')) {
        localStorage.setItem('collections', JSON.stringify([]));
      }
    });
  }

  /**
   * Logout current user
   */
  async logout() {
    await this.page.evaluate(() => {
      localStorage.removeItem('user');
    });
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  async getUser() {
    return await this.page.evaluate(() => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    });
  }

  /**
   * Check if user is logged in
   * @returns {boolean} True if user is logged in
   */
  async isLoggedIn() {
    const user = await this.getUser();
    return user !== null;
  }

  /**
   * Check if current user is admin
   * @returns {boolean} True if user is admin
   */
  async isAdmin() {
    const user = await this.getUser();
    return user && user.role === 'admin';
  }

  /**
   * Check if current user is subscriber
   * @returns {boolean} True if user is subscriber
   */
  async isSubscriber() {
    const user = await this.getUser();
    return user && user.role === 'subscriber';
  }

  /**
   * Verify user role matches expected role
   * @param {string} expectedRole - Expected role ('admin' or 'subscriber')
   * @returns {boolean} True if role matches
   */
  async verifyRole(expectedRole) {
    const user = await this.getUser();
    return user && user.role === expectedRole;
  }

  /**
   * Clear all user data
   */
  async clearUserData() {
    await this.page.evaluate(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
      localStorage.removeItem('savedItems');
      localStorage.removeItem('collections');
    });
  }

  /**
   * Set up authenticated session for subscriber with data
   * @param {Object} options - Setup options
   */
  async setupSubscriberSession(options = {}) {
    const {
      favorites = [],
      savedItems = [],
      collections = [],
    } = options;

    await this.loginAsSubscriber();

    await this.page.evaluate(
      ({ favs, saved, colls }) => {
        if (favs.length > 0) {
          localStorage.setItem('favorites', JSON.stringify(favs));
        }
        if (saved.length > 0) {
          localStorage.setItem('savedItems', JSON.stringify(saved));
        }
        if (colls.length > 0) {
          localStorage.setItem('collections', JSON.stringify(colls));
        }
      },
      { favs: favorites, saved: savedItems, colls: collections }
    );
  }

  /**
   * Set up authenticated session for admin
   */
  async setupAdminSession() {
    await this.loginAsAdmin();
  }

  /**
   * Get favorites from localStorage
   * @returns {Array} Array of favorite item IDs
   */
  async getFavorites() {
    return await this.page.evaluate(() => {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    });
  }

  /**
   * Get saved items from localStorage
   * @returns {Array} Array of saved item IDs
   */
  async getSavedItems() {
    return await this.page.evaluate(() => {
      const saved = localStorage.getItem('savedItems');
      return saved ? JSON.parse(saved) : [];
    });
  }

  /**
   * Get collections from localStorage
   * @returns {Array} Array of collection objects
   */
  async getCollections() {
    return await this.page.evaluate(() => {
      const collections = localStorage.getItem('collections');
      return collections ? JSON.parse(collections) : [];
    });
  }

  /**
   * Add item to favorites
   * @param {string} itemId - Item ID to add
   */
  async addToFavorites(itemId) {
    await this.page.evaluate((id) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }, itemId);
  }

  /**
   * Add item to saved
   * @param {string} itemId - Item ID to add
   */
  async addToSaved(itemId) {
    await this.page.evaluate((id) => {
      const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
      if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('savedItems', JSON.stringify(saved));
      }
    }, itemId);
  }

  /**
   * Create a collection
   * @param {string} name - Collection name
   * @param {Array} itemIds - Array of item IDs
   * @returns {Object} Created collection
   */
  async createCollection(name, itemIds = []) {
    return await this.page.evaluate(
      ({ collectionName, items }) => {
        const collections = JSON.parse(localStorage.getItem('collections') || '[]');
        const newCollection = {
          id: `collection-${Date.now()}`,
          name: collectionName,
          items: items,
          createdAt: new Date().toISOString(),
        };
        collections.push(newCollection);
        localStorage.setItem('collections', JSON.stringify(collections));
        return newCollection;
      },
      { collectionName: name, items: itemIds }
    );
  }

  /**
   * Verify localStorage state
   * @returns {Object} Complete localStorage state
   */
  async getStorageState() {
    return await this.page.evaluate(() => {
      return {
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        savedItems: JSON.parse(localStorage.getItem('savedItems') || '[]'),
        collections: JSON.parse(localStorage.getItem('collections') || '[]'),
        products: JSON.parse(localStorage.getItem('products') || 'null'),
        adminCollections: JSON.parse(localStorage.getItem('adminCollections') || '[]'),
      };
    });
  }

  /**
   * Verify session persists after page reload
   * @returns {boolean} True if session persisted
   */
  async verifySessionPersistence() {
    const userBefore = await this.getUser();
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    const userAfter = await this.getUser();
    
    return userBefore && userAfter && 
           userBefore.email === userAfter.email &&
           userBefore.role === userAfter.role;
  }
}
