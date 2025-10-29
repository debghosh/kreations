import { BasePage } from './BasePage.js';

/**
 * ProfilePage - Page Object for user profile/dashboard
 * 
 * Features:
 * - Favorites tab
 * - Saved tab
 * - Collections tab
 * - Collection management
 * - Item interactions
 */

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.pageTitle = 'h1, h2:has-text("Profile")';
    
    // Tab navigation
    this.favoritesTab = 'button:has-text("Favorites")';
    this.savedTab = 'button:has-text("Saved")';
    this.collectionsTab = 'button:has-text("Collections"), button:has-text("My Collections")';
    
    // Item cards
    this.itemCards = '.item-card, [data-testid="item-card"], .product-card';
    
    // Action buttons on items
    this.favoriteButton = (index) => `(${this.itemCards})[${index + 1}] button[aria-label*="favorite"]`;
    this.savedButton = (index) => `(${this.itemCards})[${index + 1}] button[aria-label*="save"]`;
    this.addToCollectionButton = (index) => `(${this.itemCards})[${index + 1}] button[aria-label*="collection"]`;
    
    // Collection elements
    this.collectionCards = '.collection-card, [data-testid="collection-card"]';
    this.createCollectionButton = 'button:has-text("Create Collection"), button:has-text("New Collection")';
    this.collectionNameInput = 'input[placeholder*="collection"], input[name="collectionName"]';
    this.saveCollectionButton = 'button:has-text("Save"), button:has-text("Create")';
    this.deleteCollectionButton = 'button:has-text("Delete")';
    
    // Empty states
    this.emptyState = '.empty-state, [data-testid="empty-state"]';
    this.emptyStateMessage = `${this.emptyState} p`;
    
    // Collection modal
    this.collectionModal = '[role="dialog"]:has-text("Add to Collection")';
    this.collectionOption = (name) => `${this.collectionModal} button:has-text("${name}")`;
    this.createNewCollectionOption = `${this.collectionModal} button:has-text("Create New")`;
  }

  /**
   * Navigate to profile page
   */
  async navigateToProfile() {
    await this.goto('/profile');
    await this.waitForPageLoad();
  }

  /**
   * Click Favorites tab
   */
  async clickFavoritesTab() {
    await this.clickElement(this.favoritesTab);
    await this.wait(300);
  }

  /**
   * Click Saved tab
   */
  async clickSavedTab() {
    await this.clickElement(this.savedTab);
    await this.wait(300);
  }

  /**
   * Click Collections tab
   */
  async clickCollectionsTab() {
    await this.clickElement(this.collectionsTab);
    await this.wait(300);
  }

  /**
   * Get active tab name
   * @returns {string} Active tab name
   */
  async getActiveTab() {
    // Check which tab has active styling
    if (await this.hasClass(this.favoritesTab, 'bg-amber-500') || 
        await this.hasClass(this.favoritesTab, 'border-b-2')) {
      return 'favorites';
    }
    if (await this.hasClass(this.savedTab, 'bg-amber-500') || 
        await this.hasClass(this.savedTab, 'border-b-2')) {
      return 'saved';
    }
    if (await this.hasClass(this.collectionsTab, 'bg-amber-500') || 
        await this.hasClass(this.collectionsTab, 'border-b-2')) {
      return 'collections';
    }
    return 'unknown';
  }

  /**
   * Get count of items displayed
   * @returns {number} Number of item cards
   */
  async getItemCount() {
    return await this.getElementCount(this.itemCards);
  }

  /**
   * Get count of collections
   * @returns {number} Number of collection cards
   */
  async getCollectionCount() {
    return await this.getElementCount(this.collectionCards);
  }

  /**
   * Check if empty state is displayed
   * @returns {boolean} True if empty state is visible
   */
  async isEmptyStateVisible() {
    return await this.isElementVisible(this.emptyState);
  }

  /**
   * Get empty state message
   * @returns {string} Empty state message text
   */
  async getEmptyStateMessage() {
    return await this.getTextContent(this.emptyStateMessage);
  }

  /**
   * Remove favorite from item
   * @param {number} index - Item index (0-based)
   */
  async removeFavorite(index) {
    await this.clickElement(this.favoriteButton(index));
    await this.wait(300);
  }

  /**
   * Remove saved from item
   * @param {number} index - Item index (0-based)
   */
  async removeSaved(index) {
    await this.clickElement(this.savedButton(index));
    await this.wait(300);
  }

  /**
   * Click add to collection on item
   * @param {number} index - Item index (0-based)
   */
  async clickAddToCollection(index) {
    await this.clickElement(this.addToCollectionButton(index));
    await this.waitForSelector(this.collectionModal);
  }

  /**
   * Select collection from modal
   * @param {string} collectionName - Name of collection to select
   */
  async selectCollection(collectionName) {
    await this.clickElement(this.collectionOption(collectionName));
    await this.wait(300);
  }

  /**
   * Create new collection from modal
   * @param {string} collectionName - Name for new collection
   */
  async createNewCollectionFromModal(collectionName) {
    await this.clickElement(this.createNewCollectionOption);
    await this.fillInput(this.collectionNameInput, collectionName);
    await this.clickElement(this.saveCollectionButton);
    await this.wait(300);
  }

  /**
   * Click create collection button
   */
  async clickCreateCollection() {
    await this.clickElement(this.createCollectionButton);
  }

  /**
   * Create a new collection
   * @param {string} name - Collection name
   */
  async createCollection(name) {
    await this.clickCreateCollection();
    await this.fillInput(this.collectionNameInput, name);
    await this.clickElement(this.saveCollectionButton);
    await this.wait(500);
  }

  /**
   * Delete collection by index
   * @param {number} index - Collection index (0-based)
   */
  async deleteCollection(index) {
    const deleteButton = `(${this.collectionCards})[${index + 1}] ${this.deleteCollectionButton}`;
    await this.clickElement(deleteButton);
    await this.wait(300);
  }

  /**
   * Get collection name by index
   * @param {number} index - Collection index (0-based)
   * @returns {string} Collection name
   */
  async getCollectionName(index) {
    const selector = `(${this.collectionCards})[${index + 1}] h3, (${this.collectionCards})[${index + 1}] .collection-name`;
    return await this.getTextContent(selector);
  }

  /**
   * Get collection item count by index
   * @param {number} index - Collection index (0-based)
   * @returns {number} Number of items in collection
   */
  async getCollectionItemCount(index) {
    const selector = `(${this.collectionCards})[${index + 1}] p:has-text("item")`;
    const text = await this.getTextContent(selector);
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Click on a collection to view it
   * @param {number} index - Collection index (0-based)
   */
  async viewCollection(index) {
    const selector = `(${this.collectionCards})[${index + 1}]`;
    await this.clickElement(selector);
  }

  /**
   * Verify all action buttons are visible on item
   * @param {number} index - Item index (0-based)
   * @returns {Object} Button visibility states
   */
  async verifyItemActionButtons(index) {
    return {
      favorite: await this.isElementVisible(this.favoriteButton(index)),
      saved: await this.isElementVisible(this.savedButton(index)),
      collection: await this.isElementVisible(this.addToCollectionButton(index)),
    };
  }

  /**
   * Get item title by index
   * @param {number} index - Item index (0-based)
   * @returns {string} Item title
   */
  async getItemTitle(index) {
    const selector = `(${this.itemCards})[${index + 1}] h3`;
    return await this.getTextContent(selector);
  }

  /**
   * Verify favorites count in tab
   * @returns {number} Number from tab text
   */
  async getFavoritesCountFromTab() {
    const text = await this.getTextContent(this.favoritesTab);
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Verify saved count in tab
   * @returns {number} Number from tab text
   */
  async getSavedCountFromTab() {
    const text = await this.getTextContent(this.savedTab);
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Verify collections count in tab
   * @returns {number} Number from tab text
   */
  async getCollectionsCountFromTab() {
    const text = await this.getTextContent(this.collectionsTab);
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Verify tab counts match localStorage
   * @returns {Object} Comparison of tab counts and localStorage
   */
  async verifyTabCountsMatchStorage() {
    const favorites = await this.getLocalStorageItem('favorites') || [];
    const savedItems = await this.getLocalStorageItem('savedItems') || [];
    const collections = await this.getLocalStorageItem('collections') || [];

    const tabCounts = {
      favorites: await this.getFavoritesCountFromTab(),
      saved: await this.getSavedCountFromTab(),
      collections: await this.getCollectionsCountFromTab(),
    };

    const storageCounts = {
      favorites: favorites.length,
      saved: savedItems.length,
      collections: collections.length,
    };

    return {
      match: JSON.stringify(tabCounts) === JSON.stringify(storageCounts),
      tabCounts,
      storageCounts,
    };
  }
}
