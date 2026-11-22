---
title: "Choosing a transmission type"
linkTitle: "Transmission types"
description: "How to choose a transmission type, with examples of each type"
weight: 22
---

The type describes what kind of transmission it is and who (by convention) sends it.
`Submission` and `Correction` are sent by the party. All other types are sent by the service owner.
This is not validated, but it determines whether the transmission is counted as sent by the party or by the service owner.
Choose the type based on who actually sends the transmission, and set `sender.actorType` to match: `PartyRepresentative` for `Submission` and `Correction`, and `ServiceOwner` for all other types.

If the service needs a finer-grained classification than the types provide, you can also specify a URI in `extendedType`.
Arbeidsflate does not display `extendedType`, but other end-user systems can use it.

## Background for the types

The types are not based on a formal standard. They are a pragmatic selection meant to cover the vast majority of needs we anticipate in service owners' case processes, without having so many types that it becomes unclear which one to choose.

The types are intentionally generic and domain-agnostic. This lets them be used across service owners, and lets end-user interfaces present transmissions consistently regardless of which service they come from. The title and content describe what the transmission is about. The type describes the role it plays in the dialog.

## Related transmissions

A transmission can reference an earlier transmission in the same dialog using `relatedTransmissionId`.
This is not required, but it is encouraged, especially for `Correction`, `Acceptance`, `Rejection`
and responses to a `Request`. It makes clear what the transmission responds to or changes.

## From the party

### `Submission`
A regular submission of information or a form.
- A business submits its VAT return for a period
- A citizen applies for a building permit
- Submitting additional documentation after a `Request` (should be related to the request)

### `Correction`
Corrects or overrides a previous submission. Should be related to the submission it corrects.
- A corrected VAT return for a period that has already been submitted
- An a-melding that corrects an incorrect salary amount

## From the service owner

### `Information`
General information not tied to a submission. Requires no action.
- "The current processing time is approximately 8 weeks."
- Notice of regulatory changes relevant to the case

### `Acceptance`
States that a previous submission (`Submission` or `Correction`) has been accepted. Should be related to the submission.
- "The VAT return has been received and accepted."
- Receipt for an accepted a-melding

### `Rejection`
States that a previous submission (`Submission` or `Correction`) has not been accepted. Applies to one part of the case, not the case as a whole.
Should be related to the submission. The response is often a `Correction` or a new `Submission`.
- "The message was rejected: the organisation number does not exist."
- Validation errors in a submitted form

### `Request`
Asks the party for more information. The response is normally a `Submission`.
- "We need a copy of the lease agreement to process the application."
- An order to provide accounting records

### `Alert`
Critical information about the process. Overlooking it has consequences for the party. Use sparingly.
- "The deadline expires tomorrow. A coercive fine will be imposed after the deadline."
- "The case will be closed in 7 days if we do not hear from you."

### `Decision`
A formal decision. A case can have several.
- Decision granting or denying a building permit
- The tax assessment
- Decision on an appeal

## Rule of thumb

| Question                                               | Type                       |
|--------------------------------------------------------|----------------------------|
| Does the transmission come from the party?             | `Submission` / `Correction` |
| Do we accept this particular submission?               | `Acceptance` / `Rejection` |
| Is this a formal decision?                             | `Decision`                 |
| Do we need something from the party?                   | `Request`                  |
| Does overlooking the message have consequences?        | `Alert`                    |
| None of the above?                                     | `Information`              |

## Typical flow

- `Submission` → `Acceptance` → `Request` → `Submission` → `Acceptance` → `Decision`
- `Submission` → `Rejection` → `Correction` → `Acceptance` → `Decision`

**Read more**

- [Defining transmissions]({{< relref "../creating-dialogs#defining-transmissions" >}}) in the guide to creating dialogs
- {{<link "../../../reference/entities/transmission">}}
