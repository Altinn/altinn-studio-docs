---
title: Testing a multi-app solution in Altinn
linktitle: Testing
description: How to test the multi-app solution while developing
weight: 50
toc: true
aliases:

- /app/multi-app-solution/testing/

---

## How does testing with Maskinporten work

When interacting with Maskinporten in an application there are a few things to keep in mind.

Add the required Maskinporten scopes to the app in Altinn Studio before deploying it to a runtime environment. Altinn Studio will provision the Maskinporten client for the environment during deployment and mount the generated credentials into the app.

The user adding scopes in Altinn Studio must have access to administer Maskinporten clients for the service owner organization. See the [Maskinporten integration guide](/en/altinn-studio/v8/guides/integration/maskinporten/) for details.

## What can be done in Studio

The Studio support for developing multi-app solutions are currently very limited. Thus, the only help Studio can provide
for you is the already supported single-app configurations.
This means that you will only be able to build the individual applications and visualize the looks of them in the
preview tool.

## What can be done in app-localtest

When running the application locally in app-localtest you can test all the logic in application A until
the point where the instantiation request to application B is triggered. A local run does not provision the runtime Maskinporten client secret that is created during deployment.

For local testing against real Maskinporten-protected APIs, use a temporary local configuration or user secrets as described in the legacy section of the [Maskinporten integration guide](/en/altinn-studio/v8/guides/integration/maskinporten/#legacy-manual-setup).

{{% notice warning %}}
Do not commit or push any secrets to Gitea; keep secrets out of version control and store them securely.
{{% /notice %}}

After this modification the application is set up correctly with a client that can be
authorised with Maskinporten when sending the instantiation request to application B. However, this request will not
be executed successfully due to application B is not
running. App-localtest is limited to only handle one running application, but if application B is running in
the environment, preferably in tt02 during test, you can change the request to point to this environment instead of
local.altinn.cloud. This can be done by changing the envUrl in the `AppClient.CreateNewInstance()` method.

Change this line:

```csharp
string envUrl = $"https://{org}.apps.{_settings.HostName}";
```

To this:

```csharp
string envUrl = $"https://{org}.apps.tt02";
```

_NB: Do not change the HostName variable in appsettings.json since this is used for other critical purposes as well._

Unless you are fine by injecting your organizations Altinn Innboks with testing instances of application B, you
should adjust the receiver of the instance that is to be created in the instance template in application A. This is
done by using `PersonNumber` instead of `OrganisationNumber` in the `InstanceOwner` part of the template object
in `ProcessTaskEnd.End()` method. It is recommended to use a person number for a test user from Tenor test database.
When testing if the application B form has come through you will need to log in
to [tt02.altinn.no](https://tt02.altinn.no/)
with the same tenor test user.

## What must be done in tt02

Before actually deploying the applications to production the forms should have been tested fully in tt02 with the deployed Maskinporten setup and correct variable for the envUrl. This means that both applications should be tested while
running in tt02. It is still possible to test with a Tenor test user as the receiver of the instance, but an alternative
is to ask for a test-organisation that can receive these forms. This can be done by sending a request to
servicedesk@altinn.no.
