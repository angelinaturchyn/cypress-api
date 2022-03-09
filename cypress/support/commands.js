
Cypress.Commands.add('loginTo',() => {
    cy.visit('http://localhost:4200/login')
    cy.get('[placeholder="Email"]').type('angelinaturchyn@gmail.com')
    cy.get('[placeholder="Password"]').type('307903aaa')
    cy.get('form').submit()
})
