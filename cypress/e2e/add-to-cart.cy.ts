import { cartPage } from "../page-objects/cart-page";
import { homePage } from "../page-objects/home-page";
import { productListingPage } from "../page-objects/product-listing-page";

describe("Add to cart", () => {
  it("Can add to cart from product listing page", () => {
    const product = "Juno Jacket";

    homePage.navigateTo();
    homePage.verifyPage();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    homePage.selectCategoryFromMenu(["Women", "Tops", "Jackets"]);

    productListingPage.getProductByName(product).within(() => {
      productListingPage.pickSize("S");
      productListingPage.pickColor("Blue");
      productListingPage.addToCart();
    });
    productListingPage.assertSuccessMessage(
      `You added ${product} to your shopping cart`,
    );
    productListingPage.assertNumberOfItemsInCart(1);
    productListingPage.goToCart();

    cartPage.verifyPage();
    cartPage.assertItemsInCart([
      { name: "Juno Jacket", price: "$77.00", qty: 1 },
    ]);
  });
});
