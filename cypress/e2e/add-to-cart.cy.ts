import { Product } from "../interfaces/product";
import { cartPage } from "../page-objects/cart-page";
import { homePage } from "../page-objects/home-page";
import { productListingPage } from "../page-objects/product-listing-page";

describe("Add to cart", () => {
  it("Can add to cart from product listing page", () => {
    const product: Product = {
      name: "Juno Jacket",
      size: "S",
      color: "Blue",
      price: "$77.00",
      qty: 1,
    };
    homePage.navigateTo();
    homePage.verifyPage();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    homePage.selectCategoryFromMenu(["Women", "Tops", "Jackets"]);

    productListingPage.getProductByName(product.name).within(() => {
      productListingPage.pickSize(product.size);
      productListingPage.pickColor(product.color);
      productListingPage.addToCart();
    });
    productListingPage.assertSuccessMessage(
      `You added ${product.name} to your shopping cart`,
    );
    productListingPage.assertNumberOfItemsInCart(1);
    productListingPage.goToCart();

    cartPage.verifyPage();
    cartPage.assertItemsInCart([product]);
  });
});
