---
title: Set up a broker service for the browser
linktitle: Service owner
description: How to set up a broker service so senders and recipients can use it in the browser.
tags: [Broker, guide]
toc: true
weight: 10
---

This guide is for you as a service owner when other organisations will send and receive files in the browser.

Your organisation must be a service owner in Altinn. New organisations follow [Become a service owner in Altinn](https://samarbeid.digdir.no/altinn/bli-tjenesteeier-i-altinn/2819/) (Norwegian only).

When systems call the API, also follow [Get started as a service owner](/en/broker/getting-started/service-owner/). System user and Maskinporten belong to that track.

## Set up the service

Do the steps in this order. You have to publish the resource to an environment before you can add an access list.

1. Create a resource of the type **Formidlingstjeneste** in [Altinn Studio](https://studio.altinn.no). In the resource file the type is `BrokerService`. Give the service a name that senders and recipients will recognise. Set access rules that allow `write` for senders and `read` for recipients. `write` is the right to send. `read` is the right to download. See [Resource administration](/en/authorization/what-do-you-get/resourceadministration/).
2. Publish the resource to the environment where it will be used, for example TT02. See [Create and publish resources in Altinn Studio](/en/authorization/guides/resource-owner/create-resource-resource-admin/).
3. Add an access list to the resource in the same environment. You can do this only after the publish in step 2. Add the organisation number of each organisation that will send or receive. See [Manage access lists in Altinn Studio](/en/authorization/guides/resource-owner/accesslist/manage-accesslists-resource-admin/).
4. Log in at [ab.tt02.altinn.no](https://ab.tt02.altinn.no) as a person who has the access package [Delegable Maskinporten scopes](https://tjenesteoversikten.no/package/maskinporten-scopes) for the service owner. Select the service owner as avgiver at the top of the page.
5. Open **Dine formidlingstjenester** and find the service under **Formidlingstjenester [virksomheten] kan konfigurere**. Turn on **Rediger oppsett**, change the fields and click **Lagre**. Here you set the maximum file size and the lifetime, among other values. Broker shows a default setup until you save your own values.
6. Users who have `read` or `write` according to the rules from step 1, and who select an avgiver that is on the access list, can now send and receive files at [ab.tt02.altinn.no](https://ab.tt02.altinn.no).

If **Rediger oppsett** is off, the explanation is shown under the switch. You have then selected the wrong avgiver, or you lack the access package for the service owner.

The service owner sees their own services under **kan konfigurere** without being on the access list. Senders and recipients have to be on the list.

## How the service is shown

Under **Dine formidlingstjenester** the lists are split by what the organisation can do:

- **Formidlingstjenester [virksomheten] kan sende med** shows services where the organisation is on the access list and has `write`.
- **Andre formidlingstjenester [virksomheten] er delaktig i** shows services where the organisation only has `read`. They can download, but not send. The service says **Du er ikke autorisert for å sende på denne tjenesten.**
- **Formidlingstjenester [virksomheten] kan konfigurere** shows services the organisation owns. You see the list when you have selected the service owner as avgiver and have the access package from step 4.

If the sender has `write` but nobody to send to, the page says **Tjenesten har ingen mottakere du kan sende til.** The recipients are then missing from the access list, or they do not have `read`.
