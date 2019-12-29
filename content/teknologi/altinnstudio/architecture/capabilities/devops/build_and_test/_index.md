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

### Test Execution Tracking & Reporting

### Test Data Creation & Management

## Test Execution & Automation Capabilities


### Functional Test Enablement

### Unit Test Enablement

###  Service & API Test Enablement

### Performance Testing & Profile Enablement
