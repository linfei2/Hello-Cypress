import { CartItem } from "../interfaces/cart-item";
import { BasePage } from "./base-page";

class CartPage extends BasePage {
  verifyPage() {
    cy.url().should("include", "/checkout/cart/");
    this.getPageTitle().should("have.text", "Shopping Cart");
  }

  assertItemsInCart(products: CartItem[]) {
    products.forEach((product) => {
      cy.get(`[title='${product.name}']`)
        .parents(".item-info")
        .within(() => {
          cy.get("[data-th='Price'] .price").should("have.text", product.price);
          cy.get("input.qty").should("have.value", product.qty);
        });
    });
  }
}

export const cartPage = new CartPage();
