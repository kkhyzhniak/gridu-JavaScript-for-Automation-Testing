import {expect, test} from "@playwright/test";

const bankAccountsEndpoint = '/bankaccounts';
const BANK_ACCOUNT_ID = '/RskoB7r4Bic';


test.describe('API-bank accounts', () => {
    test('gets a list of bank accounts', async ({ request }) => {
        const newIssue = await request.get(`${bankAccountsEndpoint}`);
        const responseBody = await newIssue.json();

        expect(newIssue.ok()).toBeTruthy();
        expect(responseBody.results[0].bankName).toBeTruthy();
    });

    test('delete a bank account', async ({ request }) => {
        const newIssue = await request.delete(`${bankAccountsEndpoint}` + `${BANK_ACCOUNT_ID}`);
        expect(newIssue.ok()).toBeTruthy();
    });
});
