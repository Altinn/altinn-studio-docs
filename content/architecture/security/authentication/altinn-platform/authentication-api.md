---
title: Authentication API
description: Description of the Authentications API in Authentication Component
tags: ["architecture", "security"]
weight: 100
linktitle: JWT Format
alwaysopen: false
---

[JSON Web Token](https://jwt.io/) are an open, industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties and are choosen
as the bearer of information about users and systems.

The format that is choosen for JWT tokens is RSA256. This is a asymetric algorithm where the Authentication component in Altinn Platform generates tokens based on a private key in a certificate,
and everyone can validate the token with the public key.


## API for SBL Authentication cookie
This API creates a JWT Cookie (A cookie with a JWT Token) based on the SBL Cookie created during login in the Legacy SBL solution. This API uses API in the SBL Bridge to verify the cookie
and get information about the logged in user. Based on this information this API creates a JWT token with claims about the user (userid, authentication level ++) and sign the JWT token with
the Private Key of Altinn Platform.


## API for End User System

### Reserve Pin for End User
This API lets the user request a Altinn PIN or SMS Pin for a end user 



