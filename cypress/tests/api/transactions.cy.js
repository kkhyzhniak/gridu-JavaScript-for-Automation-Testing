
describe('Transactions', () => {
  let users;

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.loginByApi(users.existing_user.username, users.existing_user.password);
  });

it.only('should create a new comment to transaction', () => {
    const TRANSACTION_ID = '183VHWyuQMS';
    cy.request({
      method: 'POST',
      url: `${Cypress.env("apiUrl")}/comments/` + `${TRANSACTION_ID}`,
      body: {
        content: "Hi! This is my first comment."
    }
  }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
})
