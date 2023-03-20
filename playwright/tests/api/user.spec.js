import {expect, test} from "@playwright/test";

const userProfilesEndpoint = '/users/profile/';
const USERNAME = 'JD2023';
const allUsersEndpoint = '/users';


test.describe('API-user details', () => {
    test('gets user\'s profile details', async ({ request }) => {
        const newIssue = await request.get(`${userProfilesEndpoint}` + `${USERNAME}`);
        expect(newIssue.ok()).toBeTruthy();
    }),

    test('gets a list of users', async ({ request }) => {
        const newIssue = await request.get(`${allUsersEndpoint}`);
        expect(newIssue.ok()).toBeTruthy();
    });

});