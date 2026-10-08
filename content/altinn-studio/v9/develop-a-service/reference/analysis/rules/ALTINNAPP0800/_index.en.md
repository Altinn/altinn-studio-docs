---
draft: true
title: "ALTINNAPP0800: service owner lacks required authorisation"
description: "policy.xml does not grant the app owner the rights the app uses on its own behalf"
weight: 80
---

This diagnostic is reported when `config/authorization/policy.xml` does not grant the app owner
organisation (org) the actions the app performs against Storage as the service owner.

The app stores instance data and process transitions as the service owner, not as the end user.
Storage authorises those calls against the app's own policy, with `urn:altinn:org` as the
subject. A policy that grants rights only to the end user — the usual form in v8 — leaves the
app unable to move its own process forward. Without the rule, the error only shows when a
citizen submits.

The actions required follow from the task types in the process: `write` for data, `pay` or
`write` for payment, `confirm` for confirmation, `sign` or `write` for signing, `complete` where
a service task marks the instance as completed, and `delete` where the instance is deleted at
the end of the process.

Category `Authorization`, severity **error**. The rule therefore fails the build.

Grant the actions to the org subject in `config/authorization/policy.xml`, or run the upgrade
from v8 to v9, which inserts the rule.

See the [rule library](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/rules/) (documentation available in Norwegian only) for how to write a
rule for the org subject.
