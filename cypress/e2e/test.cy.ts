describe("Verify configuration", () => {
  it("Test 1", () => {
    cy.visit("/");
    cy.get('[data-ui-id="page-title-wrapper"]').should(
      "have.text",
      "Home Page",
    );
  });
});
