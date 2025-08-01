---
title: Getting started service owner
linktitle: Service owner
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

### 2. Create a User in Altinn Studio {#register-user-altinn-studio}

To be able to create a resource (step 3), you need a user in Altinn Studio. Your user must be linked to your organization. (If you have an Altinn Studio user, you can skip this step.) Contact [Altinn Servicedesk](mailto:tjenesteeier@altinn.no) if you’re unsure who the administrator is or whether your organization is set up in Altinn Studio.

See [Create a User in Altinn Studio](https://docs.altinn.studio/altinn-studio/getting-started/create-user/) for a detailed guide.

### 3. Activate the Resource Management System {#activate-resourceregistry}

To send messages via Altinn Melding, the message must be linked to a resource. Resources are registered through Altinn Studio and are used to define access rules and access lists, ensuring that only authorized users can perform specific actions.
You activate the resource management system by creating a specific repository and a resource group for your organization. (You can skip this step if you have activated the resource management system.)

See [Resource Management](https://docs.altinn.studio/authorization/getting-started/resource-admin-studio/#create-the-resource-admin-repository-for-the-organization) for a detailed guide.

### 4. Create a Resource {#registeraresourceinaltinnresourceregistry}

1. Log in to Altinn Studio and navigate to the resource dashboard.
2. Create a new resource, follow the guide, and fill in the necessary information and details about the service. See [Resource Registry](https://docs.altinn.studio/authorization/guides/resource-owner/create-resource-resource-admin/#step-1-create-resource) for a detailed instruction.
3. Set policy rules for the resource. Your policy must be configured in such a way that they permit the actions:
   - "read" meant for recipients to open and read a message.
   - "write" meant for senders to send a message.
   - "subscribe" to register event subscriptions in Altinn Events.

Here is an [example policy](https://docs.altinn.studio/correspondence/getting-started/ExamplePolicy.xml).

**Important**: As a service owner, you only need to configure "read" rules via access packages in the GUI.

Note that this example policy sets a required user role "DAGL" for the user who has access to the resource, and requires the use of [Resource Rights Registry](https://docs.altinn.studio/authorization/what-do-you-get/resourceregistry/rrr/) to grant access to specific organisations.
A user with that access can then delegate the access to the enterprise user / system user.

**TIP**: Verify your configurations using the [Postman collection](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), substituting the test tokens with either your own Altinn tokens (see "Login to Maskinporten (Initialize)" request in Authenticator folder) or your Maskinporten tokens, depending on what you are choosing for authentication method.

### 5. Access to scopes {#get-access-to-scopes}

To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. The scope requirements depend on your chosen authentication method:

**For Direct Maskinporten Authentication (Method 1):**
- `altinn:serviceowner` (required for service owner access)
- `altinn:correspondence.write` (required for sending messages)

**For Traditional Altinn Token Exchange (Method 2):**
- `altinn:correspondence.write` (required for sending messages)

To obtain access to scopes, you must submit a request to: [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
The request must include the scopes you need. Note that you may require more than just altinn:correspondence.write for your integration. A complete list of scopes can be found here:
[Complete list of scopes](https://docs.altinn.studio/api/authentication/digdirscopes/)

### 6. Register your Maskinporten Client with the required scopes {#register-your-maskinporten-client-with-correct-scopes}

To authenticate the Correspondence API you must register your Maskinporten client(s) with the necessary scopes, depending on whether you need to send and/or receive messages.

The scopes are maintained by Altinn, they are required for you to be authorized for the correct API operations. Note that this is not the same as the access granted by service owners in step 2 for the specific Correspondence service resource.

Use Samarbeidsportalen self-service for registration. [Here's a detailed guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

- [Test environments](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Production environment](https://sjolvbetjening.samarbeid.digdir.no/)

**Note**: The resource policy on your resource must have assigned the required scopes to the organisation that your Maskinporten client(s) is registered on.

### 7. Authentication {#authentication}

For service owners, authentication is now more flexible with two supported methods:

#### Method 1: Direct Maskinporten Authentication

You can now authenticate directly using your Maskinporten client with the `altinn:serviceowner` and `altinn:correspondence.write` scopes.

**Benefits:**
- **No Altinn Token Exchange Required**: Use Maskinporten tokens directly without exchanging them for Altinn tokens


#### Method 2: Traditional Altinn Token Exchange

For service owners who prefer the traditional approach or have existing integrations, you can continue to:

1. Authenticate using your Maskinporten Client with the `altinn:correspondence.write` scope
2. [Acquire an Altinn Token from Altinn Authentication](https://docs.altinn.studio/authentication/reference/architecture/accesstoken/)
3. Use the Altinn token for API calls

**Note**: **Automatic Sender Authorization**: The system automatically determines and uses your organization number from the resource configuration. You no longer need to specify the `Sender` field in your API requests (this field is now deprecated)

### 8. Integrate with Correspondence API {#integrate-with-correspondence-api}

Since Altinn Correspondence is open source, you can access our code in [our public GitHub repository](https://github.com/Altinn/altinn-correspondence) and build a local docker instance to test against.

We also welcome contributions to the solution.

See the [readme file on GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for an introduction to Altinn 3 Correspondence, and how to build and run it in your dev environment.

The Repo also contains a [Postman collection](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json) with examples.

Swagger for the correspondence API is hosted [here](https://docs.altinn.studio/api/correspondence/spec/).

### 9. Set up Event subscriptions {#setup-event-subscriptions}

In order to use events/webhooks for a Correspondence resource, you need to set up a subscription for the given resource.

See the [developer guide](https://docs.altinn.studio/correspondence/getting-started/developer-guides/events) for detailed instructions.
