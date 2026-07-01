---
title: User guides
description: User guides in Altinn Notifications
weight: 24
cascade:
  params:
    diataxis: diataxis_how-to-guides
---

### Guidelines on notification content

{{% notice info %}}
We are working on providing you with new and updated guidelines on usage of Altinn Notifications.
In the meantime existing guidelines for sending notifications through Altinn 2 also apply to Altinn Notifications.
{{% /notice %}}

#### How does a notification look?

End users can receive notifications via SMS, email, or both. This is determined by the type of address information end users have registered in their Altinn profile, but the service owner also has the option to override this.
{{% notice info %}} **The notification should include:**
- a description of the task,
- specifically what it concerns,
- who is responsible for/can resolve the task
- if applicable, also inform about the deadline for the task {{% /notice %}}

#### What should a notification not contain?
Phishing poses an ever-increasing threat to IT security. Government guidelines for avoiding fraud state the following: *Be aware of links in SMS messages that ask you to log in with BankID. Your bank or other reputable organizations never send BankID login links via SMS.*

Therefore, pay particular attention that notifications sent through Altinn's notification service **MUST NOT contain links or phrasing that resembles a link,** e.g. altinn.no or minetat.no. In such cases, "Altinn's website", "our website" or similar would be the correct phrasing to use.

### Creating a new Maskinporten Client

A Maskinporten Client, also known as a Maskinporten Integration, can generate tokens with a set of scopes on request.
The token must then be exchanged for an Altinn token and used to gain access to the API.

The scope **altinn:serviceowner/notifications.create** is required for clients to
access the Notifications API.

All registered service owners have been delegated this scope by Digdir and should
be able to find it in their list of scopes in Samarbeidsportalen.

Register your Maskinporten client(s) to authenticate with the Notifications API, assigning them this scope.


Please reference [Maskinporten's own documentation](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument)
on registering a new integration through their self service API.

For a guide on how to register a new Maskinporten integration in Samarbeidsportalen, please see [Altinn Authorization](/en/authorization/getting-started/maskinportenclient/) 
