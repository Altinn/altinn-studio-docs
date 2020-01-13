---
title: Build & Test Capabilities
description: Build & Test Capabilties involves everything from the capability to write and building code to the different types of testing of th ecode
tags: [architecture]
linktitle: Build & Test
weight: 105
alwaysopen: false
---

## Software Generation Capabilties

### Code & Config Writing Capability
The project uses [Visual Studio Code](https://code.visualstudio.com/) and [Visual Studio](https://visualstudio.microsoft.com/) as IDE.

## Build & Integration Enablement Capabilities

### Software Compilation & Validation
The project uses .Net, Java or Typescript compilers

### Sofware Linking & Packaging
The different application projects generates different types of artefacts

#### Nuget packages
Som part of the codes are [published as Nuget Packages](https://www.nuget.org/profiles/altinn). 
This process is manual and performed by developer.

With help of Nuget packages we can easyly re-use modules accross applicatons in the different solution.

#### NPM Packages
Som part of the fronted code is published as NPM packages. This to 

#### Docker containers
All applications is built as Docker Containers using [Docker Build](https://docs.docker.com/engine/reference/commandline/build/)

Se Docker files for Altinn Platform

- [Authentication component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Dockerfile) 
- [Authorization component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Dockerfile)
- [PDF Component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.PDF/Dockerfile)
- [Profile Component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Profile/Profile/Dockerfile)
- [Receipt Component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Receipt/Receipt/Dockerfile)
- [Register Component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Register/Register/Dockerfile)
- [Storage Component](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Dockerfile)

See docker files for Altinn Studio

- [Designer])(https://github.com/Altinn/altinn-studio/blob/master/src/AltinnCore/Designer/Dockerfile)

### Build Orchestration
We use [Auzure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) to build the source code.

Read more about 

## Continuous Integration Capabilities
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

### Functional Test
- Automated browser testing and WCAG testing using [Testcafe](https://devexpress.github.io/testcafe/).

### Unit Test
- [Jest](https://jestjs.io/) framework used for unit testing front-end. More details [here](../../../../development/handbook/test/unit-testing/).
- [xunit](https://xunit.net/) used for unit testing back-end.

### Service & API Test

- API testing is done using Postman. More details [here](../../../../development/handbook/test/postman/).
- Integration testing of services done using [standard Microsoft frameworks](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-3.1).

### Performance Testing & Profiling
We will use [K6](https://k6.io/) for performance testing.