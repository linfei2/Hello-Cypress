import { BasePage } from "./base-page";

class HomePage extends BasePage {
  navigateTo() {
    cy.visit("/");
  }

  verifyPage() {
    this.getPageTitle().should("have.text", "Home Page");
    cy.get(".block-promo.home-main").should("be.visible");
  }
}

export const homePage = new HomePage();
