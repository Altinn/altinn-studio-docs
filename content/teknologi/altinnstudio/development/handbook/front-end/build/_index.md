---
title: Build
description: Build documentation for altinn.studio frontend
tags: [development, front-end, build]
weight: 100
---

### Local build
Building an app locally is done by running 

```
npm run build
```

from the apps root folder.

Some of the react projects also have various other predefined npm tasks, which can be viewed in the `package.json` file which is located in the root folder of each react project, example `src/Altinn.Apps/AppFrontend/react/altinn-app-frontend/package.json`


### Adding new packages to react-applications

Adding of a new package in an app is done with `lerna` in the lerna-folder (`/src/react-apps/`). 
Command syntax for this will be:  
`lerna add [package-name] --scope=[app-name] --exact`  
If you are going to add `react` to a new app called Foo:  
`lerna add react --scope=Foo --exact`