
describe('Login spec', () => {
    let users;
    let bank;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });

      cy.fixture('bank-data').then(data => {
        bank = data;
      });

    });
  
    beforeEach(() => {
      cy.visit('/');
      cy.login(users.existing_user.username, users.existing_user.password);
    });

    it('should add new bank account after logging in', function () {
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.get('[data-test="bankaccount-new"]').click()
      cy.get('[id="bankaccount-bankName-input"]').type(bank.bankName)
      cy.get('[id="bankaccount-routingNumber-input"]').type(bank.routingNumber)
      cy.get('[id="bankaccount-accountNumber-input"]').type(bank.accountNumber)
      cy.get('[data-test="bankaccount-submit"]').click()
      cy.reload()
      const list = []
      cy.get('[data-test^="bankaccount-list-item-"]').each(($bank) => {
        const bankName = $bank.text().replace("Delete", "").trimEnd()
        list.push(bankName)
    })
    .then(() => {
        expect(list).contain(bank.bankName)
    })
    });

    it('should delete bank account after logging in', function () {
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.get('[data-test="bankaccount-delete"]').eq(1).click()
      cy.reload()
      const rows = cy.get('li[data-test^="bankaccount-list-item-"] p');
      const texts = []
      
      rows.each(($bank) => {
        const bankName = $bank.text()
        texts.push(bankName)
      })
      .then(() =>
        expect(texts).contain(bank.bankName + " (Deleted)")
      )
      });

});  