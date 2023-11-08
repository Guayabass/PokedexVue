describe("Login and Favorite", () => {
  before(() => {
    cy.visit("http://localhost:5173/home");
  })
  it("Login", () => {
    const login = "aletest@gmail.com";

    cy.get('[data-cy="login-user"]').type(login);

    cy.get('[data-cy="login-user"]').should("have.value", "aletest@gmail.com");

    cy.get('[data-cy="login-user-pwd"]').type("123456");

    cy.get('[data-cy="login-btn"]').click();

    cy.login("aletest@gmail.com", "123456");
  });
  it("Favorite", () => {
    cy.visit("http://localhost:5173/pokemon");

    const randomID = Math.floor(Math.random() * (300 - 1) + 1);
    cy.get('[data-cy="search-pkm"]').type(randomID);

    cy.get('[data-cy="search-pkm-btn"]').click();

    cy.wait(2000)

    cy.get('[data-cy="favorite-btn"]').click();

    cy.intercept("POST", "http://backend.webdex.site/api/favorites", (req) => {
      req.body.user = 1;
      // send the modified request and skip any other
      // matching request handlers
      req.continue((res) => {
        res.body.user = 1;
      });
    });

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
