---
title: Hvordan komme i gang
linktitle: Komme i gang
description: Lær om hvordan komme i gang med Altinn 3 Melding, for tjenesteeiere, avsendere og mottakere
tags: []
toc: false
weight: 30
---

{{<children />}}

Du kan enten bruke Altinn som tjenesteeier for å sende meldinger eller du kan integrere deg mot Altinn som sluttbrukersystem for å vise meldinger.

Tjenesteeier: en offentlig virksomhet som har inngått en avtale for å konfigurere og forvalte tjenester i Altinn, for eksempel en meldingstjeneste. 

Systemleverandør: tilbyr sluttbrukersystem som håndterer mottak og lagring av Altinn Melding, gjennom en maskin-til-maskin-integrasjon.

{{% expandlarge id="kom-i-gang-tjenesteeier" header="Tjenesteeier" %}}

### 1. Registrer deg som tjenesteeier hos Altinn {#get-started-as-service-owner-in-altinn}

For å sette opp en meldingstjeneste i Altinn Melding, må virksomheten din være registrert som en tjenesteeier hos Altinn. Step by step guide finnes her:
[Kom i gang med Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette steget er kun nødvendig for nye virksomheter som ikke er etablert som en tjenesteeier i Altinn. 

### 2. Opprett eller få tilgang til ressurs {#register-a-resource-in-altinn-resource-registry}
For å kunne sende meldinger over med Altinn Melding, må de først være tilknyttet en ressurs. Ressurser registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, som sikrer at bare autoriserte brukere kan utføre bestemte handlinger.

1. Logg inn på Altinn Studio og naviger til ressursdashboardet, Se [Ressursregister](../../authorization/guides/create-resource-resource-admin/) for en detaljert veiledning.
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten.
3. Angi tilgangsregler for ressursen. Tilgangsregler må for ressursen må konfigureres slik at de tillater følgende handlinger:
    - "read" ment for mottakere å åpne og lese en melding
    - "write" ment for avsendere å sende en melding
    - "subscribe" for å registrere hendelsesabonnement i Altinn Events

Her er en [eksempelpolicy](ExamplePolicy.xml).

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen. Med en så åpen policy er det anbefalt å bruke [Ressursrettighetsregister](../../authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), og erstatt testtokenene med dine egne Altinn-token. (Se forespørselen "Logg inn i Maskinporten (Initialiser)" i Authenticator-mappen.)

### 3. Skaff Altinn API-nøkkel og tilgang til scopes {#get-an-altinn-api-key}
For å bruke Altinn Melding må man ha en abonnementsnøkkel. Teknisk sett er dette en API-nøkkel som må inkluderes i forespørselens `Ocp-Apim-Subscription-Key` header for å verifisere at du har rett til å bruke Meldings API-et. Uten denne nøkkelen vil forespørselen din bli avvist.
For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Dette sikrer at kun autoriserte klienter kan sende og motta filer, og opprettholder dermed sikkerheten i tjenesten. Følgende scopes brukes for å sende og/eller motta meldinger:
- `altinn:correspondence.write` 
- `altinn:correspondence.read` 

For å få Altinn API-nøkkel og scopes må du sende en forespørsel til: servicedesk@altinn.no 
Forespørselen må inneholde de scopes du trenger. Vær obs på at du kan trenge flere scopes for integrasjonen din enn bare altinn:correspondence.write/altinn:correspondence.read. 
Utfyllende liste over scopes finner du her: 
https://docs.altinn.studio/nb/api/authentication/digdirscopes/ 

### 4. Registrer Maskinporten-klient med nødvendige scopes. {#register-your-maskinporten-client-with-correct-scopes}
For å autentisere mot meldings-APIet, må du registrere Maskinporten-klienten(e) din med nødvendige scopes for om du skal sende og/eller motta meldinger:
Scopene vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av tilgangen satt av tjenesteeiere i steg 2 for den spesifikke meldingstjenesten.

Bruk Samarbeidsportalen for selvbetjent registrering. Følg den detaljerte guiden som er tilgjengelig der. [Her er en detaljert guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

### 5. Integrer mot meldings-APIet {#integrate-against-correspondence-api}
Siden Altinn Melding er åpen kildekode har du tilgang til koden vår i [vårt offentlige GitHub-repo](https://github.com/Altinn/altinn-correspondence) og bygge en lokal Docker-instans for å teste mot.

Vi ønsker bidrag til løsningen velkommen.

Se [Readme-filen på GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for en introduksjon til Altinn 3 Melding, og kan kjøre koden lokalt sammen med Docker.

Repoet inneholder også en [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-correspondence-postman-collection.json) med eksempler.

Swagger for meldings-APIet finner du [her](/api/correspondence/spec/).

### 6. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å kunne motta varsler om endringer eller hendelser knyttet til dine meldingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra meldingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](./developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.

{{% /expandlarge %}}

{{% expandlarge id="kom-i-gang-systemleverandor" header="Systemleverandør" %}}

For å komme i gang som systemleverandør følg denne veiledningen: 
https://docs.altinn.studio//authentication/guides/systemauthentication-for-systemproviders/

{{% /expandlarge %}}