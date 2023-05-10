---
title: Resource Rights Registry
linktitle: RRR
description: The Resource Rights Registry gives the administrator of a Resource in Resource Registry the capability to administrate which organizations and persons can access their resources.
tags: [architecture, security, authorization, xacml]
---

## Concept

Generally, digital services are available for all persons or all organizations of a given type.
When a resource has enabled resource rights registry requirement, a reportee must be given a resource right. 

The resource rights register allows defining who can use a digital service.


### Used in UI

A resource that has enabled RRR will require that reportee have at least one right in the registry for the given service.

If not the resource would be hidden 


### Used in PDP

To use this in decision point the XACML Policy can add attributes to rules that is set by resource rights registry

```xml
     <xacml:AllOf>
          <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">innehaver</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:altinn:accessgroup" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
          </xacml:Match>
          <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:resourceright:action" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
          </xacml:Match>
        </xacml:AllOf>
 ```

 [See full example](policysample.xml)

## Model

The following 

- ResourceID - the resource itself
- PartyID  - the internal Altinn ID the reference a given organization or person
- PartyNumber  - orgnumber or ssn for the given party
- PerformedBy - A specific user/person in an organization that can perform opertion (ssn? Lookup)
- RightsType -  A value indicating the specic type of right. Example urn:resourceright:action
- RightsValue - A value indicating the specific value example Example  urn:read
- ValidTo  -   Date for how long it last
- ValidFrom -  When rights is valid from


## API

As part of the component there will be exposed API

### API for admin

This APi allows resource owners to add, update and delete resource rights

### List API

The list API will be used to find resource rights for a given resource/party 
