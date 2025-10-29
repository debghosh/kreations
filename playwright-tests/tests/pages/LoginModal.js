import { BasePage } from './BasePage.js';

/**
 * LoginModal - Page Object for login/authentication modal
 * 
 * Features:
 * - Login as Subscriber
 * - Login as Admin
 * - Form validation
 * - Session management
 */

export class LoginModal extends BasePage {
  constructor(page) {
    super(page);
    
    // Modal elements
    this.modal = '[role="dialog"], .modal, [data-testid="login-modal"]';
    this.modalTitle = `${this.modal} h2, ${this.modal} h3`;
    this.closeButton = `${this.modal} button[aria-label="Close"], ${this.modal} button:has-text("×")`;
    
    // Form elements
    this.emailInput = 'input[type="email"], input[name="email"], input[placeholder*="email"]';
    this.passwordInput = 'input[type="password"], input[name="password"]';
    this.loginButton = 'button[type="submit"], button:has-text("Login")';
    
    // Quick login buttons
    this.loginAsSubscriberButton = 'button:has-text("Login as Subscriber")';
    this.loginAsAdminButton = 'button:has-text("Login as Admin")';
    
    // Error/success messages
    this.errorMessage = '.error-message, [role="alert"]';
    this.successMessage = '.success-message';
  }

  /**
   * Wait for modal to be visible
   */
  async waitForModal() {
    await this.waitForSelector(this.modal, 10000);
  }

  /**
   * Check if modal is open
   * @returns {boolean} True if modal is visible
   */
  async isModalOpen() {
    return await this.isElementVisible(this.modal);
  }

  /**
   * Get modal title
   * @returns {string} Modal title text
   */
  async getModalTitle() {
    return await this.getTextContent(this.modalTitle);
  }

  /**
   * Close the modal
   */
  async closeModal() {
    await this.clickElement(this.closeButton);
    await this.waitForElementToDisappear(this.modal);
  }

  /**
   * Fill email field
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Fill password field
   * @param {string} password - Password
   */
  async fillPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform manual login
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async login(email, password) {
    await this.waitForModal();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.wait(500); // Wait for login to process
  }

  /**
   * Quick login as subscriber
   */
  async loginAsSubscriber() {
    await this.waitForModal();
    await this.clickElement(this.loginAsSubscriberButton);
    await this.wait(500);
  }

  /**
   * Quick login as admin
   */
  async loginAsAdmin() {
    await this.waitForModal();
    await this.clickElement(this.loginAsAdminButton);
    await this.wait(500);
  }

  /**
   * Check if error message is displayed
   * @returns {boolean} True if error message is visible
   */
  async hasError() {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get error message text
   * @returns {string} Error message
   */
  async getErrorMessage() {
    if (await this.hasError()) {
      return await this.getTextContent(this.errorMessage);
    }
    return null;
  }

  /**
   * Verify login was successful by checking localStorage
   * @returns {boolean} True if user is logged in
   */
  async verifyLoginSuccess() {
    const user = await this.getLocalStorageItem('user');
    return user !== null && user.email !== undefined;
  }

  /**
   * Get logged in user details from localStorage
   * @returns {Object} User object
   */
  async getLoggedInUser() {
    return await this.getLocalStorageItem('user');
  }

  /**
   * Verify user role
   * @param {string} expectedRole - Expected role ('admin' or 'subscriber')
   * @returns {boolean} True if role matches
   */
  async verifyUserRole(expectedRole) {
    const user = await this.getLoggedInUser();
    return user && user.role === expectedRole;
  }

  /**
   * Complete login flow for subscriber
   */
  async completeSubscriberLogin() {
    await this.loginAsSubscriber();
    await this.waitForElementToDisappear(this.modal);
    return await this.verifyUserRole('subscriber');
  }

  /**
   * Complete login flow for admin
   */
  async completeAdminLogin() {
    await this.loginAsAdmin();
    await this.waitForElementToDisappear(this.modal);
    return await this.verifyUserRole('admin');
  }
}
