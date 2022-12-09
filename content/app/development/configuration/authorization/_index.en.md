---
title: Authorization
linktitle: Authorization
description: How to define authorization rules (access management) for an app.
weight: 100
---

Authorization rules for an application is defined in a XACML policy file which is placed in the app repository.
The XACML Policy contains one or more rules which define who can perform different actions on different resources.

Description of the XACML structure and definition of rules can be found [here](/technology/solutions/altinn-studio/designer/build-app/authorization-rules/)

The XACML file can be edited in a text editor of your choice.


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

## Rules from the application template
When an app is created in Altinn Studio it is based an the current asp.net template, and will include an autogenerated XACML policy file.
The rules that are defined in this file is described below.  

The aforementioned rules can be changed in *policy.xml* which lies in `App/config/authorization` in the application repository.
Details about configuring the policy file can be found [here](/technology/solutions/altinn-studio/designer/build-app/authorization-rules/)
You can also find a good amount of example rules [here](rules).

{{%notice warning%}}
Please note that changes to the policy file is at your own risk,
and that it is recommended to always delegate read permissions to entities with writing permissions.
{{% /notice%}}

### Permissions for roles
The rules that give the CEO (DAGL) or accountant assistant (REGNA) permissions to instantiate, write 
read and delete instances of the application are defined in the policy file.

A complete list of role types can be found [here](https://www.altinn.no/api/metadata/roledefinitions).

### Permissions for the application owner
The application owner (organization) has rights to instantiate, write and read instances of the application.
They also have permissions to mark instances as completed. 

### Required authentication level
Reqired authentication level is set to 2 by default. This is done as an obligation in the XACML Policy file. 

If the required authentication level is set to 4 you have to define that the service owner can interact with it through level 3 authentification for Maskinporten.
This is because Maskinporten is defined as level 3. See the rule library for examples. Notice: the app requires nuget version`3.1.5` or higher.



{{<children>}}
