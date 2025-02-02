/* eslint-disable @typescript-eslint/no-unused-vars */
import "./commands";
import "cypress-real-events";

Cypress.on("uncaught:exception", (err, runnable) => false);
