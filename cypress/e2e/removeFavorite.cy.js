describe('Login and Remove Favorite', () => {
  before(() => {
    cy.logout();
    cy.visit("http://localhost:5173/home");
  })
  it("Remove Favorite", () => {
    const login = "aletest@gmail.com";

    cy.get('[data-cy="login-user"]').type(login);

    cy.get('[data-cy="login-user"]').should("have.value", "aletest@gmail.com");

    cy.get('[data-cy="login-user-pwd"]').type("123456");

    cy.get('[data-cy="login-btn"]').click();

    cy.login("aletest@gmail.com", "123456");

    cy.get('[data-cy="remove-fav-btn"]').eq(0).click();
  });
})