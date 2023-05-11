---
title: XACML - Altinn Studio 
description: XACML stands for "eXtensible Access Control Markup Language".
tags: [architecture, security, XACML]
linktitle: XACML
toc: false
weight: 1
---

The [standard] defines a declarative fine-grained, attribute-based access control policy language,
an architecture, and a processing model describing how to evaluate access requests according to the rules defined in policies.

The Altinn Studio and Altinn Studio Apps solution uses the XACML standard for the following

- XACML Reference Architecture: Used as input for defining the Altinn Studio Apps authorization architecture
- XACML Policy: Used to define the authorization rules for apps
- XACML Request: Format used for PEP to call PDP
- XACML Response: Format used for response from PDP to PEP.

[standard]: https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html

## XACML Policy
The Policy Document describes the rules for a App. This policy is imported to the Policy Retrieval Point.

[See example policy from application in production](../policysample.xml) 

## XACML Request
The XACML Request will follow XACML 3.0 JSON profile.
[See documentation](http://docs.oasis-open.org/xacml/xacml-json-http/v1.1/csprd01/xacml-json-http-v1.1-csprd01.html).

### Single request
The below example show how a request try to verify that a user is allowed to read a given instance.

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


### Request for Multiple Decisions

Policy Decision Point supports Request for Multiple Decisions.
The below request show how you can request decision for both read an write for the same resource.

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
          "ReferenceId": [
            "s1",
            "a1",
            "r1"
          ]
        },
        {
          "ReferenceId": [
            "s1",
            "a2",
            "r1"
          ]
        }
      ]
    }
  }
}
```

## XACML Response
The XACML Response will follow XACML 3.0 JSON profile.
[See documentation](http://docs.oasis-open.org/xacml/xacml-json-http/v1.1/csprd01/xacml-json-http-v1.1-csprd01.html).


### Response for single decision request

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


### Response for multipe decision

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
