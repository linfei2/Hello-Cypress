import { cartPage } from "../page-objects/cart-page";
import { homePage } from "../page-objects/home-page";

describe("Checkout", () => {
  let form_key: string;

  before(() => {
    homePage.navigateTo();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.getCookie("form_key").then((cookie) => {
      if (cookie) {
        form_key = cookie.value;
      }
    });
  });

  it("Can proceed to checkout", () => {
    const endpoint =
      "https://magento.softwaretestingboard.com/checkout/cart/add/uenc/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS93b21lbi90b3BzLXdvbWVuL2phY2tldHMtd29tZW4uaHRtbA%2C%2C/product/1380/";
    cy.fixture("add-to-cart-payload.json").then((data) => {
      const formData = new FormData();

      formData.append("product", data.product);
      formData.append("uenc", data.uenc);
      formData.append("form_key", form_key);
      formData.append("super_attribute[143]", data["super_attribute[143]"]);
      formData.append("super_attribute[93]", data["super_attribute[93]"]);

      cy.request("POST", endpoint, formData).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    const productName = "Juno Jacket";
    const size = "S";
    const color = "Blue";

    cartPage.navigateTo();
    cartPage.assertItemsInCart([
      { name: productName, size: size, color: color, price: "$77.00", qty: 1 },
    ]);
  });
});
