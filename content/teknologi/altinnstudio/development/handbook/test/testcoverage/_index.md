---
title: Test Coverage
description: Automation testcases by area
tags: [development, testing]
weight: 100
---

### Testcafe tests

| Sl.No. | Testcase name                                                  | Area of Solution |
| :----- | :------------------------------------------------------------- | :--------------: |
| 1.     | Login to altinn studio                                         |      Login       |
| 2.     | Cannot create new app, as app name already exists              |    Dashboard     |
| 3.     | Happy case; deploy an app to a test environment after a change |  Deploy to test  |
| 4.     | App cannot deploy due to compilation error                     |  Deploy to test  |
| 5.     | App cannot be deployed due to uncomitted local changes         |  Deploy to test  |
| 6.     | User does not have write access to app, and cannot deploy      |  Deploy to test  |
| 7.     | Navigating using the "about" tab                               |    UI-editor     |
| 8.     | Navigating using the "create" tab                              |    UI-editor     |
| 9.     | Navigating using the "Language" tab                            |    UI-editor     |
| 10.    | Navigating using the "Deploy" tab                              |    UI-editor     |
| 11.    | Drag and drop of components                                    |    UI-editor     |
| 12.    | Add one of each component to the designer using keyboard       |    UI-editor     |
| 13.    | Sync an app with master                                        |    UI-editor     |
| 14.    | "About" page items, and editing of app data                    |    UI-editor     |
| 15.    | Clone modal functionality                                      |      Deploy      |
| 16.    | Validation of missing datamodel in clone modal                 |      Deploy      |
| 17.    | Fill out Access control information on an app                  |     Designer     |
| 18.    | Configure and delete rules                                     |    UI-editor     |
| 19.    | Links in App Logic menu                                        |    UI-editor     |
| 20.    | Add and delete conditional rendering connections               |    UI-editor     |
| 21.    | Error messages when app does not exist                         |    Dashboard     |
| 22.    | Open Gitea repository navigation                               |    UI-editor     |
| 23.    | User cannot clone an app that does not have a data model       |    UI-editor     |
| 24.    | Delete local app changes                                       |    UI-editor     |

### k6 API tests

#### Platform

| Sl.No. | Testcase name                                                 | Area of Solution  |
| :----- | :------------------------------------------------------------ | :---------------: |
| 1.     | Create instance by looking up party id for user and org       | Platform-Register |
| 2.     | Get Authentication ticket                                     |  Platform-AuthN   |
| 3.     | Get Parties                                                   |  Platform-Authz   |
| 4.     | Get Roles                                                     |  Platform-Authz   |
| 5.     | PDP decision - permit for user and NA for app owner           |  Platform-Authz   |
| 6.     | GET applications by org and app name                          |      Storage      |
| 7.     | Create, get with filter and id, edit and delete app instances |      Storage      |
| 8.     | Create, get by id, edit and delete app instance form data     |      Storage      |
| 9.     | Create, get events with filter app instance events            |      Storage      |
| 10.    | Edit instance process and get process history                 |      Storage      |
| 11.    | Soft and Hard delete app instances                            |      Storage      |
| 12.    | Restore soft deleted app instance                             |      Storage      |
| 13.    | Restore hard deleted app instance - negative                  |      Storage      |
| 14.    | Get instances, by id and instance events                      |    Storage-SBL    |
| 15.    | Soft/hard delete and restore instances                        |    Storage-SBL    |
| 16.    | POST Generate PDF                                             |   Platfrom-PDF    |
| 17.    | Get receipt and includes party info                           | Platform-Receipt  |
| 18.    | Get app texts                                                 |      Storage      |
| 19.    | Upload, get by id, edit and delete attachment                 |      Storage      |

#### App

| Sl.No. | Testcase name                                               | Area of Solution |
| :----- | :---------------------------------------------------------- | :--------------: |
| 1.     | Create, Get app instance                                    |       App        |
| 2.     | Start, get current, get next, change next, complete Process |       App        |
| 3.     | Get process history                                         |       App        |
| 4.     | Add, Get, Edit Form data xml                                |       App        |
| 5.     | Add, Get, Edit, delete Form data attachment                 |       App        |
| 6.     | Create app instance with multipart data                     |       App        |
| 7.     | Verify instance created with multipart                      |       App        |
| 8.     | End to End test from starting an instance to Archiving it   |       App        |
| 9.     | Test simulating all the api calls from portal               |       App        |
| 10.    | Validate instance and instance data                         |       App        |
| 11.    | Verify pdf generation with archiving                        |       App        |

#### Negative Tests

| Sl.No. | Testcase name                                                   | Area of Solution  |
| :----- | :-------------------------------------------------------------- | :---------------: |
| 1.     | Access Storage API without authentication token                 |      Storage      |
| 2.     | Access App API without authentication token                     |        App        |
| 3.     | Create App instance with low level security login than required |   App & Storage   |
| 4.     | Create App instance without allowed roles                       |   App & Storage   |
| 5.     | Access App instance without allowed roles                       |   App & Storage   |
| 6.     | Access App instance with low level security login than required |      Storage      |
| 7.     | Write to instance without write access as app owner             |        App        |
| 8.     | GET Organization - forbidden                                    | Platform-Register |
| 9.     | GET Parties - forbidden                                         | Platform-Register |
| 10.    | GET Person information - forbidden                              | Platform-Register |
| 11.    | GET User profile details - forbidden                            | Platform-Profile  |
| 12.    | Create, edit and delete applications - forbidden                |      Storage      |
| 13.    | Create, edit and delete app texts - forbidden                   |      Storage      |
| 14.    | Delete a form data xml - negative                               |        App        |
| 15.    | Start process again - negative                                  |        App        |
| 16.    | Move process to active task again - negative                    |        App        |
| 17.    | Complete a compelted process - negative                         |        App        |

#### App Owner API Test

| Sl.No. | Testcase name                                                  | Area of Solution |
| :----- | :------------------------------------------------------------- | :--------------: |
| 1.     | GET instances as app Owner                                     |     Storage      |
| 2.     | Download instance data as app Owner                            |     Storage      |
| 3.     | Confirm the download of instance data                          |     Storage      |
| 4.     | Create instance and upload data  and delete instance           |     Storage      |
| 5.     | E2E test - create, upload data , archive and complete instance |       App        |
