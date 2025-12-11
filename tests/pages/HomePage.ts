import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartSidebar: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemTitle: Locator;
  readonly productContainers: Locator;
  readonly productCountText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.getByText('Add to cart');
    this.cartBadge = page.locator('.bag__quantity').first();
    this.cartSidebar = page.locator('.float-cart');
    this.checkoutButton = page.getByText('CHECKOUT');
    this.cartItemTitle = page.locator('.float-cart .title');
    this.productContainers = page.locator('.shelf-item');
    this.productCountText = page.getByText(/\d+ Product\(s\) found\./);
  }

  async goto() {
    await this.page.goto('https://bstackdemo.com');
    await this.page.waitForLoadState('networkidle');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async getCartItemCount(): Promise<string> {
    return await this.cartBadge.textContent() || '0';
  }

  async isCartSidebarVisible(): Promise<boolean> {
    return await this.cartSidebar.isVisible();
  }

  async getCartItemTitle(): Promise<string> {
    return await this.cartItemTitle.textContent() || '';
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.checkoutButton.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productContainers.count();
  }

  async isProductCountTextVisible(): Promise<boolean> {
    return await this.productCountText.isVisible();
  }

  async verifyProductHasCompleteInfo(productIndex: number): Promise<boolean> {
    const product = this.productContainers.nth(productIndex);
    
    const hasImage = await product.locator('img').isVisible();
    const hasTitle = await product.locator('p.shelf-item__title').isVisible();
    const hasPrice = await product.locator('.shelf-item__price').isVisible();
    const hasAddToCart = await product.getByText('Add to cart').isVisible();
    
    return hasImage && hasTitle && hasPrice && hasAddToCart;
  }
}