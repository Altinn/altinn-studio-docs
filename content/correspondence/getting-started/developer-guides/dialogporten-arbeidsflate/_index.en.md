---
title: Transmissions in Dialogporten and Arbeidsflate
linktitle: Transmissions
description: How to get started with Transmissions in Dialogporten and Arbeidsflate
tags: [Correspondence, transmission, guide]
toc: true
weight: 40
---

{{<children />}}

## Transmissions
A transmission can be created through the Altinn 3 Correspondence API to group multiple related instances within the same dialog.

### Transmissions in arbeidsflate

Example Dialog with transmission:
![Dialog with an indicated transmission](./af-transmission1.png)

The transmission is at the bottom, marked with type "information".
![Dialog with a transmission](./af-transmission2.png)

### How to get started

When a correspondence is created the entity will be given a dialogId which resides in the external reference of the correspondence.
Future instances which are related to the dialog can be grouped through transmissions. This is done by referring to the dialogId in the external reference.

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

#### Setting transmission type
Transmission type is Information (1) if not set on the correspondence. You can set it by adding a DialogportenTransmissionType external reference when initializing the correspondence. Both the enum name and the numeric value are accepted. For example:

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": "Information",
                "referenceType": "DialogportenTransmissionType"
            }
        ]
    }
}
```

Or using the numeric value:
```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": "1",
                "referenceType": "DialogportenTransmissionType"
            }
        ]
    }
}
```

Valid transmission types are:

| Type        | Value |
|-------------|:-----:|
| Information | 1     |
| Acceptance  | 2     |
| Rejection   | 3     |
| Request     | 4     |
| Alert       | 5     |
| Decision    | 6     |
| Submission  | 7     |
| Correction  | 8     |

#### Setting dialog status and extended status
When creating a transmission (i.e. when `DialogportenDialogId` is present), you can optionally set dialog status and/or extended status on the original dialog by adding external references:

- `DialogportenDialogStatus`
  - Must be a valid Dialogporten status value
  - Both enum name and numeric value are accepted
  - Only one such reference is allowed
- `DialogportenDialogExtendedStatus`
  - Must be a non-empty string
  - Must be **25 characters or fewer**
  - Only one such reference is allowed

Both require `DialogportenDialogId` to be present (transmission flow).

Example using enum name:

```json
{
    "correspondence":{
        ...,
        "externalReferences":[
            {
                "referenceValue": "your-dialog-id",
                "referenceType": "DialogportenDialogId"
            },
            {
                "referenceValue": "Sent",
                "referenceType": "DialogportenDialogStatus"
            },
            {
                "referenceValue": "Needs review",
                "referenceType": "DialogportenDialogExtendedStatus"
            }
        ]
    }
}
```

Valid dialog status values are:

| Status            | Value |
|-------------------|:-----:|
| New               | 1     |
| InProgress        | 2     |
| Draft             | 3     |
| Sent              | 4     |
| RequiresAttention | 5     |
| Completed         | 6     |
| NotApplicable     | 7     |
| Awaiting          | 8     |

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
                "referenceType": "DialogportenDialogId"
            },
            {
                "referenceValue": transmissionId,
                "referenceType": "DialogportenTransmissionId"
            }
        ]
    }
}
```

