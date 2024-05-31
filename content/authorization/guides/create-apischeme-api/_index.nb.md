---
title: Opprette og publisere delegerbar API Scheme 
linktitle: API Scheme via API
description: Denne guiden forklarer hvordan du kan opprette og publisere API Scheme fre
toc: false
weight: 1
---

I Altinn Studio Resource admin kan du opprette ressurser som skal brukes som grunnlag for tilgangskontroll for tjenester utenfor Altinn-plattformen. 

## Forutsetninger

- Organisasjon må ha klient i maskinporten
- Organisasjonen må ha blitt gitt scopene altinn:resourceregistry/resource.write og altinn:resourceregistry/resource.read

## Definere Ressurs for delegerbart API Scheme


De delegerbare API schemsene defineres i Altinn Ressursregister som en ressurs etter ressursmodellen

Følgende attributter er nødvendig


| Attributt |  Beskrivelse |
|-------|-------|
|identifier | Globalt unik ID for ressurs. Brukes i Policy også. Påkrevd |
| Title  | Tittel for API Scheme. Vises i Altinn portal når man delegerer. Må oppgis for en, nb og nn (engelsk, bokmål og nynorsk) Påkrevd |
| description |  Beskrivelse for API Scheme å oppgis for en, nb og nn (engelsk, bokmål og nynorsk) Påkrevd|
| rightDescription | Delegeringsbeskrivelse for API Scheme. Må oppgis for en, nb og nn (engelsk, bokmål og nynorsk) Påkrevd |
| resourceReferences | Det må legges inn en resource refernece med referencetype MaskinportenScope | 
| delegable | Må settes til true for at scope skal kunne delegeres til leverandør |
| visible | Må settes til true for at scope skal kunne delegeres til leverandør |
| hasCompetentAuthority | Definere tjenesteeier. Må settes med organisasjonsnr og riktig tjenesteeierkode (NAV, SKD, SVV +++) |
| resourceType | Må settes til MaskinportenSchema |

Nedenfor vises eksempel fra produksjon på API ressurs. ([se samme vi API](https://platform.altinn.no/resourceregistry/api/v1/resource/maskinportenschema-aquaportalapi-write))

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


## Definere policy for API Scheme

For å kunne støtte delegering av API SCheme til leverandør må API Scheme ressursen ha en policy som beskriver hvem som har rettighet til å delegere 
API SCheme til leverandør.

Policy må ha en regel som gir APIADM rollen rettighet til action scopeaccess. Hvis kontaktperson for NUF skal ha mulighet til å delegere må rollen APIADMNUF også legges til.


Nedefor vises policy for ressurs eksempelet. [Last ned fra API](https://platform.altinn.no/resourceregistry/api/v1/resource/maskinportenschema-aquaportalapi-write/policy)


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