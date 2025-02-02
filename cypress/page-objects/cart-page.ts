import { Product } from "../interfaces/product";
import { BasePage } from "./base-page";

class CartPage extends BasePage {
  verifyPage() {
    cy.url().should("include", "/checkout/cart/");
    this.getPageTitle().should("have.text", "Shopping Cart");
  }

  assertItemsInCart(products: Product[]) {
    products.forEach((product) => {
      cy.get(`[title='${product.name}']`)
        .parents(".item-info")
        .within(() => {
          cy.get("[data-th='Price'] .price").should("have.text", product.price);
          cy.get(".item-options dd")
            .first()
            .should("contain.text", product.size);
          cy.get(".item-options dd")
            .last()
            .should("contain.text", product.color);
          cy.get("input.qty").should("have.value", product.qty);
        });
    });
  }
}

export const cartPage = new CartPage();
