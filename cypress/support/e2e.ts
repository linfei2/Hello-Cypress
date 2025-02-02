/* eslint-disable @typescript-eslint/no-unused-vars */
import "./commands";
import "cypress-real-events";
import "cypress-wait-until";

Cypress.on("uncaught:exception", (err, runnable) => false);
