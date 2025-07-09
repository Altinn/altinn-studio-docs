---
title: User guides
description: User guides in Altinn Notifications
weight: 24
---

### Guidelines on notification content

{{% notice info %}}
We are working on providing you with new and updated guidelines on usage of Altinn Notifications.
In the meantime existing guidelines for sending notifications through Altinn 2 also apply to Altinn Notifications.


[Please familiarize yourself with existing documentation and guidelines](https://altinn.github.io/docs/utviklingsguider/varsling/)
{{% /notice %}}

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

For a guide on how to register a new Maskinporten integration in Samarbeidsportalen, please see [Altinn Authorization](/authorization/getting-started/maskinportenclient/) 
