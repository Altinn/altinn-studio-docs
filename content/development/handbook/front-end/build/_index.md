---
title: Build
description: Build documentation for altinn.studio frontend
tags: ["development", "frontend", "build"]
weight: 100
---

### Building of react apps in altinn.studio

The building of react apps are done in dockerfiles which then again are used in the build of altinn-core docker-image.  
Apps are compiled and copied.

### Adding new packages to react-applications

Adding of a new package in an app is done with `npm` in the app where it's needed. If multiple apps have the same package as a dependency, lerna will hoist the package, so it will only be installed once, and used by the depending apps.