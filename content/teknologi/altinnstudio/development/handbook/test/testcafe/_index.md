---
title: Testcafe
description: Testcafe
tags: [development, testing]
weight: 100
---
This document describes how one can start working on a test cafe project from installtion of plugins, cloning the project to run tests and pipeline information.

### Clone project in Visual Studio Code

Clone the project- git clone <https://github.com/Altinn/altinn-studio.git>

Code for [Testcafe tests](https://github.com/Altinn/altinn-studio/tree/master/src/test/Testcafe) in altinn.studio

### Install Tools

1. Open PowerShell -> Verify Node and Npm version
    - npm -v (6.9.0)
    - node -v (9.5.0)
2. Install npm
    - npm install -g npm
3. Install npm in the Altinn Studio project
    - Navigate to the folder - C:\Altinn Studio\altinn-studio\src\test\Testcafe
    - Run command – npm install
4. Ensure that the environment variables has the path of npm
    - C:\Users\UserName\AppData\Roaming\npm
  
### Run a Test Locally from PowerShell

1. Open testRunner.js in Visual Studio Code
2. Set the browser as: Chrome
3. Speed controls the speed of the execution
4. Open a test fixture .js file (e.x., designer_tests -> navigation-tests.js)
5. ‘.only’ can be used to run a specific fixture or a test case
6. Save the project
7. Open PowerShell and navigate to C:\Altinn Studio\altinn-studio\src\test\Testcafe
8. Set environment to run the test using: set ENV=dev
9. Set password for the test users of Studio using: set "username from config.json"=password
10. Run the command – ‘node .\testRunner.js’ to run general tests
11. Run the command - 'node .\WCAGRunner.js' to run wcag tests

### Test cafe pipeline in Azure Devops

[Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=25)
