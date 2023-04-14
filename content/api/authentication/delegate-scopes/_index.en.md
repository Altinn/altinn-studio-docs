---
title: Delegate API Access to a Supplier
linktitle: Delegate API Access
description: Description of how service owner can delegate API accesses (scopes) to a subcontractor.
toc: true
tags: [translate-to-english]
---

Certain service owners want a subcontractor to be able to act on their behalf, e.g. suppliers of specialist systems.
To achieve that, these API accesses must be delegated to the provider using Altinn.

It is the service owner's responsibility to remove the delegations themselves if the supplier no longer need access.

## Delegation of API access to the supplier

As a service owner key role user (typically general manager aka DAGL), open "Access to the Application Programming Interface - API".

![Andre med rettigheter](en_delegate-scopes-01.png "Access to the Application Programming Interface - API")

![Add the supplier](en_delegate-scopes-02.png "Add the supplier's organization")

![Proceed](en_delegate-scopes-03.png "Proceed to the next step")

Så må de nødvendige rettighetene gis.

- **Altinn Service Owner API: App Instances (full access)** - provides access to [scopes](#scopes) for both read and write.
- **Altinn service owner API: App instances (read access)** - only provides read access.

![Grant rights to supplier](en_delegate-scopes-04.png "Grant the necessary rights to the supplier")

![Gå videre](en_delegate-scopes-05.png "Gå videre til neste steg")

![Confirm](en_delegate-scopes-06.png "Confirm")

![To the overview](en_delegate-scopes-07.png "Go back to the overview")

## Removal of delegation

Delegations that have been made can also be removed.
If a supplier no longer needs API access, it is the service owner's responsibility to remove these.

![Remove rights](en_revoke-scopes-01.png "Tap \"Edit Access\"")

![Select rights to remove](en_revoke-scopes-02.png "Select rights to remove")

![Save changes](en_revoke-scopes-03.png "Save changes")

![Undo remove rights](en_revoke-scopes-04.png "It is possible to undo the removal of rights")

![The overview page shows the remaining delegations](en_revoke-scopes-05.png "The overview page shows the remaining delegations")

## Scopes

Delegation gives access to these scopes for the supplier:

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```
