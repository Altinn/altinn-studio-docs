---
title: Quality Management Capabilities
linktitle: Quality Management
description: Quality Management Capabilities covers the different capabilities to mange the project.
tags: [architecture, devops]
toc: false
---


## Quality Assurance & Reviews

All pull request in GitHub requires approved reviews of the changes before it can be merged in to the master branch.

See current and earlier pull request.

For infrastructure changes the pull request is done in Azure Devops with the same type of reviews.

## Defect Tracking & Management

Defects are tracked in Gitub as bugs. [See active and closed bugs](https://github.com/Altinn/altinn-studio/issues?q=is%3Aopen+is%3Aissue+label%3Akind%2Fbug).

## Static SW Analysis Enablement

Every pull requsts needs to adhere to code quality standard verifyed with static code analysis.

The build pipline in Azure Devops runs [LGTM](https://github.com/marketplace/lgtm) for static code analysis with focus on security and
[SonarCloud](https://github.com/apps/sonarcloud) for general static code analysis.
