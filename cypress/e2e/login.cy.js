describe("Login and Favorite", () => {
  it("Login", () => {
    const login = "aletest@gmail.com"
      cy.login();
      cy.visit("http://localhost:5173/home");

      cy.get('[data-cy="login-user"]').type(login);

      cy.get('[data-cy="login-user"]').should(
        "have.value",
        "aletest@gmail.com"
      );

      cy.get('[data-cy="login-user-pwd"]').type("123456");

      cy.get('[data-cy="login-btn"]').click();
  });
  it("Favorite", () => {
    cy.visit("http://localhost:5173/pokemon");

    const randomID = Math.floor(Math.random() * (300 - 1) + 1);
    cy.get('[data-cy="search-pkm"]').type(randomID);

    cy.get('[data-cy="search-pkm-btn"]').click();

    cy.get('[data-cy="favorite-btn"]').click();

    // cy.request("POST", "http://backend.webdex.online/api/favorites", {
    //   pokemonID: randomID,
    //   pokemonName: "venusaur",
    //   user: 1,
    // }).then((response) => {
    //   // response.body is automatically serialized into JSON
    //   expect(response.status).to.eq(201); // true
    //   cy.visit("http://localhost:5173/pokemon/favorites");
    // });
  });
});
