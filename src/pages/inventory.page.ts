import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart(itemName: string) {
    const itemContainer = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await itemContainer.getByRole('button', { name: 'Add to cart' }).click();
  }
}
