import { BasePage } from './BasePage.js';

/**
 * HomePage - Page Object for the home/landing page
 * 
 * Features:
 * - Hero section
 * - Featured products
 * - Featured collections
 * - Product interaction (favorites, saved, collections)
 */

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Hero section
    this.heroSection = 'section:has-text("Handcrafted Excellence")';
    this.heroTitle = 'h1';
    this.shopNowButton = 'a:has-text("Shop Now")';
    
    // Navigation
    this.logo = 'a[href="/"]';
    this.portfolioLink = 'a[href="/portfolio"]';
    this.loginButton = 'button:has-text("Login")';
    this.profileButton = 'button:has-text("Profile")';
    
    // Products section
    this.productsSection = '[data-testid="products-section"], section:has-text("Featured")';
    this.productCards = '.product-card, [data-testid="product-card"]';
    
    // Product card elements
    this.favoriteButton = (index) => `(${this.productCards})[${index + 1}] button[aria-label*="favorite"], (${this.productCards})[${index + 1}] button:has([data-icon="heart"])`;
    this.savedButton = (index) => `(${this.productCards})[${index + 1}] button[aria-label*="save"], (${this.productCards})[${index + 1}] button:has([data-icon="bookmark"])`;
    this.addToCollectionButton = (index) => `(${this.productCards})[${index + 1}] button[aria-label*="collection"], (${this.productCards})[${index + 1}] button:has([data-icon="folder"])`;
    
    // Collections section
    this.collectionsSection = '[data-testid="collections-section"]';
    this.collectionCards = '.collection-card, [data-testid="collection-card"]';
  }

  /**
   * Navigate to home page
   */
  async navigateToHome() {
    await this.goto('/');
  }

  /**
   * Verify hero section is visible
   * @returns {boolean} True if hero section is visible
   */
  async isHeroSectionVisible() {
    return await this.isElementVisible(this.heroSection);
  }

  /**
   * Get hero title text
   * @returns {string} Hero title text
   */
  async getHeroTitle() {
    return await this.getTextContent(this.heroTitle);
  }

  /**
   * Click Shop Now button
   */
  async clickShopNow() {
    await this.clickElement(this.shopNowButton);
  }

  /**
   * Get number of product cards displayed
   * @returns {number} Number of product cards
   */
  async getProductCount() {
    await this.waitForSelector(this.productCards);
    return await this.getElementCount(this.productCards);
  }

  /**
   * Click favorite button on a product
   * @param {number} index - Product index (0-based)
   */
  async clickFavoriteOnProduct(index) {
    const selector = this.favoriteButton(index);
    await this.clickElement(selector);
    await this.wait(300); // Wait for animation
  }

  /**
   * Click saved button on a product
   * @param {number} index - Product index (0-based)
   */
  async clickSavedOnProduct(index) {
    const selector = this.savedButton(index);
    await this.clickElement(selector);
    await this.wait(300);
  }

  /**
   * Click add to collection button on a product
   * @param {number} index - Product index (0-based)
   */
  async clickAddToCollectionOnProduct(index) {
    const selector = this.addToCollectionButton(index);
    await this.clickElement(selector);
  }

  /**
   * Check if favorite button is active (filled)
   * @param {number} index - Product index (0-based)
   * @returns {boolean} True if favorite is active
   */
  async isFavoriteActive(index) {
    const selector = this.favoriteButton(index);
    return await this.hasClass(selector, 'fill-red-500') || 
           await this.hasClass(selector, 'text-red-500');
  }

  /**
   * Check if saved button is active (filled)
   * @param {number} index - Product index (0-based)
   * @returns {boolean} True if saved is active
   */
  async isSavedActive(index) {
    const selector = this.savedButton(index);
    return await this.hasClass(selector, 'fill-blue-500') || 
           await this.hasClass(selector, 'text-blue-500');
  }

  /**
   * Get product title by index
   * @param {number} index - Product index (0-based)
   * @returns {string} Product title
   */
  async getProductTitle(index) {
    const selector = `(${this.productCards})[${index + 1}] h3, (${this.productCards})[${index + 1}] .product-title`;
    return await this.getTextContent(selector);
  }

  /**
   * Get product price by index
   * @param {number} index - Product index (0-based)
   * @returns {string} Product price
   */
  async getProductPrice(index) {
    const selector = `(${this.productCards})[${index + 1}] .price, (${this.productCards})[${index + 1}] p:has-text("$")`;
    return await this.getTextContent(selector);
  }

  /**
   * Click on a product card
   * @param {number} index - Product index (0-based)
   */
  async clickProductCard(index) {
    const selector = `(${this.productCards})[${index + 1}]`;
    await this.clickElement(selector);
  }

  /**
   * Scroll to products section
   */
  async scrollToProducts() {
    await this.scrollToElement(this.productsSection);
  }

  /**
   * Verify collections section is visible
   * @returns {boolean} True if collections section is visible
   */
  async isCollectionsSectionVisible() {
    return await this.isElementVisible(this.collectionsSection);
  }

  /**
   * Get number of collection cards
   * @returns {number} Number of collection cards
   */
  async getCollectionCount() {
    return await this.getElementCount(this.collectionCards);
  }

  /**
   * Click on login button
   */
  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  /**
   * Check if user is logged in
   * @returns {boolean} True if profile button is visible
   */
  async isLoggedIn() {
    return await this.isElementVisible(this.profileButton);
  }

  /**
   * Navigate to portfolio page
   */
  async navigateToPortfolio() {
    await this.clickElement(this.portfolioLink);
  }

  /**
   * Click on logo to return home
   */
  async clickLogo() {
    await this.clickElement(this.logo);
  }

  /**
   * Verify all action buttons are visible on a product
   * @param {number} index - Product index (0-based)
   * @returns {Object} Object with button visibility states
   */
  async verifyProductActionButtons(index) {
    return {
      favorite: await this.isElementVisible(this.favoriteButton(index)),
      saved: await this.isElementVisible(this.savedButton(index)),
      collection: await this.isElementVisible(this.addToCollectionButton(index)),
    };
  }

  /**
   * Favorite multiple products
   * @param {Array<number>} indices - Array of product indices
   */
  async favoriteMultipleProducts(indices) {
    for (const index of indices) {
      await this.clickFavoriteOnProduct(index);
      await this.wait(200);
    }
  }

  /**
   * Save multiple products
   * @param {Array<number>} indices - Array of product indices
   */
  async saveMultipleProducts(indices) {
    for (const index of indices) {
      await this.clickSavedOnProduct(index);
      await this.wait(200);
    }
  }
}
