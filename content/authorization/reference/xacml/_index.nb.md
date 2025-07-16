---
title: XACML - Altinn Studio 
description: XACML stands for "eXtensible Access Control Markup Language".
tags: [architecture, security, XACML]
linktitle: XACML
toc: false
weight: 10
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

In Altinn a XACML Policy can describe the following

- The Access rules for an APP created in Altinn Studio
- The Access rules for a resource in Altinn Resource Registry
- The Access rules for a correspondence or broker service in Altinn 3

The XACML format in Altinn 3 follows XACML 3.0 standard with a limited feature set.

A Policy consist of 1-many rules. And each rule consist of three parts. 

- Resources - describes the resource a rule applies to. It can be an app, a resource in the resource register, a specific task, or any other sub-resources to an app or resource in the rescource registry. A rule can combine multiple resources
- Action - describes which action the rules apply to. This can be any action like read, write, sign, fire, Opendoor +++.   A rule can target multiple actions.
- Subject - describes who the rules apply to. It can be a role, access group, an organization number or a specific user, and many more. A rule can target multiple subjects

The example below show the structure of a XAMCL Policy. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<xacml:Policy PolicyId="urn:altinn:policyid:1" Version="1.0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides" xmlns:xacml="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17">
  <xacml:Target />
  <xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
    <xacml:Description>Describe the rules with subject, action and </xacml:Description>
    <xacml:Target>
      <xacml:AnyOf>
        <xacml:AllOf>
         // One set of possible subject attributes that rule is for is targeted for. See real examples below
        </xacml:AllOf>
        <xacml:AllOf>
          // Alternative set of possible subject attributes that rule is targeted for. See real examples below
        </xacml:AllOf>
      </xacml:AnyOf>
      <xacml:AnyOf>
        <xacml:AllOf>
          // One set of possible resource attributes that rule is for is targeted for. See real examples below
        </xacml:AllOf>
      </xacml:AnyOf>
      <xacml:AnyOf>
        <xacml:AllOf>
                  // One set of possible action attributes that rule is for is targeted for. See real examples below
             </xacml:AllOf>
        <xacml:AllOf>
                  // Alternative set of possible action attributes that rule is targeted for. See real examples below
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

The resource describes the resource a rule applies to. It can be an app, a resource in the resource register, a specific task, or any other sub-resources to an app or resource in the rescource registry.

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


- Action - describes which action the rules apply to. This can be any action like read, write, sign, fire, Opendoor +++
- Subject - describes who the rules apply to. It can be a role, access group, an organization number or a specific user, and many more
- Obligation - describes additional information like minimum authentication level.
- Condition - Describes additional conditions like the reportee needs to be registered in SRR/RRR for this resource/service.



### Subject



### Obligation




[See example policy from application in production](policysample.xml) 

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
