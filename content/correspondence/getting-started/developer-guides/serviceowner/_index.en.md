---
title: Getting started service owner
linktitle: Getting started service owner
description: "Service owner: a public entity that has entered into an agreement to configure and manage services in Altinn, such as a messaging service."
tags: []
toc: false
weight: 10
---

{{<children />}}

### 1. Get started as service owner in Altinn {#get-started-as-service-owner-in-altinn}

To get started with Altinn Correspondence, your enterprise must be registered as a service owner in Altinn. For a step-by-step guide see:
[Get started with Altinn guide (Norwegian language only)](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

This step is only necessary for new enterprises that have not yet established themselves as service owners on the Altinn platform. As an existing service owner, you can proceed directly with the next steps to start using Altinn Correspondence.

### 2. Create or get access to a resource in Altinn Resource Registry {#registeraresourceinaltinnresourceregistry}
In order to send messages via Altinn Correspondence, they must first be associated with a resource. 
A resource represents a specific function or set of functions used to manage access and rules for the correspondence. Resources are registered via Altinn Studio and are used to define access rules and access lists, ensuring that only authorized users can perform specific actions.

1. Log in to Altinn Studio and navigate to the resource dashboard. See [Resource Registry](https://docs.altinn.studio/authorization/guides/create-resource-resource-admin/) for a detailed guide.
2. Create a new resource, follow the guide and fill in the necessary information and details about the service.
3. Set policy rules for the resource. Your policy must be configured in such a way that they permit the actions:
    - "read" meant for recipients to open and read a message.
    - "write" meant for senders to send a message.
    - "subscribe" to register event subscriptions in Altinn Events.

Here is an [example policy](https://docs.altinn.studio/correspondence/getting-started/ExamplePolicy.xml).

Note that this example policy sets a required user role "DAGL" for the user who has access to the resource, and requires the use of [Resource Rights Registry](https://docs.altinn.studio/authorization/what-do-you-get/resourceregistry/rrr/) to grant access to specific organisations.
A user with that access can then delegate the access to the enterprise user / system user.

**TIP**: Verify your configurations using the [Postman collection](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), substituting the test tokens with your own Altinn tokens (See "Login to Maskinporten (Initialize)" request in Authenticator folder).

### 3. Altinn API key and access to scopes {#get-an-altinn-api-key}
In order to use Altinn Correspondence you need a subscription key. Technically, this is an API key that must be included in the header of the request `Ocp-Apim-Subscription-Key`, to verify that you have the right to use the Correspondence API. Without this key, your request will be denied.
To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. This ensures that only authorized clients can send and receive files, thereby maintaining the security of the service. The following scopes are used to send and/or receive messages:
- `altinn:correspondence.write` 
- `altinn:correspondence.read` 

To obtain an Altinn API key and access to scopes, you must submit a request to: [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
The request must include the scopes you need. Note that you may require more than just read/write access for Correspondence. A complete list of scopes can be found here:
[Complete list of scopes](https://docs.altinn.studio/api/authentication/digdirscopes/)

### 4. Register your Maskinporten Client with the required scopes {#register-your-maskinporten-client-with-correct-scopes}
In order to authenticate the Correspondence API you must register your Maskinporten client(s) with the necessary scopes, depending on whether you need to send and/or receive messages.

The scopes are maintained by Altinn, they are required for you to be authorized for the correct API operations. Note that this is not the same as the access granted by service owners in step 2 for the specific Correspondence service resource.

Use Samarbeidsportalen self-service for registration. [Here's a detailed guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

- [Test environments](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Production environment](https://sjolvbetjening.samarbeid.digdir.no/)

### 5. Authentication {#authentication}

For all operations, you will need to authenticate using your Maskinporten Client, then [acquire an Altinn Token from Altinn Authentication](https://docs.altinn.studio/authentication/reference/architecture/accesstoken/).
### 6. Integrate with Correspondence API {#integrate-with-correspondence-api}

Since Altinn Correspondence is open source, you can access our code in [our public GitHub repository](https://github.com/Altinn/altinn-correspondence) and build a local docker instance to test against.

We also welcome contributions to the solution.

See the [readme file on GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for an introduction to Altinn 3 Correspondence, and how to build and run it in your dev environment.

The Repo also contains a [Postman collection](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json) with examples.

Swagger for the correspondence API is hosted [here](https://docs.altinn.studio/api/correspondence/spec/).

### 7. Setup Event Subscriptions {#setup-event-subscriptions}

In order to use events/webhooks for a Correspondence resource, you need to set up a subscription for the given resource.

See the [developer guide](https://docs.altinn.studio/correspondence/getting-started/developer-guides/events) for detailed instructions.
