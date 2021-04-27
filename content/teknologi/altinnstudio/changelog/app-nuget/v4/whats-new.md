---
title: What's new
linktitle: What's new
description: Overview of changes introduced in version 4
toc: true
---

## 4.2.0 (2021-04-19) - Possible to integrate an app with eFormidling

Altinn Apps now support integration with eFormidling. 
Documentation on how to set up an application to use eFormidling will be published
once an integration point for eFormidling is set up in Altinn Platform. 

## 4.0.3 (2021-03-23) - Fixed a bug reading filename from Content-Disposition 

- The specification for Content-Disposition specify that `filename` should be in quotes. This was not supported by the app backend API, causing requests following the specification to fail. This has been fixed.
- Added support for `filename*` (FilenameStar). If Content-Disposition contain both `filename` and `filename*`, the value defined by `filename*` will be used.


## 4.0.1 (2021-03-15) - Upgraded application to .Net 5 and grouped references of Altinn App and Altinn Platform services in Startup.cs

Altinn.App.* librarires target .Net 5 now, which requires that the application does the same.
In addition we have created two methods for referencing all app and platform sevices in Startup.cs 

See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.
