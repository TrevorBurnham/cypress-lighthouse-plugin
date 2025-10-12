describe("Lighthouse", () => {
  it("github.com", () => {
    cy.visit("https://github.com");
    cy.lighthouse();
  });

  it("github.com with identifier", () => {
    cy.visit("https://github.com");
    cy.lighthouse(undefined, undefined, undefined, "github-homepage");
  });

  it("github.com with thresholds and identifier", () => {
    cy.visit("https://github.com");
    cy.lighthouse(
      { performance: 50 },
      undefined,
      undefined,
      "github-with-thresholds",
    );
  });
});
