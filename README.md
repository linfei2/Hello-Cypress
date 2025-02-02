# Cypress E2E Testing Project
 
This project contains end-to-end (E2E) tests for a web application (e-commerce store https://magento.softwaretestingboard.com/) using Cypress. The tests cover various user flows such as signing in, adding products to the cart, and completing the checkout process. 

## Project Structure

- **cypress/e2e/**: Contains the test files.
- **cypress/fixtures/**: Contains test data files.
- **cypress/interfaces/**: Contains TypeScript interfaces for test data.
- **cypress/page-objects/**: Contains page object models for the application pages.
- **cypress/support/**: Contains support files and custom commands.

## Technologies and Libraries Used

- [Cypress](https://www.cypress.io/): JavaScript end-to-end testing framework.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.
- [ESLint](https://eslint.org/): Linting utility for JavaScript and TypeScript.
- [Prettier](https://prettier.io/): Code formatter.
- [Husky](https://typicode.github.io/husky/): Git hooks.
- [Faker](https://fakerjs.dev/): Library for generating fake data.

## Running the Tests

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running Tests in Headed Mode

To run the tests in headed mode (with the browser UI), use the following command:
```sh
npx cypress open
```
This will open the Cypress Test Runner, where you can select and run individual test files.

### Running Tests in Headless Mode

To run the tests in headless mode (without the browser UI), use the following command:
```sh
npx cypress run
```
This will execute all the tests and output the results in the terminal.

## Linting and Formatting

To lint the code, run:
```sh
npm run lint
```

To format the code, run:
```sh
npm run format
```

## Pre-commit Hook

This project uses Husky to run lint-staged before each commit. It ensures that only staged TypeScript files are linted and formatted.

## Tests Summary

### Sign In Tests

- **File**: `sign-in.cy.ts`


- **Description**: Tests for signing in with valid and invalid credentials.

### Add to Cart Tests

- **File**: `add-to-cart.cy.ts`


- **Description**: Tests for adding products to the cart from the product listing page.

### Checkout Tests

- **File**: `checkout.cy.ts`


- **Description**: Tests for completing the checkout process and placing an order.

## Configuration

### Cypress

The Cypress configuration is defined in `cypress.config.ts`

 - It includes settings such as the base URL, viewport size, and environment variables.

### TypeScript

The TypeScript configuration is defined in `tsconfig.json`

 - It includes compiler options and type definitions for Cypress.
