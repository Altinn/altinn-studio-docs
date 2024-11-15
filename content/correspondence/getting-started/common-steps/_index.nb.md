---
title: Felles steg for å komme i gang med Altinn Melding
linktitle: Felles steg
description: Hvordan komme i gang med Altinn 3 Melding, for både tjenesteeiere, avsendere og mottakere
tags: [Correspondence, guide, Melding]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
Dette avsnittet av dokumentasjonen er under arbeid.
Det er deler som mangler eller bare delvis er dokumentert.
Noen funksjoner representerer ikke den endelige produksjonsversjonen.
{{% /notice %}}

Før du går i gang med spesifikke oppgaver som avsender, mottaker, eller tjenesteeier i Altinn Melding, er det noen grunnleggende forberedelser og krav som gjelder for alle brukere. Denne seksjonen dekker de nødvendige stegene du må gjennomføre for å sikre en smidig og effektiv oppstart. Her vil du finne veiledning om generelle systemkrav, påloggingsprosedyrer, og grunnleggende oppsett som må være på plass før du kan begynne å bruke tjenesten fullt ut. Det er viktig at alle brukere følger disse instruksjonene nøye for å unngå problemer senere i prosessen.

## 1. Skaff deg en Altinn API-nøkkel {#get-an-altinn-api-key}

Først må du skaffe en abonnementsnøkkel fra Altinn. Når du sender en forespørsel til API-et, må du inkludere abonnementsnøkkelen i forespørselens `Ocp-Apim-Subscription-Key` header. Inkluderingen av abonnementsnøkkelen i forespørselen er nødvendig for at Altinn skal kunne verifisere at du har rett til å bruke API-et. Uten denne nøkkelen vil forespørselen din bli avvist. Dersom du mangler en API-nøkkel for Maskinporten-klientene du planlegger å bruke mot meldingstjenesten, ta kontakt med oss på [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).

## 2. Registrer Maskinporten-klient med nødvendige scopes. {#register-your-maskinporten-client-with-correct-scopes}

Registreringen av Maskinporten-klient med nødvendige scopes er viktig for å autentisere og sikre at du kan utføre nødvendige operasjoner via meldings-APIet. Dette trinnet sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten.
For å autentisere mot meldings-APIet, må du registrere Maskinporten-klienten(e) din med det nødvendige scopet for om de skal sende og/eller motta meldinger:

- `altinn:correspondence.write` 
- `altinn:correspondence.read` 

Slike scopes vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av [tilgangen satt av tjenesteeiere](../service-owner#register-a-resource-in-altinn-resource-registry) for den spesifikke meldingstjenesten.

Bruk Samarbeidsportalen for selvbetjent registrering. Følg den detaljerte guiden som er tilgjengelig der. [Her er en detaljert guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

## 3. Få tilgang til en bestemt tjeneste {#get-access-to-specific-resource}

For å få tilgang til en spesifikk meldingsstjeneste, må du kontakte tjenesteeieren og be om tilgang. Dette er med på å beskytte tjenesten mot uautorisert tilgang, og sikrer at kun legitime brukere kan operere tjenesten. (I fremtiden vil dette bli håndtert gjennom løsningen)
Oppgi følgende informasjon:

- Organisasjonsnummeret du vil representere
- Systembrukeren

{{% notice warning  %}}
Dette vil i fremtiden håndteres av Systembruker / Ressurssregister / Tilgangslister via GUI.
{{% /notice %}}

**Hvis du er en tjenesteeier som oppretter din første meldingstjeneste, trenger du ikke følge dette steget. I stedet kan du gå videre til [Tjenesteeier](../service-owner/) for en detaljert beskrivelse av hvordan du oppretter og administrerer meldingstjenester.**

## 4. Integrer mot meldings-APIet {#integrate-against-correspondence-api}

Du er nå klar til å begynne integreringen mot meldingsAPIene. For neste trinn se [utviklerveiledningene](../developer-guides/).

## 5. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å kunne motta varsler om endringer eller hendelser knyttet til dine meldingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra meldingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](../developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.
