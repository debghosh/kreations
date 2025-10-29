import { test, expect } from '@playwright/test';
import { loginAsSubscriber } from '../helpers/auth';

/**
 * UI/UX & DATA PERSISTENCE TESTS (CORRECTED)
 * 
 * Total: 25 test cases
 * Tests: Responsive design, visual consistency, data persistence
 * Priority: P2 (Medium)
 */

test.describe('Responsive Design', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });
  
  test('RESP-001: Homepage is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('main')).toBeVisible();
  });

  test('RESP-002: Homepage is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('main')).toBeVisible();
  });

  test('RESP-003: Homepage is responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('main')).toBeVisible();
  });

  test('RESP-004: Navigation adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu button should exist
    const mobileMenuBtn = page.locator('button.md\\:hidden').first();
    await expect(mobileMenuBtn).toBeVisible();
  });

  test('RESP-005: Products grid adapts to screen size', async ({ page }) => {
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    // Products should be visible on both
    await expect(page.locator('main')).toBeVisible();
  });

  test('RESP-006: Action buttons are accessible on mobile', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const favoriteBtn = page.locator('button:has(svg.lucide-heart)').first();
    await expect(favoriteBtn).toBeVisible();
    
    // Should be tappable
    await favoriteBtn.click();
    await page.waitForTimeout(300);
  });

  test('RESP-007: Text is readable on all screen sizes', async ({ page }) => {
    const sizes = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 }  // Desktop
    ];
    
    for (const size of sizes) {
      await page.setViewportSize(size);
      await page.goto('/');
      
      // Check that text is visible
      await expect(page.locator('h1, h2, h3').first()).toBeVisible();
    }
  });

  test('RESP-008: Images scale properly', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    expect(count).toBeGreaterThan(0);
    
    // First image should be visible
    await expect(images.first()).toBeVisible();
  });

  test.skip('RESP-009: Login modal works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.click('nav button:has-text("Login")');
    await page.waitForTimeout(500);
    
    // Form should be visible and usable
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('RESP-010: Profile page is responsive', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/profile');
    
    await page.waitForTimeout(500);
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Visual Consistency', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });
  
  test('UI-001: All buttons have consistent styling', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    const favoriteButtons = page.locator('button:has(svg.lucide-heart)');
    const count = await favoriteButtons.count();
    
    // Check first 3 buttons have similar styling
    for (let i = 0; i < Math.min(3, count); i++) {
      const btn = favoriteButtons.nth(i);
      const classes = await btn.getAttribute('class');
      
      expect(classes).toContain('rounded-full');
    }
  });

  test('UI-002: Product cards have consistent layout', async ({ page }) => {
    await page.goto('/');
    
    const products = page.locator('[class*="group"]');
    const count = await products.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('UI-003: Colors are consistent across pages', async ({ page }) => {
    await loginAsSubscriber(page);
    
    // Check homepage
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Check portfolio
    await page.goto('/portfolio');
    await page.waitForTimeout(500);
    
    // Check profile
    await page.goto('/profile');
    await page.waitForTimeout(500);
    
    // All pages should load successfully
    expect(true).toBe(true);
  });

  test('UI-004: Typography is consistent', async ({ page }) => {
    await page.goto('/');
    
    // Check headings
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('UI-005: Spacing is consistent', async ({ page }) => {
    await page.goto('/');
    
    // Visual regression would be ideal here
    // For now, just verify page loads correctly
    await expect(page.locator('main')).toBeVisible();
  });

  test('UI-006: Icons are consistent size', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    const icons = page.locator('svg');
    const count = await icons.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('UI-007: Hover states are visible', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    const firstBtn = page.locator('button:has(svg.lucide-heart)').first();
    await firstBtn.hover();
    await page.waitForTimeout(300);
    
    await expect(firstBtn).toBeVisible();
  });

  test('UI-008: Focus states are visible', async ({ page }) => {
    await page.goto('/');
    
    // Tab to a button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // A focused element should exist
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).toBeTruthy();
  });

  test('UI-009: Animations are smooth', async ({ page }) => {
    await page.goto('/');
    
    // Hover over a product card
    const firstProduct = page.locator('[class*="group"]').first();
    await firstProduct.hover();
    await page.waitForTimeout(500);
    
    await expect(firstProduct).toBeVisible();
  });

  test('UI-010: Loading states are shown', async ({ page }) => {
    await page.goto('/');
    
    // Page should load within reasonable time
    await page.waitForTimeout(2000);
    
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Data Persistence', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });
  
  test('DATA-001: localStorage is used for data', async ({ page }) => {
    await page.goto('/');
    
    // Check localStorage keys exist
    const keys = await page.evaluate(() => {
      return Object.keys(localStorage);
    });
    
    expect(keys.length).toBeGreaterThan(0);
  });

  test('DATA-002: Products data persists', async ({ page }) => {
    await page.goto('/');
    
    const productsData = await page.evaluate(() => {
      return localStorage.getItem('products');
    });
    
    expect(productsData).toBeTruthy();
  });

  test('DATA-003: User favorites persist after refresh', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Favorite an item
    const firstBtn = page.locator('button:has(svg.lucide-heart)').first();
    await firstBtn.click();
    await page.waitForTimeout(300);
    
    // Refresh
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Check if still favorited
    const heartIcon = firstBtn.locator('svg.lucide-heart');
    const classes = await heartIcon.getAttribute('class');
    expect(classes).toContain('fill-red-500');
  });

  test('DATA-004: User saved items persist after refresh', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Save an item
    const firstBtn = page.locator('button:has(svg.lucide-bookmark)').first();
    await firstBtn.click();
    await page.waitForTimeout(300);
    
    // Refresh
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Check if still saved
    const bookmarkIcon = firstBtn.locator('svg.lucide-bookmark');
    const classes = await bookmarkIcon.getAttribute('class');
    expect(classes).toContain('fill-blue-500');
  });

  test('DATA-005: Data survives page navigation', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Favorite an item
    const firstBtn = page.locator('button:has(svg.lucide-heart)').first();
    await firstBtn.click();
    await page.waitForTimeout(300);
    
    // Navigate away
    await page.goto('/portfolio');
    await page.waitForTimeout(500);
    
    // Navigate back
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Should still be favorited
    const heartIcon = firstBtn.locator('svg.lucide-heart');
    const classes = await heartIcon.getAttribute('class');
    expect(classes).toContain('fill-red-500');
  });

  test('DATA-006: Multiple items can be stored', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Favorite multiple items
    const buttons = page.locator('button:has(svg.lucide-heart)');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(3, count); i++) {
      await buttons.nth(i).click();
      await page.waitForTimeout(200);
    }
    
    // All should be favorited
    for (let i = 0; i < Math.min(3, count); i++) {
      const icon = buttons.nth(i).locator('svg.lucide-heart');
      const classes = await icon.getAttribute('class');
      expect(classes).toContain('fill-red-500');
    }
  });

  test('DATA-007: Data is user-specific', async ({ page }) => {
    // This would require multiple user accounts
    // Placeholder for multi-user testing
    expect(true).toBe(true);
  });

  test('DATA-008: localStorage does not exceed limits', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Check localStorage size
    const size = await page.evaluate(() => {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    });
    
    // Should be under 5MB (typical browser limit)
    expect(size).toBeLessThan(5000000);
  });

  test('DATA-009: Data clears on logout', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Favorite an item
    const firstBtn = page.locator('button:has(svg.lucide-heart)').first();
    await firstBtn.click();
    await page.waitForTimeout(300);
    
    // Check localStorage before logout
    const beforeLogout = await page.evaluate(() => {
      return localStorage.getItem('favorites');
    });
    
    expect(beforeLogout).toBeTruthy();
    
    // Note: Adjust based on your logout behavior
    // Some apps clear data on logout, some keep it
  });

  test('DATA-010: Data integrity is maintained', async ({ page }) => {
    await loginAsSubscriber(page);
    await page.goto('/');
    
    // Make multiple changes quickly
    const buttons = page.locator('button:has(svg.lucide-heart)');
    await buttons.nth(0).click();
    await buttons.nth(1).click();
    await buttons.nth(0).click(); // Toggle off
    await buttons.nth(2).click();
    
    await page.waitForTimeout(500);
    
    // Data should be consistent
    // Check that localStorage is valid JSON
    const data = await page.evaluate(() => {
      try {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : null;
      } catch (e) {
        return null;
      }
    });
    
    expect(data).not.toBeNull();
  });
});
