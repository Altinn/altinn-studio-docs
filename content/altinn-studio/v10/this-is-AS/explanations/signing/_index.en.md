---
draft: true
title: Signing
description: Signing allows users to confirm data with authenticated electronic signatures.
weight: 50
tags: [needsReview]
---

## Signing in Altinn Studio

Signing allows users to confirm data with electronic signatures. In this article, we explain what signing is, how it works, and what you need to know about privacy and storage.

### What Is an Electronic Signature?

Electronic signatures are linked to traceability. With traceability, you can demonstrate that an action was performed at a specific time and linked to a specific identity.

The signing solution in Altinn 3 is an authenticated signature with the option of security level 3 or 4. You can configure the authentication level in the individual service, and you can also choose lower authentication levels than 3 and 4.

**Advanced Signatures:**
If you want advanced signatures, you must use third-party products such as [eSignering | Samarbeidsportalen (digdir.no)](https://samarbeid.digdir.no/esignering/esignering/22).

As a service owner, you must assess which electronic signature you want and need for your services. This is based on the requirements for signatures and traceability in the regulations you are responsible for.

You can find technical guides for setting up signing [here](/en/altinn-studio/v8/guides/development/signing/).

### How Does Signing Work?

#### What Can Be Signed?

As a service owner, you control which data elements the user should sign. You also choose which authentication level (identification level) the user must log in with before signing (level 1–4). You can set up one or more signing steps in sequence.

#### What Happens When the User Signs?

When the user signs, the following happens:

1. **The app logs the signing action**: The app creates a signature object that represents the signature. The object contains information about which data elements are signed.

2. **The app creates a hash code**: The signature object contains a so-called hash code of the data. Hashing is a one-way mathematical algorithm that calculates a unique code based on the data. If just one character in the data is changed, the hash code becomes different. This makes it visible if someone changes data after signing.

3. **The app logs the event**: The app logs the ID of the person who signed, the security level of the login, the time of the action, and which step in the process the action was performed on.

The system stores log data linked to electronic signatures in Altinn 3 separately from the services in a central event log database.

### Privacy and Storage

#### Processing of Personal Data

To ensure traceability, the system processes personal data for logging purposes. The system logs:
- The ID of the person who signed (can be linked to national identity number)
- Security level of the login
- Which step in the process the action was performed on
- The time of the action

Digdir is the data controller for the processing of this personal data for this purpose.

The service owner is the data controller for the processing of personal data in their services and forms, and for the relevant signature object and associated data. In accordance with the collaboration agreement, Digdir is the data processor for the service owner.

#### Storage Time

After the process in Altinn 3 is completed, you as a service owner can download all data including the signature object. The user receives a receipt (PDF).

You can configure the lifetime for storage of the instance and data by configuring [Persistence](/en/altinn-studio/v8/reference/data/persistence/). If you do not configure this, the following applies:

1. **Service owner confirms**: You confirm that you have downloaded the signature object and associated data.

2. **The user chooses**: The user can choose to keep or delete the receipt for the signing in their inbox.

3. **If the user deletes**: If the user deletes the receipt after you have downloaded the signature object, Digdir deletes the signature object in our systems.

You must therefore store the signature object and associated data in your own systems if you want to archive the signature.

Digdir logs that the signing action has been performed. This means that even if the signature object is deleted, Digdir still stores the log showing that a signature action has been performed. Regular application logs (used for troubleshooting) are stored by Digdir for 90 days, whilst event logs are stored for 13 months.

### Verification of Signature

You store the signature object in your archive system. The signature object contains a hash code of the data belonging to the data element. If someone later changes the signature object, you can verify this by the hash code in the signature object no longer matching. This contributes to traceability for the signature object.

This assumes that the signature, that is the hash code, also exists on the user's receipt, so that both parties have their own copy.

[Here you can read a technical description of how verification of the signature is done.](/en/altinn-studio/v8/reference/process/tasks/signing/#verifying-the-sha256-hash)
