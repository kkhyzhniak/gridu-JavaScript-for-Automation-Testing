import { test, expect } from '@playwright/test';

test.describe('Login', () => {
    test('Go to login page', async ({page}) => {
        await page.goto('/signin');
        await page.locator('[name="username"]').fill('Katharina_Bernier');
        await page.locator('[name="password"]').fill('s3cret');
        await page.locator('[data-test="signin-submit"]').click();

        await expect(page).toHaveURL('http://localhost:3000');
        await expect(page.locator('[data-test="sidenav-user-full-name"]')).toHaveText('Joaaahn J');
        await expect(page.locator('[data-test="sidenav-username"]')).toHaveText('@' + 'Katharina_Bernier');
        await expect(page.locator('[data-test="sidenav-signout"]')).toBeVisible();

    })
});