import { cartPage } from "../page-objects/cart-page";
import { faker } from "@faker-js/faker";
import { checkoutPage } from "../page-objects/checkout-page";
import { Product } from "../interfaces/product";
import { shippingData } from "../interfaces/shipping-data";

describe("Checkout test", () => {
  let form_key: string;

  before("Preset cart content via API", () => {
    cy.visit("/");
    cy.waitUntil(() =>
      cy.getCookie("form_key").then((cookie) => cookie?.value as string),
    ).then((cookieValue) => {
      form_key = cookieValue;
    });

    cy.fixture("add-to-cart-payload.json").then((data) => {
      const formData = new FormData();

      formData.append("product", data.product);
      formData.append("uenc", data.uenc);
      formData.append("form_key", form_key);
      formData.append("super_attribute[143]", data["super_attribute[143]"]);
      formData.append("super_attribute[93]", data["super_attribute[93]"]);

      const endpoint = `/checkout/cart/add/uenc/${data.uenc}/product/${data.product}/`;

      cy.request("POST", endpoint, formData).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("Can proceed to checkout and place an order", () => {
    const productToOrder: Product = {
      name: "Juno Jacket",
      size: "S",
      color: "Blue",
      price: "$77.00",
      qty: 1,
    };
    const shippingData: shippingData = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    };
    const shippingMethod = "Best Way";

    cartPage.navigateTo();
    cartPage.assertItemsInCart([productToOrder]);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cartPage.proceedToCheckout();

    checkoutPage.completeShippingData(shippingData);
    checkoutPage.selectShippingMethod(shippingMethod);
    checkoutPage.clickNext();
    checkoutPage.setBillingAddressSameAsShipping();
    checkoutPage.assertBillingAdressDetails(
      shippingData.firstName,
      shippingData.lastName,
    );
    checkoutPage.placeOrder();
    checkoutPage.assertOrderSuccess();
  });
});
