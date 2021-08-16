---
title: What's new
linktitle: What's new
description: Overview of changes introduced in v3 of app frontend
toc: true
---

## 3.10.1 (2021-08-16) - App frontend includes partyID for stateless apps
App frontend includes partyID in calls for fetching stateless data.
Issue [#6609](https://github.com/Altinn/altinn-studio/issues/6609)

## 3.10.0 (2021-08-13) - Log out functionality
Added functionality for log out from app frontend.
Issue [#6620](https://github.com/Altinn/altinn-studio/issues/6620)

## 3.9.9 (2021-08-12) - Dependency patching
Patching of external dependencies for w32.
Issue [#6600](https://github.com/Altinn/altinn-studio/issues/6600).

## 3.9.8 (2021-08-05) - Dependency patching
Patching of external dependenecies for w31.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.7 (2021-08-03) - Bugfix print view
Fixed a bug where the print view for Altinn Apps would display an empty container.
Issue [#6578](https://github.com/Altinn/altinn-studio/issues/6578).

## 3.9.6 (2021-08-02) - Dependency patching
Patching of external dependenecies for w30.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.5 (2021-07-28) - Bugfix for mobile view during app startup
Fixed a bug where the app modal would behave inconsistent during app startup on mobile devices.
Issue [#6558](https://github.com/Altinn/altinn-studio/issues/6558).

## 3.9.4 (2021-07-23) - Bugfix validation trigger for groups.
Fix a bug where validations would not be triggered when closing a repeating group by clicking `Edit` button when trigger was present.
Issue [#6427](https://github.com/Altinn/altinn-studio/issues/6427).

## 3.9.3 (2021-07-23) - Dependency patching
Patching of external dependencies for w29.

## 3.9.2 (2021-07-02) - Dependency patching
Patching of external dependencies for w26.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.9.1 (2021-07-01) - Support for redirect to require higher authentication level for stateless app
Fix for bug that didn't redirect user to login page with allowed authentication levels if logged in with a too low level.
Issue [#6506](https://github.com/Altinn/altinn-studio/issues/6506).

## 3.8.0 (2021-06-29) - Several updates to validation functionality
- Support for adding custom error messages to client side validations (JSON schema).
- Support for specifying single field validation (server) as FIXED to make sure resolved validation error messages are removed.
- Fixes bug where single field validation that returned empty (no errors/warnings) did not remove existing validation messages.
Issue [#5747](https://github.com/Altinn/altinn-studio/issues/5747).

## 3.7.0 (2021-06-29) - Support for posting data from stateless app
Issue [#6194](https://github.com/Altinn/altinn-studio/issues/6194).

## 3.6.14 (2021-06-22) - Bug fix for duplicated validation messages
Fixed a bug that caused validation messages on a FileUpload component to be displayed twice.
Issue [#6400](https://github.com/Altinn/altinn-studio/issues/6400).

## 3.6.13 (2021-06-18) - Bugfix for replaceAll with variables in text
Fix for bug introduced in 3.6.9, where only the last variable in texts with multiple variables was replaced. 
The change in 3.6.9 also caused summary page to fail in some cases.
Issue [#6455](https://github.com/Altinn/altinn-studio/issues/6455).

## 3.6.12 (2021-06-18) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.6.11 (2021-06-16) - Bugfix for disappearing validation messages
Fixed bug for disappearing validation messages. Single field validation response would overwrite all 
existing validations, causing earlier triggered validation messages to disappear.
Issue [#5857](https://github.com/Altinn/altinn-studio/issues/5857).

## 3.6.10 (2021-06-15) - Bugfix for navigation buttons with multiple triggers
Fixed bug for navigation buttons configured with multiple triggers, where only the first one was actually triggered.
Issue [#6387](https://github.com/Altinn/altinn-studio/issues/6387).

## 3.6.9 (2021-06-14) - Bugfix variables in text
Fixed bug where only first occurance of a variable in a given text was replaced.
Issue [#6091](https://github.com/Altinn/altinn-studio/issues/6091)

## 3.6.8 (2021-06-11) - New endpoints for statless app
New endpoints for stateless app.
Issue [#6227](https://github.com/Altinn/altinn-studio/issues/6227)

## 3.6.7 (2021-06-10) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385)

## 3.6.6 (2021-06-09) - Dependency patching
Updated to latest major version of react v17. 
Issue [#5072](https://github.com/Altinn/altinn-studio/issues/5072)

## 3.6.5 (2021-06-02) Bugfix for stateless app 
Fixed bug where stateless app with onEntry.show set to `new-instance` would crash.
Issue [#6321](https://github.com/Altinn/altinn-studio/issues/6321).

## 3.6.4 (2021-06-02) Bugfix for simple receipt
Fixed bug where simple receipt did not parse markdown if the app overrides defult texts.
Issue [#6232](https://github.com/Altinn/altinn-studio/issues/6362).

## 3.6.3 (2021-06-02) Bufix for content loader
Fixed bug where content loader did not scale for whole view.
Issue [#4888](https://github.com/Altinn/altinn-studio/issues/4888).

## 3.6.2 (2021-06-01) Bugfix for summary view of group with multiple pages
Fixed bug that caused app frontend to crash when rendering summary component for group when the group was defined with
multiple pages in edit mode.
Issue [#6233](https://github.com/Altinn/altinn-studio/issues/6233).

## 3.6.1 (2021-05-28) Dependency patching
Patching of external dependencies. Issue [#6324](https://github.com/Altinn/altinn-studio/issues/6324).

## 3.6.0 (2021-05-28) Support for hiding back button in apps
Issue [#6193](https://github.com/altinn/altinn-studio/issues/6193).

## 3.5.0 (2021-05-27) Support for number formatting
Added support for formatting numbers for `Input`-components. 
Issue [#5972](https://github.com/altinn/altinn-studio/issues/5972).

## 3.4.2 (2021-05-26) Improve look of summary for checkboxes component
Issue [#6329](https://github.com/Altinn/altinn-studio/issues/6329).

## 3.4.1 (2021-05-20) Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.4.0 (2021-05-18) Support for stateless apps
Issue [#6124](https://github.com/Altinn/altinn-studio/issues/6124).

## 3.3.5 (2021-05-14) - Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.3.4 (2021-05-11) Bugfix for calculation in groups
Issue [#6235](https://github.com/Altinn/altinn-studio/issues/6235).

## 3.3.3 (2021-05-11) Run data validation on page switch, and fix group component mobile view
Issue [#6236](https://github.com/Altinn/altinn-studio/issues/6236).
Issue [#5977](https://github.com/Altinn/altinn-studio/issues/5977).

## 3.3.2 (2021-05-06) - Dependency patching
Patching of external dependencies. Issue [#6011](https://github.com/Altinn/altinn-studio/issues/6011).

## 3.3.1 (2021-05-06) Support for markdown in validation messages
Issue [#5137](https://github.com/Altinn/altinn-studio/issues/5137).

## 3.3.0 (2021-05-03) Support for multiple views in repeating group edit mode
Issue [#5869](https://github.com/Altinn/altinn-studio/issues/5869).

## 3.2.2 (2021-04-23) - Dependency patching
Patching of external dependencies. Issue [#6011.](https://github.com/Altinn/altinn-studio/issues/6011)

## 3.2.1 (2021-04-23) - Bugfix for group validations
Fixed a bug where groups with validation trigger would call the instance validation api. Now calls data validation. Issue [#6089.](https://github.com/Altinn/altinn-studio/issues/6089)

## 3.2.0 (2021-04-21) - Validation on group save
Added support for running validations on a group when the user tries to save an entry. Issue [#5281.](https://github.com/Altinn/altinn-studio/issues/5281)

## 3.1.6 (2021-04-19) - Bugfix for checkbox values in summary component
Fixed bug where summary would display an empty string for checkboxes with multiple selected values. Issue [#5993.](https://github.com/Altinn/altinn-studio/issues/5993)

## 3.1.5 (2021-04-19) - Bugfix for repeating group state on calculation
Fixed bug where repeating group state would not be updated if a backend calculation had altered a repeating group. Issue [#6006.](https://github.com/Altinn/altinn-studio/issues/6006)

## 3.1.4 (2021-04-19) - Bugfix for validations on group delete
Fixed bug where validations for a given group index would not be removed on delete. Issue [#5960.](https://github.com/Altinn/altinn-studio/issues/5960)

## 3.1.3 (2021-04-16) - Bugfix for validation
Fixed bug where single field validation would validate the whole instance and not data. Issue [#5885.](https://github.com/Altinn/altinn-studio/issues/5885)

## 3.1.2 (2021-04-12) - Dependency patching.
Patching of external dependencies. Issue [#5957.](https://github.com/Altinn/altinn-studio/issues/5957)

## 3.1.1 (2021-04-09) - Bugfix for slow calculate 
Fixed bug where a slow backend calculation can overwrite later entered data. Issue [#5754.](https://github.com/Altinn/altinn-studio/issues/5754)

## 3.1.0 (2021-04-07)- Help text for paragraph and header components
App now supports help text for paragraph and header components. Issue [#5862.](https://github.com/Altinn/altinn-studio/issues/5862)

## 3.0.16 (2021-04-06) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877)

## 3.0.15 (2021-03-22) - Bugix for group component with checkboxes
Fixed bug where group component summary would display an empty value for checkboxes that had several selected values. Issue [#5907.](https://github.com/Altinn/altinn-studio/issues/5907)

## 3.0.14 (2021-03-19) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877) 

## 3.0.13 (2021-03-18) - Internal typings 
App frontend internal typings updated to fix failing tests. No issue connected.

## 3.0.12 (2021-03-17) - Bugfix for markdown support in summary and group titles
Fixed bug where app frontend would not render markdown in summary and group titles. Issue [#5781.](https://github.com/Altinn/altinn-studio/issues/5781)

## 3.0.11 (2021-03-17) - Bugfix for page order calculation
Fixed bug where app frontend would trigger call to calculate page order even when no calculation trigger was present. Issue [#5863.](https://github.com/Altinn/altinn-studio/issues/5863)

## 3.0.10 (2021-03-12) - Bugfix for page order calculation 
Fixed bug where app frontend would trigger call to calculate page order for single page applications. Issue [#5859.](https://github.com/Altinn/altinn-studio/issues/5859) 

## 3.0.9 (2021-03-12) - Dependency patching
Patching of external dependencies. Issue [#5771.](https://github.com/Altinn/altinn-studio/issues/5771) 


## 3.0.8 (2021-03-12) - Support for dynamicly getting page order
App frontend now supports dynamicly fetching the page order on next page ("sporvalg"). See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/sporvalg/) for more information. Issue [#5640.](https://github.com/Altinn/altinn-studio/issues/5640) 

## 3.0.7 (2021-03-09) - Bugfix for page caching
Fixed issue where the app would cache the first page in alphabetical order and not respect the order in Settings.json. Issue [#5819.](https://github.com/Altinn/altinn-studio/issues/5819) 

## 3.0.6 (2021-03-08) - Caching of last viewed page
Introduced caching of the last viewed form page, so user is returned to this page when refreshing or coming back at a later
time. Issue [#5278.](https://github.com/Altinn/altinn-studio/issues/5278) 

## 3.0.5 (2021-03-05) - Dependency patching
Patching of external dependencies. Issue [#5770.](https://github.com/Altinn/altinn-studio/issues/5770) 

## 3.0.4 (2021-03-05) - Bugfix for text styling in titles/descriptions
Fix issue where label and description texts would get cut off mid word. Issue [#5810.](https://github.com/Altinn/altinn-studio/issues/5810)

## 3.0.3 (2021-03-02) - Bugfix for metadata with layoutsets
Fix issue where app-frontend feched wrong metadata when using layoutsets. Issue [#5624.](https://github.com/Altinn/altinn-studio/issues/5624) 

## 3.0.2 (2021-02-26) - Dependency patching
Patching of external dependencies. Issue [#5676.](https://github.com/Altinn/altinn-studio/issues/5676) 

## 3.0.1 (2021-02-25) - Horizontally aligned components & Bugfix for loading options
App-frontend now supports horizontally aligned components. See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/ui-editor/layout-style/#sidestilte-komponenter) for more information. Issue [#1515.](https://github.com/Altinn/altinn-studio/issues/1515) 

Fix issue that only loaded options related to form layout in first data task - for subsequent data tasks
options were not loaded. Issue [#5619.](https://github.com/Altinn/altinn-studio/issues/5619)

## 3.0.0 (2021-02-23) - New font for App Frontend

This version changes the font for the app frontend from Roboto to Altinn-DIN.
For the apps to show fonts as expected, some changes need to be made. See [breaking changes](../breaking-changes)
for the details.
