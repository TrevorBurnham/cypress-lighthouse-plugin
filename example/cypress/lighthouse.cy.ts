describe("Lighthouse", () => {
  it("github.com", () => {
    cy.visit("https://github.com");
    cy.lighthouse();
  });
});
