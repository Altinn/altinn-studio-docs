---
title: 'Parties'
description: 'Learn about parties and how they are related to dialogs'
weight: 5
toc: true
---

## Introduction

In Altinn, a party is either a person registered in the [National Population Register](https://www.skatteetaten.no/en/person/national-registry/), or an organization registered in the [Central Coordinating Registry for Entities ](https://www.brreg.no/en/about-us-2/our-registers/about-the-central-coordinating-register-for-legal-entities-ccr/)

All [dialogs]({{<relref "../../dialogs">}}) are associated with a party. Depending on the context of the dialog, this is either
* the recipient of a message being sent from a public actor
* the person or organization reponsible for filing a report to a public actor (eg. monthly employer report, "A-meldingen" )
* the person or organization submitting an application to a public actor (eg. applying for a grant, or some permission)

As Dialogporten utilizes the authorization model in [Altinn Authorization]({{<relref "../../../../authorization/about">}}), all autenticated users (ie. persons or systems) must have to represent the party for the [service resource]({{<relref "../service-resource">}}) the dialog is associated with.

## Authorized parties

By utilizing APIs provided by [Altinn Access Management]({{<relref "../../../../authorization/what-do-you-get/#access-management">}}), Dialogporten lets authenticated users get a list of all parties they are authorized to represent in any capacity. This list is also referred to as the "actor list" or in Altinn 2 as the "reportee list". 

This list can be used by end-user systems as a actor selection mechanism, allow the end-user to select the party they want to represent, and form the basis for subsequent requests to Dialogporten to [find dialogs]({{<relref "../../../user-guides/searching-for-dialogs">}}).

**Read more**
* {{<link "../service-resource">}}
* {{<link "../../../user-guides/authorized-parties">}}
* {{<link "../../../reference/authorization/parties">}}