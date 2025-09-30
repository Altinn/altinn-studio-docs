---
title: App template and deps
description: Guidelines for working with the app template and its dependencies
tags: [development]
weight: 100
---

## Process for updating app template and its dependencies

### Updating app template (Template files + depentent supporting projects)

1. Complete changes in template
2. Get PR approved
3. Push alpha nugets & update reference in Altinn.Apps/AppTemplate
4. Merge to master
5. Complete testing of new feature
Once testing is completed and successful
6. Create new branch. Push nugets **without alpha** based on the branch
Duplicate changes in Altinn Studio template
7. Update nuget reference in Altinn Studio template.

### Updating Altinn Platform and app template  

1. Code that requires changes in platform are merged in a seperate PR
2. The platform code must be rolled out to all environments.
3. Then, follow [Updating app template](#updating-app-template-template-files--depentent-supporting-projects) for remaning changes.

If there is a need to deploy the code faster than the regular deploy schedule, a specific deploy should be considered.
