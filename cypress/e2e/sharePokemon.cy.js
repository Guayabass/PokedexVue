describe('Share Pokemon', () => {
  before(() => {
    cy.visit("http://localhost:5173/pokemon");
  })
  it('Share', () => {

    const randomID = Math.floor(Math.random() * (300 - 1) + 1);
    cy.get('[data-cy="search-pkm"]').type(randomID);

    cy.get('[data-cy="search-pkm-btn"]').click();

    cy.wait(2500)

    cy.get('[data-cy="share-btn"]').click();

    cy.get('[data-cy="share-txt"]').click();
  })
})