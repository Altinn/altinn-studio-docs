---
title: Felles steg for å komme i gang med Altinn Formidling
linktitle: Felles steg
description: Hvordan komme i gang med Altinn 3 Formidling, for både tjenesteeiere, avsendere og mottakere
tags: [Broker, guide, Formidling]
toc: true
weight: 10
---

{{<children />}}

Før du går i gang med spesifikke oppgaver som avsender, mottaker, eller tjenesteeier i Altinn Formidling, er det noen grunnleggende forberedelser og krav som gjelder for alle brukere. Denne seksjonen dekker de nødvendige stegene du må gjennomføre for å sikre en smidig og effektiv oppstart. Her vil du finne veiledning om generelle systemkrav, påloggingsprosedyrer, og grunnleggende oppsett som må være på plass før du kan begynne å bruke tjenesten fullt ut. Det er viktig at alle brukere følger disse instruksjonene nøye for å unngå problemer senere i prosessen.

## 1. Skaff tilgang til scopes {#get-access-to-scopes}

Registreringen av Maskinporten-klient med nødvendige scopes er viktig for å autentisere og sikre at du kan utføre nødvendige operasjoner via formidlings-API-et. Dette trinnet sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten.
For å autentisere mot Formidlings-API-et, må du registrere Maskinporten-klienten(e) din med de nødvendige scopene:

- `altinn:broker.write` - For klienter som sender filer.
- `altinn:broker.read` - For klienter som mottar filer.

Disse scopene vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av [tilgangen satt av tjenesteeiere](../service-owner#register-a-resource-in-altinn-resource-registry) for den spesifikke formidlingstjenesten.

For å få tilgang til scopes må du sende en forespørsel til: servicedesk@altinn.no 
Forespørselen må inneholde de scopes du trenger. Vær obs på at du kan trenge flere scopes for integrasjonen din enn bare altinn:broker-scopes. 
Utfyllende liste over scopes finner du her: 
https://docs.altinn.studio/nb/api/authentication/digdirscopes/ 

## 2. Registrer Maskinporten-klient med nødvendige scopes. {#register-your-maskinporten-client-with-correct-scopes}

Bruk Samarbeidsportalen for selvbetjent registrering. Følg den detaljerte guiden som er tilgjengelig der. [Her er en detaljert guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

## 3. Få tilgang til en bestemt tjeneste {#get-access-to-specific-resource}

For å få tilgang til en spesifikk formidlingstjeneste, må du kontakte tjenesteeieren og be om tilgang. Dette er med på å beskytte tjenesten mot uautorisert tilgang, og sikrer at kun legitime brukere kan operere tjenesten. (I fremtiden vil dette bli håndtert gjennom løsningen)
Oppgi følgende informasjon:

- Organisasjonsnummeret du vil representere
- Systembrukeren

{{% notice warning  %}}
Dette vil i fremtiden håndteres av Systembruker / Ressurssregister / Tilgangslister via GUI.
{{% /notice %}}

**Hvis du er en tjenesteeier som oppretter din første formidlingstjeneste, trenger du ikke følge dette steget. I stedet kan du gå videre til [Tjenesteeier](../service-owner/) for en detaljert beskrivelse av hvordan du oppretter og administrerer formidlingstjenester.**

## 4. Integrer mot Formidlings-API-et {#integrate-against-broker-api}

Du er nå klar til å begynne integreringen mot Formidlings API-ene. For neste trinn se [utviklerveiledningene](../developer-guides/).

## 5. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å kunne motta varsler om endringer eller hendelser knyttet til dine formidlingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra formidlingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](../developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.
