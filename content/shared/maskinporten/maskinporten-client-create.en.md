---
headless: true
hidden: true
---

Maskinporten clients are created in the self-service portal:
- For the production environment, clients are created from: https://sjolvbetjening.samarbeid.digdir.no.
- For the test environment, clients are created from: https://sjolvbetjening.test.samarbeid.digdir.no.
{.mb-3}

1. Start by logging into your account with your chosen method.
2. When logged into your account, the organisation you represent is shown in the top menu to the right.
![The organisation you represent is shown in the top menu](/en/shared/maskinporten/you_represent.en.png "The organisation you represent is shown in the top menu.")
If you logged in to represent a synthetic organisation, you will also be able to change the synthetic organisation you represent in the drop down menu on that item.
![You can change synthetic organisation in the drop down menu](/en/shared/maskinporten/change_synthetic_org.en.png "You can change the synthetic organisation you represent in the drop down menu.")
3. Select the `Create client` button to start creating a new client for the organisation you represent. 
4. On the `Add client` page select Maskinporten.
5. On the `Add Maskinporten client` page fill in the display name, description and add your required scopes (these values can also be changed later). Then click the `Create` button.
![The add Maskinporten client page](/en/shared/maskinporten/add_maskinporten_client_page.en.png "The 'Add Maskinporten client' page.")
6. You have now created a Maskinporten client for your organisation. 
To use this client you need to add at least one authentication key. The client supports JWK and PEM keys. 
Start by either locating an existing key or creating a new one. You can use the [Altinn JWKS tool](https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli) or other key generator of your choice for this.
Next, navigate to the key section on your client page and select `Add`.
![Select the key section on your client page](/en/shared/maskinporten/key_section.en.png "Keys can be added in the key section.")
In the `JWK or PEM format` field paste your public key and click `Save`. The key is now added to the client. 
Store your private key from your JWK or PEM in a secure location, as it is used to authorize the use of this client. 
If you use Azure Key Vault to store your private keys, they need to be base64-encoded before uploading.
![Paste your public key here](/en/shared/maskinporten/paste_public_key.en.png "The JWK or PEM public key is pasted in this field")
7. If you didn't do so in step 5, you need to add the desired scopes to your client before it can be used.
![Adding scopes to the client](/en/shared/maskinporten/add_scopes1.en.png "From the Scopes tab on your client definition, click the Add button.")
![Adding scopes to the client](/en/shared/maskinporten/add_scopes2.en.png "Scopes available to your organisation will be shown in the list. Select the required ones and click Submit.")