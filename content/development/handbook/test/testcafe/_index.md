---
title: Testcafe
description: Testcafe
tags: ["development", "handbook", "test", "testcafe"]
weight: 100
---
This document describes how one can start working on a test cafe project from installtion of plugins, cloning the project to writing automation code with java script and debug of the tests.

### Clone project in Visual Studio Code
    1.	Create account in github.com
    2.	Get write access to AltinnStudio - https://github.com/Altinn/altinn-studio
    3.	Use windows 10 image with docker
    4.	Create a folder - C:\Altinn Studio
    5.	Open Visual Studio Code
    6.	Ctrl + Shift + P -> Create New Integrated Terminal
    7.	Terminal opens down of Visual Studio Code
    8.	Navigate to the folder create in step 4 using “cd”
    9.	Clone the project- git clone https://github.com/Altinn/altinn-studio.git
    10.	File -> Add Folder to Workspace -> Select the cloned project: C:\Altinn Studio
    11.	Checkout branch: testcafe-UI-tests

Code for [Testcafe tests](https://github.com/Altinn/altinn-studio/tree/master/src/test/Testcafe) in altinn.studio

### Install Plugins
    1.	Open PowerShell -> Verify Node and Npm version
            npm -v (6.9.0)
            node -v (9.5.0)
    2.	Install npm
            a. npm install -g npm
    3.	Install npm in the Altinn Studio project
            a.	Navigate to the folder - C:\Altinn Studio\altinn-studio\src\test\Testcafe
            b.	Use command – npm install
    4.	Ensure that the environment variables has the path of npm
            a.	C:\Users\UserName\AppData\Roaming\npm

### Automation
    1.	config.json has the URLs
    2.	Use of objects from POM
        a.	Import page – import page_name from ‘path to the file’
        b.	Declare an object for the page - let object name = new page_name();
    3.	To debug  
        a.	rename the test to “test.only”
        b.	in testRunner.js
            i.	Remove “headless” from browsers
            ii.	Reduce the speed to 0.8 (percentage)
            iii. debugOnFail : True
            iv.	stopOnFirstFail: True
        c.	When test fails check for logs in junit.xml
    4.	Selectors
        a.	Id – starts with ‘#’
        b.	Class – starts with ‘.’
        c.	Html -> “ul > li”
    5.	test.skip – to skip a test in a test run (The results for the tests goes to Others)

[More about Selectors](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/)

### Run a Test from PowerShell
    1.	Open testRunner.js in Visual Studio Code
    2.	Remove ‘headless’ from the browsers
    3.	Speed controls the speed of the execution
    4.	Open a test fixture .js file (e.x., designer_tests -> navigation-tests.js)
    5.	‘.only’ can be used to run a specific fixture or a test case
    6.	Save the project
    7.	Open PowerShell and navigate to C:\Altinn Studio\altinn-studio\src\test\Testcafe
    8.	Run the command – ‘node .\testRunner.js --env=dev’


### Debug Tests
Details are on the way !!

### Pipeline in Azure Devops
[Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=5)