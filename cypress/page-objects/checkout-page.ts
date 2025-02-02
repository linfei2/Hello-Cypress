import { shippingData } from "../interfaces/shipping-data";
import { BasePage } from "./base-page";

class CheckoutPage extends BasePage {
  completeShippingData(shippingData: shippingData) {
    cy.get("#customer-email").type(shippingData.email);
    cy.get("[name='firstname']").type(shippingData.firstName);
    cy.get("[name='lastname']").type(shippingData.lastName);
    cy.get("[name='street[0]']").type(shippingData.address);
    cy.get("[name='city']").type(shippingData.city);
    cy.get("[name='region_id']").select(shippingData.state);
    cy.get("[name='postcode']").type(shippingData.zip);
    cy.get("[name='telephone']").type(shippingData.phone);
  }

  selectShippingMethod(method: "Best Way" | "Flat Rate") {
    const value =
      method === "Best Way" ? "tablerate_bestway" : "flatrate_flatrate";

    cy.get(`[value="${value}"]`).check();
  }

  clickNext() {
    cy.get("button.continue").click();
  }

  setBillingAddressSameAsShipping() {
    cy.get("#billing-address-same-as-shipping-checkmo").check();
  }

  assertBillingAdressDetails(firstName: string, lastName: string) {
    cy.get(".billing-address-details")
      .contains(`${firstName} ${lastName}`)
      .should("be.visible");
  }

  placeOrder() {
    cy.get("[title='Place Order']").click();
  }

  assertOrderSuccess() {
    cy.get(".page-title").should(
      "contain.text",
      "Thank you for your purchase!",
    );
    cy.contains("a", "Continue Shopping").should("be.visible");
  }
}

export const checkoutPage = new CheckoutPage();
