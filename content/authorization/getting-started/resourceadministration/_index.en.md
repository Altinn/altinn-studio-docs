---
title: Ressursadministration i Altinn Studio
linktitle: Ressursadministration
description: Getting started with resource administration
---

{{< stepcard step="1" title="Sign the agreement" >}}
Contact [servicedesk@altinn.no](mailto:servicedesk@altinn.no) to sign agreements and be registered as a service owner in Altinn.
{{< /stepcard >}}

{{< stepcard step="2" title="Create user and organization" >}}
To get access to Resource Administration in Altinn Studio you must have a user account.

See this [guide](/en/altinn-studio/v8/getting-started/create-user/)

{{< /stepcard >}}

{{< stepcard step="3" title="Add members to resource administration team" >}}

Add the users who should be able to publish resources as members in the following teams for your organization:

- **Resources**: Provides access to create and modify resources.
- **Resources-Publish-PROD**: Provides access to publish resources to the production environment.
- **Resources-Publish-TT02**: Provides access to publish resources to the TT02 test environment.

Teams can be added from the organization page in the Gitea section of Altinn Studio.

![Teams](teamscreation_1.png)
{{< /stepcard >}}

{{< stepcard step="4" title="Create a resource" >}}
A detailed guide for creating resources can be found under [Guides](/en/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

{{< stepcard step="5" title="Create access lists (optional)" >}}
By default, anyone who has a role or an access list that meets the requirements for a service will have access to that service.
If there is a need to restrict access to specific organizations, you can use access lists.
This is the same functionality that in Altinn 2 was called the Service Rights Register (SRR).

**Define teams for Access Lists**

Add the users who should be able to manage access lists as members in the following teams for your organization:

- **AccessLists-TT02**: Manages access lists in the TT02 test environment.
- **AccessLists-PROD**: Manages access lists in the production environment.

Members of these teams can manage access lists in their respective environments.

Under [Guides](/en/authorization/guides/resource-owner/accesslist/) you can read how to define reusable access lists across services.

![Groups](groups.png)

{{< /stepcard >}}

{{< stepcard step="6" title="Publish" >}}
When all metadata, rules and any access lists are ready, the resource must be published.
A review of the publishing process can be found under [Guides](/en/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

<!-- {{< stepcard step="8" title="Access control" >}}
7
{{< /stepcard >}} -->
