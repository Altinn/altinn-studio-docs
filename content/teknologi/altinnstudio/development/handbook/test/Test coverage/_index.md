---
title: Test Coverage
description: Automation testcases by area
tags: [development, testing]
weight: 100
---

###  Testcafe tests

Sl.No. |    Testcase name   |   Area of Solution
:--- | :--- | :---:
1. | Login to altinn studio | All areas
2. | Cannot create new app, as app name already exists | dashboard 
3. | Create a new app | dashboard 
4. | Search for only my users apps | dashboard 
5. | Happy case; deploy an app to a test environment after a change | Deploy to test 
6. | Deploy an app to a test environment after a change | Deploy to test 
7. | App cannot deploy due to compilation error | Deploy to test 
8. | App cannot be deployed due to local changes | Deploy to test 
9. | User does not have write access to app, and cannot deploy | Deploy to test 
10. | Accessibility testing for deployment to test environment page | Deploy to test 
11. | Navigating using the "about" tab | UI-editor 
12. | Navigating using the "create" tab |UI-editor 
13. | Navigating using the "Language" tab | UI-editor
14. | Navigating using the "Test" tab | UI-editor 
15. | Navigating using the "Publish" tab | UI-editor 
16. | Automated accesibility testing for GUI editor | UI-editor 
17. | Drag and drop of components | UI-editor 
18. | Add one of each component to the designer using keyboard | UI-editor 
19. | Sync an app with master | UI-editor 
20. | "About" page items, and editing of app data | UI-editor 
21. | Automated accessibility tests for about page | UI-editor 
22. | Instantiate an app in app frontend | app frontend 
23. | Direct link navigation to app frontend | app frontend 
24. | Upload files in app frontend using file component from editor | app frontend 
25. | Check for correct validations when uploading a file | app frontend 
26. | Read-only components test not editable in app frontend | app frontend 
27. | Fill out, save, and submit a form | app frontend 
28. | conditional rendering of component in runtime | app frontend 
29. | Automated accesibility testing for app frontend | app frontend
30. | Clone modal functionality | Deploy 
31. | Validation of missing datamodel in clone modal | Deploy 
32. | Fill out Access control information on an app | Designer
33. | Configure and delete rules | UI-editor
34. | Links in App Logic menu | Ui-editor
35. | Add and delete conditional rendering connections | UI-editor
36. | Instantiation of an access controlled app not possible | Instantiation
37. | Party Selection page with error message and party list | Instantiation
38. | Attachment dropdown and download on receipt page | App frontend
39. | Check that cookie for Altinn Party is set correctly | App frontend
40. | Receipt page test | Receipt

### Postman tests
#### Platform
Sl.No. |    Testcase name   |   Area of Solution   
:--- | :--- | :---: 
1. | GET Organization | Platform-Register
2. | GET Parties | Platform-Register
3. | GET Person information | Platform-Register
4. | GET Party id by SSN and Org number | Platform-Register
5. | GET Party information by SSN and Org number | Platform-Register
6. | GET User profile details | Platform-Profile
7. | GET Authentication ticket | Platform-Authentication
8. | GET Parties | Platform-Authorization
9. | GET Roles | Platform-Authorization
10. | Create, get with filter, edit and delete applications | Storage
11. | Create, get with filter, edit and delete app instances | Storage
12. | Create, get with filter, edit and delete app instance data | Storage
13. | Create, get with filter, delete app instance events | Storage
14. | Soft and Hard delete app instances | Storage
15. | Restore soft deleted app instance | Storage
16. | Restore hard deleted app instance - negative | Storage
17. | Get instances, by id and instance events | Storage-SBL
18. | Soft/hard delete and restore instances | Storage-SBL

#### Runtime
Sl.No. |    Testcase name   |   Area of Solution   
:--- | :--- | :---: 
1. | Create, Get, Edit app instance | Runtime
2. | Start, get, get next, change next, complete Process | Runtime
3. | Negative tests in process | Runtime
4. | Add, Get, Edit Form data xml | Runtime
5. | Delete a form data xml - negative | Runtime
6. | Add an attachment to an instance | Runtime
7. | Create app instance with multipart data | Runtime
8. | Verify instance created with multipart | Runtime