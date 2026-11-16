import { test, expect } from '../../src/fixtures/base.fixture';
import users from '../../src/data/users.json';

test.describe('Shopping Cart Flows', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('should update cart badge when adding an item @smoke', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
