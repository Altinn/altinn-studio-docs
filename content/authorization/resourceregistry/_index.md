---
title: Resource Registry
linktitle: Resource Registry
description: The Resource Registry 
tags: [architecture, security, authorization, xacml]
weight: 1
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
| Reference | Can be external service codes, scopes +++ |   |
| EnterpriseUserEnabled | Service can be used by enterprise users | Catalogue, Access management |
| EvenTypes | Identfies types of events a resource can publish | Altinn Events, Catalogue  |  
| Resourcetype | Type of resource.  | Access management | 

## Policies

Polices defined for apps and resources will be stored by resource registry.

### App Policies

The App Policies are policies for Apps [created in Altinn Studio](../../../../../../../../app/development/configuration/authorization/). 
The policy is created in Altinn Studio and migrated to the Access Policy component when the app is deployed to a test or production environment.

An app policy contains information about the different resources in an App and who and what kind of operations they are allowed to perform. 
The who is identified using Altinn Roles, Access Groups, or roles/groups from other sources.

### Resource Registry Policies

The resource registry policies are policies for resources that is not comming from Altinn 3 apps. It could be any functionality hosted on any platform. 

Both digital and analog services can be registrated in the resource registry.


## Construction

See [construction components](/technology/architecture/components/application/construction/altinn-platform/authorization/resourceregistry/) if you want to see how the component is built. 
