/**
 * Authentication Helper
 * 
 * Provides reusable login/logout functions for all tests
 */

/**
 * Login as a subscriber user
 * @param {Page} page - Playwright page object
 */
export async function loginAsSubscriber(page) {
  await page.goto('/');
  
  // Open login modal
  await page.click('nav button:has-text("Login")');
  await page.waitForTimeout(1000);
  
  // Fill credentials
  await page.fill('input[type="email"]', 'subscriber@test.com');
  
  // Fill password and submit via Enter key
  const passwordField = page.locator('input[type="password"]');
  await passwordField.fill('password123');
  await passwordField.press('Enter');
  
  // Wait for login to complete
  await page.waitForTimeout(3000);
  
  // Verify login successful by checking for Profile button
  await page.waitForSelector('button:has-text("Profile")', { timeout: 5000 });
}

/**
 * Login as an admin user
 * @param {Page} page - Playwright page object
 */
export async function loginAsAdmin(page) {
  await page.goto('/');
  
  // Open login modal
  await page.click('nav button:has-text("Login")');
  await page.waitForTimeout(500);
  
  // Fill admin credentials
  await page.fill('input[type="email"]', 'admin@test.com');
  
  const passwordField = page.locator('input[type="password"]');
  await passwordField.fill('admin123');
  await passwordField.press('Enter');
  
  await page.waitForTimeout(2000);
  
  // Verify admin login
  await page.waitForSelector('button:has-text("Profile")', { timeout: 5000 });
}

/**
 * Logout current user
 * @param {Page} page - Playwright page object
 */
export async function logout(page) {
  await page.click('button:has-text("Logout")');
  await page.waitForTimeout(1000);
  
  // Verify logout by checking Login button reappears
  await page.waitForSelector('button:has-text("Login")', { timeout: 3000 });
}

/**
 * Check if user is logged in
 * @param {Page} page - Playwright page object
 * @returns {Promise<boolean>}
 */
export async function isLoggedIn(page) {
  const profileButton = await page.locator('button:has-text("Profile")').count();
  return profileButton > 0;
}
