---
title: Cypress
description: Functional Testing of Altinn Studio and Altinn app-frontend with Cypress
tags: [development, testing, web]
weight: 100
---

Cypress is a next generation front end open-source testing tool built for the modern web. Read more about Cypress [here](https://docs.cypress.io/guides/overview/why-cypress).

## Prerequisite
-   Cypress lists the requirement for the tests [here](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements).

## Run the tests

Cypress test project has a simple [read me] which describes how one can install the dependencies, start the solution and run the tests.

### Altinn Studio tests

```bash
git clone https://github.com/Altinn/altinn-studio.git
```

The tests on altinn studio are run from an azure devops pipeline and the results are recorded in cypress dashboard with tag: _altinn-studio_.

#### Folder structure
1. Test files are under *src/test/cypress/e2e/integration*.
2. Static files are under *src/test/cypress/e2e/fixtures*.
3. Pageobjects with the css selector are under *src/test/cypress/e2e/pageobjects*.
4. Custom cypress commands are under *src/test/cypress/e2e/support*.
5. *src/test/cypress/cypress.json* has most of the configuration for the test.
6. configuration for the different environment are placed under *src/test/cypress/e2e/config*
7. *src/test/cypress/package.json* has test dependencies and scripts.

#### Write tests
1. Identify the test and find the *.js* file under *integration* folder where the test must be placed.
2. Add the new CSS selectors under *pageobjects*.
3. Add custom cypress command under *support* for reusability across the tests.
4. Add the static files (response json of XHR, texts) under *fixtures*.

Read cypress [documentation] for more information on writing tests

#### Linting and Formatting
1. The test projects has scripts for linting og formatting.
2. Run `yarn run eslint:check` and `yarn run prettier:check` for checking the deviations from config of eslint and prettier.
3. Run `yarn run eslint:fix` and `yarn run prettier:format` to correct the lint and formatting fails.

#### Run tests locally and debug
1. Make sure all the solutions are running according to the readme file for the solution to be tested.
2. Open cypress by running `yarn run cy:open -e environment=local`.
3. Choose the browser and the test.js file that has to be run.
4. Use *cy.log()* for checking runtime values. And Cypress by default starts the test again when there is a change in the files.
5. Use console in the browser developer tools where Cypress prints results from a cypress command.


### App-frontend tests

```bash
git clone https://github.com/Altinn/app-frontend-react
```

The tests on altinn-app-frontend are run from [github actions] and are triggered when a pull request or changes are merged to the files.
The tests are run on apps deployed to TT02 pointing to localhost app frontend.
Tests are run in parallel and the recorded in cypress dashboard with tag:_altinn-app-frontend_.

#### Folder structure
1. Test files are under *test/cypress/e2e/integration*.
2. Static files are under *test/cypress/e2e/fixtures*.
3. Pageobjects with the css selector are under *test/cypress/e2e/pageobjects*.
4. Custom cypress commands are under *test/cypress/e2e/support*.
5. *test/cypress/cypress.json* has most of the configuration for the test.
6. configuration for the different environment are placed under *test/cypress/e2e/config*
7. *test/cypress/package.json* has test dependencies and scripts.

#### Write tests
1. Identify the test and find the *.js* file under *integration* folder where the test must be placed.
2. Add the new CSS selectors under *pageobjects*.
3. Add custom cypress command under *support* for reusability across the tests.
4. Add the static files (response json of XHR, texts) under *fixtures*.

Read cypress [documentation] for more information on writing tests

#### Linting and Formatting
1. The test projects has scripts for linting og formatting.
2. Run `yarn run eslint:check` and `yarn run prettier:check` for checking the deviations from config of eslint and prettier.
3. Run `yarn run eslint:fix` and `yarn run prettier:format` to correct the lint and formatting fails.

#### Run tests locally and debug
1. Make sure all the solutions are running according to the readme file for the solution to be tested.
2. Open cypress by running `yarn run cy:open -e environment=local`. 
3. Choose the browser and the test.js file that has to be run.
4. Use *cy.log()* for checking runtime values. And Cypress by default starts the test again when there is a change in the files.
5. Use console in the browser developer tools where Cypress prints results from a cypress command.

[documentation]: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html
[github actions]: https://github.com/Altinn/app-frontend-react/blob/main/.github/workflows/cypress-altinn-app-frontend.yml
[read me]: https://github.com/Altinn/altinn-studio/tree/master/src/test/cypress
