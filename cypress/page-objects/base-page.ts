export class BasePage {
  getPageTitle() {
    return cy.get("[data-ui-id='page-title-wrapper']");
  }

  clickSignInLink() {
    cy.get("[class='panel header'] .authorization-link a").click();
  }

  assertUserLoggedIn(username: string) {
    cy.get("[class='panel header'] .logged-in").should(
      "have.text",
      `Welcome, ${username}!`,
    );
  }

  selectCategoryFromMenu(categories: string[]) {
    categories.forEach((category, index) => {
      cy.contains(`.level${index}.category-item`, category).as(
        "currentCategory",
      );

      const isTargetCategory = index === categories.length - 1;

      if (isTargetCategory) {
        cy.get("@currentCategory").click();
      } else {
        cy.get("@currentCategory").trigger("mouseover");
        cy.get(`.level${index}.submenu`).should("be.visible");
      }
    });
  }

  assertNumberOfItemsInCart(count: number) {
    cy.get("[data-block='minicart']").within(() => {
      cy.get(".counter-number").should("have.text", count.toString());
    });
  }

  goToCart() {
    cy.get(".showcart").click();
    cy.get(".viewcart").click();
  }
}
