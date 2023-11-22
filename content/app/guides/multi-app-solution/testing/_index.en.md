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

First and foremost Samarbeidsportalen lets you maintain two different clients; one for test being `ver2`/`test` and
another for
production
being `prod`. You should create both clients, but of course only use the test client for test, and prod client for
production. Which client to use in which scenario, is decided by different configurations for
the `appsettings.{env}.json` files. There are different access policies for creating these, so make sure you are aware
of these limitations
described
at [Samarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

Second, since integrating this client with an Altinn app relies on authorizing through public and private keys (JWT)
stored as Azure secrets, you will need access to the Azure Key vault of the organization owning the applications.

## What can be done in Studio

The Studio support for developing multi-app solutions are currently very limited. Thus, the only help Studio can provide
for you is the already supported single-app configurations.
This means that you will only be able to build the individual applications and visualize the looks of them in the
preview tool.

## What can be done in app-localtest

When running the application locally in app-localtest you can test all the logic in application A until
the point where the instantiation request to application B is triggered. The reason for this is that the AppClient tries
to access the
Azure key vault in order to get the secrets needed for authorization to Maskinporten. But the secrets needed to be
allowed to access Azure key vault is not available when running in localtest.

However, there is a way to go around this, for testing purposes. The secrets needed, `clientID` and `encodedJWT`, for
authorizing requests to
Maskinporten can be copied from your organisations Azure key vault and *temporarily* be pasted into the appsettings.json
file.

{{% notice warning %}}
If doing this modification be very careful that these secrets must not be shared by pushing them to gitea.
{{% /notice %}}

After this modification the application is set up correctly with a client that can be
authorized with Maskinporten when sending the instantiation request to application B. However, this request will not
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

Before actually deploying the applications to production the forms should have been tested fully in tt02 with actual
usage of Azure key vault and correct variable for the envUrl. This means that both applications should be tested while
running in tt02. It is still possible to test with a tenor test user as the receiver of the instance, but an alternative
is to ask for a test-organisation that can receive these forms. This can be done by sending a request to
servicedesk@altinn.no.
