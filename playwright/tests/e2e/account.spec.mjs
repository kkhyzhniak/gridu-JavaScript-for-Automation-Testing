import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/signin');
    await page.locator('[name="username"]').fill('Katharina_Bernier');
    await page.locator('[name="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();
  });

test.describe('Account details', () => {
    test('Go to account settings after logging in', async ( {page} ) => {
        await page.locator('[data-test="sidenav-user-settings"]').click();

        await expect(page).toHaveURL('/user/settings');
        await expect(page.getByText('User Settings')).toBeVisible();
    }),
    test('Update account settings after logging in', async ( {page} ) => {
        await page.locator('[data-test="sidenav-user-settings"]').click();
        await page.locator('[id="user-settings-firstName-input"]').fill('Joaaahn');
        await page.locator('[data-test="user-settings-email-input"]').fill('jdoe@gmail.com');
        await page.locator('[data-test="user-settings-phoneNumber-input"]').fill('380661234567');
        await page.locator('[data-test="user-settings-submit"]').click();
        
        await expect(page.locator('[data-test="sidenav-user-full-name"]')).toHaveText('Joaaahn J');
    
    })
});

test.describe('Account balance', () => {
    test('Have account balance on home page after logging in', async ({page}) => {
        await expect(page.getByText('Account Balance')).toBeVisible();

        await expect(page.locator('[data-test="sidenav-user-balance"]')).toHaveText('$' + '1,681.37');;

    })
});

test.describe('Transaction history', () => {
    test('Go to transaction history after logging in', async ({page}) => {
        await page.locator('[data-test="nav-personal-tab"]').click();

        await expect(page).toHaveURL('/personal');
        await expect(page.locator('[data-test="sidenav-user-balance"]')).toHaveText('$' + '1,681.37');

    })
});

test.describe('Transaction details', () => {
    test('Go to transaction details after logging in', async ({page}) => {
        await page.locator('[data-test="nav-personal-tab"]').click();

        if (await page.getByText("No Transactions").isVisible()) {
            await page.locator('[data-test="transaction-list-empty-create-transaction-button"]').click();
            await page.locator('ul[data-test=users-list] li').first().click();
            await page.getByPlaceholder('Amount').fill('100');
            await page.getByPlaceholder('Add a note').fill('First transaction');
            await page.locator('[data-test="transaction-create-submit-payment"]').click();
            await  page.getByText('Return To Transactions').click();
        } 
        await page.locator('[data-test^="transaction-item-"]').first().click();
        await expect(page.getByText('Transaction Detail')).toBeVisible();
        await expect(page.locator('span[data-test^="transaction-sender-"]')).toHaveText("Arely Kertzmann");
        await expect(page).toHaveURL(/transaction/);

    })
});



