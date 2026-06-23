---
title: Opprette og publisere ressurser i Altinn Studio
linktitle: Opprette ressurser
description: Slik oppretter og publiserer du ressurser i Ressursadministrasjon i Altinn Studio
toc: false
---

I Altinn Studio Ressursadministrasjon kan du opprette ressurser som brukes som grunnlag for tilgangskontroll for tjenester utenfor Altinn-plattformen.

## Forutsetninger

Du må ha tilgang til ressursadministrasjon for organisasjonen din. Se [Kom i gang-veiledningen](/nb/authorization/getting-started/resourceadministration/).

## Trinn 1: Opprett ressurs

Logg inn i Altinn Studio og gå til Ressursadministrasjon for organisasjonen din:
`https://altinn.studio/resourceadm/{orgkode}/{orgkode}-resources`

Klikk **Opprett ressurs**. Gi ressursen en unik ID — denne brukes i Altinn API for å sjekke tilgang. Deretter gir du ressursen et navn.

{{% notice info %}}
Første gang du besøker Ressursadministrasjon etter å ha opprettet repository og team, kan det ta noen minutter før siden er tilgjengelig.
{{% /notice %}}

![Opprett ressurs](create_resource_1.png)

### Ressurstype

For eksterne ressurser vil typen være generisk tilgangsressurs.

![Ressurstype](create_resource_15.png)

### Tittel

Tittelen vises i tilgangsstyring og i tjenestekataloger som data.altinn.no.

Du må definere tittelen på bokmål, nynorsk og engelsk.

![Tittel](create_resource_3.png)

### Beskrivelse

Beskrivelsen vises i tilgangsstyring og i tjenestekataloger som data.altinn.no.

Du må definere beskrivelsen på bokmål, nynorsk og engelsk.

![Beskrivelse](create_resource_4.png)

### Delegeringsbeskrivelse

Hvis ressursen skal kunne delegeres, aktiverer du delegering og angir delegeringsbeskrivelse på bokmål, nynorsk og engelsk.

![Delegeringsbeskrivelse](create_resource_5.png)

### Nøkkelord

Nøkkelord kan brukes til filtrering i tjenestekataloger på et senere tidspunkt.

![Nøkkelord](create_resource_6.png)

### Status

Statusen til tjenesten ressursen peker på.

![Status](create_resource_7.png)

### Brukertyper

Definerer hvilke typer brukere som har tilgang. Brukes foreløpig kun som informasjon.

![Brukertyper](create_resource_8.png)

### Parter som kan bruke tjenesten

Definerer hvilken type brukere tjenesten er rettet mot. Kan brukes til filtrering i tjenestekatalog på et senere tidspunkt.

![Partstype](create_resource_9.png)

### Kontaktinformasjon

Kontaktinformasjon for tjenesten. Kan vises i tjenestekatalog på et senere tidspunkt.

![Kontaktinformasjon](create_resource_10.png)

## Opprett policy

Når ressursen er opprettet, må du definere policyen. Policyen må inneholde minst én regel.

Hver regel inneholder ressurs, emne og handling.

### Ressurs

Definer ressursen for regelen.

![Ressurs](create_resource_11.png)

### Handling

Definer handlingen for regelen.

![Handling](create_resource_12.png)

### Emne

Definer emnet for regelen. Du kan velge mellom ER-roller, Altinn-roller og tilgangspakker.

Les mer om [tilgangspakker og roller](/nb/authorization/what-do-you-get/accessgroups/).

![Emne](create_resource_13.png)

## Publiser

Når du er ferdig med ressursinnstillingene og policyen, kan du publisere. Du må angi en ny versjons-ID og bekrefte endringene i ressurslageret.

{{% notice info %}}
Får du en feilmelding om at det lokale lageret er ute av synk med det som finnes fra før, velger du å hente siste versjon fra serveren og prøver på nytt.
{{% /notice %}}

![Publiser](create_resource_14.png)

### Rettighet til å publisere

For å publisere ressurser må du være medlem av riktig team i Gitea. Disse teamene settes opp av administratoren i organisasjonen din. Team for din organisasjon finnes på
`https://altinn.studio/repos/org/{orgkode}/teams`

Følgende team gir tilgang til å publisere ressurser:

- **Resources-Publish-PROD**: Rettighet til å publisere til produksjon
- **Resources-Publish-TT02**: Rettighet til å publisere til TT02

## Bekreft

Når ressursen er publisert, er den tilgjengelig i ressursregisteret.

Eksempel på ressurs fra denne guiden:
[https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal)

Eksempel på policy fra denne guiden:
[https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal/policy](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ekstern-tjeneste-portal/policy)
