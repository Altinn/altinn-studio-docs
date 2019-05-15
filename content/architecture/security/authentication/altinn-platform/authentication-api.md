---
title: Authentication APIs
description: Description of the Authentications API in Authentication Component
tags: ["architecture", "security"]
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
<object data="/architecture/security/authentication/altinn-platform/loginprocess.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}


## API for End User System
There are two API's for end user sytems

### Reserve Pin for End User
This API lets the user request a Altinn PIN or SMS Pin for a end user 

### Validate system and/or end user
This API validates the end user systm id together with the password for the system 


The below diagram shows how

{{%excerpt%}}
<object data="/architecture/security/authentication/altinn-platform/loginprocess_eus.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

## API for enterprise users

{{%excerpt%}}
<object data="/architecture/security/authentication/altinn-platform/loginprocess_ec.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}


## API for Org systems

{{%excerpt%}}
<object data="/architecture/security/authentication/altinn-platform/loginprocess_org.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}