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

### Versjon 1

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

### Versjon 2
(denne tabellen benyttes til diskuson. Ryddes opp før publisering)

|Attribute|Description|Used for|Note |Mandatory|
|---|------|---|---|---|
| [Identifier](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-identifikator) | Identifes the resource.| Used to identify correct policy |Hvilket format skal ID ha? Skal TE definere selv? |Yes|
| [Title](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-navn)  | The resource title | Resource catalog + Access administration. (search)|Max antall tegn? |Yes|
| [Description](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjenest-beskrivelse) | Describes the resource.  | Resource catalog + Access administration (search)|Max antall tegn? | Yes|
| [hasCompetent Authority](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-harKompetentOrgan) | If the resource is owned be a public organization this will be set | Resource catalog + Access administration (search/filter). Identifies owner of resource  | Tilsvarer dagens "ServiceOwner" i A2 |Yes|
| [ownedBy](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste-eiesAv ) | If the resource is owned by a private Agent this will be set. |Attributt ikke i bruk pr nå. |Det vil ikke registreres private tjenester i første omgang|No|
| [contactpoint](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-kontaktpunkt)| Information about who to contact aboute the service | Resource catalogue |Usikker om dette kan brukes i tilgangsstyring-GUI|Yes|
| [homepage](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hjemmeside) | Homepage for service  | Resource catalogue    ||No|
| [thematicArea](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-temaomr%C3%A5de)  | This property represents the Thematic Area of a Public Service as described in a controlled vocabulary.  |  Resource catalogue |Usikker om dette kan brukes i tilgangsstyring-GUI |No|
| [mainActivity](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hovedform%C3%A5l) | This property represents the Type of a Public Service as described in a controlled vocabulary.  | Resource catalogue, filter   |Finner ikke dette i CPSV. Hvilket Controlled voc henvises det til?|No|
| [sector](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-sektor) |This property represents the industry or sector a Public Service relates to, or is intended for. Note that a single Public Service may relate to multiple sectors.  | Resource catalog, filter |Hvilket vokabulator skal brukes for å angi koder? [Datatheme](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/data-theme) fra EU? Usikker om dette kan brukes i tilgangsstyring-GUI.|No|
| [keyword](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-n%C3%B8kkelord) | This property represents a keyword, term or phrase to describe the Public Service.| Catalogue, filter |Er Resource catalogue og Catalogue det samme? Skal man kunne skrive nøkkelord fritt? HVis ja, er det ønskelig at dette brukes i tilgangsstyring-GUI?| No|
| [status](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-status) | Indicates whether a Public Service is active, inactive, under development etc. according to a controlled vocabulary. | Catalogue |Mulige verdier i henhold til [standard](https://raw.githubusercontent.com/SEMICeu/ADMS-AP/master/purl.org/ADMS_SKOS_v1.00.rdf): "Completed", "Deprecated", "UnderDevelopment", "Withdrawn"|No|
| [isPartOf](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-erDelAv) |This property indicates a related service in which the described resource is included. This property is the inverse of dct:hasPart. | Catalogue |Kan brukes til å anbefale å delegere til tilknyttet tjenester i tillegg til den man har valgt? Hva registreres i dette feltet? lenke til en tjenestegruppe? |No|
| [spatial](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-dekningsomr%C3%A5de) |A Public Service is likely to be available only within a given area, typically the area covered by a particular public authority. | Catalogue |Skal dette brukes i tilgangsstyrings-GUI?|No|
| [produces](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer) |Links a Public Service to one or more instances of the Output class describing the actual result of executing a given Public Service. | Catalogue |Ikke aktuelt å bruke i tilgangsstyrings-GUI|No|
| validFrom |  | Authorization  |Hva er sammenheng mellom status og valdidfrom?|Yes|
| validTo  |   | Authorization |Hva er sammenheng mellom status og valdidfrom?|Yes|
| rights Description | Describes the rights is delegated if resource access is delegated | Altinn Access Managment |Dette er delegeringsteksten som vises i tilgangsstyring|Yes|
| publicService | Defines if it is public | Altinn |Forstår ikke dette i forhold til "hasCompetentAuthority" og "owendBy"? HVa er det tenkt brukt til? |?|
| isLimitedTo SpesificUsers | Defines if RRR will be used to controll access | Access Management, PDP | Bør endre navn til f eks "isLimitedByRRR" eller noe som viser sammenheng med RRR (blir misforstått)|Yes|
| availableFor | Defines what kind of actor that can use service | Catalogue  |Hvilke verdier skal dette ha?|Yes|
| SelfIdentified UserEnabled | The service can be used by selfidentifed users | Catalogue, filter, access managment  |Trenger vi egne attributter for "SelvIdentifiedUserEnabled" i tillegg til "availableFor"? Er det i tilfellet det er "onlyForCitizen" AND "OpenForSelfIdUser"?Kan det løses med multiplechoice eller blir det "krøkkete"?|Yes|
| Enterprise UserEnabled | Service can be used by enterprise users | Catalogue, Access management |Trenger vi egne attributter for "EnterpriseUserEnabled"i tillegg til "availableFor"? Er det i tilfellet det er "onlyForEntities" AND "OpenForEnterpriseUser"? Kan det løses med multiplechoice eller blir det "krøkkete"?|Yes|
| Reference | Can be external service codes, scopes +++ |   |Hvilke typer referanser skal vi tillate? Hvilke har vi pr nå? SerivdeEditionCode, ServiceCode, MaskinportenScope, DelegationschemeID. De to siste bør væree obligatoriske på resourceType:MaskinportenScheme? |No|
| EventTypes | Identfies types of events a resource can publish | Altinn Events, Catalogue  | Hvilke verdier finnes? |No|
| Resourcetype | Type of resource.  | Access management | Hvilke typer har vi/ skal vi ha? Finnes disse i dag: Systemresource og MaksinportenSchema?  Brukes til å f eks lage en visning for bare en resourcetype, eks maksinporten schema|Yes|
|isComplete|?|?||Yes|
|delegable|?|?||Yes|
|visible|?|?||Yes|

### Versjon 2_details
(denne tabellen benyttes til diskuson. Ryddes opp før publisering)

|Attribute|Beskrivelse|Used for i Altinn|Format |Mand.|
|---|------|---|---|---|
| [Identifier](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-identifikator) |Identifes the resource.| Identifes the resource and correct policy.| |Yes|
| [Title](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-navn) |The resource title | Altinn tjenestekatalog + Tilgangsstyring. (search)|Fritekst, max 100 tegn? |Yes|
| [Description](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjenest-beskrivelse)|Describes the resource. | Altinn tjenestekatalog + Tilgangsstyring (search)|Fritekst, max 400 tegn? | Yes|
| [hasCompetent Authority](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-harKompetentOrgan)|Resource owner (when public) | Altinn tjenestekatalog + Tilgangsstyring (search/filter) | Orgnr|Yes|
| [ownedBy](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste-eiesAv )|Resource owner (when private) | Ingen private tjenester i Altinn i dag, attributt brukes ikke. |Orgnr|No|
| [contactpoint](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-kontaktpunkt)|Who to contact aboute the service| Altinn tjenestekatalog |epost, telefonnummer eller url til kontaktside|Yes|
| [homepage](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hjemmeside)|Homepage for service | Altinn tjenestekatalog   |url |No|
| [thematicArea](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-temaomr%C3%A5de) |Thematic Area of a Public Service | Altinn tjenestekatalog? |Bør velges fra [eurovoc](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://eurovoc.europa.eu/100141) eller [LOS](https://psi.norge.no/los/) |No|
| [mainActivity](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hovedform%C3%A5l)|Type of main activity for public service | Altinn tjenestekatalog|Verdi SKAL velges fra [EUvoc Main activity](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/main-activity)|No|
| [sector](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-sektor)|Industry or sector a Public Service relates to, or is intended for |Altinn tjenestekatalog|Mulige verdier velges fra [Data theme](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/data-theme) (mulitple choice)|No|
| [keyword](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-n%C3%B8kkelord)| A keyword, term or phrase to describe the Public Service. | Altinn tjenestekatalog|fritekst, max ? tegn. Hvem bestemmer nøkkelord? | No|
| [status](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-status)|Indicates the status of a service | Altinn tjenestekatalog |Mulige verdier i henhold til [standard](https://raw.githubusercontent.com/SEMICeu/ADMS-AP/master/purl.org/ADMS_SKOS_v1.00.rdf): "Completed", "Deprecated", "UnderDevelopment", "Withdrawn"|No|
| [isPartOf](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-erDelAv)|Linkes to related services |Altinn tjenestekatalog + Tilgangsstyring|[cpsv:PublicService](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste) eller [cpsvno:Service](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste)|No|
| [spatial](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-dekningsomr%C3%A5de)|Area the public service is available to |Altinn tjenestekatalog |En av følgende EUvoc verdier: [Continent](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/continent), [Contry](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/country), eller [Place](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/place).  Angivelse i Norge benyttes [Administrative enheter](https://data.geonorge.no/administrativeEnheter/nasjon/doc/173163)|No|
| [produces](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer)|Linkes to the outcome of a public service | Altinn tjenestekatalog |[cv:output](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer): id + Fritekst|No|
| validFrom | Brukes til? |DateTime?|Yes|
| validTo  | Brukes til?  |DateTime? |Yes|
| rights Description|Deskribes the power of attorney given in access management | Tilgangsstyring |Fritekst, max ? tegn.|Yes|
| publicService| Defines if it is public | Brukes til? | Boolean? |?|
| limitedByRRR |Defines if RRR will be used to controll access| Tilgangsstyring + Tilgangskontroll | Boolean?|Yes|
| availableFor |Defines what kind of actor that can use service| Altinn tjenestekatalog + Tilgangsstyring |Mulige verdier: Virksomhet, Hovedenhet, Underenhet, Innbygger |Yes|
| SelfIdentified UserEnabled |The service can be used by selfidentifed users| Tilgangsstyring + Tilgangskontroll |Boolean?|Yes|
| Enterprise UserEnabled |Service can be used by enterprise users| Tilgangsstyring + Tilgangskontroll |Boolean?|Yes|
| Reference | Referance to other IDs| Tilgangsstyring + Tilgangskontroll |Mulige verdier: SerivdeEditionCode, ServiceCode, MaskinportenScope, DelegationschemeID, AppID?|No|
| EventTypes |Identfies types of events a resource can publish|  Tilgangsstyring + Tilgangskontroll |Hvilke verdier finnes? |No|
| Resourcetype | Type of resource.|Tilgangsstyring| Mulige verdier: Systemresource, MaksinportenSchema, GenericAccessResource|Yes|
|isComplete|Indicates that a service is ready for production|Migrering?|Boolean?|Yes|
|delegable|Indicates if a rights to perfome a service can be given to others|Tilgangsstyring|Boolean?|Yes|
|visible|Indicates if a service should be visable to users|Tilgangsstyring|Boolean?|Yes|
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

See [construction components](/authorization/architecture/resourceregistry/) if you want to see how the component is built. 
