---
draft: true
title: "ALTINNAPP1022: task configuration has an env attribute the app cannot use"
description: "An env attribute in a task's configuration in process.bpmn names no environment the app recognises, or the app does not read it"
weight: 122
---

This diagnostic is reported when an `env` attribute in a task's configuration in
`config/process/process.bpmn` does not do what it says. The message names the task, the
attribute and the element it is on, what the app makes of it, and how to fix it.

For each environment, the app uses the entry whose `env` names that environment, and otherwise
the entry without `env`. The rule reports:

- an `env` with a name the app does not recognise, so the entry applies in none of Development,
  Staging and Production (the app ignores case, but not spaces around the name)
- an attribute the app does not read because of its case or namespace prefix, such as `Env` or
  `altinn:env`, so the entry applies in every environment
- an `env` attribute, in any case or namespace, on an element that does not take one, so the
  setting applies in every environment

Only `<altinn:correspondenceResource>` in `<altinn:signatureConfig>` and the elements directly in
`<altinn:eFormidlingConfig>` take `env`. That includes `<altinn:dataTypes>`, but not the
`<altinn:dataType>` entries in it.

The app recognises these environment names:

| Environment | Names                                                     |
| ----------- | --------------------------------------------------------- |
| Development | `development`, `dev`, `local`, `localtest`                |
| Staging     | `staging`, `test`, `at22`, `at23`, `at24`, `tt02`, `yt01` |
| Production  | `production`, `prod`, `produksjon`                        |

Category `Process`, severity **warning**.

Use one of the names in the table, in an attribute named `env`, in lowercase and without a
prefix. Remove `env` from an element that does not take one. For an `<altinn:dataType>`, move
`env` to the `<altinn:dataTypes>` that holds it, with one `<altinn:dataTypes>` per environment.

See [environment-specific values]({{< relref "/altinn-studio/v9/receive-data/eFormidling#eFormidling-setup-env" >}}) in the eFormidling guide.
