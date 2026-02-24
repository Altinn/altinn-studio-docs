---
title: Reference implementation
description: The SmartCloud demo client illustrates how vendor-controlled system user creation can be implemented end-to-end.
linktitle: Reference implementation
hidden: false
weight: 10
---

**Audience:** Developers and technical owners at end-user system vendors who need a concrete example of vendor-controlled system user onboarding.

## About the SmartCloud demo client

SmartCloud demonstrates the complete vendor-controlled onboarding flow.  
Try the solution at [smartcloudaltinn.azurewebsites.net](http://smartcloudaltinn.azurewebsites.net) and review the documented source code on GitHub: [TheTechArch/altinn-systemuser](https://github.com/TheTechArch/altinn-systemuser).

When testing system user creation you can rely on Tenor test users and organisations.

## Test the system user flow in TT02

The reference implementation is written in C# and runs as a console application. It:

- generates a token based on the configured JSON Web Key, client ID, scope and the organisation number of the system provider, and
- calls reference APIs that require a system user using that token.

Source code and documentation: [TheTechArch/altinn-systemuser](https://github.com/TheTechArch/altinn-systemuser).

### Step-by-step: configure and run the reference implementation

The repository contains the test certificate you need. Follow these steps to set up your own integration:

{{< stepcard step="1" title="Provision the integration in Maskinporten" >}}
Follow the guide for [setting up a Maskinporten client](/en/authorization/getting-started/maskinportenclient/). Make sure you capture the client ID, scopes, and key material when the integration is created.
{{< /stepcard >}}

{{< stepcard step="2" title="Register the system in Altinn" >}}
Register the system in the system register with the correct client ID and required resources or access packages. See the guide [Registering a system](/en/authorization/guides/system-vendor/system-user/systemregistration/) for details.  
Set `isVisible: true` during registration so the system appears as an option in step 3.
{{< /stepcard >}}

{{< stepcard step="3" title="User-driven creation in Altinn" >}}
Have a test user sign in at [tt02.altinn.no](https://tt02.altinn.no) with the Access Manager role for the test organisation and open [API and system access](https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/overview).

![Select the system you want to provision](delegering1.png)

![Approve system access with the specified rights](delegering2.png)

![Overview of system accesses for the test organisation](delegering3.png)
{{< /stepcard >}}

{{< stepcard step="4" title="Configure the test application" >}}
Set up key, certificate, client ID, and scope in the test application before running it.

```csharp
string clientID = "7ee41fce-9f6e-4c32-8195-0fe2c1517f43";
string scope = "altinn:systembruker.demo";
string systemUserOrg = "210493352";
string pemCertificatePath = @".\mp-key.pem";
```
{{< /stepcard >}}
