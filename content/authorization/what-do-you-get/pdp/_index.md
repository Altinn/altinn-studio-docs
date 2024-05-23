---
title: Access Control (PDP)
linktitle: Access Control (PDP)
description: The Policy Decision Point is responsible to evaluate if users and systems is authorized to perform the requested operation on a resource.
tags: [architecture, security, authorization, xacml]
weight: 2
---

The Policy Decision Point is implemented in the [access control component](../../../../authorization/architecture/accesscontrol/) that is deployed to Altinn Platform.

The Policy Decision Point follow [eXtensible Access Control Markup Language (XACML) Version 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html). 

This mean that the rules are defined in XACML Policies files and PDP evalutes request based on the rules.

The PDP evaluates the Context Request based on standard XACML 3.0 behaviour. There is no specific Altinn behaviour.

Policy Decision Point exposes a method that authorize the decision request.

PDP uses the configured [Context Handler](../../architecture/accesscontrol/contexthandler/) to enrich the decision request with attributes about the subject, resource and environment. 

If instanceID or dataID is used as Resource ID PDP will use the Context Handler to identifiy the correct appId,
the instance workflow state and the reporteId for the existing resource.

For request for non existing instances the appId will be used and the reportee is a required input.

## API  

The PDP component exposes a XACML 3.0 Json API to allow PDP checks. This API supports JSON formatet request. 

Documentation for this API is found [here](/api/authorization/spec/)

Url for API is
- TT02: https://platform.tt02.altinn.no/authorization/api/v1/authorize
- Production: https://platform.altinn.no/authorization/api/v1/authorize

**It is required to have an API key for this access. Contact Altinn to get this.**

Api Key need to be sent as "Ocp-Apim-Subscription-Key" header.

It requires a Altinn bearer token (header name Authorization). Use Maskinporten and exchange to Altinn. Details [here](/api/authentication/maskinporten/)

Example request from TT02

```json
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:person:identifier-no",
            "Value": "13896998948"
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
            "AttributeId": "urn:altinn:resource",
            "Value": "ttdintegrasjonstest1"
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "312824450"
          }
        ]
      }
    ]
  }
}
```

Response

```json
{
    "response": [
        {
            "decision": "Permit",
            "status": {
                "statusMessage": null,
                "statusDetails": null,
                "statusCode": {
                    "value": "urn:oasis:names:tc:xacml:1.0:status:ok",
                    "statusCode": null
                }
            },
            "obligations": [
                {
                    "id": "urn:altinn:obligation:authenticationLevel1",
                    "attributeAssignment": [
                        {
                            "attributeId": "urn:altinn:obligation1-assignment1",
                            "value": "3",
                            "category": "urn:altinn:minimum-authenticationlevel",
                            "dataType": "http://www.w3.org/2001/XMLSchema#integer",
                            "issuer": null
                        }
                    ]
                },
                {
                    "id": "urn:altinn:obligation:authenticationLevel2",
                    "attributeAssignment": [
                        {
                            "attributeId": "urn:altinn:obligation2-assignment2",
                            "value": "3",
                            "category": "urn:altinn:minimum-authenticationlevel-org",
                            "dataType": "http://www.w3.org/2001/XMLSchema#integer",
                            "issuer": null
                        }
                    ]
                }
            ],
            "associateAdvice": null,
            "category": null,
            "policyIdentifierList": null
        }
    ]
}
```


### Example requests from Unit Tests 

- [Example with ssn performing read on ttd-externalpdp-resource1 for orgno](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/ResourceRegistry/AltinnResourceRegistry0005Request.json)
- [Example with ssn performing read on ttd-externalpdp-resource1 for ssn](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Data/Xacml/3.0/ResourceRegistry/AltinnResourceRegistry0006Request.json)


### Attributes

The following attributeIds can be used in XACML request

- **urn:altinn:person:identifier-no**   For fødselsnummer and d-nummer.  Both in subject and resource
- **urn:altinn:organization:identifier-no**  For organisation number. Both in subject and resource
- **urn:oasis:names:tc:xacml:1.0:action:action-id**  Action ID. XACML standard
- **urn:altinn:resource**   Resource id for resource registry
- **urn:altinn:org**   Org. (tjenesteier code)  both in resource and subject where relevant
- **urn:altinn:app**  App identifier for resource section

## XACML 3.0 Conformance

The PDP tries to follow XACML 3.0 standard and have implemented some conformance tests. The goal is to fully implement
all conformance test.

There exist no official XACML 3.0 conformance test but AT&T research made som available for OASIS in [this thread](https://lists.oasis-open.org/archives/xacml-comment/201404/msg00001.html).

See our tests [here](https://github.com/Altinn/altinn-authorization/blob/main/test/IntegrationTests/Xacml30ConformanceTests.cs). 

Testdata for conformance tests is found [here](https://github.com/Altinn/altinn-authorization/tree/main/test/IntegrationTests/Data/Xacml/3.0/ConformanceTests), and official description of tests [here](https://raw.githubusercontent.com/Altinn/altinn-studio/master/src/Altinn.Platform/Altinn.Platform.Authorization/IntegrationTests/Data/Xacml/3.0/ConformanceTests/ConformanceTests.html).

[See Github 2818 for status on conformance test coverage](https://github.com/Altinn/altinn-authorization/issues/1)



## PDP flow

The diagram below show the detailed flow.

![PDP flow](pdpflow.svg "PDP flow")

Flow explained

1. Decision Request is sent to context handler for enriching
2. Context handler call PIP for resource attributes
3. Context handler call PIP for subject attributes
4. PRP Identifies the correct policy based on resource attributes in enriched decision request
5. PDP identifyes matching rules
6. PDP checks if there is any matching rules and returnes interderminate if not
7. Matches the rules with subject attributes
8. Verify match and return indeterminate if not
9. Evaluate any conditions in policy
10. If condiation does not match return indterminate
11. Add any obligations to the result
12. Return the decsion result


## Implementation and construction details

Details about the implementation of PDP is found under
[construction components for PDP.](/authorization/architecture/accesscontrol#policy-decision-point---pdp)