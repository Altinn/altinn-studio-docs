---
title: Altinn Events API
linktitle:  API
description: An overview of the Altinn Events API
weight: 10
toc: true
---

The Altinn Events API is an HTTP-based RESTful API that provides access to cloud events published to 
Altinn by Altinn Apps and other event publishers.


## Base URL

- AT (Private Altinn Acceptance Test environment)
 
    ```http
    https://platform.{environment}.altinn.cloud/events/api/v1
    ```
- TT02 (Application owner test environment)
 
    ```http
    https://platform.tt02.altinn.cloud/events/api/v1
    ```
- Production:

   ```http
    https://platform.altinn.cloud/events/api/v1
    ```


## Authentication & Authorization
### Altinn token
This API is secured using OAuth2 and all requests must include a valid Altinn token either in the Authorization header or
in the _AltinnStudioRuntime_ cookie. 


{{% notice info %}}
TODO: write the guides referenced below.Both with our client libraries and in postman maybe? 
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


### Platform Access token
The use of some endpoints in the API is limited to callers within the Altinn eco-system.
These APIs require additional authorization in the form of a
Platform Access Token. Reference developer documentation for the client system on how to generate 
the token.


### Private APIs
The API contains a set of private APIs that are only accessible within the Events-component.
These are marked as _Private API_ in the OpenAPI specification and require an access token in the request header.
