import { BasePage } from './BasePage.js';

/**
 * AdminDashboard - Page Object for admin dashboard
 * 
 * Features:
 * - Overview tab with metrics
 * - Products CRUD operations
 * - Collections CRUD operations
 * - Homepage management
 * - User management
 */

export class AdminDashboard extends BasePage {
  constructor(page) {
    super(page);
    
    // Dashboard tabs
    this.overviewTab = 'button:has-text("Overview")';
    this.productsTab = 'button:has-text("Products")';
    this.collectionsTab = 'button:has-text("Collections")';
    this.homepageTab = 'button:has-text("Homepage")';
    this.usersTab = 'button:has-text("Users")';
    
    // Products tab elements
    this.addProductButton = 'button:has-text("Add Product")';
    this.productRows = '.product-row, [data-testid="product-row"], tbody tr';
    this.editProductButton = (index) => `(${this.productRows})[${index + 1}] button:has-text("Edit")`;
    this.deleteProductButton = (index) => `(${this.productRows})[${index + 1}] button:has-text("Delete")`;
    this.toggleFeatureButton = (index) => `(${this.productRows})[${index + 1}] button[aria-label*="feature"]`;
    
    // Product modal elements
    this.productModal = '[role="dialog"]:has-text("Product")';
    this.productNameInput = 'input[name="name"], input[placeholder*="name"]';
    this.productPriceInput = 'input[name="price"], input[type="number"]';
    this.productDescriptionInput = 'textarea[name="description"]';
    this.productCategorySelect = 'select[name="category"]';
    this.productImageInput = 'input[name="image"], input[type="url"]';
    this.saveProductButton = `${this.productModal} button:has-text("Save")`;
    this.cancelButton = `${this.productModal} button:has-text("Cancel")`;
    
    // Collections tab elements
    this.createCollectionButton = 'button:has-text("Create Collection")';
    this.collectionRows = '.collection-row, [data-testid="collection-row"]';
    this.editCollectionButton = (index) => `(${this.collectionRows})[${index + 1}] button:has-text("Edit")`;
    this.deleteCollectionButton = (index) => `(${this.collectionRows})[${index + 1}] button:has-text("Delete")`;
    
    // Collection modal elements
    this.collectionModal = '[role="dialog"]:has-text("Collection")';
    this.collectionNameInput = 'input[name="collectionName"]';
    this.productCheckboxes = 'input[type="checkbox"]';
    this.featureOnHomepageCheckbox = 'input[type="checkbox"][name="featured"]';
    this.saveCollectionButton = `${this.collectionModal} button:has-text("Save")`;
    
    // Homepage tab elements
    this.featuredProducts = '[data-testid="featured-products"]';
    this.featuredCollections = '[data-testid="featured-collections"]';
    this.removeFeatureButton = 'button:has-text("Remove")';
    
    // Metrics/stats
    this.totalProductsMetric = '[data-testid="total-products"]';
    this.totalCollectionsMetric = '[data-testid="total-collections"]';
    this.totalUsersMetric = '[data-testid="total-users"]';
    
    // Confirmation dialog
    this.confirmDialog = '[role="alertdialog"], [role="dialog"]:has-text("confirm")';
    this.confirmButton = `${this.confirmDialog} button:has-text("Confirm"), ${this.confirmDialog} button:has-text("Delete")`;
    this.cancelConfirmButton = `${this.confirmDialog} button:has-text("Cancel")`;
  }

  /**
   * Navigate to admin dashboard
   */
  async navigateToAdminDashboard() {
    await this.goto('/admin');
    await this.waitForPageLoad();
  }

  // ========== TAB NAVIGATION ==========

  /**
   * Click Overview tab
   */
  async clickOverviewTab() {
    await this.clickElement(this.overviewTab);
    await this.wait(300);
  }

  /**
   * Click Products tab
   */
  async clickProductsTab() {
    await this.clickElement(this.productsTab);
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
   * Click Homepage tab
   */
  async clickHomepageTab() {
    await this.clickElement(this.homepageTab);
    await this.wait(300);
  }

  /**
   * Click Users tab
   */
  async clickUsersTab() {
    await this.clickElement(this.usersTab);
    await this.wait(300);
  }

  // ========== METRICS ==========

  /**
   * Get total products count from metric
   * @returns {number} Total products
   */
  async getTotalProductsMetric() {
    const text = await this.getTextContent(this.totalProductsMetric);
    return parseInt(text.match(/\d+/)[0]);
  }

  /**
   * Get total collections count from metric
   * @returns {number} Total collections
   */
  async getTotalCollectionsMetric() {
    const text = await this.getTextContent(this.totalCollectionsMetric);
    return parseInt(text.match(/\d+/)[0]);
  }

  // ========== PRODUCTS CRUD ==========

  /**
   * Click Add Product button
   */
  async clickAddProduct() {
    await this.clickElement(this.addProductButton);
    await this.waitForSelector(this.productModal);
  }

  /**
   * Get number of products in list
   * @returns {number} Number of product rows
   */
  async getProductCount() {
    return await this.getElementCount(this.productRows);
  }

  /**
   * Fill product form
   * @param {Object} productData - Product data
   */
  async fillProductForm(productData) {
    if (productData.name) {
      await this.fillInput(this.productNameInput, productData.name);
    }
    if (productData.price) {
      await this.fillInput(this.productPriceInput, productData.price.toString());
    }
    if (productData.description) {
      await this.fillInput(this.productDescriptionInput, productData.description);
    }
    if (productData.category) {
      await this.page.selectOption(this.productCategorySelect, productData.category);
    }
    if (productData.image) {
      await this.fillInput(this.productImageInput, productData.image);
    }
  }

  /**
   * Save product form
   */
  async saveProduct() {
    await this.clickElement(this.saveProductButton);
    await this.waitForElementToDisappear(this.productModal);
  }

  /**
   * Cancel product form
   */
  async cancelProductForm() {
    await this.clickElement(this.cancelButton);
    await this.waitForElementToDisappear(this.productModal);
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   */
  async createProduct(productData) {
    await this.clickAddProduct();
    await this.fillProductForm(productData);
    await this.saveProduct();
    await this.wait(500);
  }

  /**
   * Edit product by index
   * @param {number} index - Product row index (0-based)
   * @param {Object} updates - Updated product data
   */
  async editProduct(index, updates) {
    await this.clickElement(this.editProductButton(index));
    await this.waitForSelector(this.productModal);
    await this.fillProductForm(updates);
    await this.saveProduct();
    await this.wait(500);
  }

  /**
   * Delete product by index
   * @param {number} index - Product row index (0-based)
   * @param {boolean} confirm - Whether to confirm deletion
   */
  async deleteProduct(index, confirm = true) {
    await this.clickElement(this.deleteProductButton(index));
    
    // Handle confirmation dialog if it appears
    const hasDialog = await this.isElementVisible(this.confirmDialog);
    if (hasDialog) {
      if (confirm) {
        await this.clickElement(this.confirmButton);
      } else {
        await this.clickElement(this.cancelConfirmButton);
      }
    }
    
    await this.wait(500);
  }

  /**
   * Toggle featured status of product
   * @param {number} index - Product row index (0-based)
   */
  async toggleProductFeatured(index) {
    await this.clickElement(this.toggleFeatureButton(index));
    await this.wait(300);
  }

  /**
   * Get product name by index
   * @param {number} index - Product row index (0-based)
   * @returns {string} Product name
   */
  async getProductName(index) {
    const selector = `(${this.productRows})[${index + 1}] td:nth-child(1), (${this.productRows})[${index + 1}] .product-name`;
    return await this.getTextContent(selector);
  }

  /**
   * Check if product is featured
   * @param {number} index - Product row index (0-based)
   * @returns {boolean} True if product is featured
   */
  async isProductFeatured(index) {
    const button = this.toggleFeatureButton(index);
    return await this.hasClass(button, 'text-amber-500') || 
           await this.hasClass(button, 'fill-amber-500');
  }

  // ========== COLLECTIONS CRUD ==========

  /**
   * Click Create Collection button
   */
  async clickCreateCollection() {
    await this.clickElement(this.createCollectionButton);
    await this.waitForSelector(this.collectionModal);
  }

  /**
   * Get number of collections in list
   * @returns {number} Number of collection rows
   */
  async getCollectionCount() {
    return await this.getElementCount(this.collectionRows);
  }

  /**
   * Fill collection form
   * @param {string} name - Collection name
   * @param {Array<number>} productIndices - Indices of products to include
   * @param {boolean} featured - Whether to feature on homepage
   */
  async fillCollectionForm(name, productIndices = [], featured = false) {
    await this.fillInput(this.collectionNameInput, name);
    
    // Select products
    for (const index of productIndices) {
      const checkbox = `(${this.productCheckboxes})[${index + 1}]`;
      await this.clickElement(checkbox);
    }
    
    // Toggle featured if needed
    if (featured) {
      const isChecked = await this.page.isChecked(this.featureOnHomepageCheckbox);
      if (!isChecked) {
        await this.clickElement(this.featureOnHomepageCheckbox);
      }
    }
  }

  /**
   * Save collection form
   */
  async saveCollection() {
    await this.clickElement(this.saveCollectionButton);
    await this.waitForElementToDisappear(this.collectionModal);
  }

  /**
   * Create a new collection
   * @param {string} name - Collection name
   * @param {Array<number>} productIndices - Product indices to include
   * @param {boolean} featured - Whether to feature on homepage
   */
  async createCollection(name, productIndices = [], featured = false) {
    await this.clickCreateCollection();
    await this.fillCollectionForm(name, productIndices, featured);
    await this.saveCollection();
    await this.wait(500);
  }

  /**
   * Edit collection by index
   * @param {number} index - Collection row index (0-based)
   * @param {Object} updates - Updated collection data
   */
  async editCollection(index, updates) {
    await this.clickElement(this.editCollectionButton(index));
    await this.waitForSelector(this.collectionModal);
    
    if (updates.name) {
      await this.fillInput(this.collectionNameInput, updates.name);
    }
    
    await this.saveCollection();
    await this.wait(500);
  }

  /**
   * Delete collection by index
   * @param {number} index - Collection row index (0-based)
   * @param {boolean} confirm - Whether to confirm deletion
   */
  async deleteCollection(index, confirm = true) {
    await this.clickElement(this.deleteCollectionButton(index));
    
    const hasDialog = await this.isElementVisible(this.confirmDialog);
    if (hasDialog) {
      if (confirm) {
        await this.clickElement(this.confirmButton);
      } else {
        await this.clickElement(this.cancelConfirmButton);
      }
    }
    
    await this.wait(500);
  }

  /**
   * Get collection name by index
   * @param {number} index - Collection row index (0-based)
   * @returns {string} Collection name
   */
  async getCollectionName(index) {
    const selector = `(${this.collectionRows})[${index + 1}] td:nth-child(1), (${this.collectionRows})[${index + 1}] .collection-name`;
    return await this.getTextContent(selector);
  }

  // ========== HOMEPAGE MANAGEMENT ==========

  /**
   * Get number of featured products
   * @returns {number} Number of featured products
   */
  async getFeaturedProductsCount() {
    const selector = `${this.featuredProducts} .product-card`;
    return await this.getElementCount(selector);
  }

  /**
   * Get number of featured collections
   * @returns {number} Number of featured collections
   */
  async getFeaturedCollectionsCount() {
    const selector = `${this.featuredCollections} .collection-card`;
    return await this.getElementCount(selector);
  }

  /**
   * Remove featured item by index
   * @param {number} index - Featured item index (0-based)
   */
  async removeFeaturedItem(index) {
    const buttons = await this.page.$$(this.removeFeatureButton);
    if (buttons[index]) {
      await buttons[index].click();
      await this.wait(300);
    }
  }

  // ========== VALIDATION ==========

  /**
   * Verify product was created
   * @param {string} productName - Name of product to verify
   * @returns {boolean} True if product exists
   */
  async verifyProductExists(productName) {
    const count = await this.getProductCount();
    for (let i = 0; i < count; i++) {
      const name = await this.getProductName(i);
      if (name.includes(productName)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verify collection was created
   * @param {string} collectionName - Name of collection to verify
   * @returns {boolean} True if collection exists
   */
  async verifyCollectionExists(collectionName) {
    const count = await this.getCollectionCount();
    for (let i = 0; i < count; i++) {
      const name = await this.getCollectionName(i);
      if (name.includes(collectionName)) {
        return true;
      }
    }
    return false;
  }
}
