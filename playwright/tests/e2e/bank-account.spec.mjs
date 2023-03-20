import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/signin');
    await page.locator('[name="username"]').fill('Katharina_Bernier');
    await page.locator('[name="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();
  });

test.describe('Bank accounts', () => {
    test('Add bank account', async ({page}) => {
        await page.locator('[data-test="sidenav-bankaccounts"]').click();
        await page.locator('[data-test="bankaccount-new"]').click();
        await page.locator('[id="bankaccount-bankName-input"]').fill('JPMorgan Chase');
        await page.locator('[id="bankaccount-routingNumber-input"]').fill('111111111');
        await page.locator('[id="bankaccount-accountNumber-input"]').fill('111111111');
        await page.locator('[data-test="bankaccount-submit"]').click();
        await page.reload();
        const rows = page.locator('[data-test^="bankaccount-list-item-"]');
        const texts = await rows.evaluateAll(
            list => list.map(element => element.textContent.replace("Delete", "").trimEnd()));
        await expect(texts).toContain("JPMorgan Chase");

    }),
    test('Delete bank account', async ({page}) => {
        await page.locator('[data-test="sidenav-bankaccounts"]').click();
        await page.getByRole('button').filter({ hasText: 'Delete' }).nth(1).click();
        await page.reload();

        const rows = page.locator('li[data-test^="bankaccount-list-item-"] p');
        const texts = await rows.evaluateAll(
            list => list.map(element => element.textContent));
        await expect(texts).toContain("JPMorgan Chase (Deleted)");

    })
});
