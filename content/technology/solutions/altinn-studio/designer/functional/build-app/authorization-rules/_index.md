---
title: Set Authorization Rules
linktitle: Authorization
description: Altinn Studio let the developer set the authorization requirements for a App
---


An app needs to have defined a Authoriation Policy that will be imported in to Policy Retrieval Point when a app is deloyed to a Altinn Apps/Platform environment.

The policy format follows XACML 3.0 and for every rule in the policy, there is attributes
defining which resource, subject and which action it targets.

## Resource Attributes

| Attribute    | Description                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| Org          | The org part of the resource attribute defines which org that owns the app.                           |
| App          | The app part that identifies the app itself.                                                          |
| Task / Event | The task/event part of the resource makes it possible to have seperate rules for the different tasks. |

### Example
The below example show a part of XACML 3.0 Policy where a resource is identified. 

```xml {linenos=false,hl_lines=[3,7,11]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">taxreport</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instansiate</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Subject Attributes
The subject part of the target for the rule defines who the rule target.

| Attribute | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| Role Code | The role code is used for rule that target end users and systems. |
| Org       | The org code is used for rule that target orgs.                   |

### Examples

Example with role code:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">regna</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

Example with org:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Action Attributes

Example with read action:

```xml {linenos=false,hl_lines=[2]}
<xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
      <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
    </xacml:Match>
</xacml:AllOf>
```

## Obligation

The obligation part is used to define information that should be used by PEP.

```xml {linenos=false,hl_lines=[4]}
<xacml:ObligationExpressions>
    <xacml:ObligationExpression FulfillOn="Permit" ObligationId="urn:altinn:obligation:authenticationLevel1">
      <xacml:AttributeAssignmentExpression AttributeId="urn:altinn:obligation1-assignment1" Category="urn:altinn:minimum-authenticationlevel">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">2</xacml:AttributeValue>
      </xacml:AttributeAssignmentExpression>
    </xacml:ObligationExpression>
  </xacml:ObligationExpressions>
```

## Full examples
On Github you can look at some full [policy examples](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/IntegrationTests/Data/Xacml/3.0/AltinnApps/skd/taxreport/policy.xml)
