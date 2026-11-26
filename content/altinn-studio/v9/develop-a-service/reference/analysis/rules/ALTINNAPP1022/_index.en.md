---
draft: true
title: "ALTINNAPP1022: task configuration has an env attribute the app cannot use"
description: "An env attribute in the task configuration has an environment name the app does not recognise, or is not read"
weight: 122
---

This diagnostic is reported when an `env` attribute in `<altinn:taskExtension>` on a task in
`config/process/process.bpmn` does not do what it seems to. That is the case when

- `env` has a name the app does not recognise as an environment, so the entry applies in no
  environment
- the attribute is not named exactly `env`, in lowercase and without a namespace prefix, such as
  `Env` or `altinn:env`, so the app does not read it and the entry applies in every environment
- the element does not take an `env` attribute, so the setting applies in every environment

The message names the task, the attribute, the element and how to fix it. The rule checks the
first two cases for `correspondenceResource` in a `signing` task and for the settings in
`<altinn:eFormidlingConfig>` in an `eFormidling` task. It checks the last one in every task.

A common example of the last case is `env` on `<altinn:dataType>` instead of on the
`<altinn:dataTypes>` list in `<altinn:eFormidlingConfig>`.

The app recognises these names, in any case, but without surrounding spaces:

- Development: `development`, `dev`, `local` and `localtest`
- Staging: `staging`, `test`, `at22`, `at23`, `at24`, `tt02` and `yt01`
- Production: `production`, `prod` and `produksjon`

Category `Process`, severity **warning**. It is a warning because the entry may be meant for an
environment name the app does not recognise either.

Use an environment name from the list, write the attribute as `env`, or move it to the element
that takes it.

See [the task types and their settings](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/)
(documentation available in Norwegian only).
