---
title: "Systembruker – endringer for systemleverandører og virksomheter"
description: "Hva den utvidede systembrukermodellen betyr for systemleverandører og virksomhetene som godkjenner og forvalter systembrukere. Eksisterende integrasjoner virker som før."
type: systemuser-discussion
arialabel: "Endringer i systembruker for systemleverandører og virksomheter"
hidden: true
outputs: [HTML]
build:
  list: never
  render: always
---
# Systembruker

## Hva endrer seg for systemleverandører og virksomheter?

Oppdatert 23. november 2026

**Det du har laget i dag, virker som før.** Endringene gir nye muligheter som du kan ta i bruk når du vil.

Funksjonaliteten er under utvikling og er ikke tilgjengelig ennå. Vi sender endringene på høring og vil gjerne ha innspill. Navnet på `clientAccessSets` kan endre seg før lansering.

---
## Hvorfor endrer vi systembruker nå?

Systembruker er ganske nytt, og vi endrer det allerede. Det har tre grunner:

- **Vi lytter til tilbakemeldingene.** Vi utvikler systembruker stegvis og vil gi dere fordelene så fort som mulig.
- **Systembruker kom før mye av tilgangsstyringen var på plass.** Nå flytter vi systembruker over på den vanlige funksjonaliteten i Altinn.
- **Det gir et bedre utgangspunkt for veien videre.**

Det du har laget i dag, virker som før. Du tar i bruk det nye når du er klar.

---
## Det viktigste

- **Ingen endring for eksisterende integrasjoner.** Versjon 1 av API-et og dagens systembrukere virker uendret. De nye feltene kommer i versjon 2.
- **Du velger hvem som bestemmer tilgangene.** Versjon 2 krever flagget `vendorLocked`. Med `false` kan virksomheten justere tilgangene etter at den har godkjent. Versjon 1 gir alltid `true`, som i dag.
- **Én systembruker for alle kundetyper.** Med rettighetssett kan ett selskap bruke samme systembruker for regnskapsfører-, revisor- og uregistrerte kunder. Du trenger ikke vite kundeforholdet for å hente token.
- **Én systembruker for egen virksomhet og klienter.** Du trenger ikke lenger velge mellom systembruker for eget system og for klientsystem.
- **Enkeltrettigheter også for klienter.** I dag kan du bare be om tilgangspakker for klientsystem.
- **Forespørselen bestemmer rettighetene.** I versjon 2 trenger du ikke registrere hver rettighet på systemet først.
- **Du kan legge til nye rettighetssett og be om flere tilganger.** Du slipper å opprette en ny systembruker når det for eksempel kommer nye tilgangspakker. For egen virksomhet kan du be kunden om flere tilganger med en forespørsel.
- **Tomme lister for egen virksomhet er lov.** Forespørselen må da ha rettighetssett eller `vendorLocked: false`. Kunden trenger bare å være tilgangsstyrer for å godkjenne.

---
## Det du har laget i dag, virker som før

| Det du bruker i dag | Etter endringen |
|---|---|
| Forespørsel om systembruker for eget system med `rights` og `accessPackages` | Virker som før i versjon 1. De nye feltene finnes bare i versjon 2. |
| Forespørsel om systembruker for klientsystem (`/request/vendor/agent`) | Virker som før. |
| Endringsforespørsel (`/changerequest/vendor`) | Virker som før. |
| Klientdelegerings-API-et | Virker som før. |
| Systembrukere kundene dine allerede har godkjent | Beholder tilgangene og oppførselen sin, og får `vendorLocked: true`. Ingen systembruker går over til «Virksomheten bestemmer» av seg selv. |
| Klienter som er knyttet til systembrukerne dine | Blir der de er. Altinn flytter dem ikke automatisk. |
| Brukerstyrt opprettelse fra systemer i systemregisteret | Virker som før, med rettighetene som er registrert på systemet. |

Systembrukere du ber om i versjon 1, får alltid `vendorLocked: true`. Det gir samme oppførsel som i dag.

---
## Forbedring 1: Kunden kan styre tilgangene selv

Det nye flagget `vendorLocked` bestemmer hvem som forvalter tilgangene etter at kunden har godkjent. Flagget er påkrevd i versjon 2, så du må velge for hver forespørsel. Vi kaller de to måtene «Leverandøren bestemmer» og «Virksomheten bestemmer».

Når virksomheten bestemmer, blir systembrukeren likere vanlige brukere. Virksomheten gir og fjerner tilganger i Tilgangsstyring, slik de gjør for personer og virksomheter.

| | Leverandøren bestemmer | Virksomheten bestemmer |
|---|---|---|
| `vendorLocked` | `true`, som i dag | `false` |
| Listene for egen virksomhet | Bindende | Et forslag kunden starter med |
| Rettighetssett for klienter | Bindende | Ikke lov. Virksomheten velger hva hver klient gir |
| Hvem endrer tilgangene etterpå | Du, med endringsforespørsel eller endepunktet for rettighetssett | Kunden selv, i Tilgangsstyring |
| Kan kunden fjerne én tilgang | Nei, bare slette hele systembrukeren | Ja |
| Kan kunden legge til tilganger | Nei | Ja, men bare det de selv har lov til å gi |
| Kan du be om flere tilganger for egen virksomhet | Ja, med en forespørsel om tilgang | Ja, med en forespørsel om tilgang |

Du kan fjerne låsen etter at systembrukeren er opprettet, altså gå fra `vendorLocked: true` til `false`. Virksomheten trenger ikke godkjenne det. Altinn sletter da rettighetssettene, men klientene beholder det de har gitt systembrukeren, og virksomheten kan endre det fritt. Du kan ikke låse en systembruker som har vært åpen. Flagget gjelder bare forespørsler du sender selv. Forespørsler til versjon 1 får alltid `true`.

Rettighetssett forklarer vi på de neste lysbildene.

---
## Forbedring 2: Én systembruker for alle kundetyper

**I dag** har hver systembruker ett fast sett tilgangspakker. Et regnskapsselskap trenger derfor én systembruker per kundetype. Du må vite kundeforholdet til klienten for å velge riktig systembruker før du henter token.

**Etter endringen** holder det med én systembruker. Du beskriver hva som er gyldig for hver kundetype, og henter token på samme måte for alle klienter.

| Kundetype | Slik oppstår kundeforholdet | Selskapet får |
|---|---|---|
| Registrert regnskapsfører | Klienten melder inn selskapet i Samordnet registermelding. Enhetsregisteret får rollen REGN. | Regnskapsførerpakkene, automatisk |
| Registrert revisor | Klienten melder inn selskapet i Samordnet registermelding. Enhetsregisteret får rollen REVI. | Revisorpakkene, automatisk |
| Uregistrert kunde | Klienten delegerer direkte i Altinn. | Det klienten gir, typisk A-ordningen |

---
## Slik virker rettighetssett

Et **rettighetssett** er tilgangspakker og enkeltrettigheter som hører sammen. Du lager ett sett for hver måte en klient kan gi tilgang på.

**Det betyr for deg som bruker API-et:**

- Du sender rettighetssettene i `clientAccessSets` i forespørselen. Hvert sett har en id du velger selv, og id-en er nøkkelen til settet.
- Rekkefølgen på settene bestemmer rekkefølgen på radene i brukerlisten. Du oppgir ikke noe tall.
- Du kan ikke endre eller slette et sett etter at kunden har godkjent forespørselen. Du kan legge til nye sett.
- Altinn bruker id-en når virksomheten knytter en klient til systembrukeren. Da er det klart hvilket sett klienten har fått.
- Du henter token på samme måte for alle klienter.
- Alle settene bør dekke de samme tjenestene. Ellers må du fortsatt vite hvilket sett klienten fikk.

**Det skjer når virksomheten legger til en klient:**

- Når leverandøren bestemmer, må klienten ha gitt alt i minst ett sett. Ellers kan ikke virksomheten legge til klienten, og flaten viser hva som mangler.
- Hvert sett er en egen rad i brukerlisten, for eksempel «Personalportalen – Registrert regnskapsfører». Det er fortsatt én systembruker og ett token.
- Virksomheten åpner raden og knytter klienter til settet, én og én eller med **Legg til alle**. En klient kan være knyttet til flere sett.
- Rettighetssett krever `vendorLocked: true`. Når virksomheten bestemmer, finnes det ingen sett, og virksomheten velger blant det klienten har gitt.

---
## Forbedring 3: Én systembruker for egen virksomhet og klienter

**I dag** må du velge type når du ber om systembruker. Et regnskapssystem som både leverer for regnskapsbyrået selv og for kundene deres, trenger to systembrukere.

**Etter endringen** kan én forespørsel til versjon 2 inneholde begge deler:

| Felt | Gjelder | Status |
|---|---|---|
| `accessPackages` | Tilgangspakker for egen virksomhet | Finnes i dag |
| `rights` | Enkeltrettigheter for egen virksomhet | Finnes i dag |
| `clientAccessSets` | Rettighetssett for klienter, med id som nøkkel. Rekkefølgen bestemmer rekkefølgen på radene | Nytt, foreløpig navn |
| `vendorLocked` | Hvem som bestemmer tilgangene etter godkjenning | Nytt, påkrevd |

Kunden godkjenner én systembruker. Tilgangene for egen virksomhet får systembrukeren når kunden godkjenner. Tilgangene for klienter får den når virksomheten knytter klienter til systembrukeren.

---
## Forbedring 4: Enkeltrettigheter også for klienter

**I dag** kan systembruker for klientsystem bare få tilgangspakker. Har kunden din fått en enkelttjeneste fra klienten sin, kan de ikke gi den videre til systemet ditt.

**Etter endringen** kan et rettighetssett inneholde enkeltrettigheter. Virksomheten kan da klientdelegere enkelttjenester til systembrukeren, sammen med tilgangspakkene i settet.

Tre regler gjelder:

- Virksomheten kan bare gi videre enkelttjenester den har fått som enkelttjeneste fra klienten. Tjenester den har fått gjennom en tilgangspakke, kan den ikke gi videre én og én.
- Du oppgir ikke `action` i rettighetssett i første versjon. Trenger du finere styring, bruker du tilgangspakker.
- Systembrukeren får de samme handlingene, for eksempel lese og skrive, som klienten har gitt virksomheten.

---
## Forbedring 5: Forespørselen bestemmer rettighetene

**I dag** avviser Altinn en forespørsel som inneholder rettigheter du ikke har registrert på systemet i systemregisteret. Vil du be om en ny rettighet, må du først oppdatere systemet.

**Etter endringen** er det listene og rettighetssettene i forespørselen som bestemmer rettighetene i versjon 2. Systemregisteret verken fyller ut, erstatter eller begrenser dem. Versjon 1 virker som før.

Det betyr at du kan

- be om ulike rettigheter for ulike kunder av samme system
- be om bare det kunden faktisk trenger, i stedet for alt systemet kan gjøre
- legge til en ny tjeneste uten å oppdatere systemregisteret først

Altinn kontrollerer fortsatt at rettighetene finnes, at det går an å delegere dem, og at kunden har myndighet til å gi dem.

**Systemregisteret består.** Du må fortsatt registrere systemet. Det er bare rettighetene som er frikoblet fra registeret. Listene over rettigheter på systemet gjelder bare i versjon 1, og når brukeren selv oppretter en systembruker fra et system i registeret.

---
## Forbedring 6: Du kan legge til nye rettighetssett

**I dag** kan du ikke endre en systembruker for klientforhold. Du må slette den og opprette den på nytt.

**Etter endringen** får du et eget endepunkt for å legge til nye rettighetssett på en systembruker, for eksempel når det kommer nye tilgangspakker. Foreløpig forslag til adresse:

```http
POST /authentication/api/v2/systemuser/vendor/{systemUserId}/clientaccesssets
```

- **Du kan ikke endre eller slette et sett.** Trenger du andre tilganger, legger du til et nytt sett med en ny id.
- **Det nye settet blir en ny rad i brukerlisten,** etter radene for settene du har fra før.
- **Altinn knytter ingen klienter til det nye settet.** Virksomheten åpner raden og legger klientene til, én og én eller med **Legg til alle**.
- **Klientene i de gamle settene beholder det de har.** Altinn verken gir eller fjerner tilganger. Virksomheten kan selv fjerne klienter fra et gammelt sett.
- **Endepunktet gjelder bare når leverandøren bestemmer.** Med `vendorLocked: false` gir det valideringsfeil.
- **Systemet ditt må tåle at klientene står i ulike sett.** Til virksomheten har lagt klienten til i det nye settet, kan kall til den nye tjenesten bli avvist for klienten.
- **Du kan ikke be klientene om tilgangene gjennom API-et.** Det er ikke planlagt i denne endringen. Virksomheten må be klientene om det som mangler.

---
## Forbedring 7: Du kan be om flere tilganger for egen virksomhet

**I dag** kan du bare be om nye tilganger til en systembruker med en endringsforespørsel.

**Etter endringen** kan du også be kunden om flere tilganger for egen virksomhet med API-et for forespørsler om tilgang. Sluttbrukersystemer bruker det samme API-et i dag.

```http
/accessmanagement/api/v1/enduser/request
```

- Du kan be om tilgangspakker og enkeltrettigheter.
- Det gjelder både når leverandøren bestemmer og når virksomheten bestemmer.
- Kunden godkjenner eller avviser forespørselen i Altinn.
- Du kan ikke be om tilganger for klienter på denne måten. Det er ikke planlagt i denne endringen.

---
## Kunden godkjenner som i dag

Kunden godkjenner forespørselen på samme måte som i dag, med lenken fra `confirmUrl`.

- **Alt eller ingenting.** Kunden godkjenner hele forespørselen eller avviser den. Kunden kan ikke fjerne enkelte rettigheter mens de godkjenner.
- **Den som godkjenner, må være tilgangsstyrer for virksomheten.** Det gjelder alle forespørsler, som i dag, og uansett flagg.
- **Tilganger for egen virksomhet krever myndighet til hver tilgang.** Mangler kunden myndighet til én av dem, kan de ikke godkjenne.

Eventuelle endringer gjør kunden etterpå, og bare når virksomheten bestemmer tilgangene.

---
## Hva Altinn kontrollerer når kunden godkjenner

Du kan nå be om tomme lister for egen virksomhet. Da er det eneste Altinn kontrollerer ved godkjenning, at den som godkjenner er tilgangsstyrer.

| Forespørselen inneholder | Altinn kontrollerer ved godkjenning |
|---|---|
| Ingen tilganger, med `vendorLocked: false` | At den som godkjenner er tilgangsstyrer |
| Bare rettighetssett for klienter | At den som godkjenner er tilgangsstyrer |
| Tilganger for egen virksomhet | At den som godkjenner er tilgangsstyrer, og har myndighet til å gi hver av tilgangene |

Rettighetssettene kontrollerer Altinn først når virksomheten knytter en klient til systembrukeren. Da må virksomheten ha fått tilgangene fra klienten.

Flagget `vendorLocked` endrer ikke hva Altinn kontrollerer ved godkjenning.

---
## Fire kombinasjoner av flagg og tilganger

Tilganger betyr her noe i `accessPackages` eller `rights`, eller minst ett rettighetssett.

| `vendorLocked` | Tilganger i forespørselen | Resultat | Typisk bruk |
|---|---|---|---|
| `true` | Minst én | Gyldig. Tilgangene er bindende, som i dag. | Systemet trenger et fast sett tilganger. |
| `false` | Minst én, men ingen rettighetssett | Gyldig. Tilgangene er et forslag, og kunden kan endre dem etterpå. | Du vet hva de fleste trenger, men behovet varierer. |
| `false` | Ingen | Gyldig. Systembrukeren starter uten tilganger, og kunden trenger bare å være tilgangsstyrer for å godkjenne. | Kunden vil gi alle tilganger selv. |
| `true` | Ingen | Avvist | – |

I versjon 2 avviser Altinn forespørselen hvis `vendorLocked` mangler. Altinn avviser også rettighetssett sammen med `vendorLocked: false`, og et rettighetssett uten tilganger. Flagget gir aldri tilganger av seg selv. Kunden kan bare gi tilganger de har myndighet til å gi.

---
## Dette er som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som i dag.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en tilgang, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## Spørsmål vi regner med

**Trenger vi ikke systemregisteret lenger?** Jo, registeret består, og du må fortsatt registrere systemet. Det er bare rettighetene som er frikoblet. I versjon 2 begrenser ikke listene over rettigheter på systemet forespørslene dine.

**Må vi gå over til versjon 2?** Ikke nå. Versjon 1 virker som før. Vi regner med at den virker i minst to år, men det er ikke bekreftet.

**Hjelper dere oss med å gå over fra versjon 1 til versjon 2?** Vi lager god dokumentasjon for overgangen. Utover det må du gjøre overgangen selv. Lysbildet «Slik går du over til én systembruker» viser stegene.

**Kan vi be alle klientene om nye tilganger gjennom API-et?** Nei. Det er ikke planlagt i denne endringen. Du kan be om flere tilganger for egen virksomhet.

---
## Dette er ikke avklart ennå

- Endelig navn på `clientAccessSets`.
- Hvor lenge versjon 1 av forespørselen virker. Vi regner med minst to år, men det er ikke bekreftet.
- Hvordan du fjerner låsen på en systembruker, og om virksomheten også kan fjerne den selv.
- Om endringsforespørselen skal virke for en systembruker der virksomheten bestemmer tilgangene. Du kan uansett be om flere tilganger for egen virksomhet med en forespørsel om tilgang.
- Hvordan du kan lese hvilke tilganger systembrukeren faktisk har, og hvilke klienter som er knyttet til den, og få varsel når det endrer seg.
- Om kunden må godkjenne når du legger til et nytt rettighetssett.
- Om du kan stoppe et gammelt rettighetssett for nye klienter, når du ikke kan slette det.
- Hva som skjer når klienten trekker tilbake bare en del av settet, også om systembrukeren skal gå over til et annet sett klienten fortsatt oppfyller.
- Hvor mange rettighetssett du kan oppgi, og hvilke tegn id-en til et sett kan ha.
- Om du skal kunne gi rettighetssettene navn med feltet `name`.
- Om Altinn sammenligner tilgangspakkene i settet, eller tjenestene pakkene gir tilgang til. Skissene forutsetter tilgangspakkene.
- Hva listen skal vise når en klient mangler like mye til flere sett. Skissene viser ingen bestemt pakke.
- Hvilke virksomheter listen viser. Skissene forutsetter at listen viser en virksomhet først når den har gitt byrået en tilgang.
- Om systembrukeren fortsatt har tilgang for en klient som er slettet i Enhetsregisteret.
- Om klienten kan fjerne én ansatt eller systembruker hos byrået helt, uten å trekke tilgangen fra byrået.
- Når funksjonaliteten blir tilgjengelig i testmiljøet og i produksjon.

Vi oppdaterer veiledningene for systemleverandører og virksomheter før funksjonaliteten blir tilgjengelig.

---
## Slik går du over til én systembruker

Har selskapet i dag én systembruker per kundetype, beholder de dem til de er klare. En klient kan være knyttet til mange systembrukere samtidig, siden selskapet får tilgangen fra klienten og gir den videre til så mange systembrukere det trenger. Selskapet kan derfor gå over gradvis.

1. Du ber om en ny systembruker med `clientAccessSets` i versjon 2, og selskapet godkjenner.
2. Selskapet knytter klientene til den nye systembrukeren. Altinn flytter dem ikke automatisk.
3. Du bytter til den nye systembrukeren når du ber om token.
4. Selskapet sletter de gamle systembrukerne.

Kombinasjonen av `systemId`, organisasjonsnummer og `externalRef` må være unik, og uten `externalRef` bruker Altinn organisasjonsnummeret. Den nye systembrukeren må derfor ha en egen `externalRef`, som du oppgir når du ber om token.

---
## Slik ber du om klientsystem i dag

Denne forespørselen virker som før, og du trenger ikke endre den. Systembrukeren får `vendorLocked: true`.

```json
POST /authentication/api/v1/systemuser/request/vendor/agent

{
  "systemId": "912345678_regnskapssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4711",
  "accessPackages": [
    { "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet" }
  ],
  "redirectUrl": "https://regnskap.example.no/altinn/callback"
}
```

Organisasjonsnumre, system-ID og URL-er i eksemplene er fiktive.

---
## Brukstilfelle: regnskapsselskap med a-melding og sykmelding

Et regnskaps- eller revisjonsselskap sender a-melding og henter sykmeldinger for klientene sine med samme lønnssystem.

- **A-meldingen følger av kundeforholdet.** Regnskapsfører- og revisorpakkene dekker den, og det gjør også A-ordningen.
- **Sykmeldingen gjør ikke det.** Ingen av disse pakkene dekker den, så klienten må gi den i tillegg.

| Tilgang | A-melding | Sykmelding |
|---|---|---|
| `regnskapsforer-lonn` (fra rollen REGN) | Ja | Nei |
| `revisormedarbeider` (fra rollen REVI) | Ja | Nei |
| `a-ordning` (gitt direkte) | Ja | Nei |
| `sykefravaer-personopplysninger-saerlig-kategori` (gitt direkte) | Nei | Ja |
| Enkelttjenesten `nav_sykepenger_sykmelding` (gitt direkte) | Nei | Ja |

Tilgangspakkene og tjenestene er slik de ligger i produksjon i dag. Vi har ikke bekreftet at tjenestene er klare for systembruker.

---
## Scenario 1: bare tilgangspakker

Du beskriver de tre kundetypene som hvert sitt sett. Alle settene dekker både a-melding og sykmelding.

```json
POST /authentication/api/v2/systemuser/request/vendor

{
  "systemId": "912345678_lonnssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4711",
  "vendorLocked": true,
  "clientAccessSets": {
    "regnskapsforer": {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:regnskapsforer-lonn" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    },
    "revisor": {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:revisormedarbeider" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    },
    "uregistrert": {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:a-ordning" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    }
  },
  "redirectUrl": "https://lonn.example.no/altinn/callback"
}
```

Organisasjonsnumre, system-ID og URL-er er fiktive. Nøklene `regnskapsforer`, `revisor` og `uregistrert` er id-ene du velger for settene. Med `vendorLocked: true` er dette «Leverandøren bestemmer»: settene er bindende, og bare du kan endre dem.

---
## Scenario 2: tilgangspakker og enkelttjeneste

Settene er like, men sykmeldingen er en enkelttjeneste. Systemet får da tilgang til sykmeldingen uten alt det andre som ligger i pakken.

```json
"clientAccessSets": {
  "regnskapsforer": {
    "name": "Registrert regnskapsfører",
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:regnskapsforer-lonn" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  },
  "revisor": {
    "name": "Registrert revisor",
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:revisormedarbeider" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  },
  "uregistrert": {
    "name": "Uregistrert kunde",
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:a-ordning" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  }
}
```

Id-en er nøkkelen og ligger fast. Feltet `name` er teksten virksomheten ser. Feltet er valgfritt, og navnet på feltet er foreløpig. Gir du settene navn, ser virksomheten navnene i stedet for «Alternativ 1», «Alternativ 2» og så videre.

En klient som har gitt Sykefravær-pakken, oppfyller ikke disse settene. Virksomheten kan ikke gi videre en tjeneste alene når den har fått tjenesten gjennom en pakke.

---
## Slik går det med klientene i scenario 1

| Klienten har gitt selskapet | Sett | Resultat |
|---|---|---|
| Regnskapsførerrolle og Sykefravær-pakken | 1 | Virksomheten kan knytte klienten til systembrukeren |
| Revisorrolle og Sykefravær-pakken | 2 | Virksomheten kan knytte klienten til systembrukeren |
| A-ordningen og Sykefravær-pakken | 3 | Virksomheten kan knytte klienten til systembrukeren |
| Regnskapsførerrolle | Ingen | Flaten viser at Sykefravær-pakken mangler, og at klienten må gi den |
| Bare A-ordningen | Ingen | Flaten viser at Sykefravær-pakken mangler, og at klienten må gi den |
| Regnskapsførerrolle og pakken Sykefravær, ikke den med særlig kategori | Ingen | Flaten viser at Sykefravær-pakken med særlig kategori mangler |
| Bare Sykefravær-pakken | Ingen | Flaten viser at klienten har gitt en del av det systemet krever |
| Bare en annen pakke, for eksempel Merverdiavgift | Ingen | Flaten viser at klienten ikke har gitt noe av det systemet krever |

Klienten kan ikke delegere regnskapsfører- og revisorpakkene direkte. En uregistrert kunde kan derfor bare oppfylle sett 3.

---
## Når klienten passer med flere sett

Klienten kan ha gitt nok til at flere sett er oppfylt. Da kan virksomheten legge klienten til i raden for hvert av settene, og velger selv hvilke sett den knytter klienten til. Systembrukeren får alle tilgangene i settene klienten er knyttet til.

Eksempel fra scenario 1: Fjellvik Bygg AS har regnskapsførerrollen, og har også gitt A-ordningen og Sykefravær-pakken direkte.

| Sett | Oppfylt | Dette skjer |
|---|---|---|
| 1. Regnskapsfører lønn + Sykefravær-pakken | Ja | Virksomheten kan legge klienten til i raden for settet |
| 2. Revisormedarbeider + Sykefravær-pakken | Nei | Raden for settet viser hva som mangler |
| 3. A-ordningen + Sykefravær-pakken | Ja | Virksomheten kan legge klienten til i raden for settet |

**Virksomheten velger.** Bruker byrået **Legg til alle** i begge radene, blir Fjellvik Bygg AS knyttet til begge settene, og systembrukeren får både Regnskapsfører lønn og A-ordningen. I hver rad ser byrået at klienten også har gitt systembrukeren tilganger fra det andre settet.

**Rekkefølgen avgjør bare rekkefølgen på radene.** Den hindrer ikke at systemet får mer tilgang enn det trenger. I dag dekker Regnskapsfører lønn 700 tjenester og A-ordningen 8. Vil du gi systemet minst mulig tilgang, må du lage settene så smale du kan.

---
## Slik lar du kunden styre tilgangene selv

Sett `vendorLocked` til `false`. Listene for egen virksomhet blir da et forslag kunden får når de godkjenner. Du kan ikke sende rettighetssett for klienter. Virksomheten velger selv hva hver klient gir systembrukeren.

```json
POST /authentication/api/v2/systemuser/request/vendor

{
  "systemId": "912345678_regnskapssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4712",
  "vendorLocked": false,
  "accessPackages": [
    { "urn": "urn:altinn:accesspackage:skattegrunnlag" }
  ],
  "redirectUrl": "https://regnskap.example.no/altinn/callback"
}
```

Vil kunden gi alle tilganger selv, sender du `vendorLocked: false` med tomme lister.

Når virksomheten bestemmer, har byrået ikke **Legg til alle klienter**. Byrået åpner hver klient og velger tilganger. Trenger byrået å legge til mange klienter samtidig, bør du bruke `vendorLocked: true`.

---
## Hva du må tenke på når virksomheten bestemmer

Når kunden styrer tilgangene, kan de fjerne noe systemet ditt trenger. Det kan også skje lenge etter godkjenningen.

- **Ikke anta at godkjent betyr at systemet har alt du foreslo.** Kunden kan endre tilgangene når som helst.
- **Håndter avvist tilgang i systemet ditt.** Får du `403` fra en tjeneste, bør du vise kunden hvilken tilgang som mangler.
- **Fortell kunden hva systemet trenger.** Dokumenter hvilke tilgangspakker og enkeltrettigheter de ulike funksjonene i systemet ditt bruker.
- **Be om det som mangler.** Mangler systembrukeren en tilgang for egen virksomhet, kan du sende kunden en forespørsel om tilgang.

Vi vurderer et API og varsling slik at du kan se hvilke tilganger systembrukeren faktisk har. Det er ikke avklart ennå.

---
## Hvilken måte bør du velge?

| Situasjon | Anbefaling |
|---|---|
| Systemet trenger alltid de samme tilgangene, og bare du skal kunne endre dem | Leverandøren bestemmer, som i dag |
| Byrået har mange klienter og vil legge dem til samtidig | Leverandøren bestemmer. Bare da finnes **Legg til alle** |
| Kundene trenger ulike tilganger, eller behovet endrer seg ofte | Virksomheten bestemmer, med et forslag |
| Kunden har egen kompetanse på tilgangsstyring og vil bestemme alt selv | Virksomheten bestemmer, uten lister |
| Du vil unngå mange endringsforespørsler for små justeringer | Virksomheten bestemmer, med et forslag |

Er du i tvil, velg `vendorLocked: true`. Da virker systembrukeren som i dag. Du kan fjerne låsen senere, men ikke låse en systembruker som har vært åpen.

---
## Om skissene

De neste lysbildene viser hvordan virksomhetene kan se og forvalte systembrukere i Tilgangsstyring.

- Dette er skisser for å forstå problemet, ikke designforslag. Både utformingen og funksjonaliteten kan endre seg, og vi vil gjerne ha innspill.
- Alle skissene følger oppsettet UX-teamet har foreslått. Innholdet står i grupper, byrået åpner en klient i listen, og siden har ingen dialoger bortsett fra bekreftelser.
- Alle brukerlister viser en systembruker med flere rettighetssett som én rad per sett. Tilganger for egen virksomhet har en egen rad. Det er fortsatt én systembruker.
- Når byrået åpner raden for et sett, viser siden bare det settet, med én **Legg til alle**. Altinn krysser ikke av for noe sett på forhånd.
- Når virksomheten bestemmer, finnes det ingen rettighetssett. For klientene er systembrukeren lik en ansatt med klienttilganger.
- Skissene kaller rettighetssettene «Alternativ 1», «Alternativ 2» og så videre, i den rekkefølgen du oppgir dem. Vi ser for oss at du kan gi settene navn, som i scenario 2. Si gjerne fra om du ønsker det.
- Reglene bak skissene står til slutt i presentasjonen.

Alle navn, organisasjonsnumre og eksempeltilganger er fiktive.

---
## Virksomhetene finner systembrukerne under Brukere

Systembrukerne står i den samme listen som personer og virksomheter på den vanlige brukersiden, og i fanen **Brukere** i Klientadministrasjon. På brukersiden viser hver rad hvem som bestemmer tilgangene. Klientadministrasjon viser bare en liste over brukere med klienttilgang, som i dag, og radene for systembrukeren står i den listen.

- En systembruker med tre rettighetssett er tre rader, for eksempel «Personalportalen – Alternativ 1». Med feltet `name` står navnet på settet i stedet.
- Tilganger for egen virksomhet har en egen rad.
- Systembrukerne står alltid i listen, også når **Vis brukere med klienttilgang** er slått av.
- Sletter byrået systembrukeren fra en av radene, forsvinner alle radene. Bekreftelsen sier det.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-brukere.png" alt="Brukere for Nordlys Regnskap AS: én liste der personer og systembrukere står sammen, med én rad per alternativ og egen virksomhet: Personalportalen – Alternativ 1, 2 og 3, Regnskap Pluss – Egen virksomhet, Egen integrasjon – Egen virksomhet og Rapportrobot – Klienter, hver med merket for hvem som bestemmer"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" alt="Klientadministrasjon, fanen Brukere: én liste over brukere med klienttilgang, med Kari Nordmann, Ada Eksempel, Personalportalen – Alternativ 1, 2 og 3 og Rapportrobot – Klienter. Radene for egen virksomhet står ikke her"></a><a href="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" alt="Bekreftelsen Slette systembrukeren Personalportalen? Alle de tre radene for Personalportalen forsvinner, og Personalportalen mister alle tilgangene for 2 klienter"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Brukersiden når leverandøren bestemmer

Virksomheten ser tilgangene, men kan ikke fjerne eller legge til enkelttilganger. Det eneste virksomheten kan gjøre, er å slette hele systembrukeren. Siden forklarer at leverandøren endrer tilgangene med en endringsforespørsel.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" alt="Regnskap Pluss – Egen virksomhet der leverandøren bestemmer: Skattegrunnlag og Innsending av MVA-melding uten knapper, og knappen Slett systembruker"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når leverandøren bestemmer

Byrået åpner raden for ett alternativ i brukerlisten. Siden viser bare det alternativet: klienter som er lagt til, klienter byrået kan legge til, og klienter som mangler noe. Altinn krysser ikke av for noe alternativ på forhånd.

- Byrået legger en klient til alternativet, eller bruker **Legg til alle**.
- Systembrukeren får alle tilgangene i alternativet, både tilgangspakker og enkelttjenester, eller ingen av dem.
- Byrået vil se et annet alternativ, går de tilbake til listen og åpner en annen rad.
- Altinn vurderer hvert alternativ for seg. En klient kan være komplett i ett alternativ og mangle noe i et annet.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-havbris.png" alt="Raden Personalportalen – Alternativ 1 åpnet: Eksempelklient AS under Har disse klientene, Fjellvik Bygg AS under Kan få disse klientene med Legg til alle, og seks klienter som ikke kan legges til ennå, for eksempel Havbris Fiskeoppdrett AS med linjen Mangler Regnskapsfører lønn. Kan legges til i Alternativ 2."></a><a href="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" alt="Eksempelklient AS åpen i raden for alternativ 1: de to tilgangspakkene i alternativet, og knappen Fjern klienten fra alternativet"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Klienten oppfyller flere alternativer

Fjellvik Bygg AS oppfyller alternativ 1 og 3, så byrået kan legge klienten til i begge radene. Byrået knytter klienten til ett alternativ om gangen, og kan knytte den til begge.

- I raden for alternativ 2 står klienten blant dem som mangler noe, fordi den mangler Revisormedarbeider.
- Er klienten knyttet til flere alternativer, får systembrukeren alle tilgangene i dem.
- Uansett hvilken rad byrået åpner, viser klienten tilganger systembrukeren har fra klienten utenfor alternativet. Det gjelder tilganger fra andre alternativer. Ingen tilgang skal være skjult.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" alt="Fjellvik Bygg AS åpen i raden for alternativ 1, med knappen Legg klienten til og linjen Personalportalen har allerede A-ordningen og Sykefravær med personopplysninger av særlig kategori fra klienten, gjennom Alternativ 3"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Alternativene kan ha navn

Gir du rettighetssettene navn med feltet `name`, ser byrået navnene i stedet for «Alternativ 1», «Alternativ 2» og så videre. Si gjerne fra om du ønsker dette.

Vi har ikke laget skisse av dette ennå.

---
## Virksomheten legger til mange klienter samtidig

Raden for hvert alternativ har sin egen **Legg til alle**. Knappen knytter klientene som oppfyller alternativet, hvis de ikke er knyttet til det fra før. Har byrået fått tre nye klienter som oppfyller alternativet, legger knappen til de tre. Siden spør først.

En klient som oppfyller flere alternativer, blir bare knyttet til alternativet byrået bruker knappen for.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" alt="Bekreftelsen Legge til 2 klienter i Personalportalen – Alternativ 3? Personalportalen får tilgangene i Alternativ 3 for Nordavind Bygg AS og Solvang Transport AS"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Brukersiden når virksomheten bestemmer

Hver tilgang har knappen **Fjern**. Linjen under tilgangen viser om den kom fra forespørselen, eller om virksomheten la den til. Virksomheten kan fjerne begge typene.

Med **Gi flere tilganger** velger virksomheten tilgangspakker og enkelttjenester på samme side. Det virksomheten ikke har lov til å gi, står i en egen gruppe, med en forklaring.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" alt="Systembrukeren Egen integrasjon der virksomheten bestemmer, med Skattegrunnlag fra forespørselen og A-ordningen lagt til av Nordlys Regnskap AS, begge med knappen Fjern"></a><a href="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" alt="Gi Egen integrasjon flere tilganger: gruppene Kan gis, Har allerede og Kan ikke gis, med forklaring på hvorfor Lønn ikke kan gis"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Systembruker uten tilganger

Sender du `vendorLocked: false` med tomme lister, starter systembrukeren uten tilganger. Virksomheten ser at systemet ikke kan gjøre noe før de gir tilganger.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" alt="Systembrukeren Rapportrobot uten tilganger, med knappen Gi tilganger"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når virksomheten bestemmer

Når virksomheten bestemmer, har systembrukeren ingen rettighetssett. Brukerlisten har én rad for klientene, og en egen rad for egen virksomhet hvis systembrukeren har tilganger der. For klientene er systembrukeren lik en vanlig ansatt som byrået har gitt klienttilganger, og siden følger samme mønster som for en ansatt i Klientadministrasjon i dag. Byrået åpner en klient og gir én og én tilgang med **Gi fullmakt**, eller alt klienten har gitt, med **Gi alle**. Endringen gjelder med en gang. Klienten står under **Har disse klientene** så snart systembrukeren har fått én tilgang fra den.

- Tjenester klienten har gitt gjennom en tilgangspakke, kan virksomheten ikke gi alene.
- Trekker en klient tilbake en tilgang, mister systembrukeren den samtidig.
- **Gi alle** gjelder én klient. Siden har ikke **Legg til alle klienter**, som bare finnes når leverandøren bestemmer.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-liste.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-liste.png" alt="Rapportrobot – Klienter der virksomheten bestemmer, i samme mønster som en ansatt i Klientadministrasjon: søket Søk etter klient, Vis slettede, og gruppene Har disse klientene og Kan få disse klientene, uten knapp for å legge til alle klienter"></a><a href="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-apen.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-apen.png" alt="Rapportrobot – Klienter med Nordavind Bygg AS åpen under Kan få disse klientene: de to tilgangene klienten har gitt, hver med Gi fullmakt, og knappene Gi alle og Slett alle"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Klientens side viser systembrukerne

På siden for en klient ser virksomheten hva klienten har gitt, og hvilke systembrukere som kan få klienten. En systembruker med flere rettighetssett står med én rad per sett. En rad som ikke kan få klienten, viser det som mangler, på samme måte som siden for raden.

- Havbris Fiskeoppdrett AS: Rapportrobot – Klienter har klienten. «Personalportalen – Alternativ 2» kan få den. Radene for alternativ 1 og 3 viser hva som mangler.
- Elvebakken Kafé AS har bare gitt Merverdiavgift. Rapportrobot – Klienter kan få klienten, fordi virksomheten bestemmer. Alle tre radene for Personalportalen viser hva som mangler, og byrået må kontakte klienten.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" alt="Siden for Havbris Fiskeoppdrett AS: Rapportrobot – Klienter har klienten, og Personalportalen – Alternativ 2 kan få den, med tilgangene i alternativet"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" alt="Siden for Elvebakken Kafé AS: klienten har gitt Merverdiavgift, Rapportrobot – Klienter kan få klienten, og raden Personalportalen – Alternativ 1 viser at begge pakkene mangler, med forklaring"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: klienten har gitt en helt annen pakke

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Klienten mangler alt systemet krever, og Altinn kan ikke vite hvilket kundeforhold klienten skal ha. Derfor står klienten blant dem som mangler noe i raden for hvert alternativ.

**Det byrået gjør:** Åpner klienten i en av radene, avklarer kundeforholdet, og ber klienten gi det som mangler. Merverdiavgift-pakken påvirker ikke Personalportalen.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" alt="Elvebakken Kafé AS åpen i raden for alternativ 1: klienten har bare gitt Merverdiavgift, og Personalportalen får ingen tilgang gjennom den"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: pakke med nesten likt navn

**Situasjon:** Byrået ba Fjordbakeriet AS gi Sykefravær med personopplysninger av særlig kategori, men klienten ga pakken Sykefravær. Dette er to ulike pakker.

**Det byrået gjør:** Åpner klienten i listen, ser hva klienten ga, og ber klienten gi riktig pakke. Da slipper byrået å gå via support. Når pakken er gitt, kan byrået legge til klienten.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" alt="Fjordbakeriet AS åpen i raden for alternativ 1: klienten har gitt Sykefravær, som er en annen tilgangspakke enn Sykefravær med personopplysninger av særlig kategori, og mangler også noe til Alternativ 2 og Alternativ 3"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten mangler like mye til flere alternativer

**Situasjon:** Kystlinjen Eiendom AS har bare gitt Sykefravær-pakken med særlig kategori. Hvert alternativ mangler én tilgang, så klienten står blant dem som mangler noe i alle tre radene. Altinn peker ikke på et bestemt alternativ.

**Det byrået gjør:** Avklarer kundeforholdet. Er byrået regnskapsfører eller revisor, registrerer klienten det i Enhetsregisteret. Ellers kan klienten gi A-ordningen direkte.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" alt="Kystlinjen Eiendom AS åpen i raden for alternativ 1: Regnskapsfører lønn mangler og kommer fra regnskapsførerrollen, og klienten mangler også noe til Alternativ 2 og Alternativ 3"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten står ikke i listen

**Situasjon:** Byrået finner ikke Granly Hage. Det kan skyldes en skrivefeil, at virksomheten ikke har gitt noe, eller at de har gitt tilgangen til en annen virksomhet. Siden viser ikke noe om virksomheten.

**Det byrået gjør:** Sjekker søket, og ber virksomheten sjekke at de har gitt tilgangen til riktig organisasjonsnummer.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" alt="Søk etter Granly Hage uten treff, med forklaring om at en virksomhet vises først når den har gitt Nordlys Regnskap AS en tilgang"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten er slettet i Enhetsregisteret

**Situasjon:** Siden skjuler slettede klienter til byrået slår på **Vis slettede**. Byrået kan ikke legge dem til. Enhetsregisteret slettet Gamle Verksted AS mens klienten var knyttet til Personalportalen.

**Det byrået gjør:** Fjerner klienten fra systembrukeren. Vi har ikke avklart om systembrukeren fortsatt har tilgang for en slettet klient.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-slettede.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-slettede.png" alt="Gruppen Slettede klienter med to klienter. Gamle Verksted AS har Personalportalen fortsatt, og kan fjernes"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: byrået fjerner tilganger når virksomheten bestemmer

**Situasjon:** Rapportrobot har «Virksomheten bestemmer», og har fått Sykefravær-pakken og Lønn for Havbris Fiskeoppdrett AS. Byrået åpner klienten i raden for klientene og klikker **Slett fullmakt** på Sykefravær-pakken og Lønn. Endringen gjelder med en gang, som for en ansatt i dag.

**Det byrået ser etterpå:** Har systembrukeren ingen tilganger igjen fra klienten, står klienten under **Kan få disse klientene**. **Slett alle** fjerner alle tilgangene fra klienten på én gang.

Når virksomheten bestemmer, finnes det ikke noe forslag fra leverandøren for klienter. De tidligere scenariene der byrået velger noe annet enn forslaget, er derfor tatt ut.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" alt="Raden Rapportrobot – Klienter med Havbris Fiskeoppdrett AS åpen under Har disse klientene: Sykefravær med personopplysninger av særlig kategori og Lønn med Slett fullmakt, de to andre tilgangene med Gi fullmakt, og knappene Gi alle og Slett alle"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienten ser systembrukerne hos byrået

Klienten ser systembrukere hos byrået på samme måte som byråets ansatte, uansett om leverandøren eller virksomheten bestemmer. De står i den vanlige listen under **Brukere** når klienten slår på **Vis brukere med klienttilgang**, ikke under byrået. Linjen under navnet viser hvilket byrå tilgangen går gjennom.

- Klienten kan ikke fjerne enkelttilganger fra en ansatt eller en systembruker hos byrået.
- Klienten kan fjerne en tilgang de har gitt byrået direkte. Da mister både ansatte og systembrukere den.
- Tilganger fra revisor- eller regnskapsførerrollen forsvinner bare hvis klienten endrer rollen i Enhetsregisteret.
- Er klienten knyttet til flere rettighetssett på samme systembruker, ser klienten én rad per sett.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" alt="Brukere hos Fjellvik Bygg AS med Vis brukere med klienttilgang slått på: én flat liste med to ansatte i Fjellvik, Nordlys Regnskap AS med merket Regnskapsfører, Ola Nordmann og Personalportalen – Alternativ 3 med merket Systembruker, der de to siste har linjen Regnskapsfører for Nordlys Regnskap AS"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" alt="Siden for Personalportalen – Alternativ 3 sett fra Fjellvik Bygg AS: A-ordningen og Sykefravær med personopplysninger av særlig kategori gjennom Nordlys Regnskap AS, uten knapper for å fjerne dem"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Mer informasjon

- [Slik ber du om systembruker i dag](/nb/authorization/guides/system-vendor/system-user/systemuserrequest/)
- [Slik endrer du rettighetene til en systembruker](/nb/authorization/guides/system-vendor/system-user/changerequest/)
- [Klientdelegering for systemleverandører](/nb/authorization/guides/system-vendor/system-user/client-delegation/)
- [Slik ber du om tilgang fra en annen part med tilgangsstyrings-API-et](/nb/authorization/guides/system-vendor/access-management/#be-om-fullmakt-fra-en-annen-part)
- [Slik godkjenner virksomheten en systembruker](/nb/authorization/guides/end-user/system-user/accept-request/)
- [Vedtakene og de åpne valgene, presentasjonen for teamet](../diskusjonsgrunnlag/)
- [Arbeidet på GitHub, epic for systembrukermodellen](https://github.com/Altinn/altinn-auth/issues/4510)

---
## Reglene bak skissene: synlighet

| Regel | Hva den betyr |
|---|---|
| R1 | **Brukere** viser alle systembrukere virksomheten eier, i samme liste som personer og virksomheter. Systembrukerne står der alltid, også når **Vis brukere med klienttilgang** er slått av. |
| R2 | **Klientadministrasjon** og klientens side viser også systembrukere med klienttilganger eller klientkrav. |
| R3 | Det går fram at raden er en systembruker, hvilket system og hvilken leverandør den tilhører, og hvem som bestemmer tilgangene. |
| R3a | Alle brukerlister viser en systembruker med rettighetssett som én rad per sett, også hos klienten. Raden heter system + navnet på settet, ellers «Alternativ N». Tilganger for egen virksomhet har en egen rad. Når virksomheten bestemmer, er det én rad for egen virksomhet og én for klienter. |
| R4 | Virksomheten oppretter ikke systembrukere med **Ny bruker**. De kommer fra en forespørsel fra leverandøren, eller fra siden **Systembrukere** når virksomheten velger et system selv. |

---
## Reglene bak skissene: leverandøren bestemmer

| Regel | Hva den betyr |
|---|---|
| R5 | Siden viser tilgangspakker og enkelttjenester uten knapper for å fjerne eller legge til enkelttilganger. |
| R6 | Virksomheten kan bare slette hele systembrukeren, med alle tilganger og klientdelegeringer. Virksomheten kan starte slettingen fra hvilken som helst av radene, og bekreftelsen sier at alle radene forsvinner. |
| R7 | Siden forklarer at leverandøren bestemmer tilgangene, og at endringer kommer som en endringsforespørsel. |
| R8 | Siden for en rad viser bare det rettighetssettet. Virksomheten knytter klienten til settet og gir hele settet. En klient kan være knyttet til flere sett, altså flere rader. |
| R8a | Leverandøren kan ikke endre eller slette et rettighetssett, bare legge til nye. Et nytt sett blir en ny rad etter de andre radene for systembrukeren, uten klienter. Unntaket er når leverandøren fjerner låsen. Da sletter Altinn alle settene (R25). |
| R9 | Virksomheten kan ikke knytte en klient til et sett klienten ikke oppfyller. Siden for raden viser klienten likevel. Når byrået åpner klienten, ser de hva klienten har gitt, og hva som mangler til settet. Altinn vurderer hvert sett for seg. |
| R10 | Virksomheten kan fjerne en klient fra settet i raden. Tilganger som også ligger i et annet sett klienten er knyttet til, beholder systembrukeren. Dette er ikke bekreftet. |
| R11 | Virksomheten kan knytte mange klienter til settet i raden samtidig, med **Legg til alle**. Knappen gjelder bare klienter som ikke er knyttet til settet fra før. |
| R11a | Uansett hvilken rad virksomheten åpner, viser klienten tilganger systembrukeren har fra klienten gjennom andre sett. Ingen tilgang skal være skjult. |
| R12 | Siden skjuler slettede klienter som standard, med et valg for å vise dem. |

---
## Reglene bak skissene: virksomheten bestemmer

| Regel | Hva den betyr |
|---|---|
| R13 | Virksomheten kan fjerne hver tilgangspakke og enkelttjeneste for seg. For klienter skjer det med **Slett fullmakt** og **Slett alle**, som for en ansatt i Klientadministrasjon i dag. |
| R14 | Virksomheten kan gi nye tilganger, men bare det de selv har lov til å gi. Siden viser resten med en forklaring. |
| R15 | For egen virksomhet går det fram om en tilgang kom fra leverandørens forslag, eller om virksomheten la den til. Virksomheten kan fjerne begge typene. |
| R16 | En systembruker uten tilganger forklarer at systemet ikke kan gjøre noe ennå, og har en tydelig inngang til å gi tilganger. |
| R17 | Virksomheten kan slette hele systembrukeren. |
| R18 | For klientene er systembrukeren lik en vanlig ansatt med klienttilganger. For hver klient velger virksomheten tilgangspakker og enkelttjenester én og én, blant tilgangene klienten har gitt. |
| R19 | Virksomheten kan bare gi en enkelttjeneste videre hvis klienten har gitt den som enkelttjeneste. Handlingene, for eksempel lese og skrive, følger det klienten har gitt. |
| R20 | Systembrukeren har ingen rettighetssett, så den har ingen tilganger fra en ny klient før virksomheten gir dem, med **Gi fullmakt** eller **Gi alle** for klienten. Siden har ikke **Legg til alle klienter** når virksomheten bestemmer. |

---
## Reglene bak skissene: felles

| Regel | Hva den betyr |
|---|---|
| R21 | Trekker en klient tilbake en tilgang, forsvinner klientdelegeringene til systembrukeren automatisk, og virksomheten får vite det. |
| R22 | Bare den som har myndighet, ser handlingene. Den som ikke er tilgangsstyrer eller klientadministrator, ser det samme som i dag. |
| R23 | Lenker fra siden **Systembrukere** leder til de nye sidene, ikke til den gamle klientsiden. |
| R24 | Systembrukerens side viser hvem som bestemmer tilgangene. |
| R25 | Leverandøren kan fjerne låsen uten at virksomheten må godkjenne det. Da bestemmer virksomheten tilgangene, og Altinn sletter rettighetssettene uten å fjerne tilganger. En systembruker som har vært åpen, kan ikke bli låst igjen. Om virksomheten også kan fjerne låsen selv, er ikke avklart. |
