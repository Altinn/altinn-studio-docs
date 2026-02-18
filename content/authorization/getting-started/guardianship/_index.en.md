---
title: Guardianship
linktitle: Guardianship
description: As a service owner, you can add support for guardianship in three steps.
---

{{% notice warning %}}
This functionality is not yet available in TEST or PROD, but is planned for launch in early March.
To be prepared, you can start by identifying the relevant guardianship types and integrating with the party selector and authorisation lookup.
{{% /notice %}}

{{< stepcard step="1" title="Guardianship in access rules" >}}

The first step is to create access rules that define which actions the different guardianship types grant access to on the service.
You can do this via API or in the Policy editor in Resource Administration.

![Policy editor in Altinn Studio](./vergemal_regler.png "Policy editor in Altinn Studio")

See the [description of the different guardianship types](/en/authorization/what-do-you-get/accessgroups/accessgroups-citizens/verger/).

See the [guide on how to create and publish a resource](/en/authorization/guides/resource-owner/create-resource-resource-admin/).

> If the service that needs guardianship support is an Altinn Studio app, you only need to complete this step.
> {{< /stepcard >}}

{{< stepcard step="2" title="Add party selector" >}}
The guardian must be able to select who they wish to represent in the service.
Use the Authorised Parties interface to display who the guardian can act on behalf of.

![Authorised parties from vegvesen.no](./authorizedparty.png "Authorised parties from Altinn displayed on vegvesen.no")

See the [implementation guide for Authorised Parties](/en/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-api-for-authorized-parties-issuers).
{{< /stepcard >}}

{{< stepcard step="3" title="Authorisation lookup" >}}
To verify that the guardian is permitted to act on behalf of the ward, the service must perform an authorisation lookup.

See the [documentation on how to perform authorisation lookups](/en/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-pdp).
{{< /stepcard >}}
