---
draft: true
title: "ALTINNAPP1021: task configuration contains an element the app ignores"
description: "The app does not read an element in altinn:taskExtension, so the setting has no effect"
weight: 121
---

This diagnostic is reported when `<altinn:taskExtension>` on a task in
`config/process/process.bpmn` has an element the app does not read. That is

- an element in the Altinn namespace that the app does not read in that place, for example
  because of a typo or the wrong upper and lower case
- an element the app knows, but in a namespace other than `http://altinn.no/process`
- an extra occurrence of an element the app reads only one of, since the app reads the first

The message names the task, the element and where it is, and suggests a fix.

The app skips elements it does not know without a word, so the setting is lost silently.
Elements with other names in other namespaces belong to other tools, and the rule does not
report them. The build reports the old settings `subformComponentId` and `subformDataTypeId` as
[ALTINNAPP0602]({{< relref "/altinn-studio/v9/develop-a-service/reference/analysis/rules/ALTINNAPP0602" >}})
instead.

Category `Process`, severity **warning**. It is a warning because nothing fails where the
element is.

Correct the name or the namespace as the message suggests, or remove the element. If you have
two of an element the app reads only one of, keep just one.

See [the task types and their settings](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/)
(documentation available in Norwegian only).
