---
title: Integrations with Dialogporten and Arbeidsflate
linktitle: Dialogporten/Arbeidsflate
description: How to get started with the integrations towards Dialogporten and Arbeidsflate
tags: [Correspondence, transmission, guide]
toc: true
weight: 40
---

{{<children />}}

## Transmissions
A transmission can be created through the Altinn 3 Correspondence API to group multiple related correspondences within the same dialog.
content/dialogporten/reference/entities/transmission/_index.en.md

### How to get started

When a correspondence is created the entity will be given a dialogId which resides in the external reference of the correspondence.
Future correspondences which are related to the dialog can be grouped through transmissions. This is done by referring to the dialogId in the external reference.

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": string,
                "referenceType" ReferenceType
            }
        ]
    }
}
```
The referenceValue of the transmission must be set to the dialogId of the dialog you're referring to.
Furthermore, the referenceType must be set to DialogportenDialogId to indicate that the new correspondence is part of a pre-existing dialog.

#### Transmission successfully created
Once a transmission has successfully been created, the external references of the newly created correspondence will consist of a reference to the dialog in which
the correspondence is related as well as a reference to a transmissionId which has been set. 

The response should be of the following format:

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": dialogId,
                "referenceType": DialogportenDialogId
            },
            {
                "referenceValue": transmissionId,
                "referenceType": DialogportenTransmissionId
            }
        ]
    }
}
```
