---
title: "Troubleshooting: invalid_altinn_customer_configuration (MP-303)"
linktitle: "Error MP-303"
description: "A detailed guide to resolving the invalid_altinn_customer_configuration (MP-303) error."
---

## Error: `invalid_altinn_customer_configuration (MP-303)`

The error `invalid_altinn_customer_configuration (MP-303)` indicates a configuration issue within Altinn's System Register for the specified system user. This error typically occurs during a Maskinporten token request when Altinn cannot find or validate the system user's registration based on the vendor's incoming token request.

## Common Causes and Solutions

The root cause is almost always a mismatch between the information provided in the token request and the data stored in Altinn. The most frequent misconfigurations are detailed below.

### Cause 1: Missing `ClientId` for the System User

While a system can be registered without a `ClientId`, a system user that authenticates via Maskinporten **must** be associated with one. This `ClientId` is the unique identifier for the Maskinporten client performing the authentication.

#### Solution: 
Verify that the system registration in the System Register includes the correct `ClientId`. This `ClientId` must match the one from the Maskinporten client configuration used for the token request. If it is missing or mismatched, the vendor must update the system registration accordingly.

### Cause 2: Missing `externalRef` for the System User
Maskinporten token request does not include externalRef. This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### Solution:
Verify if the systemuser request was created with "externalRef" value. If yes, please include the value in the maskinportentoken request. Please refer this [maskinporten documentation](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker.html#foresp%C3%B8rsel)
