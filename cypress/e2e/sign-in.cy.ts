import { signInPage } from "../page-objects/sign-in-page";
import { homePage } from "../page-objects/home-page";

describe("Sign in verification", () => {
  beforeEach(() => {
    homePage.navigateTo();
    homePage.verifyPage();
    homePage.clickSignInLink();
    signInPage.verifyPage();
  });

  it("Should sign in with valid credentials", () => {
       signInPage.signIn(Cypress.env("email"), Cypress.env("password"));
      homePage.assertUserLoggedIn(Cypress.env('username'))
  });

  it("Should show input errors and alert on incorrect sign in", () => {
    // Fields validation for incorrect and empty values
    signInPage.signIn("invalidEmail", "");
    signInPage.assertInputError("email", "Please enter a valid email address");
    signInPage.assertInputError("pass", "This is a required field");

    // Login attempt with incorrect password
    signInPage.signIn(Cypress.env("email"), "invalidPass");
    signInPage.assertLoginFailed();
  });
});
