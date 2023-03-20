describe('Bank Accounts', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    beforeEach(() => {
      cy.loginByApi(users.existing_user.username, users.existing_user.password);
    });
  
    it.only('should get a list of bank accounts for user', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env("apiUrl")}/bankaccounts`,
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
      });
    });

    it.only('should delete a bank account', () => {
        const BANK_ACCOUNT_ID = '/RskoB7r4Bic';
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env("apiUrl")}/bankaccounts` + `${BANK_ACCOUNT_ID}`,
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
  });
  