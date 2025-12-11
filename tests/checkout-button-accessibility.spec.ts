import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Cart Checkout Button Accessibility', () => {
  test('T018: Verify checkout button is accessible from cart sidebar', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Navigate to bstackdemo.com
    await homePage.goto();
    
    // Add first product to cart
    await homePage.addFirstProductToCart();
    
    // Wait for cart to update and verify cart sidebar is visible with product added
    await expect(homePage.cartBadge).toHaveText('1');
    await expect(homePage.cartSidebar).toBeVisible();
    await expect(homePage.cartItemTitle).toBeVisible();
    
    // Verify checkout button is visible and accessible in cart sidebar
    await expect(homePage.checkoutButton).toBeVisible();
    
    // Click checkout button to initiate checkout process
    await homePage.clickCheckout();
    
    // Verify navigation to checkout/signin page
    await expect(page).toHaveURL(/.*signin.*checkout=true/);
  });
});