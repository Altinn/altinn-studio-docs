---
title: What's new
linktitle: What's new
description: Overview of changes introduced in v3 of app frontend
toc: true
---

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
