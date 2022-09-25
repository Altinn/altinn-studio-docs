---
title: Resource Registry
linktitle: Resource Registry
description: The Resource Registry 
tags: [architecture, security, authorization, xacml]
---

{{<notice warning>}}
This is work in progress
{{</notice>}}

The service registry will contain information about the service resources 

See [Github #24](https://github.com/Altinn/altinn-resource-registry/issues/23)

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
- Avtale om Arbeidstrening [Example 6](exampleresource6.json) [XACML](policysample6.xml)

## Resource attributes

The below table list the attributes a resource has in the resource registry. For attributes defined i cpsv:PublicService there is a link to the description.

|Attribute | Description   | Used for  |
|-----|-----|------|
| [Identifier](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-identifikator)  | Identifes the resource. String. Defined by resource owner. | Used to identify correct policy |
| [Title](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-navn)  | The resource title | Used for presenting i resource catalog. Searchable |
| [Description](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjenest-beskrivelse) | Describes the resource.  | Used for service catalogue |
| [hasCompetentAuthority](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-harKompetentOrgan) | If the resource is owned be a public organization this will be set | Identifies owner of resource  | 
| [ownedBy](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste-eiesAv) | This property refers to the Agent who owns the Service.  | Identifies private owner of resource  |
| [contactpoint](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-kontaktpunkt)| Information about who to contact aboute the service | Resource catalogue |
| [homepage](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hjemmeside) | Homepage for service  | Resource catalogue    |
| [thematicArea](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-temaomr%C3%A5de)  | This property represents the Thematic Area of a Public Service as described in a controlled vocabulary.  |  Resource catalogue |
| [type](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-type) | This property represents the Type of a Public Service as described in a controlled vocabulary.  | Resource catalogue, filter   |
| [sector](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-n%C3%A6ringsgruppering) |This property represents the industry or sector a Public Service relates to, or is intended for. Note that a single Public Service may relate to multiple sectors.  | Resource catalog, filter |
| [keyword](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-n%C3%B8kkelord) | This property represents a keyword, term or phrase to describe the Public Service.| Catalogue, filter |
| [status](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-status) | Indicates whether a Public Service is active, inactive, under development etc. according to a controlled vocabulary. | Catalogue |
| [isPartOf](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-erDelAv) |This property indicates a related service in which the described resource is included. This property is the inverse of dct:hasPart. | Catalogue |
| [spatial](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-dekningsomr%C3%A5de) |A Public Service is likely to be available only within a given area, typically the area covered by a particular public authority. | Catalogue |
| [produces](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer) |Links a Public Service to one or more instances of the Output class describing the actual result of executing a given Public Service. | Catalogue |
| validFrom |  | Authorization  |
| validTo  |    | Authorization |
| rightsDescription | Describes the rights is delegated if resource access is delegated | Altinn Access Managment |
| publicService | Defines if it is public | Altinn |
| isLimitedToSpesificUsers | Defines if RRR will be used to controll access | Access Management, PDP | 
| availableFor | Defines what kind of actor that can use service | Catalogue  |
| SelfIdentifiedUserEnabled | The service can be used by selfidentifed users | Catalogue, filter, access managment  |
| Reference | Reference to the platform/service and where it is hosted. Example: Altinn 2 servicecodes |   |
| EnterpriseUserEnabled | Service can be used by enterprise users | Catalogue, Access management |
| Scopes | Identfies the scopes defined by service | Maskinporten | 
| EvenTypes | Identfies types of events a resource can publish | Altinn Events, Catalogue  |  
| Resourcetype | Type of resource.  | Access management | 


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
