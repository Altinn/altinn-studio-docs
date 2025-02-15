---
headless: true
hidden: true
---


The {0} API is secured using OAuth2 and all requests must include a valid Altinn token either in the Authorization header or
in the _AltinnStudioRuntime_ cookie.

For clients within the Altinn eco-system representing an external user or organization,
the Altinn token in an incoming request can be forwarded to the {0} API.

If you are using the API from an external system you will need to generate a Maskinporten or ID-Porten token
and exchange this for an Altinn token before calling the {0} API.

Below are two guides on how to achieve this.

{{% expandlarge id="guide-altinn-token-maskinporten" header="Guide on how to generate an Altinn token with Maskinporten" %}}

<!--
- fakta messig hvordan går man gjennom ting
- gi en heads up om at vi også har en API-client for .NET
-->
{{% notice info %}}
We are working on providing you with a guide.
{{% /notice %}}


{{% /expandlarge %}}


{{% expandlarge id="guide-altinn-token-id-porten" header="Guide on how to generate an Altinn token with id-Porten" %}}

{{% notice info %}}
We are working on providing you with a guide.
{{% /notice %}}

{{% /expandlarge %}}

