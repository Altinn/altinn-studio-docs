---
title: Test Strategy
description: Test Strategy
tags: [development, testing]
weight: 100
---

## What should be tested?
In tjenester 3.0, there is a need for both testing Altinn Studio, the app designer, as well as testing apps that are developed by an app developer in Altinn Studio Runtime. Testing these two areas of Altinn Studio requires different approaches. 

Testing of Altinn Studio is to be tested automatically at the unit and integration levels of testing. Unit testing of the system involves, for example, the testing of individual javascript functions, and individual pieces of logic relating to react/UI components. At the integrasion level of test, API's and smaller modules are typically tested: Effective unit and integration testing demands good testing frameworks that tjenester 3.0 developrs can easily pick up and use, and that can be easily integrated in the current codebase and the current build toolchain.

Testing of workflows, and the usage of ALtinn Studio, as well as testing of apps developed in Altinn Studio, is the primary responsibility of the test developer in the team. On a regression, or end-to-end, level of test, one tests that the users whole journey through the altinn studio system, or the developed app, works as expected in relation to stated acceptance criteria.

A good end-to-end test tool has the same requirements as tooling and frameworks that is to be put to use for unit and integration testing. Additionally, the tool needs to be give the opportunity for less technically minded app developers to quickly develop UI tests for apps they develop and deploy to Altinn Studio. The end-to-end tool should also allow the test developer to easily run a full regression test suite, as well as reduce the amount of time to run such a set of regression tests accurately. 


## Tooling
After a discussion internally in the tjenester 3.0 team, these tools and frameworks have been decided to be put to use for testing
 - Unit testing: Jest / Enzyme / xUnit
 - Integration testing: Jest / Sinon
 - Regression testing: Testcafe 

The chosen tool set has been chosen for their ease of integration into the exisiting codebase, and also because they are all open source tools. Testcafe also gives the possibility of recording tests, with a paid license, the testcafe framework and UI test project will be the responsibility of the test developer in the team. Developers write unit and integration tests by using Jest and xUnit. See the other pages under test in this handbook for more information on how to effectively write unit tests or regression tests.

Documentation for the mentioned tools can be found below:  
 - [xUnit](https://xunit.github.io/)
 - [Jest](https://jestjs.io/)  
 - [Enzyme](http://airbnb.io/enzyme/)  
 - [Sinon](https://sinonjs.org/)  
 - [Testcafe](https://testcafe.devexpress.com/)  


### Test in the first MVP delivery
Testing in the first MVP delivery was primarily done thru unit testing with test written in xunit, and jest, as well as thru manual functional tests of user stories under development. The unit testing frameworks xunit and jest were integrated in the MVP01 delivery, and the tests are executed using pipeline definitions in azure devops. The unit test pipelines are automatically triggered both by pull requests to the altinn github repo, as well as when code is merged into master. The pipelines for unit tests can be found [here](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=22) for the xunit pipeline, and [here](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=26) for the jest test pipeline. At the end of MVP01, testcafe tests also began running in their own pipeline. The regression tests in the testcafe pipeline are run as a nightly build, and does not deploy on pull requests, to avoid slowing down and hindering the work of developers. The pipeline for testcafe can be found [here](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=25)


### Test in the second MVP delivery
In the second MVP delivery, deploying apps created in the Altinn Studio designer to Altinn Studio runtime has been prioritized as a "hill", or main deliverable. In this context, regression tests written with testcafe wil focus on the workflow the developer "Christian" will be using to be able to deploy on of his apps to a test environment. The goal of test automation is to reduce the time taken to run all test in the Altinn Studio regression test suite, to run these tests accurately, and free up the time of the test developer to write better test cases. Both automatic and manual regression tests are run against dev.altinn.studio to assure the quality of developed code that is to be deployed to production. Unit and system testing in MVP02 will work in much the same way as in the MVP01 delivery: Developers write unit and integration tests in their respective frameworks, and focus on testing business logic they have developed. Snapshot testing, which was begun in MVP01, is deprioritized in MVP02 as they were found to be brittle and not contributing to the overall quality of the code. "Look and feel" testing will be the responsibility of functional designers, and the test developer in the team.


## Test levels
The pyramid figure below shows an overview of the different levels of test, the possible tools associated with the testing level, as well as which rle has the responsibilty for writing tests at that level.

![Testpyramiden](testing_pyramid.jpeg?width=400 "Testpyramiden")


## Testdata
To be be able to easily and effectively test on all levels, it can be necessary to put a tool in place to easily retrieve or store different test data. The Tjenester 3.0 team must decide on whether to creat testdata classes that can be imported in the different test projects. Another possibility is to fetch spesific pre-made dataset (for example testdata set 164/5) from a json file or similar. In MVP02 the testcafe project uses a naive testdata class, that will be expanded as the new for more complex testdata grows: TestData.js contains a class for creating users in Altinn Studio at the moment. Refer to the Jest section under test for an overview on using data in unit tests.


#Methodology
During sprint planning, the product owner, the developers, and the test developer agree on an approach for teting on individual user stories that are pulled into the sprint. A plan is then created for how the responsible role will test the required functionality, and sub tasks are created on the different user stories. It is possible, and likely, that a user story will contain tasks to develop tests on all the testing levels specified above. When a test is written and completed, it can be integrated into a testing build. 

**Naming convention for element ids'**
Testcafe's test api has different methods of instantiating Selector objects that can be then used in tests. The easiest and most robust method of defining a selector in testcafe is with a css id selector. The idea behind using css id's is to avoid finding elements by their relative location in the DOM, or by the element's inner texts, as tests become brittle with these selectors due to design changs. The id's must be unique, to ensure the uniqueness of a Selector, the following naming convention for element id's is proposed: Id's must be tekstbased and written in camelCase, id's follow a logical location the Altinn Studio system, such as; "Pagelocation Submenu Elementtype Descriptiveword". The text box element id under the GUI creator could then be assigned the following id: "designerSkjemakomponenterKnappTekstområde".


## Building and deploying testcode
See the pipeline hyperlinks above in this document.