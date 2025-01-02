class HomePage {
  navigateTo() {
    cy.visit("/");
  }

  verifyPage() {
    cy.getPageTitle().should("have.text", "Home Page");
  }

  clickSignInLink() {
    cy.get('[class="panel header"] .authorization-link a').click();
  }

  assertUserLoggedIn(username: string) {
    cy.get('[class="panel header"] .logged-in').should(
      "have.text",
      `Welcome, ${username}!`,
    );
  }
}

export const homePage = new HomePage();
