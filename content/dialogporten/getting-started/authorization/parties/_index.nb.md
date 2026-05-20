---
title: "Parter"
description: "Lær om parter og hvordan de er relatert til dialoger"
weight: 5
toc: true
---

## Introduksjon

I Altinn er en part enten en person som er registrert i [Folkeregisteret](https://www.skatteetaten.no/en/person/national-registry/), eller en organisasjon som er registrert i [Enhetsregisteret](https://www.brreg.no/en/about-us-2/our-registers/about-the-central-coordinating-register-for-legal-entities-ccr/).

Alle [dialoger](/nb/dialogporten/getting-started/dialogs/) er assosiert med en part. Avhengig av konteksten til dialogen, er dette enten

- mottakeren av en melding som sendes fra en offentlig aktør
- personen eller organisasjonen som er ansvarlig for å sende inn en rapport til en offentlig aktør (f.eks. månedlig arbeidsgiverrapport, "A-meldingen")
- personen eller organisasjonen som sender inn en søknad til en offentlig aktør (f.eks. søke om tilskudd, eller en tillatelse)

Siden Dialogporten benytter autorisasjonsmodellen i [Altinn Authorization](/nb/authorization/about/), må alle autentiserte brukere (dvs. personer eller systemer) være autorisert til å representere parten for [service resource](/nb/dialogporten/getting-started/authorization/service-resource/) som dialogen er assosiert med.

{{% notice info %}}
"Aktør" og "avgiver" er andre begreper som i andre eller historiske sammenhenger brukes for å beskrive en "part".
{{% /notice %}}

## Autoriserte parter

Ved å bruke APIer levert av [Altinn Access Management](/nb/authorization/what-do-you-get/), lar Dialogporten autentiserte brukere få en liste over alle parter de er autorisert til å representere i enhver kapasitet. Denne listen blir også referert til som "aktørlisten" eller i Altinn 2 som "avgiverlisten".

Denne listen kan brukes av sluttbrukersystemer som en aktørvalgsmekanisme, slik at sluttbrukeren kan velge parten de vil representere, og danne grunnlaget for påfølgende forespørsler til Dialogporten for å [finne dialoger](/nb/dialogporten/user-guides/searching-for-dialogs/).

**Les mer**

- {{<link "../service-resource">}}
- {{<link "../../../user-guides/authorized-parties">}}
- {{<link "../../../reference/authorization/parties">}}
