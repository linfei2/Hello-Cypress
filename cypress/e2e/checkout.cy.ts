import { cartPage } from "../page-objects/cart-page";

describe("Checkout test", () => {
  let form_key: string;

  before("Preset cart content by API", () => {
    cy.visit("/");
    cy.waitUntil(() =>
      cy.getCookie("form_key").then((cookie) => cookie?.value),
    ).then((cookieValue: string) => {
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

  it("Can proceed to checkout", () => {
    const productName = "Juno Jacket";
    const size = "S";
    const color = "Blue";

    cartPage.navigateTo();
    cartPage.assertItemsInCart([
      { name: productName, size: size, color: color, price: "$77.00", qty: 1 },
    ]);
  });
});
