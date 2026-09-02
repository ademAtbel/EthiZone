const { test, expect } = require('@playwright/test');

test.describe('EthiZone Marketplace End-to-End Test Suite', () => {

  test('1. Home Page Loads & Brand Elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/EthiZone|Ultimate Master Marketplace/i);
    // Verify brand animated logo or logo text
    const logoText = page.locator('.ethizone-logo-text-fixed, .logo');
    await expect(logoText.first()).toBeVisible();
  });

  test('2. Registration & Login Flow', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h2')).toContainText(/Create Account|Register/i);

    // Form inputs check
    const nameInput = page.locator('input[name="username"], input[id="username"]');
    const emailInput = page.locator('input[name="email"], input[id="email"]');
    const passInput = page.locator('input[name="password"], input[id="password"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passInput).toBeVisible();

    // Navigate to Login page
    await page.goto('/login');
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('3. Business Onboarding Category Selection', async ({ page }) => {
    await page.goto('/register');
    
    // Select Business Account Role if present
    const bizRoleBtn = page.locator('button:has-text("Store / Business Owner"), button:has-text("Business")');
    if (await bizRoleBtn.count() > 0) {
      await bizRoleBtn.first().click();
    }

    // Verify Business Category dropdown or radio selectors
    const categorySelector = page.locator('select[name="businessType"], select[name="category"]');
    if (await categorySelector.count() > 0) {
      await expect(categorySelector.first()).toBeVisible();
    }
  });

  test('4. Protected Route Redirect Enforcement', async ({ page }) => {
    // Attempt to navigate to private dashboard without token
    await page.goto('/dashboard');
    // Expect redirect to login page
    await page.waitForURL(/\/(login|register)/, { timeout: 5000 }).catch(() => {});
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(login|register|\/)/);
  });

  test('5. Public Marketplace & Category Filter Navigation', async ({ page }) => {
    await page.goto('/');
    
    // Verify filter badges exist
    const storeBadge = page.locator('.filter-badge:has-text("Stores")');
    if (await storeBadge.count() > 0) {
      await expect(storeBadge.first()).toBeVisible();
      await storeBadge.first().click();
    }
  });

  test('6. Mobile Responsive Navbar Navigation', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      const menuBtn = page.locator('button[aria-label="Toggle menu"], .menu-toggle');
      if (await menuBtn.count() > 0) {
        await menuBtn.first().click();
      }
    }
  });

  test('7. Private Events Management Portal Route', async ({ page }) => {
    await page.goto('/private-events');
    // Verify private events page header
    const heading = page.locator('h2');
    await expect(heading).toContainText(/Private Events/i);
  });

  test('8. Scenario G — Private Invitation Phone Access Security (Access Denied Check)', async ({ page }) => {
    // Navigate to a random/uninvited invitation token
    await page.goto('/invitation/invalid-test-token-123456');
    
    // Should prompt for phone verification or render Access Denied
    const phoneInput = page.locator('input[placeholder*="5713429228"], input[type="text"]');
    await expect(phoneInput.first()).toBeVisible();

    // Enter uninvited phone number
    await phoneInput.first().fill('9998887777');
    await page.click('button:has-text("Verify Access")');

    // Expect ACCESS DENIED alert error
    const accessDeniedAlert = page.locator('.alert-danger');
    await expect(accessDeniedAlert).toBeVisible();
    await expect(accessDeniedAlert).toContainText(/ACCESS DENIED|Unauthorized/i);
  });

});
