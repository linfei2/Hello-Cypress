class SignInPage {
    verifyPage() {
        cy.url().should('include', 'customer/account/login');
        cy.getPageTitle().should('have.text', 'Customer Login');
    }

    signIn(email: string, password: string) {
        if (email) {
            cy.get('#email').clear();
            cy.get('#email').type(email);
        };
        if (password) {
            cy.get('#pass').clear();
            cy.get('#pass').type(password);
        };
        cy.get('#send2').click();
    }

    assertInputError(inputType: 'email' | 'pass', message: string) {
        cy.get(`#${inputType}`).should('have.attr', 'aria-invalid', 'true');
        cy.get(`#${inputType}-error`).should('be.visible').and('contain.text', message);
    }

    assertLoginFailed() {
        cy.get('[data-ui-id="message-error"] > div')
          .should('be.visible')
          .and('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    }
}

export const signInPage = new SignInPage();