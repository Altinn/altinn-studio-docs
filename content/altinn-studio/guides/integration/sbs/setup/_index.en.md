---
title: Setup and configuration
description: Setup and configuration of app and infrastructure for end-user system integration in an app.
weight: 10
toc: true
---

End-user systems (SBS) are systems developed by vendors to simplify submissions to Altinn for their customers.
This guide covers concepts and models relevant for integration between an Altinn Studio app and end-user systems.
When integrating an end-user system with an Altinn Studio app, machine-to-machine communication is used between
the vendors system and the app. There are mainly two ways to create this integration:

* ID-porten client with token exchange
  * The vendor of the end-user system creates an ID-porten client and adds the scopes required by the app (e.g., `altinn:instances.read` and `altinn:instances.write`)
  * When integrating with Altinn apps, the end-user system exchanges the token for an Altinn token
  * From the apps perspective, this is a normal flow (there are authenticated end-users)
  * Suitable for systems where contact with the end-user is important, there is a low degree of automation, and the integration flow is fully user-driven.
* System user
  * [Vendor creates Maskinporten client](https://docs.altinn.studio//authentication/getting-started/maskinportenclient/)
  * Vendor creates a system in the system registry of Altinn Authorization (in the system definition, you specify the need for access to resources, e.g., an app)
  * Customer registers a system user. The rights are then delegated.
  * Vendor authenticates with Maskinporten client
  * When integrating with Altinn apps, the system authenticates with Maskinporten and uses this token when submitting to Altinn
  * For more information, see [Altinn Authorization user guide for system users](/authentication/guides/systemvendor/)
  * Suitable for systems with a higher degree of automation (and less need for contact/connection to the end-user), and for submissions on behalf of organizations.

## Integration using ID-porten

When integrating from an end-user system based on an ID-porten client, there is always direct contact with the end-user.
When the end-user logs in to the end-user system via ID-porten, the user must consent to the system performing
`altinn:instances.read` and `altinn:instances.write` on their behalf (provided these scopes are registered in the ID-porten client).
The token must then be [exchanged in Altinn Authorization](/api/authentication/spec/).
This Altinn token can then be used to submit forms in an Altinn app on behalf of the user.

{{% notice info %}}
The scopes `altinn:instances.read` and `altinn:instances.write` are not service owner- or app-specific.
When granting consent, the user allows the system to submit to all Altinn apps where the user is authorized (via XACML and other configuration).
{{% /notice %}}

### Better scope validation

Given that `altinn:instances.read` and `altinn:instances.write` grant access to all apps in Altinn (where the user has access), 
there is often a need for a higher degree of isolation so that a more specific scope is required, tailored for a particular app. 
There is currently no built-in support for this, but it is possible to achieve by developing custom middleware in the app.

The service owner must create an app-specific scope in ID-porten via the collaboration portal and delegate this to organizations
that intend to build end-user systems for the service owner's app. The end-user system must then add this scope to its ID-porten client 
_in addition to_ `altinn:instances.read` and `altinn:instances.write` (these are still required by the Altinn platform).

{{% notice info %}}
In the future, we want an app to be configurable with a custom scope that replaces `altinn:instances.read` and `altinn:instances.write`, 
which will also apply to platform services in Altinn (e.g., Storage), but it has not yet been decided how or when this will be implemented.
{{% /notice %}}

#### Validation with ASP.NET Core middleware

{{% notice info %}}
`IAuthenticationContext.Current` uses information about the logged-in user from the ASP.NET Core authentication stack.
This means that the ASP.NET Core auth middleware must have run for you to get the correct information.
Middleware for auth is added in `UseAltinnAppCommonConfiguration`. So if you want to access `IAuthenticationContext.Current`
in a middleware, it must be added **after** `UseAltinnAppCommonConfiguration` has been called.
{{% /notice %}}

The service owner can then create middleware or similar that performs additional authorization based on the authenticated user. Example:

```csharp
WebApplication app = builder.Build();

...

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is Authenticated.User user)
        {
            // Here we are expressing that for any API request for the authenticated party is a user, the user either has to
            // * Be logged in through Altinn portal
            // * Have consented to the custom app scope `myappscope` (it has consent required registered on the scope in ID-porten)
            if (!user.InAltinnPortal && !user.Scopes.HasScope("myappscope"))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Forbidden");
                return;
            }
        }

        await next(context);
    }
);
```

#### Validation with XACML policy

Scopes from the token can also be used as attributes in XACML.

{{% notice warning %}}
The matcher `urn:oasis:names:tc:xacml:1.0:function:string-is-in` is not necessarily completely safe.
The scope `annentest:app.a` will also match here, since `test:app.a` is a substring of this.
We are considering whether a better match function can be implemented.
{{% /notice %}}

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
  <xacml:Description>A rule giving clients with scope "test:app.a" the right to instantiate a instance of a given app of [ORG]/[APP]</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">test:app.a</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:scope" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instantiate</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

## Integration with System User

The system user concept from Altinn Authorization is designed to support more automated integrations between end-user systems and Altinn apps, where submissions are made on behalf of an organization. The system user concept consists of the following components:

* Maskinporten – the authentication mechanism for everything related to system users:
  * Registration of a system in the system registry (API at Altinn Authorization)
  * Registering a system user (API at Altinn Authorization)
  * Submission from the system (the vendors system/end-user system)
* System Registry
  * A component in Altinn Authorization where all system definitions belonging to end-user systems are stored
* System
  * The definition for the end-user system. This definition includes, among other things, which rights the system needs from the system user, and which Maskinporten client (client ID) the system intends to use when authenticating with Maskinporten.
  * The system is registered and owned by the end-user system vendor in the system registry
* System User
  * A virtual user owned by the customer of the vendor/end-user system
  * When the system user is registered, the rights requested by the system must be delegated to the system user. In practice, the person who creates the system user (at the customer) must have these rights that the system requests

This concept allows the system to impersonate the system user in the integration with an Altinn app.
Thus, the system _can_ make calls to Altinn's APIs without an end-user from the organization being present.
This is not possible with an ID-porten integration, as you are always dependent on a valid token from the end-user working at the customer (with sufficient permissions).
### Example

Let's walk through a concrete example for SBS based on system user integration.

{{% notice info %}}
This is a fictional example, but we use a well-known system, service owner, and form to make the example more relatable.
Note that there are few steps for the service owner to perform here, but it is still important that the service owner is familiar with the process.
{{% /notice %}}

* System: **Fiken AS (913312465)**
* Service owner: **Brønnøysundregisteret (brg)**
* App: **aarsregnskap**
* Customer: **Sindig Oriental Tiger AS (313725138)**
* Environment: **tt02**

In this example, Fiken will automatically submit the annual accounts at the end of the year based on the accounts registered in their systems by the customer.
This submission happens fully automatically, but the end-user at the customer must still log in and sign the annual accounts after it has been filled in in `årsregnskap`.
We will now set up this integration from scratch.

[More documentation about the system user flow for SBS can be found here](/authentication/guides/systemvendor/).
This guide is intended as an Altinn Studio app-specific example of the same concept.

#### Prerequisites

* Brønnøysundregisteret needs access to Altinn Studio and the tt02 environment
* Fiken needs an agreement with Maskinporten for the environment (access to the [Collaboration Portal for test](https://sjolvbetjening.test.samarbeid.digdir.no/))
* Fiken needs access to the following Maskinporten/ID-porten scopes: 
  * `altinn:authentication/systemregister.write`, 
  * `altinn:authentication/systemuser.request.read`, `altinn:authentication/systemuser.request.write`
  * `altinn:instances.read`, `altinn:instances.write`

#### 1. Service owner creates app

A developer at Brønnøysundregisteret creates an app in Altinn Studio and names it `aarsregnskap`.
To support system user-based integration with SBS, no special support is required in the app, so it is developed as usual,
including an XACML policy that allows DAGL to fill in the form and sign.

#### 2. Fiken creates a Maskinporten client

A Maskinporten client is required to use the system registry and to utilize the system user integration with `aarsregnskap`.

* Go to [Collaboration Portal for test](https://sjolvbetjening.test.samarbeid.digdir.no/) -> "Administrasjon av tjenester" -> "Integrasjoner" -> "Ny integrasjon"
* Fill out the form and create the client with the following scopes:
  * `altinn:authentication/systemregister.write` – to register the system in the system registry
  * `altinn:authentication/systemuser.request.read`, `altinn:authentication/systemuser.request.write` – to request a system user for the system
  * `altinn:instances.read`, `altinn:instances.write` – to submit on behalf of the system user
* Note down the client ID (for example, `a2ed712d-4144-4471-839f-80ae4a68146b`)
* Generate and register JWKS for the client (keep both the private and public JWK)

See documentation for [registering a Maskinporten client here](/technology/solutions/cli/configuration/maskinporten-setup/).

#### 3. Fiken registers system in the system registry

With the access token from Maskinporten for the newly created client, Fiken can register itself as a system in the Altinn Authorization system registry.
To obtain a token that can be used for system registration, Fiken must include a scope that grants access to the system registry:

```http
POST https://test.maskinporten.no/token

{
  "aud": "https://test.maskinporten.no/",
  "sub": "2829136a-1dd4-4a13-8150-d605a3fc39e6",
  "scope": "altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write",
  "iss": "2829136a-1dd4-4a13-8150-d605a3fc39e6",
  "exp": 1718124835,
  "iat": 1718124715,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "<access_token>",
  ...
}
```

This token can be used directly with the system registry API.
In the JSON definition below, the system is registered with the client ID from the previous step and with `Rights` granting access to Brønnøysundregisteret's aarsregnskap app.

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemregister/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "Id": "913312465_Fiken",
  "Vendor": {
    "ID": "0192:913312465"
  },
  "Name": {
    "en": "Fiken",
    "en": "Fiken",
    "nn": "Fiken"
  },
  "Description": {
    "en": "Fiken Accounting",
    "en": "Fiken Regnskap",
    "nn": "Fiken Regnskap"
  },
  "Rights": [
    {
      "Resource": [
        {
          "value": "app_brg_aarsregnskap",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "AllowedRedirectUrls": [ "https://fiken.no/receipt" ],
  "ClientId": [ "a2ed712d-4144-4471-839f-80ae4a68146b" ]
}


HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

"772e52bc-63c3-45c0-80b7-f3bb1581469f"
```

#### 4. Fiken requests a system user for the customer

As a system vendor (Fiken), you can request a system user for a customer.
In the response, you receive a `confirmUrl` that can be forwarded to the customer so that the customer can approve and complete the creation of the system user.

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "externalRef": "313725138_Fikenbruker",
  "systemId": "913312465_Fiken",
  "partyOrgNo": "313725138",
  "rights": [
    {
      "resource": [
        {
          "value": "app_brg_aarsregnskap",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "redirectUrl": "https://fiken.no/receipt"
}


HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "d111dbab-d619-4f15-bf29-58fe570a9ae6",
  "externalRef": "313725138_Fikenbruker",
  "systemId": "913312465_Fiken",
  "partyOrgNo": "313725138",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "app_brg_aarsregnskap",
        }
      ]
    }
  ],
  "status": "New",
  "redirectUrl": "https://fiken.no/receipt",
  "confirmUrl": "https://authn.ui.tt02.altinn.no/authfront/ui/auth/vendorrequest?id=d111dbab-d619-4f15-bf29-58fe570a9ae6"
}
```

#### 5. The customer approves the system user request

A person at the customer, e.g., the general manager, approves the system user request by following the `confirmUrl` from the response above.
If testing is done in tt02, you can, for example, find the DAGL (general manager) for the organization of the system user.
In this case, the customer, with national identity number `14830199986`, has the DAGL role (general manager), so this can be used when logging in with TestID.
The person who approves the system user (system access) must themselves have the rights that are to be delegated to the system user.
In this case, where DAGL is to approve, the app must have a rule that gives DAGL `instantiate` and `read`.
Since the system user is delegated the same rights as the approver (in this case, DAGL), the system user will get `instantiate` and `read` in this case.

Example:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
  <xacml:Description>Gives DAGL instantiate and read for the app</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">dagl</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instantiate</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

#### 6. Fiken can authenticate against Maskinporten with the system user

Fiken can now authenticate the system user with Maskinporten.
This is done by adding the `authorization_details` claim in the assertion with the `/token` request to Maskinporten.
Here, we only use the scopes `altinn:instances.read` and `altinn:instances.write`, which allow us to submit to an Altinn app.

{{% notice info %}}
If you use `externalRef` when requesting a system user, this must also be included in the assertion for the token.
In the example above, `313725138_Fikenbruker` is sent as `externalRef`, so we include it below.
{{% /notice %}}

```http
POST https://test.maskinporten.no/token

{
  "aud": "https://test.maskinporten.no/",
  "sub": "a2ed712d-4144-4471-839f-80ae4a68146b",
  "authorization_details": [
    {
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:313725138"
      },
      "type": "urn:altinn:systemuser",
      "externalRef": "313725138_Fikenbruker"
    }
  ],
  "scope": "altinn:instances.read altinn:instances.write",
  "iss": "a2ed712d-4144-4471-839f-80ae4a68146b",
  "exp": 1718124835,
  "iat": 1718124715,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}
```
Now that we have the system user token from Maskinporten, we currently need to exchange it for an Altinn token before it can be used with an app.
In the future, this will no longer be necessary, and this documentation will be updated accordingly.

```http
GET https://platform.tt02.altinn.no/authentication/api/v1/exchange/maskinporten
Authorization: Bearer <access-token>


HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

<access-token>
```

#### 7. Fiken can instantiate in the app

We use the `access_token` from the response in the previous step to create an empty instance in the `aarsregnskap` app.

```http
POST https://brg.apps.tt02.altinn.no/brg/aarsregnskap/instances/create
Content-Type: application/json
Authorization: Bearer <access-token>

{
  "instanceOwner": {
    "organisationNumber": "313725138"
  }
}
```

#### 8. The service owner can use information about the authenticated party if needed

As exemplified above, you can use `IAuthenticationContext` to implement custom logic based on whether a system user is authenticated in the request:

{{% notice info %}}
`IAuthenticationContext.Current` uses information about the logged-in user from the ASP.NET Core authentication stack.
This means that the ASP.NET Core auth middleware must have run for you to get the correct information.
Middleware for auth is added in `UseAltinnAppCommonConfiguration`. So if you want to access `IAuthenticationContext.Current`
in a middleware, it must be added **after** `UseAltinnAppCommonConfiguration` has been called.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is Authenticated.SystemUser systemUser)
        {
            ...
        }

        await next(context);
    }
);
```
