---
title: Opprette og publisere ressurser i altinn Studio
linktitle: Opprette ressurser
description: Denne guiden forklarer hvordan du kan opprette og publisere ressurser i fra Ressursadministrasjon i Altinn Studio
toc: false
weight: 1
---

I Altinn Studio Resource admin kan du opprette ressurser som skal brukes som grunnlag for tilgangskontroll for tjenester utenfor Altinn-plattformen. 

## Forutsetninger

Du må ha tilgang til ressursadministrasjon for organisasjonen din. Se [Kom i gang-veiledningen](../../getting-started/resource-admin-studio)

## Trinn 1 Opprett ressurs

Logg inn i Altinn Studio

Opprett ressurs

IDen som er gitt for ressursen vil være den som brukes i Altinn API for å sjekke tilgang 


![Create Resource](create_resource_1.png)


### Ressurstype

For eksterne ressurser vil typen være generisk tilgangsressurs.


![Create Resource](create_resource_15.png)

### Tittel

Tittelen vil vises i Access Management og i tjenestekataloger som data.altinn.no

Du må definere tittelen på bokmål, nynorsk og engelsk.

![Create Resource](create_resource_3.png)

### Beskrivelse

Beskrivelsen vil vises i Access Management og i tjenestekataloger som data.altinn.no

Du må definere beskrivelsen på bokmål, nynorsk og engelsk.

![Create Resource](create_resource_4.png)


### Delegasjonsbeskrivelse

Dersom ressursen skal kunne delegeres som ressursdelegering må du aktivere delegering og angi delegasjonsbeskrivelse på bokmål, nynorsk og engelsk.

![Create Resource](create_resource_5.png)

### Nøkkelord

Nøkkelord kan angis for hjelp. Foreløpig ikke brukt, men kan brukes til forskjellige tjenestekataloger senere

![Create Resource](create_resource_6.png)

### Status

Statusen til tjenesten som ressursen peker på

![Create Resource](create_resource_7.png)


### Brukertyper

Definerer hvilke typer brukere som har tilgang. Disse innstillingene kan brukes til filtrering på et senere tidspunkt. For tiden
dette er bare informasjon. 

![Create Resource](create_resource_8.png)


### Party tyoe

Definerer hvilken type part tjenesten er målrettet mot. Kan brukes til filtrering i servicekatalog på et senere tidspunkt.

![Create Resource](create_resource_9.png)

### Kontaktinformasjon

Kontaktinformasjon for tjenesten. Kan bli presentert i servicekatalog på et senere tidspunkt.

![Create Resource](create_resource_10.png)

## Opprett policy

Når ressursen er opprettet, må du definere policyen.
Policyen må inneholde minst én regel. 

Hver regel inneholder ressurs, emne og handling

### Ressurs

Definer ressursen for regelen
![Create Resource](create_resource_11.png)


### Handling

Definer handlingen for regelen

![Create Resource](create_resource_12.png)

### Emne

Definer emnet for rollen. Du kan velge mellom ER-roller, Altinn-roller og tilgangspakker (todo)

![Create Resource](create_resource_13.png)

## Publisere

Når du er ferdig med å angi ressursinnstillingene og policyen kan du publisere.
Før publisering må du angi en ny versjons-ID og foreta endringer i ressurslageret. 

![Create Resource](create_resource_14.png)


## Bekrefte

Når den er publisert, er ressursen tilgjengelig på søke-APIet i ressursregisteret.

Eksempel Ressurs fra guide. [https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern- tjeneste-portal)
Retningslinjer for eksempelressurs fra denne veiledningen [https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal/policy](https://platform.tt02.altinn.no/resourceregistry /api/v1/resource/ekstern-tjeneste-portal/policy)