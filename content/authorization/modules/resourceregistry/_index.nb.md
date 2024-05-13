---
title: Ressursregisteret
linktitle: Ressursregisteret
description: Ressursregisteret inneholder nødvendige metadata om alle tjenester som skal benytte Altinn til tilgangstyring og tilgangskontroll
tags: [architecture, security, authorization, xacml]
weight: 3
---

{{<notice warning>}}
Under utvikling
{{</notice>}}

Tjenesteregisteret vil inneholde informasjon om tjenesteressursene

Se [Github #24](https://github.com/Altinn/altinn-resource-registry/issues/23)

## Type ressurser

Det finnes ulike typer ressurser som kan registreres

- Altinn 3 apper - Referert med org/app id
- Altinn 2 Tjenester - Referert med eksternTjenestekode og EditionKode
- Tjenesteressurser

### Altinn 3 Apps

Apper som er vert i Altinn 3 Apper vil bli registrert i Altinn Service Registry.

Den refererte IDen vil være org/app

Registreringen kreves for å kunne liste opp apper som er inkludert i rettighetene for en gruppe


### Altinn 2 Tjenester

Apper som er vert i Altinn 2-plattformen vil bli registrert i Altinn Service Registry

Referanse-ID-en vil være externalServiceCode/serviceeditionCode

### Altinn tjenesteressurs

Tjenesteressursen vil være enhver type tjeneste levert av offentlige eller private organisasjoner. Vi vil bruke [cpsv:PublicService](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste) som inspirasjon til datamodellen.

Noen eksempler

– API-eksponeringsdata [Example3](exampleresource3.json) [XACML](policysample3.xml)
- Portalfunksjonalitet i Altinn [Eksempel 1](exampleresource1.json) [XACML](policysample3.xml)
– Portalfunksjonalitet i ekstern portal [Eksempel 2](exampleresource2.json)
- Samordna registermelding [Eksempel 4](exampleresource4.json) [XACML](policysample4.xml)
- Avtale om Arbeidstrening [Example 6](exampleresource6.json) [XACML](policysample6.xml)
- Lakselus MaskinPortenSchema [Eksempel 7](exampleresource7.json) [XACML](policysample7.xml)

## Resource attributes

The below table list the attributes a resource has in the resource registry. For attributes defined i cpsv:PublicService there is a link to the description.

|Attribute|Beskrivelse|Used for i Altinn|Format|Mand.|
|---|-----|---|---|---|
| [identifier](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-identifikator) |Identifes the resource.| Altinn tjenestekatalog + Tilgangsstyring + Tilgangskontroll.| Unik og persistent. Fritekst, max ? tegn. Bør være lesbar.|Yes|
| [title](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-navn) |The resource title | Altinn tjenestekatalog + Tilgangsstyring. (search)|Fritekst, max ? tegn, på alle språk (nb, nn, en)|Yes|
| [description](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjenest-beskrivelse)|Describes the resource. | Altinn tjenestekatalog + Tilgangsstyring (search)|Fritekst, max ? tegn på alle språk (nb, nn, en)| Yes|
| [hasCompetent Authority](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-harKompetentOrgan)|Resource owner (when public) | Altinn tjenestekatalog + Tilgangsstyring (search/filter) | Orgnr, tjenesteeierkode (fra A2), navn (nb, nn. en)|Yes|
| [ownedBy](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste-eiesAv )|Resource owner (when private) | Ingen private tjenester i Altinn i dag, attributt brukes ikke. |Orgnr|No|
| [contactpoint](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-kontaktpunkt)|Who to contact aboute the service| Altinn tjenestekatalog |epost, telefonnummer eller url til kontaktside|Yes|
| [homepage](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-hjemmeside)|Homepage for service | Altinn tjenestekatalog |url |No|
| [keyword](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-n%C3%B8kkelord)| A keyword, term or phrase to describe the Public Service. | Altinn tjenestekatalog? |fritekst, max ? tegn.| No|
| [status](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-status)|Indicates the status of a service | Altinn tjenestekatalog? |Mulige verdier i henhold til [standard](https://raw.githubusercontent.com/SEMICeu/ADMS-AP/master/purl.org/ADMS_SKOS_v1.00.rdf): "Completed", "Deprecated", "UnderDevelopment", "Withdrawn"|No|
| [isPartOf](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-erDelAv)|Linkes to related services |Altinn tjenestekatalog + Tilgangsstyring|[cpsv:PublicService](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste) eller [cpsvno:Service](https://informasjonsforvaltning.github.io/cpsv-ap-no/#Tjeneste). Skal det opprettes tjenestegruppe? |No|
| [spatial](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-dekningsomr%C3%A5de)|Area the public service is available to |Altinn tjenestekatalog?|En av følgende EUvoc verdier: [Continent](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/continent), [Contry](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/country), eller [Place](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/place).  Angivelse i Norge benyttes [Administrative enheter](https://data.geonorge.no/administrativeEnheter/nasjon/doc/173163)|No|
| [produces](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer)|Linkes to the outcome of a public service | Altinn tjenestekatalog? + Tilgangsstyring? |[cv:output](https://informasjonsforvaltning.github.io/cpsv-ap-no/#OffentligTjeneste-produserer): id + Fritekst|No|
| rights Description|Describes the power of attorney given in access management | Tilgangsstyring |Fritekst, max ? tegn.|Yes, if delgatble|
| limitedByRRR |Defines if RRR will be used to controll access| Tilgangsstyring + Tilgangskontroll | Boolean|Yes|
| availableForType |Defines what type of party that can use service| Altinn tjenestekatalog + Tilgangsstyring |Mulige verdier: Privatperson, Juridisk enhet (foretak), Bedrift, Konkursbo, Selvregistert bruker|Yes|
| SelfIdentified UserEnabled |The user acting on behalf of party can be a selfidentifed users| Tilgangsstyring + Tilgangskontroll |Boolean?|Yes|
| Enterprise UserEnabled |The user acting on behalf of party can be an  enterprise users| Tilgangsstyring + Tilgangskontroll |Boolean?|Yes|
| Reference | Referance to other IDs or values| Tilgangsstyring + Tilgangskontroll |Mulige verdier: SerivdeEditionCode, ServiceCode, MaskinportenScope, DelegationschemeID, AppID, Uri|No|
| Resourcetype | Type of resource.|Tilgangsstyring| Mulige verdier: Systemresource, MaksinportenSchema, GenericAccessResource|Yes|
|delegable|Indicates if a rights to perfome a service can be given to others|Tilgangsstyring|Boolean?|Yes|
|visible|Indicates if a service should be visable to users i GUI|Tilgangsstyring|Boolean?|Yes|

## Retningslinjer

Politikker definert for apper og ressurser vil bli lagret av ressursregisteret.

### App retningslinjer

App-policyene er retningslinjer for apper [opprettet i Altinn Studio](../../../../../../../../altinn-studio/reference/configuration/authorization/).
Policyen opprettes i Altinn Studio og migreres til Access Policy-komponenten når appen distribueres til et test- eller produksjonsmiljø.

En apppolicy inneholder informasjon om de ulike ressursene i en app og hvem og hva slags operasjoner de har lov til å utføre.
Hvem er identifisert ved hjelp av Altinn-roller, tilgangspakker eller roller/grupper fra andre kilder.

### Retningslinjer for ressursregister

Ressursregisterpolicyene er retningslinjer for ressurser som ikke kommer fra Altinn 3-apper. Det kan være hvilken som helst funksjonalitet på hvilken som helst plattform.

Både digitale og analoge tjenester kan registreres i ressursregisteret.


## Konstruksjon

Se [konstruksjonskomponenter](/authorization/architecture/resourceregistry/) hvis du vil se hvordan komponenten er bygget.