---
title: Opprette og publisere samtykkeressurs
linktitle: Opprette samtykkeressurs
description: Denne veiledningen forklarer hvordan du oppretter og publiserer en API-skjemaressurs via API.
toc: false
weight: 1
---

For å bruke Altinn Samtykke må du opprette samtykkeressurser for hvert sett med tjenester eller data som skal inngå i et samtykke.

Eksempler på slike ressurser er Skatteetatens "inntekts-API" og skattegrunnlag, som banker bruker for innsyn i finansielle forhold ved lånesøknader.

Denne veiledningen forklarer hvordan du setter opp en samtykkeressurs.

## Forutsetninger

Du må ha tilgang til ressursadministrasjon for din organisasjon. Se [Kom i gang-veiledningen](../../getting-started/resource-admin-studio).

## Opprett ny ressurs

Velg **Opprett ressurs** øverst til høyre.

ID for ressursen bør navngis på formen `{tjenesteeierkode}-{forståeligressursid}`.

![consentresource](consentresource1.png)

## Navn og beskrivelse

Gi samtykkeressursen et navn og en beskrivelse. Dette vises til brukere når de skal delegere tilgang til å gi samtykke på vegne av virksomheter.

![consentresource](consentresource2.png)

## Samtykkemal

Valg av samtykkemal avgjør hvordan samtykket presenteres i Altinn for brukeren som skal akseptere det.

For eksempel avgjør malen om du kan legge til egen tekst for samtykke.

![consentresource](consentresource3.png)

## Metadata og samtykketekst

Metadata brukes for samtykketjenester hvor det er behov for informasjon utover selve tjenesten. Dette kan for eksempel være en begrensning på hvilke data eller hvilket år samtykket gjelder for.

Disse metadataene kan presenteres som en del av samtykketeksten som vises til sluttbruker.

![consentresource](consentresource4.png)

## Engangssamtykke

Hvis man ønsker at tjenesten skal kun være tilgjengelig via engangsamtykke kan man sette dette.

Dette betyr at den som ber om samtykke bare kan hente ut data 1 gang uansett periodelengde.

