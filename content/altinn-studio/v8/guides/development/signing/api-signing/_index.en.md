---
title: API-based signing
linktitle: API-based signing
description: Follow these steps to implement API-based signing in your app.
tags: [signering]
weight: 53
aliases:
- /nb/altinn-studio/guides/signing/api-signing
---

## What do we mean by API-based signing?

{{% insert "content/altinn-studio/v8/guides/development/signing/api-signing/intro.en.md" %}}

## Prerequisites

If the service should send a signature receipt to the inbox of the signee, the Altinn message service (Correspondence) must be enabled.

## Configuring signing

You can see how to configure signing in an app using the guides found [here](/en/altinn-studio/v8/guides/development/signing/).
API-based signing has the same requirements for configuration, except the layout-set for the signing step can be simpler.

## The most important API calls

### Perform single signing
If only one person should sign in a signing step, you can use the "process next" endpoint:

`PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next`
  
Body:
```json
{
  "action": "sign"
}
```

In this case, the process will automatically navigate to the next step once the signature has been saved.
When using this endpoint you need to have multiple signing steps if more than one party should sign.

### Perform parallel signing

If multiple signees should sign in parallel, the following endpoint can be used instead of "process next":

`POST /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/actions`

Body:
```json
{
  "action": "sign"
}
```

In this case, the process will still be in the signing step after the signature has been saved, and more signees can sign before the process is continued using a "process next" call.

### Information about signees and signatures

If [runtime-delegated signing](/en/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/) is configured, the following endpoint can be used to get a list of the signees and their signing status.
The endpoint can also be used when runtime-delegated signing is not used, but then it will only return signees that have already performed the sign action. It will then function as a signature list.

`GET /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/signing`

Example response before any signing has been done, where one person and one organisation is supposed to sign:
```json
{
  "signeeStates": [
    {
      "name": "BØYLEHEST MATT",
      "organisation": null,
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51281269,
      "signedTime": null
    },
    {
      "name": null,
      "organisation": "LYDIG VENNLIG KATT KJERNE",
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51843877,
      "signedTime": null
    }
  ]
}
```

The same response after the signing has been done. Bøylehest Matt signed on behalf of themselves, and Fisk Kunstig signed on belaf of the organisation Lydig Vennlig Katt Kjerne:
```json
{
  "signeeStates": [
    {
      "name": "BØYLEHEST MATT",
      "organisation": null,
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51281269,
      "signedTime": "2025-03-03T11:16:02.9390324Z"
    },

    {
      "name": "FISK KUNSTIG",
      "organisation": "LYDIG VENNLIG KATT KJERNE",
      "delegationSuccessful": true,
      "notificationStatus": "Sent",
      "partyId": 51843877,
      "signedTime": "2025-03-03T11:18:25.9518554Z"
    }
  ]
}
```
