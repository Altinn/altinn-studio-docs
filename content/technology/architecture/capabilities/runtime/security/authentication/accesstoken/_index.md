---
title: Access Token
linktitle: Access Token
description: To protect API that should not be able to be used by other apps or platform components, we have an additional access token.
tags: [architecture, security]
toc: false
---


## Altinn Studio

Altinn Studio Designer creates a JWT-based Access Token signed by a certificate that the Altinn Studio Designer has available when running in the Altinn Studio Kubernetes Cluster. The certificate is different for each environment.

Using separate certificates makes it possible for each Altinn Platform environment to configure which Altinn Studio environment is allowed to deploy
and modify applications in that specific environment. 

Altinn Studio Designer generates a token with the help of the Access Token generator for each call to the platform components. 

## Apps 

An access token requirement is enabled for some platform APIs to limit the clients that can access. 

The application generates a token based on an org-specific certificate available in the Kubernetes Cluster for the given org.


## Implementation details

To see Access Token construction details and examples of use, visit [Access Token construction components](/technology/architecture/components/application/construction/altinn-platform/authentication/accesstoken/).


