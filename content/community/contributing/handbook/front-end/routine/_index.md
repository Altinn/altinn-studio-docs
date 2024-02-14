---
title: Routines for development
description: Describes routines for developing frontend code for resources in the DevOps team.
tags: [development, routines, front-end]
weight: 11
---

When selecting an issue from the backlog, assign yourself to the issue and set it to the **Developing** pipeline in the 
[Altinn Tjenester 3.0 - DevOps Team board](https://app.zenhub.com/workspaces/altinn-tjenester-30---devops-team-5df74719734ff22fc00b0b59/board?repos=136911355,150577447)

## App frontend

1. Create a new branch from `main`. 
   - Naming convention for branches is `bug/<issue number>-<short description>` or `feature/<issue number>-<short description>`, depending on the issue type.
2. Code your changes and test them by [running an app locally](../developing#app-frontend).
3. Run unit tests
   - Update any failing tests
   - Add new tests when needed
4. Make sure you update the `version` in `altinn-app-frontend/package.json`, following [semantic versioning](../versioning/). 
5. Commit/push your changes and [create a pull request](https://github.com/Altinn/altinn-studio/compare).
   - Tag the issue in the description of the PR. _Do not use "fix"/"fixes" issue, as this will close the issue when PR is merged._
   - Move the issue to the **Review/QA** pipeline in board and tag/notify any reviewers.
6. Fix any review comments and/or issues that come up from running the automated pipelines.
   - All pipelines should run green.
   - Test coverage should be >65%.
   - No new code smells should be introduced. 
7. Once approval of code is in and all pipelines run green, move the issue to **Testing** pipeline in board and unassign yourself.
8. Fix any bugs that are uncovered by manual testing.
9. Once testing is completed, tester will move issue to **Done** pipeline in board. When this is done, code can be merged into `main`. 
   - Make sure the `version` in `altinn-app-frontend/package.json` is still updated to a new version (new code might have been merged in the mean time).
10. Update any relevant documentation. F.ex.
    - [Changelog for app frontend](/community/changelog/app-frontend/).
    - [User documentation](/app).
11.  Check if there are any tasks in the issue that are incomplete. If all tasks are completed, the issue can be closed.

## Studio frontend

1. Create a new branch from `main`. Naming convention for branches is `bug/<issue number>-<short description>` or `feature/<issue number>-<short description>`, depending on the issue type.
2. Code your changes and test them by [running Designer locally](../developing#altinn-studio-designer).
3. Run unit tests
   - Update any failing tests
   - Add new tests when needed
4. Commit/push your changes and [create a pull request](https://github.com/Altinn/altinn-studio/compare).
   - Tag the issue in the description of the PR. _Do not use "fix"/"fixes" issue, as this will close the issue when PR is merged._
   - Move the issue to the **Review/QA** pipeline in board and tag/notify any reviewers.
5. Fix any review comments and/or issues that come up from running the automated pipelines.
   - All pipelines should run green.
   - Test coverage should be >85%.
   - No new code smells should be introduced. 
6. Once approval of code is in and all pipelines run green, merge the code to `main`, move the issue to **Testing** pipeline in board and unassign yourself.
7. Fix any bugs that are uncovered by manual testing.
8. Update any relevant documentation. F.ex.
   - [User documentation](https://altinn.github.io/docs/altinn-studio/app-creation/).
9. Once testing is complete, check if there are any tasks in the issue that are incomplete. If all tasks are completed, the issue can be closed.