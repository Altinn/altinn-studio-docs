---
title: Resource Registry
linktitle: Resource Registry
description: The Resource Registry 
tags: [architecture, security, authorization, xacml]
---

WORK IN PROGRESS - NOT FINALIZED

The service registry will contain information about the service resources 


See [Github #24](https://github.com/Altinn/altinn-authorization/issues/24)

## Type of resources

There are different types of resources that can be registrated 

- Altinn 3 apps - Refered with org/app id
- Altinn 2 Services - Refered with externalServiceCode and EditionCode
- Service Resources

### Altinn 3 Apps 

Apps hosted in Altinn 3 Apps will be registred in the Altinn Service Registry. 

The referenced id would be org/app

The registration is required to be able to list apps that is included in the rights for a group


### Altinn 2 Services

Apps hosted in Altinn 2 platform will be registrated in Altinn Service Registry

The reference id would be externalServiceCode/serviceeditionCode

### Altinn Service Resource

The service resource would be any type of service provided by public or private organiazations. We will use [cpsv:PublicService](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste) as inspiration to the data model.

Some examples

- API's exposing data [Example3](exampleresource3.json) [XACML](policysample3.xml)
- Portal functionality in Altinn [Example 1](exampleresource1.json) [XACML](policysample3.xml)
- Portal functionality in external portal [Example 2](exampleresource2.json)
- Samordna registermelding [Example 4](exampleresource4.json) [XACML](policysample4.xml)

## Resource repository

To store resources there are two options

- relational database
- document database

A relational database will have less flexibility to change the information for a resource. Storing it as a json document 
will improve flexibility. 

The search performance will be better with a relational database. 

The number of resources will probably also be limited. When all Altinn 2 services is migrated we will have between 1000-2000 service resouces. 

It will probably take many many years before there are more than 10.000 resources registrated. 

This points to that a document database is the best choice since it will give better flexibility and performance can be handled with caching. 
