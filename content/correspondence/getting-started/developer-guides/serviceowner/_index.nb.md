---
title: Kom i gang tjenesteeier
linktitle: Tjenesteeier
description: "Tjenesteeier: en offentlig virksomhet som har inngått en avtale for å konfigurere og forvalte tjenester i Altinn, for eksempel en meldingstjeneste."
tags: []
toc: false
weight: 10
---

{{<children />}}

{{% expandlarge id="get-started-as-service-owner-in-altinn" header="1. Registrer deg som tjenesteeier hos Altinn" %}}

For å sette opp en meldingstjeneste i Altinn Melding, må virksomheten din være registrert som en tjenesteeier hos Altinn. Se hvordan du går frem her:
[Kom i gang med Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/).

Dette steget er kun nødvendig for nye virksomheter som ikke er etablert som en tjenesteeier i Altinn.
{{% /expandlarge %}}

{{% expandlarge id="register-user-altinn-studio" header="2. Opprett bruker i Altinn Studio" %}}

For å kunne opprette en ressurs (steg 3) må du ha en bruker i Altinn Studio. Brukeren din må så knyttes til din organisasjon. (Har du allerede en Altinn Studio bruker kan du gå til steg 3.) Hvis du er usikker på hvem som er administrator eller du ikke vet om organisasjonen din er satt opp i Altinn Studio
kan du spørre [Altinn Servicedesk](mailto:tjenesteeier@altinn.no) om hjelp.

Se [Opprette bruker i Altinn Studio](https://docs.altinn.studio/nb/altinn-studio/v8/getting-started/create-user/) for en detaljert veiledning.
{{% /expandlarge %}}

{{% expandlarge id="activate-resourceregistry" header="3. Aktivere ressursadministrasjonen" %}}

For å kunne sende meldinger via Altinn Melding, må meldingen være tilknyttet en ressurs. Ressurser registreres via Altinn Studio og brukes til å definere tilgangsregler og tilgangslister, dette sikrer at bare autoriserte brukere kan utføre bestemte handlinger.
Man aktiverer ressursadministrasjonen ved å opprette et spesifikt repo (repository) og en ressursgruppe for organisasjonen din. (Har du allerede aktivert ressursadministrasjon kan du gå til steg 4.)

Se [Ressursadministrasjon](https://docs.altinn.studio/nb/authorization/getting-started/resource-admin-studio/#opprett-ressursadministrasjonsarkivet-for-organisasjonen) for en detaljert veiledning.
{{% /expandlarge %}}

{{% expandlarge id="registeraresourceinaltinnresourceregistry" header="4. Opprett en ressurs" %}}

1. Logg inn på Altinn Studio og naviger til ressursdashboardet.

      *Obs. I forbindelse med Altinns migrering av eksisterende meldinger, opprettes det nye ressurser i deres (tjenesteeiers) ressursdashboard. Disse meldingsressursene er altså kun til bruk for Altinn II meldinger og skal ikke benyttes for nye utsendelser. Ressursene kjennes igjen ved at de inneholder "migratedcorrespondence" i ressurs-id. Se [Overgangsløsning](https://docs.altinn.studio/nb/correspondence/transition/) for mer informasjon.*
2. Opprett ny ressurs, følg veiledningen og fyll inn nødvendig informasjon og detaljer om tjenesten. Se [Ressursregister](https://docs.altinn.studio/nb/authorization/guides/resource-owner/create-resource-resource-admin/#trinn-1-opprett-ressurs) for en detaljert veiledning.
3. Opprett policy: her angis tilgangsregler for ressursen. Tilgangsregler for ressursen må konfigureres slik at de tillater følgende handlinger:
   - "read" ment for at mottakere skal kunne åpne og lese en melding.
   - "write" ment for at avsendere skal kunne sende en melding.
   - "subscribe" for å registrere hendelsesabonnement i Altinn Events.
4. Altinn II rollene erstattes av tilgangspakker i Altinn 3. Frem til juni 2026 anbefaler vi at man setter både roller og tilgangspakker på ressursen. Det er viktig å ta en grundig vurdering på hvilken tilgangspakke ressursen skal ha. 
   - **Vanlig post:** Den gamle Altinn II rollen "Post/arkiv" erstattes av tilgangspakken "Ordinær post til virksomheten".
   - **Taushetsbelagt post:** Dersom ressursen skal være taushetsbelagt må dere: 
      - velge tilgangspakken "Post til virksomheten med taushetsbelagt innhold"
      - sende med flagget "IsConfidential" satt til: "true".

         Les mer om taushetsbelagt post [her](https://docs.altinn.studio/nb/correspondence/explanation/taushetsbelagt-post/).

**Eksempelpolicy:**

Merk at denne eksempelpolicyen angir en påkrevd brukerrolle "DAGL(daglig leder)" for brukeren som har tilgang til ressursen. Med en så åpen policy er det anbefalt å bruke [Ressursrettighetsregister](https://docs.altinn.studio/nb/authorization/what-do-you-get/resourceregistry/) (gå til engelsk språk for å se dokumentasjon for RRR) for å gi tilgang til spesifikke organisasjoner.
En bruker med denne tilgangen kan deretter delegere tilgangen til virksomhetsbruker/systembruker.

{{% notice warning  %}}
**Viktig**: Som tjenesteeier trenger du kun å sette opp "read"-regler via tilgangspakker i GUI-et.
{{% /notice %}}

Her er [eksempelpolicyen](https://docs.altinn.studio/nb/correspondence/getting-started/ExamplePolicy.xml).

**TIPS**: Verifiser konfigurasjonene dine ved hjelp av [Postman-samlingen](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json), og erstatt testtokenene med enten dine egne Altinn-tokens (se "Logg inn i Maskinporten (Initialiser)" forespørsel i Authenticator-mappen) eller dine Maskinporten-tokens, avhengig av hva du velger for autentiseringsmetode.
{{% /expandlarge %}}

{{% expandlarge id="get-access-to-scopes" header="5. Tilgang til scopes" %}}

For å kunne autentisere og sikre at du kan utføre operasjoner via meldings-APIet, må Altinn gi deg tilgang på de scopes du trenger. Scope-kravene avhenger av din valgte autentiseringsmetode:

**For direkte Maskinporten-autentisering (Metode 1):**
- `altinn:serviceowner` (påkrevd for tjenesteeier-tilgang)
- `altinn:correspondence.write` (påkrevd for å sende meldinger)

**For tradisjonell Altinn Token Exchange (Metode 2):**
- `altinn:correspondence.write` (påkrevd for å sende meldinger)

For å få tilgang til scopes må du sende en forespørsel til: servicedesk@altinn.no
Forespørselen må inkludere de scope-ene du trenger. Vær oppmerksom på at integrasjonen kan kreve flere scope-er enn bare `altinn:correspondence.write`. Se hele oversikten over tilgjengelige scope-er i [dokumentasjonen for Digdir-scopes](https://docs.altinn.studio/nb/api/authentication/digdirscopes/).
{{% /expandlarge %}}

{{% expandlarge id="register-your-maskinporten-client-with-correct-scopes" header="6. Registrer Maskinporten-klient med nødvendige scopes" %}}

For å autentisere mot meldings-API-et, må du registrere Maskinporten-klienten(e) din med nødvendige scopes for om du skal sende og/eller motta meldinger.

Scopene vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av tilgangen satt av tjenesteeiere i steg 2 for den spesifikke meldingstjenesten.

Samarbeidsportalen benyttes for selvbetjent registrering. Tjenesteeiere som ikke har signert bruksvilkår for Maskinporten må gjøre dette før de kan ta løsningen i bruk. Følg den detaljerte guiden som er tilgjengelig [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

**Merk**: Ressurspolicyen på ressursen din må ha tildelt de nødvendige scopene til organisasjonen som Maskinporten-klienten(e) din er registrert på.
{{% /expandlarge %}}

{{% expandlarge id="authentication" header="7. Autentisering" %}}

For tjenesteeiere er autentisering nå mer fleksibel med to støttede metoder:

#### Metode 1: Direkte Maskinporten-autentisering

Du kan nå autentisere direkte ved hjelp av din [Maskinporten-klient](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html) med `altinn:serviceowner` og `altinn:correspondence.write` scopes.

**Fordeler:**
- **Ingen Altinn Token Exchange påkrevd**: Bruk Maskinporten-tokens direkte uten å veksle dem til Altinn-tokens

#### Metode 2: Tradisjonell Altinn Token Exchange

For tjenesteeiere som foretrekker den tradisjonelle tilnærmingen eller har eksisterende integrasjoner, kan du fortsette å:

1. Autentisere ved hjelp av din Maskinporten-klient med `altinn:correspondence.write` scope
2. [Hente et Altinn-token fra Altinn Autentisering](https://docs.altinn.studio/nb/authorization/getting-started/authentication/#bytt-et-jwt-fra-en-ekstern-tokenleverandør)
3. Bruke Altinn-tokenet for API-kall

**Merk**: **Automatisk avsenderautorisasjon**: Systemet bestemmer og bruker automatisk organisasjonsnummeret ditt fra ressurskonfigurasjonen. Du trenger ikke lenger å spesifisere `Sender`-feltet i API-forespørslene dine (dette feltet er nå utdatert)
{{% /expandlarge %}}

{{% expandlarge id="integrate-against-correspondence-api" header="8. Integrer mot meldings-API-et" %}}

Siden Altinn Melding er åpen kildekode har du tilgang til koden vår i [vårt offentlige GitHub-repo](https://github.com/Altinn/altinn-correspondence) og bygge en lokal Docker-instans for å teste mot.

Vi ønsker bidrag til løsningen velkommen.

Se [Readme-filen på GitHub](https://github.com/Altinn/altinn-correspondence/blob/main/README.md) for en introduksjon til Altinn 3 Melding, og kan kjøre koden lokalt sammen med Docker.

Repoet inneholder også en [Postman-samling](https://github.com/Altinn/altinn-correspondence/blob/main/altinn-correspondence-postman-collection.json) med eksempler.

Swagger for meldings-APIet finner du [her](/nb/api/correspondence/spec/).
{{% /expandlarge %}}

{{% expandlarge id="test-appearance-formatting" header="9. Test oppsett og formatering i Arbeidsflate og Altinn 2-innboks" %}}

Før produksjonssetting bør du verifisere at meldinger vises riktig for mottakere.

1. Send en testmelding til en testmottaker via ønsket verktøy (Postman, SDK eller din integrasjon).
2. Verifiser i Arbeidsflate:
   - Logg inn som testmottaker på [af.tt.altinn.no](https://af.tt.altinn.no/).
   - Sjekk at innholdet i testmeldingen er formatert som tiltenkt.
3. Verifiser i Altinn 2-innboks:
   - Logg inn som testmottaker på [info.tt02.altinn.no](https://info.tt02.altinn.no/).
   - Sjekk at innholdet i testmeldingen er formatert som tiltenkt.

**Merk**: Støttede formateringstagger (Markdown og HTML) er dokumentert her: [Oversikt over tillatte markdown og HTML tagger](https://docs.altinn.studio/nb/dialogporten/reference/front-end/front-channel-embeds/#markdown-og-html)
{{% /expandlarge %}}

{{% expandlarge id="set-up-event-subscriptions" header="10. Sett opp hendelsesabonnementer" %}}

For å kunne motta varsler om endringer eller hendelser knyttet til dine meldingstjenester, må du sette opp et abonnement for den aktuelle tjenesten.
Dette trinnet er spesielt viktig for deg som ønsker å få automatiserte varsler om hendelser fra meldingstjenesten. Hvis du ikke trenger varsler, kan du hoppe over dette trinnet.
Se [utviklerveiledningen for events](https://docs.altinn.studio/nb/correspondence/getting-started/developer-guides/events) for detaljerte instruksjoner om hvordan du setter opp abonnementet.
{{% /expandlarge %}}


### Kontakt oss:

Du når oss på vår Slack kanal Digdir samarbeid: [produkt-melding](https://digdir-samarbeid.slack.com/archives/C068VA4SXFD)

Eller ved å sende forespørsel til: [servicedesk@altinn.no](mailto:servicedesk@altinn.no)