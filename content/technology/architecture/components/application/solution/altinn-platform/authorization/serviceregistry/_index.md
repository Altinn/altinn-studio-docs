---
title: Service Registry
linktitle: Service Registry
description: The Service Registry 
tags: [architecture, security, authorization, xacml]
---

WORK IN PROGRESS - NOT FINALIZED

The service registry will contain information about the service resources 


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

The service resource would be any type of service provided by public or private organiazations

- API's exposing data [Example3](exampleresource3.json)
- Portal functionality in Altinn [Example 1](exampleresource1.json)
- Portal functionality in external portal [Example 2](exampleresource2.json)

## Resource model



