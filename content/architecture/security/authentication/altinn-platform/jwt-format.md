---
title: JWT Format
description: Description of the JWT Format used in Altinn Studio, Altinn Platform and Altinn Apps
tags: ["architecture", "security"]
weight: 100
linktitle: JWT Format
alwaysopen: false
---

[JSON Web Token](https://jwt.io/) are an open, industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties and are choosen
as the bearer of information about users and systems.

The format that is choosen for JWT tokens is RSA256. This is a asymetric algorithm where the Authentication component in Altinn Platform generates tokens based on a private key in a certificate,
and everyone can validate the token with the public key.


## Claims in token


### UserId


### ssn


### PartyId


### end user system Id

### SystemOwnerPartyId


