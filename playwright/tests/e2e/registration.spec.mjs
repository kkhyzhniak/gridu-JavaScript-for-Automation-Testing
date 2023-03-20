import { test, expect } from '@playwright/test';

test.describe('Registration', () => {
    test('Go to registration page', async ({page}) => {
        await page.goto('/signup');
        await page.locator('[name="firstName"]').fill('John');
        await page.locator('[name="lastName"]').fill('Doe');
        await page.locator('[name="username"]').fill('JD2023');
        await page.locator('[name="password"]').fill('1234');
        await page.locator('[name="confirmPassword"]').fill('1234');
        await page.locator('[data-test="signup-submit"]').click();

        await expect(page).toHaveURL(/\/signin/);
    })
});