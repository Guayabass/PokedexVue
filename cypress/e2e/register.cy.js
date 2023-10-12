describe("Register", () => {
  it("Register account", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('[data-cy="register-tag"]').click();

    // Get an input, type into it
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    cy.get('[data-cy="register-user"]').type(id+"@test.com");

    //  Verify that the value has been updated
    cy.get('[data-cy="register-user"]').should("have.value", id+"@test.com");

    cy.get('[data-cy="register-pass"]').type("123456");

    cy.get('[data-cy="register-btn"]').click();
  });
  // it("Favorite", () => {
  //   cy.visit("http://localhost:5173/pokemon");

  //   const randomID = Math.floor(Math.random() * (300 - 1) + 1);
  //   cy.get('[data-cy="search-pkm"]').type(randomID);

  //   cy.get('[data-cy="search-pkm-btn"]').click();

  //   cy.get('[data-cy="favorite-btn"]').click();
  // })
});
