---
title: Application construction components - Altinn Access Management
linktitle: Access Management
description: The Access Managment component in Altinn platform is constructed as an asp.net core 6 web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
toc: false
---

Also see [solution components](/technology/solutions/altinn-platform/authorization/accessmanagement/) for details about functionality.

![Access Management](accessmanagement.drawio.svg "Construction Components Altinn Resource Registry")

## API

The following API is available in component

- DelegationAPI
- DelegationRequestAPI
- DelegationResourcesAPI
- AuthenticationAPI

### Security


## Repository
Access Manamgent owns the delegated rights. 

- PostgreSQL is used to store information about a delegated policy
- Azure Blob Storage is used 

See [migration scripts](https://github.com/Altinn/altinn-access-management/tree/main/backend/src/Altinn.Authorizationadmin/Altinn.Authorizationadmin/Migration) for table structure and stored procedures.

## Build & Deploy

- Build and Code analysis are done by an [Github action](https://github.com/Altinn/altinn-resource-registry/actions)
- Build of image is done in [Azure Devops](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=385)
- Deploy of Image is done in [Azure Devops](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=36)