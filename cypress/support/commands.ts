declare namespace Cypress {
    interface Chainable {
        getPageTitle(): Chainable<JQuery<HTMLElement>>;
    }
}

Cypress.Commands.add('getPageTitle', () => {
    return cy.get('[data-ui-id="page-title-wrapper"]');
 })


