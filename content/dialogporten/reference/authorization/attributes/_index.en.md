---
title: 'Authorization Attributes'
description: 'Reference information about authorization attributes'
weight: 10
---

{{<notice warning "deprecated">}}
Authorization attributes are deprecated in favour of [authorization contexts]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}), which support the same use cases plus multi-party access and control over what an unauthorized end user sees. Authorization attributes continue to work; there is no removal date.
{{</notice>}}

## Introduction

See [getting started with authorization attributes](/en/dialogporten/reference/authorization/attributes/../../../getting-started/authorization/attributes/) for a functional overview of authorization attributes and what they can be used for.

Authorization attributes are a way to control how the XACML request is constructed for a given dialog, making it possible to have more fine grained rules and even refer to several distinct resource policies.

{{<notice warning>}}
A legacy action with no authorization attribute at all is authorized against the exact resource the entity refers to, not merely "some entity in this dialog has a matching permit". If you rely on an action being granted implicitly through another entity's permit on the main resource, that no longer holds.
{{</notice>}}

{{<notice info>}}
Authorization attributes are only considered in single dialog endpoints, ie. when requesting a dialog by ID. For dialog search/lists, the authorization attributes are not considered.
{{</notice>}}

## Usage

Authorization attributes can be supplied on:

* GUI actions
* API actions
* Transmissions

## Basic format

The value of the authorization attribute will be mapped to a XACML resource that Altinn Authorization can understand, ie. a URN. Valid examples:

```
urn:altinn:subresource:mysubresource
urn:altinn:task:Task_1
urn:altinn:resource:someotherresource
```

{{<notice info>}}
In addition, a bare non-URN string like `foobar` can be supplied as a shorthand for `urn:altinn:subresource:foobar`
{{</notice>}}

The authorization attribute is split at the last segment, and the first part is used as the *attribute id* and the second part as the *attribute value*. 

## Mapping to XACML

Eg. given a dialog that has `ServiceResource` set to `urn:altinn:resource:myfirstservice` and a GUI/API action shaped like this on a dialog :

```json
{
    "action": "sign",
    "authorizationAttribute": "urn:altinn:task:gm_signing_task",
    ...
}
```

will result in a XACML request like this:

```json
{
  "Request": {
    "AccessSubject": [ /* information about the user omitted */ ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "sign"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "myfirstservice"
          },
          {
            "AttributeId": "urn:altinn:task",
            "Value": "gm_signing_task"
          }
          /* information about the party owning the dialog omitted */
        ]
      }
    ]
  }
}
```

This can be governed by a policy rule like this:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
<xacml:Description>A rule giving user with role DAGL to "sign" within the task named "gm_signing_task"</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myfirstservice</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">gm_signing_task</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
```

If the request fails, Dialogporten will flag the GUI/API-action or transmission with `isAuthorized: false` and remove the associated URLs. This allows for end user systems to indicate to the user that access to the given action is denied.

{{<notice warning>}}
While Dialogporten indicates that the action is unauthorized, and removes the URLs, the endpoint should still always perform authentication/authorization on incoming requests and not rely on Dialogporten simply obscuring access to the endpoints  
{{</notice>}}

## Using authorization attributes on transmissions

{{<notice warning>}}
For new dialogs, consider an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) instead - it can express the same subresource/task narrowing shown below, plus grant access to a party other than the dialog's own.
{{</notice>}}

For transmissions, the mechanics are the same, but there is no explicit action associated with a transmission - `read` is always used as the action in the XACML request, whatever the authorization attribute refers to: a separate resource, a subresource, or a task.

{{<notice warning>}}
A subresource or task named in a transmission's authorization attribute can only ever *broaden* access through a dedicated policy rule, never *narrow* it. The action sent is always `read`, and a plain `read` rule on the main resource - typically defined for the entire resource - matches regardless of which subresource or task attribute is also present in the request, because XACML target matching only checks that the attributes a rule requires are present, not that no other attributes are. If you need to restrict a transmission's visibility below the main resource's `read` grant, use an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) with an explicit `action` instead - that is the only mechanism that can express real narrowing.
{{</notice>}}

Example:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
<xacml:Description>A rule giving user with role UTINN or DAGL to read the dialog</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">UTINN</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myfirstservice</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
<xacml:Rule RuleId="urn:altinn:example:ruleid:2" Effect="Permit">
<xacml:Description>A rule giving users with DAGL to read a particular transmission</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myfirstservice</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sometransmission</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:subresource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>            
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">transmissionread</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
```

Given a transmission whose authorization attribute is `urn:altinn:subresource:sometransmission`, Dialogporten sends this XACML request:

```json
{
  "Request": {
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:rolecode",
            "Value": "UTINN"
          }
        ]
      }
    ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "myfirstservice"
          },
          {
            "AttributeId": "urn:altinn:subresource",
            "Value": "sometransmission"
          }
        ]
      }
    ]
  }
}
```

This satisfies the rule above and results in `Permit` for any UTINN or DAGL user, regardless of the `sometransmission` subresource attribute - the attribute narrowed which resource the request names, but not which policy rule the request can match.

## Refer to separate resource/policy in Resource Registry

If the authorization attribute value starts with either `urn:altinn:resource` or `urn:altinn:app`, and the full value differs from what `ServiceResource` for the given dialog is set to, the authorization attribute is considered as referring to different resources in the Resource Registry. This way, access to the various part of a dialog might be governed by different policies. 

A typical use case is having dialogs that all refer to different resources/policies, but within them contain [transmissions](/en/dialogporten/reference/authorization/attributes/../../entities/transmission/) representing a shared kind of communication (ie. notice of coercive fine) that are governed by the same authorization policy, regardless of the dialog in which it is used.

Example:
```json
// First dialog
{
    "id": "019275d2-1b5d-7b82-b436-4b74e5cbd02b",
    "serviceResource": "urn:altinn:resource:some-service",
    "transmissions": [
        {
            "id": "019275d3-41d5-743c-be44-aa729cf95acf",
            "authorizationAttribute": "urn:altinn:resource:notice-of-coervice-fine",
            ...
        }
    ]
    ...
}
// Second dialog
{
    "id": "019275d4-d550-7e93-9819-1e40579f243a",
    "serviceResource": "urn:altinn:resource:other-service",
    "transmissions": [
        {
            "id": "019275d5-0044-7b10-803a-fa5e6ac3f593",
            "authorizationAttribute": "urn:altinn:resource:notice-of-coervice-fine",
            ...
        }
    ]
    ...
}
```

This allows for having fine-grained control over what parts of dialogs a given role is given access to, whilst avoiding duplicating policy rules across the policies governing access to various dialog types.


{{<children />}}

