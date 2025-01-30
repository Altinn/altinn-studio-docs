---
title: Hvordan komme i gang
linktitle: Komme i gang
description: Lær om hvordan komme i gang med Altinn 3 Melding, for tjenesteeiere, avsendere og mottakere
tags: []
toc: false
weight: 30
---

{{<children />}}

Før du går i gang med spesifikke oppgaver som avsender, mottaker, eller tjenesteeier i Altinn Melding, er det noen grunnleggende forberedelser og krav som gjelder for alle brukere. Denne seksjonen dekker de nødvendige stegene du må gjennomføre for å sikre en smidig og effektiv oppstart. Her vil du finne veiledning om generelle systemkrav, påloggingsprosedyrer, og grunnleggende oppsett som må være på plass før du kan begynne å bruke tjenesten fullt ut. Det er viktig at alle brukere følger disse instruksjonene nøye for å unngå problemer senere i prosessen.

I samhandling med Altinn Melding kan en virksomhet ha tre ulike roller: 

- ServiceOwner/Tjenesteeier 
- Sender/Avsender 
- Recipient/Mottaker 

En virksomhet kan ha en eller flere av disse rollene. De fleste virksomheter vil ha sender og/eller mottaker, mens en tjenesteeier ofte vil ha alle tre. Å være tjenesteeier innebærer ansvaret for konfigurasjon og tilgangsstyring av tjenesten. Dette medfører at en tjenesteeier må sette opp og definere løsningen før man kan ta den i bruk. 

## 1. Registrer deg som tjenesteeier hos Altinn {#get-started-as-service-owner-in-altinn}

For å sette opp en meldingstjeneste i Altinn Melding, må virksomheten din være registrert som en tjenesteeier hos Altinn. Step by step guide finnes her:
[Kom i gang med Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette steget er kun nødvendig for nye virksomheter som ikke er etablert som en tjenesteeier i Altinn. 

## 2. Opprett eller få tilgang til ressurs {#register-a-resource-in-altinn-resource-registry}
For å kunne sende meldinger over med Altinn Melding, må de først være tilknyttet en ressurs. 
En ressurs representerer en spesifikk funksjon eller et sett av funksjoner som brukes til å administrere tilgang og regler for overføring av meldinger. 

### 2a. For tjenesteiere
Ressurser registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, som sikrer at bare autoriserte brukere kan utføre bestemte handlinger.

1. Logg inn på Altinn Studio og naviger til ressursdashboardet, Se [Ressursregister](../../authorization/guides/create-resource-resource-admin/) for en detaljert veiledning.
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten.
3. Angi tilgangsregler for ressursen. Tilgangsregler må for ressursen må konfigureres slik at de tillater følgende handlinger:
    - "read" ment for mottakere å åpne og lese en melding
    - "write" ment for avsendere å sende en melding
    - "subscribe" for å registrere hendelsesabonnement i Altinn Events

Her er en [eksempelpolicy](ExamplePolicy.xml).

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen, og krever bruk av [Ressursrettighetsregister](../../authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), og erstatt testtokenene med dine egne Altinn-token (Se forespørselen "Logg inn i Maskinporten (Initialiser)" i Authenticator-mappen).

### 2b. For avsender eller mottaker som ikke er tjenesteeier
Kontakt eieren av Meldingsressursen og spør om å få tilgang til ressursen. Oppgi følgende informasjon:
- Organisasjonsnummer
- System bruker

## 3. Skaff en Altinn API-nøkkel {#get-an-altinn-api-key}

For å bruke Altinn Melding må man ha abonnementsnøkkel. Denne får du ved ta kontakt med oss på [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).
Teknisk sett er dette en API nøkkel som må inkluderes i forespørselers `Ocp-Apim-Subscription-Key` header for å verifisere at du har rett til å bruke Meldings API-et. Uten denne nøkkelen vil forespørseler din bli avvist.


## 4. Registrer Maskinporten-klient med nødvendige scopes. {#register-your-maskinporten-client-with-correct-scopes}

Registreringen av Maskinporten-klient med nødvendige scopes er viktig for å autentisere og sikre at du kan utføre nødvendige operasjoner via meldings-APIet. Dette trinnet sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten.
For å autentisere mot meldings-APIet, må du registrere Maskinporten-klienten(e) din med det nødvendige scopet for om de skal sende og/eller motta meldinger:

- `altinn:correspondence.write` 
- `altinn:correspondence.read` 

Slike scopes vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av tilgangen satt av tjenesteeiere i steg 2 for den spesifikke meldingstjenesten.

Bruk Samarbeidsportalen for selvbetjent registrering. Følg den detaljerte guiden som er tilgjengelig der. [Her er en detaljert guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

## 5. Integrer mot meldings-APIet {#integrate-against-correspondence-api}
Siden Altinn Melding er åpen kildekode, kan du få tilgang til koden vår i [vårt offentlige GitHub-repo](https://github.com/Altinn/altinn-correspondence) og bygge en lokal Docker-instans for å teste mot.

Vi ønsker bidrag til løsningen velkommen.

Se [Readme-filen på GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for en introduksjon til Altinn 3 Melding, og hvordan du bygger og kjører den i din utviklermiljø.

Repoet inneholder også en [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-correspondence-postman-collection.json) med eksempler.

Swagger for filoverførings-APIet er vert [her](/api/correspondence/spec/).

## 6. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å kunne motta varsler om endringer eller hendelser knyttet til dine meldingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra meldingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](./developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.
