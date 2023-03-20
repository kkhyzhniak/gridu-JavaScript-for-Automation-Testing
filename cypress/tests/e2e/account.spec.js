describe('Login spec', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    beforeEach(() => {
      cy.visit('/');
      cy.login(users.existing_user.username, users.existing_user.password);
    });
  
    it('should see user settings after logging in', function () {
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.location("pathname").should('eq', '/user/settings')
      cy.contains("User Settings")
    });

    it('should have account balance on home page after logging in', function () {
      cy.get('[data-test="nav-personal-tab"]').click()
      cy.location("pathname").should('eq', '/personal')
      cy.get('[data-test="sidenav-user-balance"]').should('have.text', '$1,681.37')
    });

    it('should see account transaction history after logging in', function () {
      cy.get('[data-test="nav-personal-tab"]').click()
      cy.location("pathname").should('eq', '/personal')
    });

    it('should see account transaction details after logging in', function () {
      cy.get('[data-test="nav-personal-tab"]').click()
      cy.get('[data-test^="transaction-item-"]').first().click()
      cy.contains('Transaction Detail')
      cy.location("pathname").should('contain', '/transaction/')
    });

    it('should update account settings after logging in', function () {
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.get('[id="user-settings-firstName-input"]').clear().type("Joan")
      cy.get('[data-test="user-settings-email-input"]').clear().type("jdoe@gmail.com")
      cy.get('[data-test="user-settings-submit"]').click()
      cy.get('[data-test="sidenav-user-full-name"]').should('have.text', 'Joan J')
    });
  });  