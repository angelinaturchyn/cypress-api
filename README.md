# Cypress Test Automation Project

This project demonstrates the setup and use of Cypress for writing automated browser tests in JavaScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or later)
- npm or yarn installed

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/angelinaturchyn/cypress-test-automation
    cd cypress-test-automation
    ```

2. **Install dependencies:**

    Using npm:

    ```sh
    npm install
    ```

    Using yarn:

    ```sh
    yarn install
    ```

## Writing Tests

Tests are written using the Cypress testing framework and placed in the `./cypress/integration` directory.

### Sample Test File

Create a file `example.spec.js` in the `./cypress/integration` directory:

```javascript
describe('Example feature', () => {
  it('should open Google and search for Cypress', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('Cypress{enter}');
    cy.get('#search').should('contain.text', 'Cypress');
  });
});
```


### Running Tests

To execute the tests, use the following command:

``` npx cypress open ```

To run the tests in headless mode, use:

```npx cypress run``

