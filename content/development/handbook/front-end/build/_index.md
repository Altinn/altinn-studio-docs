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

Adding of a new package in an app is done with `lerna` in the lerna-folder (`/src/react-apps/`). 
Command syntax for this will be:  
`lerna add [package-name] --scope=[app-name] --exact`  
If you are going to add `react` to a new app called Foo:  
`lerna add react --scope=Foo --exact`