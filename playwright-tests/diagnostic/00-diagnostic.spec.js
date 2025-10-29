import { test, expect } from '@playwright/test';

/**
 * Simple Diagnostic Test
 * 
 * This test checks if your React application is accessible.
 * Run this FIRST to diagnose connection issues.
 */

test.describe('Diagnostic Tests', () => {
  test('DIAGNOSTIC-001: Can connect to application', async ({ page }) => {
    console.log('Attempting to connect to application...');
    
    try {
      await page.goto('/', { timeout: 10000 });
      console.log('✅ Successfully connected to application');
      
      // Take a screenshot
      await page.screenshot({ path: 'diagnostic-homepage.png', fullPage: true });
      console.log('✅ Screenshot saved as diagnostic-homepage.png');
      
      // Check page title
      const title = await page.title();
      console.log('📄 Page title:', title);
      
      // Check if page has content
      const bodyText = await page.locator('body').textContent();
      console.log('📝 Page has content:', bodyText.length, 'characters');
      
      expect(bodyText.length).toBeGreaterThan(0);
      
    } catch (error) {
      console.error('❌ Failed to connect to application');
      console.error('Error:', error.message);
      throw error;
    }
  });

  test('DIAGNOSTIC-002: Check for navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for common navigation elements
    const hasNav = await page.locator('nav, header, [role="navigation"]').count();
    console.log('Navigation elements found:', hasNav);
    
    // Check for any links
    const linkCount = await page.locator('a').count();
    console.log('Links found:', linkCount);
    
    // Check for any buttons
    const buttonCount = await page.locator('button').count();
    console.log('Buttons found:', buttonCount);
    
    expect(hasNav).toBeGreaterThan(0);
  });

  test('DIAGNOSTIC-003: Check if login functionality exists', async ({ page }) => {
    await page.goto('/');
    
    // Look for login-related elements
    const loginButtons = await page.locator('button:has-text("login"), button:has-text("Login"), a:has-text("login"), a:has-text("Login")').count();
    console.log('Login buttons/links found:', loginButtons);
    
    if (loginButtons > 0) {
      console.log('✅ Login functionality appears to exist');
    } else {
      console.log('⚠️  No obvious login buttons found');
    }
  });

  test('DIAGNOSTIC-004: List all visible text on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Get all text content
    const allText = await page.locator('body').textContent();
    const words = allText.split(/\s+/).filter(w => w.length > 2);
    const uniqueWords = [...new Set(words)].slice(0, 20);
    
    console.log('First 20 unique words on page:', uniqueWords.join(', '));
    
    expect(words.length).toBeGreaterThan(10);
  });

  test('DIAGNOSTIC-005: Check application structure', async ({ page }) => {
    await page.goto('/');
    
    const structure = {
      hasHeader: await page.locator('header').count(),
      hasNav: await page.locator('nav').count(),
      hasMain: await page.locator('main').count(),
      hasFooter: await page.locator('footer').count(),
      totalDivs: await page.locator('div').count(),
      totalButtons: await page.locator('button').count(),
      totalLinks: await page.locator('a').count(),
      totalImages: await page.locator('img').count(),
    };
    
    console.log('Application structure:');
    console.log(JSON.stringify(structure, null, 2));
    
    // At least some elements should exist
    const totalElements = structure.totalDivs + structure.totalButtons + structure.totalLinks;
    expect(totalElements).toBeGreaterThan(5);
  });
});
