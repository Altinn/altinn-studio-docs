---
draft: true
title: Test a multi-app solution in Altinn
linktitle: Testing
description: How to test the multi-app solution whilst developing
weight: 50
toc: true
tags: [needsReview]
aliases:

- /app/multi-app-solution/testing/

---

## Understand testing with Maskinporten

This is what you should know when interacting with Maskinporten in an app.

Add the required Maskinporten scopes to the app in Altinn Studio before deploying it to a runtime environment. Altinn Studio will provision the Maskinporten client for the environment during deployment and mount the generated credentials into the app.

The user adding scopes in Altinn Studio must have access to administer Maskinporten clients for the service owner organisation. See the [Maskinporten integration guide](/en/altinn-studio/v9/develop-a-service/integration/maskinporten/) for details.

## Testing in Studio

Support for developing multi-app solutions in Studio is currently very limited.
Studio can only help with already supported configurations for individual apps.
This means you can only build the individual apps and view their appearance in the preview tool.

## Testing in app-localtest

When running the app locally in app-localtest, you can test all the logic in app A up to the point where the instantiation request to app B is triggered.
A local run does not get the Maskinporten client Altinn Studio provisions when you publish; you store one yourself.

A v9 app does not start without a stored Maskinporten client, so store your test client with `studioctl app maskinporten set` before the first local run. studioctl provisions it to the app the way Altinn Studio does when you publish, so nothing goes into the app's own configuration. See [Kjøre appen lokalt](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/#lokal-kjoring) (documentation available in Norwegian only).

{{% notice warning %}}
Never upload these keys to Gitea. With studioctl they are not part of the app at all: studioctl keeps them, and the app receives them only for a local run.
{{% /notice %}}

With the client stored, the app is correctly set up with a client that can be authorised with Maskinporten when sending the instantiation request to app B.
However, this request will not be executed successfully because app B is not running.
App-localtest can only handle one running app, but if app B is running in the environment, preferably in tt02 during test, you can modify the request to point to this environment instead of local.altinn.cloud.
You do this by modifying the envUrl in the `AppClient.CreateNewInstance()` method.

Change this line:

```csharp
string envUrl = $"https://{org}.apps.{_settings.HostName}";
```

To this:

```csharp
string envUrl = $"https://{org}.apps.tt02";
```

_NB: Do not change the HostName variable in appsettings.json, as this is also used for other critical purposes._

Unless you want to inject test data from app B into the organisation's Altinn innboks, you should adjust the receiver of the instance to be created in the instance template in app A.
You do this by using `PersonNumber` instead of `OrganisationNumber` in the `InstanceOwner` part of the template object in the `ProcessTaskEnd.End()` method.
We recommend using a person number for a test user from the Tenor test database.
When testing whether the form from app B has come through, you must log in to
[tt02.altinn.no](https://tt02.altinn.no/)
with the same test user from Tenor.

## Testing in tt02

Before deploying the apps to production, you should have fully tested the forms in tt02 with the deployed Maskinporten setup and correct variable for the envUrl.
This means you should test both apps whilst they are running in tt02.
You can still test with a test user from Tenor as the receiver of the instance, but an alternative is to request a test organisation that can receive these forms.
You do this by sending a request to servicedesk@altinn.no.
