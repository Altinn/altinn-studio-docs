---
title: Publishing
description: How to publish an application to test and production environments
weight: 5
---

1. Access the publishing page by clicking the "Publish" button on the right in the top menu.
2. Before the application can be published to an environment, a package that can be published must be built. 
   Fill in the version name (a text, e.g., `1.0` or `v-1`, or similar) and an optional description (2). Press the
   "Build version" button. It may take a few minutes before the build is complete.
   Previous versions and the status of the build can be found at the bottom left.
3. Overview of available environments can be found on the main panel (to the right of the build status).
   Once the package is built, the new version will be available in the dropdown list for the respective environment (3).
   Choose the desired version and press "Deploy new version." The version will then be published in the environment.
   You can view a summary of previously published versions in the table to the right of the dropdown list.

![Publish an application](https://altinncdn.no/studio/docs/images/app-development_publish-overview.png)
