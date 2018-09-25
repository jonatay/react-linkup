describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true);
  });
});

describe('react-linkup:dev register test user', function() {
  it('Visits react-linkup:dev', function() {
    cy.visit('http://localhost:3001');
    cy.contains('register').click();

    cy.url().should('include', '/register');
    cy.get('#fullname').type('Testy Tester');
    cy.get('#email').type('jono@linkupsecurity.co.za');

    cy.get('#password').type('weak');
    cy.get('#confirm').type('weak');

    cy.get('#submit').click();
    cy.get('div.ant-notification-notice-message').should(
      'have.text',
      'auth/weak-password'
    );
    cy.get('.ant-notification-notice-close-x').click();

    cy.get('#password')
      .clear()
      .type('strong password');
    cy.get('#confirm')
      .clear()
      .type('strong password');

    cy.get('#submit').click();
    cy.get('div.ant-notification-notice-message').should(
      'have.text',
      'auth/email-already-in-use'
    );
    cy.get('.ant-notification-notice-close-x').click();
    cy.get('#email')
      .clear()
      .type('jono.dev.test@gmail.com');
    cy.get('#submit').click();
  });
});
