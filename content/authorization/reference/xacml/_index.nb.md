---
title: XACML - Altinn Studio
description: XACML står for «eXtensible Access Control Markup Language».
tags: [architecture, security, XACML]
linktitle: XACML
toc: false
weight: 10
---

[XACML Standarden](ttps://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html) definerer et deklarativt, finmasket og attributtbasert språk for tilgangskontroll, en arkitektur og en prosesseringsmodell som beskriver hvordan autorisasjonsforespørsler skal evalueres mot reglene som er definert i policyene.

Altinn Studio og Altinn Studio Apps bruker XACML-standarden til følgende:

- XACML-referansearkitektur: brukes som grunnlag når vi definerer autorisasjonsarkitekturen for Altinn Studio Apps.
- XACML-policy: brukes til å definere autorisasjonsreglene for apper.
- XACML-forespørsel: formatet PEP bruker når den kaller PDP.
- XACML-respons: formatet som PDP returnerer til PEP.

## XACML-policy

I Altinn kan en XACML-policy beskrive:

- Tilgangsregler for en app som er laget i Altinn Studio.
- Tilgangsregler for en ressurs i Altinn Resource Registry.
- Tilgangsregler for en korrespondanse eller meglertjeneste i Altinn 3.

XACML-formatet i Altinn 3 følger XACML 3.0-standarden med et begrenset sett funksjoner.

En policy består av én eller flere regler. Hver regel består av tre deler:

- **Resources** beskriver hvilken ressurs regelen gjelder for. Det kan være en app, en ressurs i ressursregisteret, en bestemt oppgave eller andre underressurser til en app eller ressurs.
- **Action** beskriver hvilke operasjoner regelen gjelder for. Dette kan være handlinger som _read_, _write_, _sign_, _fire_, _Opendoor_ osv. En regel kan omfatte flere handlinger.
- **Subject** beskriver hvem regelen gjelder for. Dette kan være en rolle, tilgangsgruppe, organisasjonsnummer, en bestemt bruker og mye mer. En regel kan omfatte flere subjekter.

Eksempelet under viser strukturen til en XACML-policy.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xacml:Policy PolicyId="urn:altinn:policyid:1" Version="1.0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides" xmlns:xacml="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17">
  <xacml:Target />
  <xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
    <xacml:Description>Describe the rules with subject, action and </xacml:Description>
    <xacml:Target>
      <xacml:AnyOf>
        <xacml:AllOf>
         // Ett sett med mulige subjektattributter som regelen gjelder for. Se faktiske eksempler under.
        </xacml:AllOf>
        <xacml:AllOf>
          // Alternativt sett med subjektattributter som regelen kan gjelde for. Se faktiske eksempler under.
        </xacml:AllOf>
      </xacml:AnyOf>
      <xacml:AnyOf>
        <xacml:AllOf>
          // Ett sett med mulige ressursattributter som regelen gjelder for. Se faktiske eksempler under.
        </xacml:AllOf>
      </xacml:AnyOf>
      <xacml:AnyOf>
        <xacml:AllOf>
                  // Ett sett med mulige handlingsattributter som regelen gjelder for. Se faktiske eksempler under.
             </xacml:AllOf>
        <xacml:AllOf>
                  // Alternativt sett med handlingsattributter som regelen kan gjelde for. Se faktiske eksempler under.
        </xacml:AllOf>
      </xacml:AnyOf>
    </xacml:Target>
  </xacml:Rule>
  <xacml:ObligationExpressions>
    <xacml:ObligationExpression ObligationId="urn:altinn:obligation:authenticationLevel1" FulfillOn="Permit">
    </xacml:ObligationExpression>
  </xacml:ObligationExpressions>
</xacml:Policy>
```

### Resource

Ressursdelen beskriver hvilken ressurs regelen gjelder for. Det kan være en app, en ressurs i ressursregisteret, en bestemt oppgave eller andre underressurser.

```xml
<xacml:AnyOf>
  <xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
      <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">srf</xacml:AttributeValue>
      <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
      <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">melding-til-statsforvalteren</xacml:AttributeValue>
      <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
  </xacml:AllOf>
</xacml:AnyOf>

```

### Action

- **Action** beskriver hvilke handlinger regelen gjelder for. Det kan være handlinger som _read_, _write_, _sign_, _fire_, _Opendoor_ osv.
- **Subject** beskriver hvem regelen gjelder for. Det kan være en rolle, tilgangsgruppe, organisasjonsnummer, en spesifikk bruker osv.
- **Obligation** beskriver tilleggsinformasjon, for eksempel krav til minimum autentiseringsnivå.
- **Condition** beskriver ytterligere vilkår, for eksempel at avgiver må være registrert i SRR/RRR for den aktuelle ressursen/tjenesten.

### Subjekt

### Forpliktelse

[Se eksempelpolicy fra applikasjon i produksjon](policysample.xml)

## XACML-forespørsel

XACML-forespørsler følger XACML 3.0 JSON-profilen.  
[Se dokumentasjon](http://docs.oasis-open.org/xacml/xacml-json-http/v1.1/csprd01/xacml-json-http-v1.1-csprd01.html).

### Enkel forespørsel

Eksempelet under viser hvordan en forespørsel verifiserer at en bruker har lov til å lese en gitt instans.

```json {linenos=false,hl_lines=[2,14,25]}
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:user-id",
            "Value": "1"
          }
        ]
      }
    ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read",
            "DataType": "http://www.w3.org/2001/XMLSchema#string"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:instance-id",
            "Value": "1000/26133fb5-a9f2-45d4-90b1-f6d93ad40713"
          }
        ]
      }
    ]
  }
}
```

### Forespørsel om flere avgjørelser

Policy Decision Point støtter forespørsler som ber om flere avgjørelser.  
Forespørselen under viser hvordan du kan be om beslutning for både _read_ og _write_ for samme ressurs.

```json {linenos=false,hl_lines=[21,32,69]}
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Id": "s1",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:user-id",
            "Value": "1"
          }
        ]
      }
    ],
    "Action": [
      {
        "Id": "a1",
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read",
            "DataType": "http://www.w3.org/2001/XMLSchema#string",
            "IncludeInResult": true
          }
        ]
      },
      {
        "Id": "a2",
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "write",
            "DataType": "http://www.w3.org/2001/XMLSchema#string",
            "IncludeInResult": true
          }
        ]
      }
    ],
    "Resource": [
      {
        "Id": "r1",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:instance-id",
            "Value": "1000/26133fb5-a9f2-45d4-90b1-f6d93ad40713",
            "IncludeInResult": true
          },
          {
            "AttributeId": "urn:altinn:org",
            "Value": "skd"
          },
          {
            "AttributeId": "urn:altinn:app",
            "Value": "taxreport"
          },
          {
            "AttributeId": "urn:altinn:partyid",
            "Value": "1000"
          },
          {
            "AttributeId": "urn:altinn:task",
            "Value": "formfilling"
          }
        ]
      }
    ],
    "MultiRequests": {
      "RequestReference": [
        {
          "ReferenceId": ["s1", "a1", "r1"]
        },
        {
          "ReferenceId": ["s1", "a2", "r1"]
        }
      ]
    }
  }
}
```

## XACML-respons

XACML-responser følger XACML 3.0 JSON-profilen.  
[Se dokumentasjon](http://docs.oasis-open.org/xacml/xacml-json-http/v1.1/csprd01/xacml-json-http-v1.1-csprd01.html).

### Respons for forespørsel med én avgjørelse

```json {linenos=false,hl_lines=[4]}
{
  "Response": [
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [
            {
              "attributeId": "urn:altinn:obligation1-assignment1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ],
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:partyid",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "1000"
            }
          ]
        }
      ]
    }
  ]
}
```

### Respons for forespørsel med flere avgjørelser

```json {linenos=false,hl_lines=[4,49]}
{
  "Response": [
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [
            {
              "attributeId": "urn:altinn:obligation1-assignment1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ],
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
          "Attribute": [
            {
              "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "read"
            }
          ]
        },
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:instance-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "1000/26133fb5-a9f2-45d4-90b1-f6d93ad40713"
            }
          ]
        }
      ]
    },
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [
            {
              "attributeId": "urn:altinn:obligation1-assignment1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ],
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
          "Attribute": [
            {
              "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "write"
            }
          ]
        },
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:instance-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "1000/26133fb5-a9f2-45d4-90b1-f6d93ad40713"
            }
          ]
        }
      ]
    }
  ]
}
```
