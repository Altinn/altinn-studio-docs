---
title: Authentication APIs
description: Description of the Authentications API in Authentication Component
tags: [architecture, security]
weight: 100
linktitle: Authentication API
alwaysopen: false
---

As part of the authentication component there will be some API's that support authentication of different types of users and systems. 

## API for SBL Authentication cookie
This API creates a JWT Cookie (A cookie with a JWT Token) based on the SBL Cookie created during login in the Legacy SBL solution. This API uses API in the SBL Bridge to verify the cookie
and get information about the logged in user. Based on this information this API creates a JWT token with claims about the user (userid, authentication level ++) and sign the JWT token with
the private key of Altinn Platform.

The login process for a user that wants to access a app in Altinn Apps is described below.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/security/authentication/loginprocess.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}


## API for End User System
There are two API's for end user sytems

### Reserve Pin for End User
This API lets the user request a Altinn PIN or SMS Pin for a end user 

### Validate system and/or end user
This API validates the end user systm id together with the password for the system 


The below diagram shows how

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/security/authentication/loginprocess_eus.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

## API for enterprise users

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/security/authentication/loginprocess_ec.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

## API for Org systems
This API is used to authenticate the org systems. 

To authenticate a system like this Altinn Platform requires that the system is registred as a client in Maskinporten for a given org.
The org need also to be given scopes that matches the scopes for the API requested in Maskinporten. 

This will be given by Altinn. 

The org system should be given the scope needed by the administrator of org. (done through Maskinporten API described under 4 [here](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html#4-konfigurere-oauth2-klient))

The org system would need to request a access token from Maskinporten with the correct scope.
This token will be used in the org API in Authentication component in the Altinn Platform
to create a new JWT token that can be used for all org apis in Apps and platform.

During the verification process of the Maskinporten JWT token the scope and org is verified.

The below sequence diagram show how this will happen.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/security/authentication/loginprocess_org.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}