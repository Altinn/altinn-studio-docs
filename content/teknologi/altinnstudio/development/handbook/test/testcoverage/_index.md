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
2. | Cannot create new app, as app name already exists | Dashboard
3. | Happy case; deploy an app to a test environment after a change | Deploy to test 
4. | App cannot deploy due to compilation error | Deploy to test 
5. | App cannot be deployed due to uncomitted local changes | Deploy to test 
6. | User does not have write access to app, and cannot deploy | Deploy to test 
7. | Navigating using the "about" tab | UI-editor 
8. | Navigating using the "create" tab |UI-editor 
9. | Navigating using the "Language" tab | UI-editor
10. | Navigating using the "Deploy" tab | UI-editor 
11. | Drag and drop of components | UI-editor 
12. | Add one of each component to the designer using keyboard | UI-editor 
13. | Sync an app with master | UI-editor 
14. | "About" page items, and editing of app data | UI-editor 
15. | Clone modal functionality | Deploy 
16. | Validation of missing datamodel in clone modal | Deploy 
17. | Fill out Access control information on an app | Designer
18. | Configure and delete rules | UI-editor
19. | Links in App Logic menu | UI-editor
20. | Add and delete conditional rendering connections | UI-editor
21. | Error messages when app does not exist | Dashboard
22. | Open Gitea repository navigation | UI-editor
23. | User cannot clone an app that does not have a data model | UI-editor

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
19. | POST Generate PDF | Platfrom - PDF

#### App
Sl.No. |    Testcase name   |   Area of Solution   
:--- | :--- | :---: 
1. | Create, Get, Edit app instance | App
2. | Start, get, get next, change next, complete Process | App
3. | Negative tests in process | App
4. | Add, Get, Edit Form data xml | App
4. | Add, Get, Edit, delete Form data attachment | App
5. | Delete a form data xml - negative | App
7. | Create app instance with multipart data | App
8. | Verify instance created with multipart | App
9. | Start process again - negative | App
10. | Get current, Get next, Move to next process | App
11. | Move process to active task again - negative | App
12. | Complete a compelted process - negative | App
13. | End to End test from starting an instance to Archiving it | App

#### Negative Tests
Sl.No. |    Testcase name   |   Area of Solution   
:--- | :--- | :---:
1. | Access Storage API without authentication token | Storage
2. | Access App API without authentication token | App
3. | Create App instance with low level security login than required | App & Storage
4. | Create App instance without allowed roles | App & Storage
5. | Access App instance without allowed roles | App & Storage
6. | Access App instance with low level security login than required | Storage
7. | Create App instance allowed only for AppOwner | App

#### Manual API Test
Sl.No. |    Testcase name   |   Area of Solution   
:--- | :--- | :---:
1. | GET instances as app Owner | Storage
2. | Download instance data as app Owner | Storage
3. | Confirm the download of instance data | Storage
