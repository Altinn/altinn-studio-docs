---
title: Authorization - Altinn Apps - Policy
description: Description of the XACML Policy defined for a app
tags: [architecture, security]
weight: 100
linktitle: Policy
alwaysopen: false
---

A App needs to have defined a Authoriation Policy that will be imported in to Policy Retrieval Point when a app is deloyed to a Altinn Apps/Platform environment.

The policy format follows XACML 3.0 and for every rule in the policy, there is attributes
defining which resource, subject and which action it targets.

## Resource Attributes

### Org
The org part of the resource attribute defines which org that owns the app

### App
The app part of the  identifies the app itself.

### Task / Event
The task/event part of the resource makes it possible to have seperate rules for the different tasks

### Example
The below example show a part of XACML 3.0 Policy where a resource is identified. 


```xml
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SKD</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">TaxReport</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Instansiate</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>

´´´ 

## Subject Attributes
The subject part of the target for the rule defines who the rule target

### Role Code
The role code is used for rule that target end users and systems

### Org
The org code is used for rule that target orgs

### Example

