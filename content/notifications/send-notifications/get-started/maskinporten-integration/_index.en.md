---
title: Makinporten integration
linktitle: Maskinporten integration
weight: 10
description: "A guide to setting up a maskinporten integration to generate tokens with 
the required scope to access to the Notifications API"
---

{{% notice info %}}
NOTE: This is only required by external system clients. 
Altinn internal systems should include an Altinn Platform Access Tokens to the request header to gain access 
to the API.
{{% /notice %}}

The scope **altinn:serviceowner/notifications.create** is required for external clients to gain access to the Notifications
API both for registering notification requests and checking status for sent notifications. 

Generating a token with the requires scope as a part of the token claims is achieved through Maskinporten. 
Below are guides on how to set up a new Maskinporten integration that can generate tokens with the required scope.


{{% expandlarge id="guide-mp-int-api" header="Guide on how to register a new Maskinporten integration through API" %}}

Please reference [Maskinporten's own documentation](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument)
on registering a new integration through their self service API.

{{% /expandlarge %}}


{{% expandlarge id="guide-mp-int-samarbeid" header="Guide on how to register a new Maskinporten integration in Samarbeidsportalen" %}}
{{% insert "content/app/guides/shared/maskinporten-integration/maskinporten-integration-samarbeidsportal.md" %}}
{{% /expandlarge %}}

