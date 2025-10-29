import { test, expect } from '@playwright/test';

/**
 * HTML Structure Inspector
 * 
 * This test will show you the ACTUAL structure of your React app
 * so we can match the test selectors to your real HTML.
 */

test.describe('HTML Structure Inspector', () => {
  test('INSPECT-001: Show page structure and elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for page to fully load
    
    console.log('\n==========================================');
    console.log('📋 INSPECTING YOUR REACT APP STRUCTURE');
    console.log('==========================================\n');
    
    // 1. Page Title
    const title = await page.title();
    console.log('📄 Page Title:', title);
    
    // 2. URL
    console.log('🌐 Current URL:', page.url());
    
    // 3. Check for common structural elements
    console.log('\n🏗️  STRUCTURE:');
    console.log('   - <header> tags:', await page.locator('header').count());
    console.log('   - <nav> tags:', await page.locator('nav').count());
    console.log('   - <main> tags:', await page.locator('main').count());
    console.log('   - <footer> tags:', await page.locator('footer').count());
    
    // 4. Navigation elements
    console.log('\n🧭 NAVIGATION:');
    const navLinks = await page.locator('nav a, header a').count();
    console.log('   - Links in nav/header:', navLinks);
    
    if (navLinks > 0) {
      const linkTexts = await page.locator('nav a, header a').allTextContents();
      console.log('   - Link texts:', linkTexts.slice(0, 10)); // First 10 links
    }
    
    // 5. Buttons
    console.log('\n🔘 BUTTONS:');
    const allButtons = await page.locator('button').count();
    console.log('   - Total buttons:', allButtons);
    
    if (allButtons > 0) {
      const buttonTexts = await page.locator('button').allTextContents();
      console.log('   - Button texts:', buttonTexts.filter(t => t.trim()).slice(0, 10));
    }
    
    // 6. Look for Login/Auth elements
    console.log('\n🔐 LOGIN/AUTH ELEMENTS:');
    
    const loginVariations = [
      'button:has-text("Login")',
      'button:has-text("login")',
      'button:has-text("Sign In")',
      'button:has-text("Sign in")',
      'a:has-text("Login")',
      'a:has-text("login")',
      '[data-testid*="login"]',
      '[class*="login"]',
      '[id*="login"]',
    ];
    
    for (const selector of loginVariations) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`   ✅ Found with selector: ${selector} (${count} elements)`);
      }
    }
    
    // 7. Check for product/item elements
    console.log('\n🛍️  PRODUCTS/ITEMS:');
    const productSelectors = [
      '.product',
      '.product-card',
      '[data-testid*="product"]',
      '.card',
      '.item',
      '.item-card',
    ];
    
    for (const selector of productSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`   ✅ Found with selector: ${selector} (${count} elements)`);
      }
    }
    
    // 8. Get visible text content (first 500 chars)
    console.log('\n📝 VISIBLE TEXT (first 500 chars):');
    const bodyText = await page.locator('body').textContent();
    const cleanText = bodyText.replace(/\s+/g, ' ').trim();
    console.log('   ', cleanText.substring(0, 500));
    
    // 9. Check for common React/Vite elements
    console.log('\n⚛️  REACT APP INDICATORS:');
    const reactRoot = await page.locator('#root, #app, [data-reactroot]').count();
    console.log('   - React root element:', reactRoot > 0 ? '✅ Found' : '❌ Not found');
    
    // 10. Get all unique class names (sample)
    console.log('\n🎨 SAMPLE CLASS NAMES:');
    const allElements = await page.locator('*').all();
    const classNames = new Set();
    
    for (let i = 0; i < Math.min(allElements.length, 100); i++) {
      const classes = await allElements[i].getAttribute('class');
      if (classes) {
        classes.split(' ').forEach(c => {
          if (c.trim()) classNames.add(c.trim());
        });
      }
    }
    
    const classArray = Array.from(classNames).slice(0, 20);
    console.log('   - Sample classes:', classArray.join(', '));
    
    // 11. Take a screenshot
    await page.screenshot({ 
      path: 'app-structure-screenshot.png', 
      fullPage: true 
    });
    console.log('\n📸 Screenshot saved: app-structure-screenshot.png');
    
    // 12. Save HTML to file
    const html = await page.content();
    const fs = require('fs');
    fs.writeFileSync('app-structure.html', html);
    console.log('💾 HTML saved: app-structure.html');
    
    console.log('\n==========================================');
    console.log('✅ INSPECTION COMPLETE');
    console.log('==========================================\n');
    
    // Test should pass - we're just inspecting
    expect(true).toBe(true);
  });

  test('INSPECT-002: Find navigation bar structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    console.log('\n🧭 DETAILED NAVIGATION INSPECTION:\n');
    
    // Get the navigation HTML
    const navSelectors = ['nav', 'header', '[role="navigation"]', '.navbar', '.navigation'];
    
    for (const selector of navSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`Found navigation with selector: ${selector}`);
        const innerHTML = await page.locator(selector).first().innerHTML();
        console.log('Inner HTML (first 500 chars):');
        console.log(innerHTML.substring(0, 500));
        console.log('\n---\n');
      }
    }
  });

  test('INSPECT-003: Show all interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    console.log('\n🖱️  ALL INTERACTIVE ELEMENTS:\n');
    
    // Get all buttons with their properties
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons:\n`);
    
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      const className = await buttons[i].getAttribute('class');
      const id = await buttons[i].getAttribute('id');
      
      console.log(`Button ${i + 1}:`);
      console.log(`  Text: "${text?.trim()}"`);
      if (ariaLabel) console.log(`  aria-label: "${ariaLabel}"`);
      if (className) console.log(`  class: "${className}"`);
      if (id) console.log(`  id: "${id}"`);
      console.log('---');
    }
    
    // Get all links
    const links = await page.locator('a').all();
    console.log(`\nFound ${links.length} links:\n`);
    
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const text = await links[i].textContent();
      const href = await links[i].getAttribute('href');
      
      console.log(`Link ${i + 1}:`);
      console.log(`  Text: "${text?.trim()}"`);
      console.log(`  href: "${href}"`);
      console.log('---');
    }
  });
});
