import { test, expect } from '@playwright/test';

test.describe('API Integration Checks', () => {
  test('should verify REST API endpoint returns 200 OK', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });
});
