describe('Registration specs', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should register new user', function() {
        cy.get('[data-test="signup"]').click()
        cy.get('[name="firstName"]').type(users.user_to_register.firstName);
        cy.get('[name="lastName"]').type(users.user_to_register.lastName);
        cy.get('[name="username"]').type(users.user_to_register.username);
        cy.get('[name="password"]').type(users.user_to_register.password);
        cy.get('[name="confirmPassword"]').type(users.user_to_register.password);
        cy.get('[data-test="signup-submit"]').click();

        cy.location("pathname").should('eq', '/signin')
    });
  });
  