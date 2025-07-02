---
title: Kom i gang tjenesteeier
linktitle: Tjenesteeier
description: "Tjenesteeier: en offentlig virksomhet som har inngått en avtale for å konfigurere og forvalte tjenester i Altinn, for eksempel en meldingstjeneste."
tags: []
toc: false
weight: 10
---

{{<children />}}

### 1. Registrer deg som tjenesteeier hos Altinn {#get-started-as-service-owner-in-altinn}

For å sette opp en meldingstjeneste i Altinn Melding, må virksomheten din være registrert som en tjenesteeier hos Altinn. Se hvordan du går frem her:
[Kom i gang med Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette steget er kun nødvendig for nye virksomheter som ikke er etablert som en tjenesteeier i Altinn.

### 2. Opprett bruker i Altinn Studio {#register-user-altinn-studio}

For å kunne opprette en ressurs (steg 3) må du ha en bruker i Altinn Studio. Brukeren din må så knyttes til din organisasjon. (Har du allerede en Altinn Studio bruker kan du gå til steg 3.) Hvis du er usikker på hvem som er administrator eller du ikke vet om organisasjonen din er satt opp i Altinn Studio
kan du spørre [Altinn Servicedesk](mailto:tjenesteeier@altinn.no) om hjelp.

Se [Opprette bruker i Altinn Studio](https://docs.altinn.studio/nb/altinn-studio/getting-started/create-user/) for en detaljert veiledning.

### 3. Aktivere ressursadministrasjonen {#activate-resourceregistry}

For å kunne sende meldinger via Altinn Melding, må meldingen være tilknyttet en ressurs. Ressurser registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, dette sikrer at bare autoriserte brukere kan utføre bestemte handlinger.
Man aktiverer ressursadministrasjonen ved å opprette et spesifikt repo (repository) og en ressursgruppe for organisasjonen din. (Har du allerede aktivert ressursadministrasjon kan du gå til steg 4.)

Se [Ressursadministrasjon](https://docs.altinn.studio/nb/authorization/getting-started/resource-admin-studio/#opprett-ressursadministrasjonsarkivet-for-organisasjonen) for en detaljert veiledning.

### 4. Opprett en ressurs {#registeraresourceinaltinnresourceregistry}

1. Logg inn på Altinn Studio og naviger til ressursdashboardet.
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten: Se [Ressursregister](https://docs.altinn.studio/nb/authorization/guides/resource-owner/create-resource-resource-admin/#trinn-1-opprett-ressurs) for en detaljert veiledning.
3. Angi tilgangsregler for ressursen. Tilgangsregler for ressursen må konfigureres slik at de tillater følgende handlinger:
   - "read" ment for at mottakere skal kunne åpne og lese en melding.
   - "write" ment for at avsendere skal kunne sende en melding.
   - "subscribe" for å registrere hendelsesabonnement i Altinn Events.

Her er en [eksempelpolicy](https://docs.altinn.studio/nb/correspondence/getting-started/ExamplePolicy.xml).

**Viktig**: Som tjenesteeier trenger du kun å sette opp "read"-regler via tilgangspakker i GUI-et. Systemet håndterer automatisk avsenderautorisasjon for tjenesteeiere ved å bruke organisasjonsnummeret ditt fra ressurskonfigurasjonen.

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen. Med en så åpen policy er det anbefalt å bruke [Ressursrettighetsregister](https://docs.altinn.studio/nb/authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbrukeren/systembrukeren

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), og erstatt testtokenene med enten dine egne Altinn-tokens (se "Logg inn i Maskinporten (Initialiser)" forespørsel i Authenticator-mappen) eller dine Maskinporten-tokens, avhengig av hva du velger for autentiseringsmetode.

### 5. Tilgang til scopes {#get-access-to-scopes}

For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Scope-kravene avhenger av din valgte autentiseringsmetode:

**For direkte Maskinporten-autentisering (Metode 1):**
- `altinn:serviceowner` (påkrevd for tjenesteeier-tilgang)
- `altinn:correspondence.write` (påkrevd for å sende meldinger)

**For tradisjonell Altinn Token Exchange (Metode 2):**
- `altinn:correspondence.write` (påkrevd for å sende meldinger)

For å få tilgang til scopes må du sende en forespørsel til: servicedesk@altinn.no
Forespørselen må inneholde de scopes du trenger. Vær obs på at du kan trenge flere scopes for integrasjonen din enn bare altinn:correspondence.write. Utfyllende liste over scopes finner du her:
https://docs.altinn.studio/nb/api/authentication/digdirscopes/

### 6. Registrer Maskinporten-klient med nødvendige scopes {#register-your-maskinporten-client-with-correct-scopes}

For å autentisere mot meldings-API-et, må du registrere Maskinporten-klienten(e) din med nødvendige scopes for om du skal sende og/eller motta meldinger.

Scopene vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av tilgangen satt av tjenesteeiere i steg 2 for den spesifikke meldingstjenesten.

Samarbeidsportalen benyttes for selvbetjent registrering. Tjenesteeiere som ikke har signert bruksvilkår for Maskinporten må gjøre dette før de kan ta løsningen i bruk. Følg den detaljerte guiden som er tilgjengelig [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

**Merk**: Ressurspolicyen på ressursen din må ha tildelt de nødvendige scopene til organisasjonen som Maskinporten-klienten(e) din er registrert på.

### 7. Autentisering {#authentication}

For tjenesteeiere er autentisering nå mer fleksibel med to støttede metoder:

#### Metode 1: Direkte Maskinporten-autentisering (Ny - Tidligere ikke støttet)

Du kan nå autentisere direkte ved hjelp av din Maskinporten-klient med `altinn:serviceowner` og `altinn:correspondence.write` scopes.

**Fordeler:**
- **Ingen Altinn Token Exchange påkrevd**: Bruk Maskinporten-tokens direkte uten å veksle dem til Altinn-tokens

#### Metode 2: Tradisjonell Altinn Token Exchange (Støttet som før)

For tjenesteeiere som foretrekker den tradisjonelle tilnærmingen eller har eksisterende integrasjoner, kan du fortsette å:

1. Autentisere ved hjelp av din Maskinporten-klient med `altinn:correspondence.write` scope
2. [Hente et Altinn-token fra Altinn Autentisering](https://docs.altinn.studio/authentication/reference/architecture/accesstoken/)
3. Bruke Altinn-tokenet for API-kall

**Merk**: **Automatisk avsenderautorisasjon**: Systemet bestemmer og bruker automatisk organisasjonsnummeret ditt fra ressurskonfigurasjonen. Du trenger ikke lenger å spesifisere `Sender`-feltet i API-forespørslene dine (dette feltet er nå utdatert)

### 8. Integrer mot meldings-API-et {#integrate-against-correspondence-api}

Siden Altinn Melding er åpen kildekode har du tilgang til koden vår i [vårt offentlige GitHub-repo](https://github.com/Altinn/altinn-correspondence) og bygge en lokal Docker-instans for å teste mot.

Vi ønsker bidrag til løsningen velkommen.

Se [Readme-filen på GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for en introduksjon til Altinn 3 Melding, og kan kjøre koden lokalt sammen med Docker.

Repoet inneholder også en [Postman-samling](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json) med eksempler.

Swagger for meldings-APIet finner du [her](/api/correspondence/spec/).

### 9. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å kunne motta varsler om endringer eller hendelser knyttet til dine meldingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra meldingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.
