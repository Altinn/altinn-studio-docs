---
title: 'Process identifiers'
description: 'Learn how process identifiers can be used to create associations between separate dialogs'
weight: 60
---

## Introduction

Some types of processes consist of several distinct subprocesses/dialogs that cannot easily or appropriately be expressed one and the same dialog, e.g., when there are different dialogs that must be carried out with different service providers and which do not necessarily have to take place sequentially.

Dialogs can optionally contain two process-related fields:

- `process`, which identifies the business process the dialog belongs to
- `precedingProcess`, which identifies a business process that logically came before the one referenced by `process`

Both fields are plain URI/URN strings. `precedingProcess` cannot be set unless `process` is also set.

## Usage scenarios

Typical uses for these fields are:

- Group several dialogs that belong to the same overall case or process, even when the dialogs are handled by different services or service owners
- Link a dialog to an earlier process when a new dialog starts as a consequence of a previous one
- Filter dialogs by `process` in both end-user and service-owner search APIs
- Correlate dialogs in Altinn Events, where `process` and `precedingProcess` are included in the event payload when present on the dialog

{{<notice info>}}
Arbeidsflate currently does not utilize the `process` / `precedingProcess` functionality, but this may change in the future.
{{</notice>}}

{{<children />}}
