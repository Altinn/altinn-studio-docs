---
title: 'Service Resource'
description: 'Learn how dialogs in Dialogporten refer to service resources defined in Altinn Resource Registry'
weight: 10
---

## Introduction

All dialogs must refer to a main _service resource_. A service resource describes a particular digital service, and contains metadata such as a name, a description, what public actor owns and - most importantly - the authorization policy governing the use of that service. 

Service resources reside in [Altinn Resource Registry]({{<relref "../../../../authorization/what-do-you-get/resourceregistry">}}), alongside other types of resources which utilize Altinn Authorization for access management and control. The authorization policies are expressed in [XACML]({{<relref "../../../../authorization/what-do-you-get/pdp">}}), which describes the access rules that governs all dialogs that refer to it. Dialogporten is integrated with Altinn Authorization, and will consult it for every request made to Dialogporten and enforce its decisions. The main service resource policy is thus used to control what information a given user can retrieve from Dialogporten. Access managers within organizations use these service resources, or groups of related service resources, when handling who should have access to do what on behalf of an organization.

For example, an action named "Go to signing" might refer to an _action_ called "sign" in the XACML policy for the main service resource. If the user does not posess this permission, the button may be grayed out and disabled. 

## Advanced usage
XACML offers great flexibility in how coarse or fine-grained the access control should be, and dialogs can contain actions and transmissions that can be matched by different rules defined within the policy of the service resource. Transmissions and actions can even refer to different service resources, giving the service owner more options in how the various parts of a dialog should be governed.  This is enabled through the use of [authorization attributes]({{<relref "../attributes">}})

Note however, that the attachments within a transmission and actions always refer to a endpoint hosted by the service provider. Thus, the authorization decisions made in Altinn Authorization for actions and transmissions are to be considered advisory. The endpoints themselves _must_ also enforce the same authorization policies. This can be done either by requesting Altinn Authorization (in the same manner as Dialogporten), or utilize [dialog tokens]({{<relref "../dialog-tokens">}}) which embeds the same authorization decision.

**Read more**
* [Technical reference for the dialog entity]({{<relref "../../../reference/entities/dialog">}})
* [Technical reference for the action entity]({{<relref "../../../reference/entities/action">}})
* [Technical reference for the transmission entity]({{<relref "../../../reference/entities/transmission">}})

{{<children />}}

