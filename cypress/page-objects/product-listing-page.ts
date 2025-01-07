import { BasePage } from "./base-page";

class ProductListingPage extends BasePage {
  getProductByName(name: string) {
    return cy.contains(".product-item-details", name).scrollIntoView();
  }

  pickSize(size: "XS" | "S" | "M" | "L" | "XL") {
    cy.get(`.size [aria-label='${size}']`).click();
  }

  pickColor(color: string) {
    cy.get(`.color [aria-label='${color}']`).click();
  }

  addToCart() {
    cy.get("[title='Add to Cart']").click({ force: true });
  }

  assertSuccessMessage(message: string) {
    cy.get(".message-success")
      .should("be.visible")
      .and("contain.text", message);
  }
}

export const productListingPage = new ProductListingPage();
