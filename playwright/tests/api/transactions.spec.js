import {expect, test} from "@playwright/test";

const transactionCommentsEndpoint= '/comments/';
const TRANSACTION_ID = '183VHWyuQMS';


test.describe('API-transaction comments', () => {
    test('add a comment to transaction', async ({ request }) => {
        const newIssue = await request.post(`${transactionCommentsEndpoint}` + `${TRANSACTION_ID}`,
         {
            data: {
                content: 'Hi! This is my first comment.'
            }});
        expect(newIssue.ok()).toBeTruthy();
    })
});