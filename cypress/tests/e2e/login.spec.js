describe('Login spec', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should log in', function () {
      cy.login(users.existing_user.username, users.existing_user.password);
      cy.get('[data-test=sidenav-username]').should('exist').contains(users.existing_user.username);
    });
  
    it('should see log in error on invalid credentials', function () {
      cy.login(users.invalid_user.username, users.invalid_user.password);
      cy.get('.MuiAlert-message').should('exist');
    });
  });
  