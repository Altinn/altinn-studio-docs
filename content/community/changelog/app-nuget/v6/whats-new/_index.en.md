---
title: What's new
description: Overview of changes introduced in version 6.
toc: true
---

## 6.0.2 Dependency update and bugfix
Updated eFormidling dependency to 1.3.2 in [#13](https://github.com/Altinn/app-lib-dotnet/pull/13)

Removed authentication on redirect endpoint in [#15](https://github.com/Altinn/app-lib-dotnet/pull/15)

[View release on github](https://github.com/Altinn/app-lib-dotnet/releases/tag/v6.0.2)

## 6.0.1 Bugfix for changes in repeating groups

This release fixes [a bug](https://github.com/Altinn/app-frontend-react/issues/319) where a change adding/removing rows
in a repeating group in `ProcessDataWrite()` would cause an unexpected value in the `changedFields` property inside
the API response. With this release, values in `changedFields` properly reflect changes inside repeating group rows,
and sets changed rows/values to `null` when changes in `ProcessDataWrite()` causes rows to be removed.

## 6.0.0 .Net 6 upgrade 

Upgrades App to .Net 6. See Breaking


See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.

