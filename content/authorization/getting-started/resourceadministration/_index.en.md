---
title: Ressursadministration i Altinn Studio
linktitle: Ressursadministration
description: Getting started with resource administration
---

{{< stepcard step="1" title="Sign the agreement" >}}
1
{{< /stepcard >}}

{{< stepcard step="2" title="Create user and organization" >}}
To get access to Resource Administration in Altinn Studio you must have a user account.

See this [guide](/en/altinn-studio/v8/getting-started/create-user/)

{{< /stepcard >}}

{{< stepcard step="3" title="Create the resource administration repository for the organization" >}}

To enable Resource Administration, your organization needs a specific repository named {org}-resources. This repository will act as a centralized place to manage your resources. For example: [skd-resources](https://altinn.studio/repos/skd/skd-resources).

You can create this repository from the organization page in the Gitea area of Altinn Studio.

![Repo](repocreation.png)

{{< /stepcard >}}

{{< stepcard step="4" title="Create resource administration teams" >}}

- A resource group that can be assigned to `{org}-resources`
- **Resources-Publish-PROD**: Permission to publish to production
- **Resources-Publish-TT02**: Team with permission to publish to TT02

Create these teams from the organization page in the Gitea area of Altinn Studio.

![Teams](teamscreation_1.png)
{{< /stepcard >}}

{{< stepcard step="5" title="Create a resource" >}}
A detailed guide for creating resources can be found under [Guides](/en/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

{{< stepcard step="6" title="Create access lists (optional)" >}}
By default, anyone who has a role or an access list that meets the requirements for a service will have access to that service.
If there is a need to restrict access to specific organizations, you can use access lists.
This is the same functionality that in Altinn 2 was called the Service Rights Register (SRR).

**Define teams for Access Lists**

Your organization should create the following teams:

- **AccessLists-TT02**: Manages access lists in the TT02 environment.
- **AccessLists-PROD**: Manages access lists in the production environment.

Members of these teams can manage access lists in their respective environments.

Under [Guides] you can read how to define reusable access lists across services.

![Groups](groups.png)

{{< /stepcard >}}

{{< stepcard step="7" title="Publish" >}}
When all metadata, rules and any access lists are ready, the resource must be published.
A review of the publishing process can be found under [Guides](/en/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

<!-- {{< stepcard step="8" title="Access control" >}}
7
{{< /stepcard >}} -->
