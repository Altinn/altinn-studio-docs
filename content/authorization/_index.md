---
title: Authorization
linktitle: Authorization
description: The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
tags: [architecture, solution]
toc: false
weight: 1
aliases:
 - /technology/solutions/altinn-platform/authorization/
---

The typical scenario is that some event will be triggered, or data will be read, updated, or created by a digital or analog service. A service owner owns this service and has defined some business rules for who is allowed to use the service.

This service needs to control who can access and modify data.

Altinn Authorization provides the capability to verify and enforce this. 

![User Scenario](userscenario.drawio.svg "User scenario")

Users and organizations get rights to access a service from defined rules and policies.

The below drawing show all aspects that control who and what rights a user or organization has.

![Rules](rules.drawio.svg "Access control aspects")

- Resources - describes the resource a rule applies to. It can be an app, a resource in the resource register, a specific task, or any other sub-resources to an app or resource in the rescource registry.
- Action - describes which action the rules apply to. This can be any action like read, write, sign, fire, Opendoor +++
- Subject - describes who the rules apply to. It can be a role, access group, an organization number or a specific user, and many more
- Obligation - describes additional information like minimum authentication level.
- Condition - Describes additional conditions like the reportee needs to be registered in SRR/RRR for this resource/service.

### Access control Altinn Apps

Applications created in Altinn Studio, is based on an application template that is integrated with Altinn Authorization. This means that out from the box
these application has preconfigured settings related to authorization.

- Each App needs to define a policy that defines who can access an appliaction and what the user can do. 
- Each API in template is configured with a policy enforcement point that verifies that API caller is authorized to perform operations on applications. As exmample the API to read data is [configured to have "read" access](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Api/Controllers/DataController.cs#L252) while the API to save data for an application [requires "write" access](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Api/Controllers/DataController.cs#L309).
- The App template uses Altinn platform components like storage that is preconfigured authorize access based on policy defined.


### Access control Altinn Resource Registry Resources

Resources in Altinn Resource registry is metadata pointing to a digital service implemented outside of the Altinn Platform. The service owner
defines the resource with attributes like name and description and creates a XACML policy for that resource. When users access the digital service, the
policy enforcement point in that digital service do a call to Altinn Authorization to verify if user is authorized to access. 



