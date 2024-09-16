---
title: Signing  
description: What is signing in an Altinn 3 service?  
weight: 10  

---

## Authenticated Electronic Signature
An electronic signature is linked to traceability. Traceability means being able to demonstrate that an action was performed at a specific time and tied to a specific identity. The requirements for traceability describe the extent to which it should be possible to verify afterward that an actor was responsible for a piece of information or performed an action at a specific time.

An authenticated electronic signature allows service owners to ensure traceability by verifying that an identified person performed a signing action at a specific time, e.g., when the end user confirms the accuracy of information by signing. The signing solution in Altinn 3 is an authenticated signature with the option of security level 3 or 4. The authentication level is configurable for each service. It is also possible to choose lower authentication levels than 3 and 4. If advanced signatures are desired, third-party products such as [eSignering | Samarbeidsportalen (digdir.no)](https://samarbeid.digdir.no/esignering/esignering/22) must be used.

Service owners must make their own assessment of which electronic signature they want and need for their services, based on the requirements for signature and traceability in the regulations for which each service owner is responsible.

## Functionality
### What is being signed?
The service owner controls the selection of data elements that are to be signed and selects which authentication level (identification level) the end user must log in with before signing (level 1-4). One or more signing steps in sequence are possible.

### Signature
The signing action is logged, and a signature object is created. The signature object represents a signature performed by a person and contains information about which data elements are signed and which are not. The signature object contains a so-called hash code of the data associated with the data elements that are signed. Hashing is a one-way mathematical algorithm that calculates a unique code based on the data. If even one character in the data is changed, the hash code will no longer match. This ensures that the data no longer aligns with what was signed, making any changes to the data detectable.

### Logging
An event log is kept, recording actions performed in the application. Signing is a type of action that is explicitly logged. The ID of the person who performed the signing action is logged, along with the security level of the login, the time of the action, which step in the process the action was performed on, and that it was a signing action. Log data related to electronic signatures in Altinn 3 is stored separately from services in a central event log database.

## Processing of personal data
To ensure traceability, personal data is processed for logging purposes. The ID of the person who performed the signing action is logged, which can be linked to a national ID number, the security level of the login, the step in the process at which the action was performed, the time of the action, and that it was a signing action. Digdir is the data controller for the processing of this personal data for this purpose.

The service owner is the data controller for the processing of personal data in their services and forms, including the relevant signature object and associated data. This includes the ID of the person who performed the signing action and the national ID number. According to the collaboration agreement, Digdir is the data processor for the service owner.

## Storage time
After the process in Altinn 3 is completed, the service owner can download all data, including the signature object. The end user receives a receipt (PDF).

The service owner acknowledges that the signature object and associated data have been downloaded. The end user can choose to keep or delete their receipt for the signing from their inbox. If the end user chooses to delete their receipt after the service owner has downloaded the signature object, this means that Digdir deletes the signature object from our systems. Therefore, if you wish to archive the signature, the signature object and associated data must be stored in the service owner's systems.

Digdir logs that the signing action was performed. This means that even if the signature object is deleted, Digdir still retains the log showing that a signing action was completed. Regular application logs (typically used for troubleshooting) are stored by Digdir for 90 days, while event logs are stored for 13 months.

## Verification of signature
The service owner stores the signature object in their archival system. The signature object contains a hash code of the data associated with the data element. If the signature object is later altered, this can be verified by the fact that the hash code in the signature object no longer matches. This contributes to the traceability of the signature object. This assumes that the signature, i.e., the hash code, also exists on the end user's receipt so that both parties have their own copy.

[Here you can read the technical description of how signature verification is done.](https://docs.altinn.studio/nb/altinn-studio/reference/process/tasks/signing/#verifisering-av-sha256-hash)

---

Let me know if you need further adjustments!