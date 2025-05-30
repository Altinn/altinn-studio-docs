---
title: Maskinporten Client
linktitle: Maskinporten Client
description: How to set up a Maskinporten client in selvbetjeningsportalen
tags: [Correspondence, guide, maskinporten]
toc: true
weight: 100
---

{{<children />}}

Maskinporten clients are created in selvbetjeningsportalen.

For the production environement clients are created from: https://sjolvbetjening.samarbeid.digdir.no/.

For the test environment clients are created from: https://sjolvbetjening.test.samarbeid.digdir.no/.

1. Start by Logging into your account with your chosen method.
2. When logged into your account, the organisation you represent is shown in the top menu to the right.
![The organisation you represent is shown in the top menu](you_represent.en.png "The organisation you represent is shown in the top menu")
If you logged inn to represent a syntethic organisation, you will also be able to change the syntethic organisation you represent in the drop down menu on that item.
![You can change synthetic organisation in the drop down menu](change_synthetic_org.en.png "You can change the synthetic organisation you represent in the drop down menu")
3. Select the 'Create client' button to start creating a new client for the organisation you represent. 
4. On the 'Add client' page select Maskinporten.
5. On the 'Add Maskinporten client' page fill inn display name, description and add your required scopes (The display name, description and scopes can also be changed after client creation). 
Then choose create.
![The add Maskinporten client page](add_maskinporten_client_page.en.png "The 'Add Maskinporten client' page")
6. You have now created a maskinporten client for your organisation. 
To use this client you need to add a key to the client. The client support JWK and PEM keys. 
Start by generating/creating a JWK or PEM (You can use Altinn JWKS tool https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli or find other JWK generators for this).
Then move to the key section on your client page and select 'Add'.
![Select the key section on your client page](key_section.en.png "Keys can be added on the key section")
In the 'JWK or PEM format' field paste your public key and select 'Save'. The key is now added to the client. 
Securly store your private Key from your JWK or PEM somewhere, it is used to authorize use of this client. 
If you use Azure Keyvault to store your private keys this need to be base 64 encoded before adding it to the secrets.
![Paste your public key here](paste_public_key.en.png "The JWK or PEM public key is pasted in this field")

You can now use your client with your key to retrieve Maskinporten tokens. 
A detailed description on how to authenticate your client with JWT Grant is described [here](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

This Maskinporten token can be exchanged into an altinn token. [This is described here](https://docs.altinn.studio//authentication/what-do-you-get/).

An altinn token is needed to authenticate against Altinn API (Such as the Correspondence API). This is given that your client has the required scopes and that you have a resource where your organisation has been given the permission to those scopes.

If you use .Net you can use this [Altinn library](https://github.com/Altinn/altinn-apiclient-maskinporten) to handle authentication with Maskinporten in your application. The library provides extension methods to configure HttpClients to authenticate with Maskinporten given a Maskinporten client defintion.