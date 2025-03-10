---
title: Create and Publish Delegable API Scheme
linktitle: API Scheme via API
description: This guide explains how to create and publish API Scheme via API.
toc: false
weight: 1
---

Via the Resource Registry API, it is possible to register delegable API resources.

## Prerequisites

- The organization must have a client in Maskinporten.
- The organization must have received the scopes `altinn:resourceregistry/resource.write` and `altinn:resourceregistry/resource.read`.
- The organization must have received the scope `altinn:maskinporten/delegationschemes.write`.
- The organization must have created a Maskinporten client configured with these scopes.

## Define Resource for Delegable API Scheme

The delegable API schemes are defined in the Altinn Resource Registry as a resource according to the resource model.

The following attributes are necessary:

| Attribute | Description |
|-----------|-------------|
| identifier | Globally unique ID for the resource. Also used in policy. Required. |
| title | Title for the API Scheme. Displayed in the Altinn portal when delegating. Must be provided for en, nb, and nn (English, Bokmål, and Nynorsk). Required. |
| description | Description for the API Scheme. Must be provided for en, nb, and nn (English, Bokmål, and Nynorsk). Required. |
| rightDescription | Delegation description for the API Scheme. Must be provided for en, nb, and nn (English, Bokmål, and Nynorsk). Required. |
| resourceReferences | A resource reference with reference type MaskinportenScope must be added. |
| delegable | Must be set to true for the scope to be delegable to a provider. |
| visible | Must be set to true for the scope to be delegable to a provider. |
| hasCompetentAuthority | Defines the service owner. Must be set with the organization number and correct service owner code (NAV, SKD, SVV, etc.). |
| resourceType | Must be set to MaskinportenSchema. |

Below is an example from production of an API resource. ([See the same via API](https://platform.altinn.no/resourceregistry/api/v1/resource/maskinportenschema-aquaportalapi-write))

```json
{
    "identifier": "maskinportenschema-aquaportalapi-write",
    "title": {
        "en": "Write access to the Aqua Portal API.",
        "nb": "Skrivetilgang til API for Akvakulturportalen.",
        "nn": "Skrivetilgang til API for Akvakulturportalen."
    },
    "description": {
        "en": "This service provides write access to aquaculture applications for county municipalities and other sector authorities.",
        "nb": "Denne tjenesten gir skrivetilgang til akvakultursøknader for fylkeskommuner og andre sektormyndigheter.",
        "nn": "Denne tenesta gir skrivetilgang til akvakultursøknader for fylkeskommunar og andre sektormyndigheiter."
    },
    "rightDescription": {
        "en": "This service provides write access to aquaculture applications for county municipalities and other sector authorities.",
        "nb": "Denne tjenesten gir skrivetilgang til akvakultursøknader for fylkeskommuner og andre sektormyndigheter.",
        "nn": "Denne tenesta gir skrivetilgang til akvakultursøknader for fylkeskommunar og andre sektormyndigheiter."
    },
    "homepage": "https://www.fiskeridir.no/",
    "status": "Active",
    "contactPoints": [
        {
            "contactPage": "https://www.fiskeridir.no/"
        }
    ],
    "isPartOf": "",
    "resourceReferences": [
        {
            "referenceSource": "Altinn3",
            "reference": "fdir:aquaportalapi.write",
            "referenceType": "MaskinportenScope"
        }
    ],
    "delegable": true,
    "visible": true,
    "hasCompetentAuthority": {
        "organization": "971203420",
        "orgcode": "FD",
        "name": {
            "en": "The Norwegian Directorate of Fisheries",
            "nb": "Fiskeridirektoratet",
            "nn": "Fiskeridirektoratet"
        }
    },
    "keywords": [],
    "limitedByRRR": false,
    "selfIdentifiedUserEnabled": false,
    "enterpriseUserEnabled": false,
    "resourceType": "MaskinportenSchema"
}
```

## Define Policy for API Scheme

To support delegation of the API Scheme to a provider, the API Scheme resource must have a policy describing who has the right to delegate the API Scheme to a provider.

The policy must have a rule granting the APIADM role the right to action scopeaccess. If the contact person for NUF should be able to delegate, the APIADMNUF role must also be added.

Below is the policy for the resource example. [Download from API](https://platform.altinn.no/resourceregistry/api/v1/resource/maskinportenschema-aquaportalapi-write/policy)

```xml
<?xml version="1.0" encoding="utf-8"?>
<xacml:Policy xmlns:xsl="http://www.w3.org/2001/XMLSchema-instance" xmlns:xacml="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" PolicyId="urn:maskinportenschema:aquaportalapi:write:1" Version="1.0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides">
    <xacml:Target/>
    <xacml:Rule RuleId="urn:maskinportenschema:aquaportalapi:write:1:1" Effect="Permit">
        <xacml:Description>MaskinportenSchema resource policy for; maskinportenschema-aquaportalapi-write for roles; APIADM to have access to actions; ScopeAccess</xacml:Description>
        <xacml:Target>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">APIADM</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">maskinportenschema-aquaportalapi-write</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
            <xacml:AnyOf>
                <xacml:AllOf>
                    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">ScopeAccess</xacml:AttributeValue>
                        <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                    </xacml:Match>
                </xacml:AllOf>
            </xacml:AnyOf>
        </xacml:Target>
    </xacml:Rule>
    <xacml:ObligationExpressions>
        <xacml:ObligationExpression FulfillOn="Permit" ObligationId="urn:maskinportenschema:aquaportalapi:write:obligation:1">
            <xacml:AttributeAssignmentExpression AttributeId="urn:maskinportenschema:aquaportalapi:write:obligation-assignment:1" Category="urn:altinn:minimum-authenticationlevel">
                <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">3</xacml:AttributeValue>
            </xacml:AttributeAssignmentExpression>
        </xacml:ObligationExpression>
    </xacml:ObligationExpressions>
</xacml:Policy>
```

### Call API with Resource and Policy

When the resource and policy are defined, you can call the Resource Registry to:

1. Create the resource.
2. Create the policy for the resource.

To do this, you must authenticate with Maskinporten and exchange the token for an Altinn token. 


