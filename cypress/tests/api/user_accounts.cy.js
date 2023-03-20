describe('Users', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    beforeEach(() => {
      cy.loginByApi(users.existing_user.username, users.existing_user.password);
    });
  
    it.only('should get a user profile by username', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env("apiUrl")}/users/profile/` + users.existing_user.username,
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('user');
        expect(response.body.user.firstName).to.be.equal('Edgar')
      });
    });

    it.only('should get all users list', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env("apiUrl")}/users`,
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });

  });
  