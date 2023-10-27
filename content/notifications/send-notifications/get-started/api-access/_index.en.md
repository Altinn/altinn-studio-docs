---
title: Request access to Notifications API
linktitle: API access
weight: 10
description: A guide to requesting access to the Notifications API
---


{{% notice info %}}
TODO: QA devs
{{% /notice %}}


## Requesting required Maskinporten scope

{{% notice info %}}
This is only required by external system clients. Altinn internal systems can be authenticate with Altinn Platform Access
Tokens instead.
{{% /notice %}}


{{% insert "static/shared/api/request-maskinporten-scopes.md" "altinn:serviceowner/notifications.create" "for sending notifications in Altinn"%}}
