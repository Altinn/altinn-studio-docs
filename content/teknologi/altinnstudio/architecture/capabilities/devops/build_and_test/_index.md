---
title: Build & Test Capabilities
description: Build & Test Capabilties involves everthing from the capability to write code to the different types of testing
tags: [architecture]
linktitle: Build & Test
weight: 105
alwaysopen: false
---

## Software Generation Capabilties

### Code & Config Writing enablement
The project uses [Visual Studio Code](https://code.visualstudio.com/) and [Visual Studio](https://visualstudio.microsoft.com/) as IDE.

## Build & Integration Enablement Capabilities

### Software Compilation & Validation
The project uses .Net, Java or Typescript compilers

### Sofware Linking & Packaging
Azure Pipeline package the applications in to Docker Containers. 

TODO: Add info about Docker Registry ++

### Build Orchestration
We use [Auzure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) to build the source code.

[See our pipelines](https://dev.azure.com/brreg/altinn-studio/_build)

### Development Environment Integration
Visual Studio and Visual Studio Code can integrate with both 

## Continuous Integration Enablement
Azure Piplines are used for Continuous Integration. When a pull request is created a build is triggered that builds the code and run unit and integration tests

{{% children description="true" depth="1" %}}


## Test Management Capabilities

### Test Case & Script Creation & Management
- Test scripts are collected in [Github](https://github.com/Altinn/altinn-studio/tree/master/src/test).

### Test Execution Tracking & Reporting
- [Azure Test Plans](https://azure.microsoft.com/en-us/services/devops/test-plans/) in [Azure Devops](https://azure.microsoft.com/en-us/services/devops/) is usted for execution tracking
- Defects reported as issues in [Github](https://github.com/Altinn/altinn-studio/issues), using the _Bug_ template. 

### Test Data Creation & Management
- Test data for local testing and integration testing is kept in [Github](https://github.com/Altinn/altinn-studio).

## Test Execution & Automation Capabilities

### Functional Test Enablement
- Automated browser testing and WCAG testing using [Testcafe](https://devexpress.github.io/testcafe/).

### Unit Test Enablement
- [Jest](https://jestjs.io/) framework used for unit testing front-end. More details [here](../../../../development/handbook/test/unit-testing/).
- [xunit](https://xunit.net/) used for unit testing back-end.

### Service & API Test Enablement

- API testing is done using Postman. More details [here](../../../../development/handbook/test/postman/).
- Integration testing of services done using [standard Microsoft frameworks](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-3.1).

### Performance Testing & Profile Enablement
