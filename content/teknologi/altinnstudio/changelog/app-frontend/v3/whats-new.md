---
title: What's new
linktitle: What's new
description: Overview of changes introduced in v3 of app frontend
toc: true
---

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
