---
draft: true
title: "ALTINNAPP1021: task configuration contains an element the app ignores"
description: "An element in a task's configuration in process.bpmn has no effect, because the app does not read it"
weight: 121
---

This diagnostic is reported when a task's configuration in `config/process/process.bpmn`
contains an element the app skips when it reads the process. The message names the task, the
element and where it is, why the app ignores it, and how to fix it.

The rule reports these elements:

- an element in the Altinn namespace (`http://altinn.no/process`) that the app does not read
  where it is: a misspelt name, a name with the wrong case, or a setting in the wrong parent
  element
- a setting the app reads, written in another namespace, for example without the `altinn:`
  prefix
- a second copy of an element the app reads only once, such as `<altinn:signatureConfig>` or
  `<altinn:signatureDataType>`

Elements in other namespaces with names the app does not read belong to other tools, and the
rule leaves them alone. Lists, and settings that differ by environment, may occur more than once.

The app skips these elements silently, so the setting has no effect.

Category `Process`, severity **warning**.

Correct the name or the namespace prefix, move the element, or remove it. If the name differs
only in case from one the app reads, the message gives the right one; otherwise it lists the
elements the app reads there. Where an element the app reads only once occurs more than once,
keep one.

See [the task types and their settings](/nb/altinn-studio/v9/develop-a-service/process/reference/task-types/) (documentation available in
Norwegian only).
