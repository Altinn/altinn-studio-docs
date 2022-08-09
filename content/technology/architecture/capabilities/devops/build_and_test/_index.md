---
title: Build & Test Capabilities
linktitle: Build & Test
description: Involves everything from the capability to write and building code to the different types of testing of the code.
tags: [architecture, devops, todo]
toc: false
---

Below list the capabilities with a short description and possible link to the different components providing that capability.

## Software Generation Capabilties

### Code & Config Writing Capability

Most of our code is written manually.

See [development application components](../../../components/application/nonsolutionspecific/development/)
to get a overview over tools and application we use.

## Build & Integration Enablement Capabilities

### Software Compilation & Validation

The project uses .Net, Java or Typescript compilers.

### Sofware Linking & Packaging

The project has the capability to build packages.

See development application components for details how we do this.

### Build Orchestration

We use [Auzure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) to build the source code.

See [development application components](../../../components/application/nonsolutionspecific/development/) to get a overview over tools and application we use. 

## Continuous Integration Capabilities

Azure Piplines are used for Continuous Integration.
When a pull request is created a build is triggered that builds the code and run unit and integration tests.

## Test Management Capabilities

### Test Case & Script Creation & Management

- Test scripts are collected in [Github](https://github.com/Altinn/altinn-studio/tree/master/src/test).

### Test Execution Tracking & Reporting

The team 

### Test Data Creation & Management

- Test data for local testing and integration testing is kept in [Github](https://github.com/Altinn/altinn-studio).

## Test Execution & Automation Capabilities

### Functional Test

The devopsteam has the capability to perform functional testing.

### Unit Test

As part of the development unit test are created. They are run for every pull request.

### Service & API Test

### Performance Testing & Profiling

{{<children>}}
