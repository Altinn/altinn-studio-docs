---
title: Resource
description: The resource API lets you work with resources and related policies.
toc: false
tags: [api]
weight: 100
---

## Overview

Your organization needs the scope **altinn:resourceregistry/resource.write**
to be allowed to create and modify your organizations resources and policies. 


The resource describes the different metadata for a resource

```json
{
    "identifier":"brg_samordnet_registermelding",
    "description": 
         [
            {
            "language": "nb-NO",
             "description": "Elektronisk skjema for registrering av selskap" 
            },
            {
                "language": "EN",
                "description": "Registering a new entity or changing information regarding an existing entity" 
            }
        ],
    "title": 
           [{
                "title":"Samordnet registermelding",
                  "language":"nb-NO"
            },
            {
                "title":"Coordinated register notification",
                  "language":"en"
            }],
    "hasCompetentAuthority":
          {
              "organization": "974760673",
              "orgcode":"brg"
          },
     "contactpoint": 
              [{
                        "phone":"1231324",
                        "email": "online@digdir.no"
              }],
          "homepage":"https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=3498&M=SP&DontChooseReportee=true&O=personal",
           "status":"Completed", 
           "thematicArea":[],
           "type":[],
            "sector":[],
            "keyword":[
                {
                    "keyword":"Selskapsregistrering"
                },
                {
                    "keyword":"Firmaattest"
                },
                {
                    "keyword":"Organisasjonsnummer"
                }
            ]          
  
  }
```

The level of detailed required depends of the type of resource.

### MaskinportenSchema

A resource of type MaskinPortenSchema is a resource created to support [delegation of MaskinPorten](https://altinn.github.io/docs/utviklingsguider/api-delegering/tilgangsstyrer/) scopes from one organization to another. 

A resource with a policy needs to be added for all scopes that should be able to 

The below shows a complete resource from [production](https://platform.altinn.no/resourceregistry/api/v1/resource/skd-maskinportenschemaid-8/)


```json
  {
    "identifier": "skd-maskinportenschemaid-8",
    "title": {
      "en": "National Population Register - Financial Undertakings - On behalf of",
      "nb": "Folkeregisteret - Finansforetak - På vegne av",
      "nn": "Folkeregisteret - Finansføretak - På vegner av"
    },
    "description": {},
    "rightDescription": {
      "en": "This service allows you to delegate your access to The national Population Register information to a provider. Once the delegation has been completed, the provider will be notified that they can use the services available within the rights",
      "nb": "Denne tjenesten gir deg mulighet for å delegere din tilgang til folkeregisteropplysninger til en  leverandør. Når delegeringen er utført, vil leverandøren motta melding om at de på vegne av din virksomhet kan benyttet de tjenester som er ti",
      "nn": "Denne tenesta gir deg moglegheit for å delegera tilgangen din til folkeregisteropplysningar til ein leverandør. Når delegeringen er utførte, vil leverandøren få melding om at dei på vegner av verksemda di kan nytta dei tenestene som er tilg"
    },
    "homepage": "www.skatteetaten.no",
    "status": "Active",
    "validFrom": "2020-03-04T18:04:27.27",
    "validTo": "9999-12-31T23:59:59.997",
    "isPartOf": "Altinn",
    "isPublicService": true,
    "thematicArea": "",
    "resourceReferences": [
      {
        "referenceSource": "Altinn2",
        "reference": "8f08210a-d792-48f5-9e27-0f029e41111e",
        "referenceType": "DelegationSchemeId"
      },
      {
        "referenceSource": "Altinn2",
        "reference": "folkeregister:deling/finans",
        "referenceType": "MaskinportenScope"
      },
      {
        "referenceSource": "Altinn2",
        "reference": "AppId:8",
        "referenceType": "ServiceCode"
      },
      {
        "referenceSource": "Altinn2",
        "reference": "1",
        "referenceType": "ServiceEditionCode"
      }
    ],
    "isComplete": true,
    "delegable": true,
    "visible": true,
    "hasCompetentAuthority": {
      "organization": "974761076",
      "orgcode": "SKD",
      "name": {
        "en": "Norwegian Tax Administration",
        "nb": "Skatteetaten",
        "nn": "Skatteetaten"
      }
    },
    "keywords": [],
    "sector": [
      "private",
      "public"
    ],
    "resourceType": "MaskinportenSchema",
    "mainLanguage": "nb"
  }
  ```

See more functional descriptions [here](/authorization/what-do-you-get/resourceregistry/)


#### Resource Policy M

Each maskinportenschema resource require a policy described as XML following XACML 3.0 standard. This policy decides who can
delegate the scope. APIADM is the role in Altinn Assigned for this. 

Example e from [production](https://platform.altinn.no/resourceregistry/api/v1/resource/skd-maskinportenschemaid-8/policy/)
for the same resource as above.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xacml:Policy xmlns:xacml="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" xmlns:xsl="http://www.w3.org/2001/XMLSchema-instance" PolicyId="urn:altinn:example:delegationscheme:policyid:1" Version="1.0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides">
   <xacml:Target />
   <xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
      <xacml:Description>Default policy template for Maskinporten DelegationSchemes</xacml:Description>
      <xacml:Target>
         <xacml:AnyOf>
            <xacml:AllOf>
               <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                  <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">APIADM</xacml:AttributeValue>
                  <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
               </xacml:Match>
            </xacml:AllOf>
         </xacml:AnyOf>
         <xacml:AnyOf>
            <xacml:AllOf>
               <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                  <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd-maskinportenschemaid-8</xacml:AttributeValue>
                  <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
               </xacml:Match>
            </xacml:AllOf>
         </xacml:AnyOf>
         <xacml:AnyOf>
            <xacml:AllOf>
               <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                  <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">scopeaccess</xacml:AttributeValue>
                  <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
               </xacml:Match>
            </xacml:AllOf>
         </xacml:AnyOf>
      </xacml:Target>
   </xacml:Rule>
   <xacml:ObligationExpressions>
      <xacml:ObligationExpression FulfillOn="Permit" ObligationId="urn:altinn:obligation:authenticationLevel1">
         <xacml:AttributeAssignmentExpression AttributeId="urn:altinn:obligation1-assignment1" Category="urn:altinn:minimum-authenticationlevel">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">2</xacml:AttributeValue>
         </xacml:AttributeAssignmentExpression>
      </xacml:ObligationExpression>
   </xacml:ObligationExpressions>
</xacml:Policy>

```