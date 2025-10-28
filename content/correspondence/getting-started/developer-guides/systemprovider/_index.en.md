---
title: Getting Started system provider
linktitle: System provider
description: "System provider: provides an end-user-system that via machine-to-machine integration can receive Altinn messages."
tags: []
toc: false
weight: 20
---

{{<children />}}

We recommend that system providers integrate with Dialogporten’s APIs to retrieve Altinn Correspondence. This way, they will also receive other types of letters (dialogs/transmissions) that are not sent via the Altinn Correspondence APIs. This applies, for example, to letters from the Norwegian Tax Administration (Skatteetaten), some letters from the Norwegian Labour and Welfare Administration (Nav), and other letters from senders/service owners. The Norwegian Tax Administration has already started sending dialogs. (These letters will not be received if you integrate only with the Correspondence APIs.)


{{% expandlarge id="onboarding-process" header="Onboarding process" %}}

Providers of end-user systems who wish to access functionality and services in the test and production environments must follow this [onboarding-process](https://samarbeid.digdir.no/altinn/kom-i-gang/2868).
{{% /expandlarge %}}


{{% expandlarge id="service-integration" header="Service integration" %}}

See which services you can set up an integration with [here](https://samarbeid.digdir.no/altinn/integrasjon-mot-tjenester/2412).
{{% /expandlarge %}}


{{% expandlarge id="get-access-to-scopes" header="Access to scopes" %}}

To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. This ensures that only authorized clients can send and receive files, thereby maintaining the security of the service. 

- An overview of the relevant scopes can be found [here](https://samarbeid.digdir.no/altinn/scopeoversikt-produkt-og-funksjonsomrade/3017).
- To obtain an Altinn API key and access to scopes, you must submit a request to: [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
Please include all necessary scopes in your request. For example, beyond `altinn:correspondence.read`, your integration may require additional scopes. 
You can find the complete list of available scopes here: [Complete list of scopes](https://docs.altinn.studio/api/authentication/digdirscopes/)
{{% /expandlarge %}}


### Contact:

You can reach us on our Slack channel Digdir samarbeid: [produkt-dialogporten](https://digdir-samarbeid.slack.com/archives/C069J6N7S00)

Or by sending a request to:: [servicedesk@altinn.no](mailto:servicedesk@altinn.no)