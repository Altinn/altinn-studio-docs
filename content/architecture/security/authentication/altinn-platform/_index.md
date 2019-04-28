---
title: Authentication Architecture Altinn Apps 
description: Description of the Authentication architecture Altinn Platform
tags: ["architecture", "security"]
weight: 100
linktitle: Altinn Apps
alwaysopen: false
---

Altinn Platform contains components that need to be able to authenticate users and systems. This is needed when resources requiring authentication and authorization is requested.
This will typical be API's that expose or updates data own by a end user/party.

Since Altinn Platform will in the future support that different types of application created by different frameworks (Java/.Net/Node ++++) it is important that the
authentication mechanismens is supported by different types of platforms.

[JSON Web Token](https://jwt.io/) are an open, industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties and are choosen
as the bearer of information about users and systems.

## End users accessing APIs in Altinn Platform

## End user systems accessing Altinn Platform api's

End user systems is identfied with a end user system ID and a password. A end user system can be authenticated by themself or together with a end user and pin code. 

In both cases the end user system calls a API on the Platform to generate a JWT token containing information about the system and possible user and pin.

The API generates a JWT token containing claims for the system and user

## Enterprise users accessing API's in Altinn Platform

Enterprise users is users that is authenticated with use of a enterprise certificate together with a password and username. The authentication component in Altinn Platform will have a API
that generates a JWT token based on the certificate and the username password

## app owner systems accessing app api's

App owners (service owners) will have seperate API's in a App to perform operations on. They are authenticated with help of agency system id + password. A API in the authentication component
in Altinn creates a JWT token that can be used to authenticate the agency system when calling api's on apps running in Altinn Apps.
