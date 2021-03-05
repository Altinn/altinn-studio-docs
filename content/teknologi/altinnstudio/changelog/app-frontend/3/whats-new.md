---
title: What's new
linktitle: What's new
description: Overview of changes introduced in v3 of app frontend
toc: true
---
## 3.0.4 (2021-03-05) - Bugfix for text styling in tiltes/descriptions
Fix issue where label and description texts would get cut off mid word. Issue [5810.](https://github.com/Altinn/altinn-studio/issues/5810)

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
