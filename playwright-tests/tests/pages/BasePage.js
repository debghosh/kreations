/**
 * BasePage - Foundation for all Page Object Models
 * 
 * Provides common functionality used across all pages:
 * - Navigation helpers
 * - Wait utilities
 * - localStorage interactions
 * - Common assertions
 */

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path
   * @param {string} path - The path to navigate to
   */
  async goto(path = '/') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Network idle timeout is not critical, continue
    });
  }

  /**
   * Get current URL
   * @returns {string} Current page URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForSelector(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click element with wait
   * @param {string} selector - Element selector
   */
  async clickElement(selector) {
    await this.waitForSelector(selector);
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   */
  async fillInput(selector, value) {
    await this.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  /**
   * Get element text content
   * @param {string} selector - Element selector
   * @returns {string} Text content
   */
  async getTextContent(selector) {
    await this.waitForSelector(selector);
    return await this.page.textContent(selector);
  }

  /**
   * Check if element exists
   * @param {string} selector - Element selector
   * @returns {boolean} True if element exists
   */
  async isElementVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get element count
   * @param {string} selector - Element selector
   * @returns {number} Number of elements
   */
  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Get localStorage item
   * @param {string} key - localStorage key
   * @returns {any} Parsed localStorage value
   */
  async getLocalStorageItem(key) {
    return await this.page.evaluate((storageKey) => {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : null;
    }, key);
  }

  /**
   * Set localStorage item
   * @param {string} key - localStorage key
   * @param {any} value - Value to store
   */
  async setLocalStorageItem(key, value) {
    await this.page.evaluate(
      ({ storageKey, storageValue }) => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
      },
      { storageKey: key, storageValue: value }
    );
  }

  /**
   * Clear localStorage
   */
  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Get all localStorage items
   * @returns {Object} All localStorage items
   */
  async getAllLocalStorage() {
    return await this.page.evaluate(() => {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = JSON.parse(localStorage.getItem(key));
      }
      return items;
    });
  }

  /**
   * Wait for element to disappear
   * @param {string} selector - Element selector
   */
  async waitForElementToDisappear(selector) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout: 5000 });
  }

  /**
   * Hover over element
   * @param {string} selector - Element selector
   */
  async hoverElement(selector) {
    await this.waitForSelector(selector);
    await this.page.hover(selector);
  }

  /**
   * Press keyboard key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Get element attribute
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @returns {string} Attribute value
   */
  async getElementAttribute(selector, attribute) {
    await this.waitForSelector(selector);
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Check if element has class
   * @param {string} selector - Element selector
   * @param {string} className - Class name to check
   * @returns {boolean} True if element has class
   */
  async hasClass(selector, className) {
    const classes = await this.getElementAttribute(selector, 'class');
    return classes.includes(className);
  }

  /**
   * Wait for specified time
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Reload the page
   */
  async reload() {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Get page title
   * @returns {string} Page title
   */
  async getPageTitle() {
    return await this.page.title();
  }
}
