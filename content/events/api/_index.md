---
title: Altinn Events API
linktitle:  API
description: An overview of the Altinn Events API
weight: 10
toc: true
---

The Altinn Events API is an HTTP-based RESTful API that provides access to cloud events published to 
Altinn by Altinn Apps and other event publishers.

## Authentication & Authorization
### Altinn token
This API is secured using OAuth2 and all requests must include a valid Altinn token either in the Authorization header or
in the _AltinnStudioRuntime_ cookie. 


{{% notice info %}}
TODO: write the guides referenced below
{{% /notice %}}

Here is an overview of guides related to the generation of Altinn token for production and test purposes:
- [Guide on how to generate an Altinn token with Maskinporten]()
- [Guide on how to generate an Altinn token with id-porten]()
- [Guide on how to generate an Altinn token with Altinn test tools]()
  

### Maskinporten scopes

{{% notice info %}}
TODO: find docs to link to or create them.
{{% /notice %}}

Some endpoints in the API require additional authorization in the form of a 
Maskinporten scope. [User documentation on setting up a maskinporten integration with a specific scope 
is available here](). 





### Private APIs
The API contains a set of private APIs that are only accessible for the Altinn platform itself. 
These are marked as _Private API_ in the OpenAPI specification and require an access token in the request header.


## Base URL

The base URL for all requests is 

- AT: __https://{environment}.altinn.cloud/events/api/v1__
- TT02: __https://tt02.altinn.no/events/api/v1__
- Production: __https://altinn.no/events/api/v1__


