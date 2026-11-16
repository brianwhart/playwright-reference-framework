import { test, expect } from '../../src/fixtures/base.fixture';
import users from '../../src/data/users.json';

test.describe('Authentication Flows', () => {
  test('should allow a standard user to log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('should display an error message for a locked-out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);

    await expect(loginPage.errorMessage).toHaveText(users.lockedUser.expectedError);
  });
});
