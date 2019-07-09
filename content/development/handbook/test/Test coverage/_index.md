---
title: Test Coverage
description: Automation testcases by area
tags: ["development", "handbook", "test", "postman", "api", "testcafe"]
weight: 100
---

### Automation tests

Testcase name   |   Test framework   |   Area of Solution   | skipped
:--- | :---: | :---: | :---:
Login to altinn studio | testcafe | All areas | no
Create a new service | testcafe | dashboard | yes
Cannot create new service, as service name already exists | testcafe | dashboard | no
Create a new service | testcafe | dashboard | yes
Search for only my users services | testcafe | dashboard | no
filter away a users services by unselecting all bubbles | testcafe | dashboard | yes
deploy a service to a test environment after a change | testcafe | deploy to test | no
Service cannot deploy due to compilation error | testcafe | deploy to test | no
Service cannot be deployed due to local changes | testcafe | deploy to test | no
User does not have write access to service, and cannot deploy | testcafe | deploy to test | no
Accessibility testing for deployment to test environment page | testcafe/axe | deploy to test | no
Navigating using the "about" tab | testcafe | UI-editor | no
Navigating using the "create" tab | testcafe | UI-editor | no
Navigating using the "Language" tab | testcafe | UI-editor | no
Navigating using the "Test" tab | testcafe | UI-editor | no
Navigating using the "Publish" tab | testcafe | UI-editor | no
Automated accesibility testing for GUI editor | testcafe/axe | UI-editor | no
Drag and drop of components | testcafe | UI-editor | no
Add one of each component to the designer using keyboard | testcafe | UI-editor | no
Sync a service with master | testcafe | UI-editor | no
"About" page items, and editing of service data | testcafe | UI-editor | no
Create Repeating groups | testcafe | UI-editor | yes
Automated accessibility tests for about page | testcafe | UI-editor | no
Instantiate a service in app frontend | testcafe | app frontend | no
Direct link navigation to app frontend | testcafe | app frontend | no
Upload files in app frontend using file component from editor | testcafe | app frontend | no
Upload a file larger than 500MB in runtime/streaming test | testcafe | app frontend | yes
Check for correct validations when uploading a file | testcafe | app frontend | no
Read-only components test not editable in app frontend | testcafe | app frontend | no
Fill out, save, and submit a form | testcafe | app frontend | no
conditional rendering of component in runtime | testcafe | app frontend | no
Automated accesibility testing for app frontend | testcafe/axe | app | no