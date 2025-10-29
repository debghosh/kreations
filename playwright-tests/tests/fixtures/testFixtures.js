import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginModal } from '../pages/LoginModal.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { AdminDashboard } from '../pages/AdminDashboard.js';
import { AuthHelper } from '../helpers/authHelper.js';
import { StorageHelper } from '../helpers/storageHelper.js';

/**
 * Test Fixtures - Provides consistent setup for all tests
 * 
 * Features:
 * - Page objects for all pages
 * - Helper utilities
 * - Automatic cleanup
 * - Reusable test data
 */

// Extend base test with custom fixtures
export const test = base.extend({
  // Page Objects
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginModal: async ({ page }, use) => {
    const loginModal = new LoginModal(page);
    await use(loginModal);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  adminDashboard: async ({ page }, use) => {
    const adminDashboard = new AdminDashboard(page);
    await use(adminDashboard);
  },

  // Helpers
  authHelper: async ({ page }, use) => {
    const authHelper = new AuthHelper(page);
    await use(authHelper);
    // Cleanup after test
    await authHelper.clearUserData();
  },

  storageHelper: async ({ page }, use) => {
    const storageHelper = new StorageHelper(page);
    await use(storageHelper);
    // Cleanup after test
    await storageHelper.clearAll();
  },

  // Authenticated contexts
  subscriberPage: async ({ page, authHelper }, use) => {
    // Navigate to home and set up subscriber session
    await page.goto('/');
    await authHelper.setupSubscriberSession();
    await page.reload();
    await use(page);
  },

  adminPage: async ({ page, authHelper }, use) => {
    // Navigate to home and set up admin session
    await page.goto('/');
    await authHelper.setupAdminSession();
    await page.reload();
    await use(page);
  },
});

export { expect } from '@playwright/test';

/**
 * Test Data Fixtures
 */

export const testData = {
  // User credentials
  users: {
    subscriber: {
      email: 'subscriber@test.com',
      role: 'subscriber',
      name: 'Test Subscriber',
    },
    admin: {
      email: 'admin@test.com',
      role: 'admin',
      name: 'Test Admin',
    },
  },

  // Sample products
  products: {
    product1: {
      id: '1',
      name: 'Handcrafted Wax Candle',
      price: 29.99,
      category: 'wax',
    },
    product2: {
      id: '2',
      name: 'Resin Art Piece',
      price: 49.99,
      category: 'resin',
    },
    product3: {
      id: '3',
      name: 'Custom Wax Sculpture',
      price: 89.99,
      category: 'wax',
    },
  },

  // Sample collections
  collections: {
    collection1: {
      id: 'col-1',
      name: 'My Favorites',
      items: ['1', '2'],
    },
    collection2: {
      id: 'col-2',
      name: 'Wishlist',
      items: ['3'],
    },
  },

  // Product form data for admin tests
  newProduct: {
    name: 'Test Product',
    price: 99.99,
    description: 'This is a test product',
    category: 'wax',
    image: 'https://example.com/image.jpg',
  },

  // Collection form data
  newCollection: {
    name: 'Test Collection',
    featured: false,
  },

  // Item IDs for testing
  itemIds: {
    first: '1',
    second: '2',
    third: '3',
  },
};

/**
 * Custom expect matchers
 */

export const customMatchers = {
  /**
   * Assert that element has specific text
   */
  async toHaveTextContent(locator, expectedText) {
    const text = await locator.textContent();
    return {
      pass: text.includes(expectedText),
      message: () => `Expected "${text}" to include "${expectedText}"`,
    };
  },

  /**
   * Assert that storage contains item
   */
  async toHaveStorageItem(page, key, expectedValue) {
    const value = await page.evaluate((storageKey) => {
      return JSON.parse(localStorage.getItem(storageKey));
    }, key);

    return {
      pass: JSON.stringify(value) === JSON.stringify(expectedValue),
      message: () => `Expected storage[${key}] to equal ${JSON.stringify(expectedValue)}`,
    };
  },
};

/**
 * Common test utilities
 */

export const utils = {
  /**
   * Wait for specified time
   * @param {number} ms - Milliseconds to wait
   */
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  generateId: () => `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  /**
   * Generate unique name with timestamp
   * @param {string} prefix - Name prefix
   * @returns {string} Unique name
   */
  generateUniqueName: (prefix) => `${prefix}-${Date.now()}`,

  /**
   * Take screenshot with unique name
   * @param {Page} page - Playwright page
   * @param {string} name - Screenshot name
   */
  screenshot: async (page, name) => {
    await page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  },

  /**
   * Log test step
   * @param {string} step - Step description
   */
  logStep: (step) => {
    console.log(`  ✓ ${step}`);
  },
};
