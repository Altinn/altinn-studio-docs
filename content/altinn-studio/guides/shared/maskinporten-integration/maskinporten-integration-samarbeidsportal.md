---
headless: true
hidden: true
---

### Prerequisites

- A user in _[Samarbeidsportalen](https://samarbeid.digdir.no/)_ with access to _Selvbetjening_.

    [Guide on creating a new user in Samarbeidsportalen.](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#opprette-bruker)

### Register new integration through Samarbeidsportalen

- Login to Samarbeidsportalen in [Test](https://sjolvbetjening.test.samarbeid.digdir.no/) or
[Production](https://sjolvbetjening.samarbeid.digdir.no/)

- Choose __Selvbetjening__ and then __Integrasjoner__ for the environment you want.
_Ver2_ is test and _Produksjon_ is production.

    !["Samarbeidsportalen"](/altinn-studio/guides/shared/maskinporten-integration/selvbetjening.png "Samarbeidsportalen")

- Choose __Ny integrasjon__

    !["New integration"](/altinn-studio/guides/shared/maskinporten-integration/integrasjon_ny.png "New integration")



- To fill out the form, provide all required properties:
    - Scopes: Choose __Legge til scopes__ and include all the scopes necessary for the integration to generate tokens containing
    - Navn på integrasjonen: Add a descriptive name that allows you to identify the application that will be using the integration
    - Beskrivelse: Add a short description, not only for yourself but for everyone
    that administers integrations on behalf of your organization.

    !["Add values for integration"](/altinn-studio/guides/shared/maskinporten-integration/integrasjon_utfylling.png "Add values for integration")

    The example above shows an integration used by an Altinn CLI Client which will need to generate tokens containing
    one or more of the three selected scopes; _altinn:serviceowner_,
    _altinn:serviceowner/instances.read_ and _altinn:serviceowner/instances.write_

- Choose __Opprett__ in the top right corner when you have completed the configuration

The final steps of this guide cover creating a Json Web Key (JWK) for the integration to use to authenticate towards maskinporten,
as well as noting down important values that can be used to configure the client that will integrate with Maskinporten.


### Generate and register JWK for authentication towards Maskinporten

To avoid spreading the business certificate across many systems,
we opt for creating an asymmetric key (JSON Web Key) and associate it to the newly created integration.
In this example we use [mkjwk.org](https://mkjwk.org/).

- Navigate to `mkjwk.org` in a browser

- Fill in values like the example below and click _Generate_

    !["New JWK"](/altinn-studio/guides/shared/maskinporten-integration/jwk_ny.png "New JWK")

    The output should look like this:

    !["The JWK"](/altinn-studio/guides/shared/maskinporten-integration/jwk.png "The JWK")

Now, the public part of the key should be added to the newly created integration in Samarbeidsportalen.

- Navigate back to the integration in Samarbeidsportalen

- Choose __Egne public nøkler__

    !["Own public keys"](/altinn-studio/guides/shared/maskinporten-integration/public_nokler.png "Own public keys")

- Add two empty square bracets to the empty text box as shown below

    !["Add array"](/altinn-studio/guides/shared/maskinporten-integration/nokkel_1.png "Add array")

- Navigate back to the JWK generator site

    !["The JWK"](/altinn-studio/guides/shared/maskinporten-integration/jwk.png "The JWK")

- Copy the public key of the JWK (marked 1 in the picture) and paste this into the array in Samarbeidsportalen.

    !["Add public key"](/altinn-studio/guides/shared/maskinporten-integration/nokkel_2.png "Add public key")

-  Choose __Legg til__


The registration and configuration in Samarbeidsportalen is now complete,
and the integration is ready to generate Maskinporten tokens on request
from any client that can provide the private and public parts of the JWK.


### Important values for client configuration

#### From samarbeidsportalen:
- _Integrasjonens identifikator_

    This will be used in your client configuration.
    In Altinn libraries, this value is referred to as the _client identifikator_

#### From the JWK generation tool:
- Public and private key pair (marked 2 in the picture below)
    This is what your client will use when calling the Maskinporten integration.

    !["The JWK"](/altinn-studio/guides/shared/maskinporten-integration/jwk.png "The JWK")

In Altinn libraries this key pair is referenced as EncodedJwk  and must be base64 encoded before
it is included in application configuration or uploaded to a Key Vault.

[Base64encode.org](https://www.base64encode.org/) can be used for encoding.
