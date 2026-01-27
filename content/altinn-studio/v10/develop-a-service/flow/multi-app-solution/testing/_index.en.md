---
draft: false
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

Samarbeidsportalen allows you to have two different clients: one for test, called `ver2`/`test`, and one for production, called `prod`.
You should create both clients, but only use the test client for testing and the production client for production.
Which client to use in which situation is determined by different configurations in the `appsettings.{env}.json` files.
There are different access rules for creating these clients, so ensure you are aware of these limitations described at
[Samarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

You will also need access to the organisation's Azure Key Vault, as integrating this client with an Altinn app depends on authorisation through public and private keys (JWT) stored as Azure secrets.

## Testing in Studio

Support for developing multi-app solutions in Studio is currently very limited.
Studio can only help with already supported configurations for individual apps.
This means you can only build the individual apps and view their appearance in the preview tool.

## Testing in app-localtest

When running the app locally in app-localtest, you can test all the logic in app A up to the point where the instantiation request to app B is triggered.
This is because the AppClient attempts to access Azure Key Vault to retrieve the necessary secrets for authorisation to Maskinporten.
However, the secrets needed to access Azure Key Vault are not available when running in localtest.

You can work around this for testing purposes. The keys needed, `clientID` and `encodedJWT`, for authorising requests to Maskinporten can be copied from the organisation's Azure Key Vault and *temporarily* pasted into the `appsettings.json` file.

{{% notice warning %}}
Be very careful with this modification. You must not share these keys by uploading them to Gitea.
{{% /notice %}}

After this modification, the app is correctly set up with a client that can be authorised with Maskinporten when sending the instantiation request to app B.
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

Before deploying the apps to production, you should have fully tested the forms in tt02 with actual use of Azure Key Vault and correct variable for the envUrl.
This means you should test both apps whilst they are running in tt02.
You can still test with a test user from Tenor as the receiver of the instance, but an alternative is to request a test organisation that can receive these forms.
You do this by sending a request to servicedesk@altinn.no.
