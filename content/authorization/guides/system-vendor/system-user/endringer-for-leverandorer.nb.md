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
- **Du velger hvem som bestemmer fullmaktene.** Versjon 2 krever flagget `vendorLocked`. Med `false` kan virksomheten justere fullmaktene etter at den har godkjent. Versjon 1 gir alltid `true`, som i dag.
- **Én systembruker for alle kundetyper.** Med fullmaktssett kan ett selskap bruke samme systembruker for regnskapsfører-, revisor- og uregistrerte kunder. Du trenger ikke vite kundeforholdet for å hente token.
- **Én systembruker for egen virksomhet og klienter.** Du trenger ikke lenger velge mellom systembruker for eget system og for klientsystem.
- **Enkeltrettigheter også for klienter.** I dag kan du bare be om tilgangspakker for klientsystem.
- **Forespørselen bestemmer rettighetene.** I versjon 2 trenger du ikke registrere hver rettighet på systemet først.
- **Du kan legge til nye fullmaktssett og be om flere fullmakter.** Du slipper å opprette en ny systembruker når det for eksempel kommer nye tilgangspakker. For egen virksomhet kan du be kunden om flere fullmakter med en forespørsel.
- **Tomme lister for egen virksomhet er lov.** Forespørselen må da ha fullmaktssett eller `vendorLocked: false`. Kunden trenger bare å være tilgangsstyrer for å godkjenne.

---
## Det du har laget i dag, virker som før

| Det du bruker i dag | Etter endringen |
|---|---|
| Forespørsel om systembruker for eget system med `rights` og `accessPackages` | Virker som før i versjon 1. De nye feltene finnes bare i versjon 2. |
| Forespørsel om systembruker for klientsystem (`/request/vendor/agent`) | Virker som før. |
| Endringsforespørsel (`/changerequest/vendor`) | Virker som før. |
| Klientdelegerings-API-et | Virker som før. |
| Systembrukere kundene dine allerede har godkjent | Beholder fullmaktene og oppførselen sin, og får `vendorLocked: true`. Ingen systembruker går over til «Virksomheten bestemmer» av seg selv. |
| Klienter som er knyttet til systembrukerne dine | Blir der de er. Altinn flytter dem ikke automatisk. |
| Brukerstyrt opprettelse fra systemer i systemregisteret | Virker som før, med rettighetene som er registrert på systemet. |

Systembrukere du ber om i versjon 1, får alltid `vendorLocked: true`. Det gir samme oppførsel som i dag.

---
## Forbedring 1: Kunden kan styre fullmaktene selv

Det nye flagget `vendorLocked` bestemmer hvem som forvalter fullmaktene etter at kunden har godkjent. Flagget er påkrevd i versjon 2, så du må velge for hver forespørsel. Vi kaller de to måtene «Leverandøren bestemmer» og «Virksomheten bestemmer».

Når virksomheten bestemmer, blir systembrukeren likere vanlige brukere. Virksomheten gir og fjerner fullmakter i Tilgangsstyring, slik de gjør for personer og virksomheter.

| | Leverandøren bestemmer | Virksomheten bestemmer |
|---|---|---|
| `vendorLocked` | `true`, som i dag | `false` |
| Listene for egen virksomhet | Bindende | Et forslag kunden starter med |
| Fullmaktssett for klienter | Bindende | Ikke lov. Virksomheten velger hva hver klient gir |
| Hvem endrer fullmaktene etterpå | Du, med endringsforespørsel eller endepunktet for fullmaktssett | Kunden selv, i Tilgangsstyring |
| Kan kunden fjerne én fullmakt | Nei, bare slette hele systembrukeren | Ja |
| Kan kunden legge til fullmakter | Nei | Ja, men bare det de selv har lov til å gi |
| Kan du be om flere fullmakter for egen virksomhet | Ja, med en forespørsel om fullmakt | Ja, med en forespørsel om fullmakt |

Du kan fjerne låsen etter at systembrukeren er opprettet, altså gå fra `vendorLocked: true` til `false`. Virksomheten trenger ikke godkjenne det. Bare du som leverandør kan fjerne låsen. Virksomheten kan ikke fjerne den selv, med mindre den selv er leverandør av systemet. Altinn sletter da fullmaktssettene, men klientene beholder det de har gitt systembrukeren, og virksomheten kan endre det fritt. Du kan ikke låse en systembruker som har vært åpen. Flagget gjelder bare forespørsler du sender selv. Forespørsler til versjon 1 får alltid `true`.

Fullmaktssett forklarer vi på de neste lysbildene.

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
## Slik virker fullmaktssett

Et **fullmaktssett** er tilgangspakker og enkeltrettigheter som hører sammen. Du lager ett sett for hver måte en klient kan gi fullmakt på.

**Det betyr for deg som bruker API-et:**

- Du sender fullmaktssettene i `clientAccessSets` i forespørselen. Hvert sett har en id du velger selv, og id-en er nøkkelen til settet.
- Rekkefølgen på settene bestemmer rekkefølgen på radene i brukerlisten. Du oppgir ikke noe tall.
- Du kan ikke endre eller slette et sett etter at kunden har godkjent forespørselen. Du kan legge til nye sett.
- Altinn bruker id-en når virksomheten knytter en klient til systembrukeren. Da er det klart hvilket sett klienten har fått.
- Du henter token på samme måte for alle klienter.
- Alle settene bør dekke de samme tjenestene. Ellers må du fortsatt vite hvilket sett klienten fikk.

**Det skjer når virksomheten legger til en klient:**

- Når leverandøren bestemmer, må klienten ha gitt alt i minst ett sett. Ellers kan ikke virksomheten legge til klienten, og flaten viser hva som mangler.
- Hvert sett er en egen rad i brukerlisten, for eksempel «Personalportalen – Registrert regnskapsfører». Det er fortsatt én systembruker og ett token.
- Virksomheten åpner raden og knytter klienter til settet, én og én eller med **Legg til alle**. En klient kan være knyttet til flere sett.
- Fullmaktssett krever `vendorLocked: true`. Når virksomheten bestemmer, finnes det ingen sett, og virksomheten velger blant det klienten har gitt.

---
## Forbedring 3: Én systembruker for egen virksomhet og klienter

**I dag** må du velge type når du ber om systembruker. Et regnskapssystem som både leverer for regnskapsbyrået selv og for kundene deres, trenger to systembrukere.

**Etter endringen** kan én forespørsel til versjon 2 inneholde begge deler:

| Felt | Gjelder | Status |
|---|---|---|
| `accessPackages` | Tilgangspakker for egen virksomhet | Finnes i dag |
| `rights` | Enkeltrettigheter for egen virksomhet | Finnes i dag |
| `clientAccessSets` | Fullmaktssett for klienter, med id som nøkkel. Rekkefølgen bestemmer rekkefølgen på radene | Nytt, foreløpig navn |
| `vendorLocked` | Hvem som bestemmer fullmaktene etter godkjenning | Nytt, påkrevd |
| `name` i hvert fullmaktssett | Navnet virksomheten ser, på ett eller flere språk | Nytt, valgfritt, foreslått |

Kunden godkjenner én systembruker. Fullmaktene for egen virksomhet får systembrukeren når kunden godkjenner. Fullmaktene for klienter får den når virksomheten knytter klienter til systembrukeren.

---
## Forbedring 4: Enkeltrettigheter også for klienter

**I dag** kan systembruker for klientsystem bare få tilgangspakker. Har kunden din fått en enkelttjeneste fra klienten sin, kan de ikke gi den videre til systemet ditt.

**Etter endringen** kan et fullmaktssett inneholde enkeltrettigheter. Virksomheten kan da klientdelegere enkelttjenester til systembrukeren, sammen med tilgangspakkene i settet.

Tre regler gjelder:

- Virksomheten kan bare gi videre enkelttjenester den har fått som enkelttjeneste fra klienten. Tjenester den har fått gjennom en tilgangspakke, kan den ikke gi videre én og én.
- Altinn sammenligner tilgangspakkene i settet med pakkene klienten har gitt byrået, ikke tjenestene pakkene gir tilgang til. Skal en annen pakke også godtas, legger du til et eget sett med den pakken.
- Du oppgir ikke `action` i fullmaktssett i første versjon. Sender du `action`, svarer Altinn 400. Trenger du finere styring, bruker du tilgangspakker.
- Utelater du `clientAccessSets` eller sender `null`, har systembrukeren ingen fullmaktssett. Et tomt objekt, et sett uten tilganger og samme tilgangspakke to ganger i ett sett gir 400.
- Systembrukeren får de samme handlingene, for eksempel lese og skrive, som klienten har gitt virksomheten.

---
## Forbedring 5: Forespørselen bestemmer rettighetene

**I dag** avviser Altinn en forespørsel som inneholder rettigheter du ikke har registrert på systemet i systemregisteret. Vil du be om en ny rettighet, må du først oppdatere systemet.

**Etter endringen** er det listene og fullmaktssettene i forespørselen som bestemmer rettighetene i versjon 2. Systemregisteret verken fyller ut, erstatter eller begrenser dem. Versjon 1 virker som før.

Det betyr at du kan

- be om ulike rettigheter for ulike kunder av samme system
- be om bare det kunden faktisk trenger, i stedet for alt systemet kan gjøre
- legge til en ny tjeneste uten å oppdatere systemregisteret først

Altinn kontrollerer fortsatt at rettighetene finnes, at det går an å delegere dem, og at kunden har myndighet til å gi dem.

**Systemregisteret består.** Du må fortsatt registrere systemet. Det er bare rettighetene som er frikoblet fra registeret. Listene over rettigheter på systemet gjelder bare i versjon 1, og når brukeren selv oppretter en systembruker fra et system i registeret.

---
## Forbedring 6: Du kan legge til nye fullmaktssett

**I dag** kan du ikke endre en systembruker for klientforhold. Du må slette den og opprette den på nytt.

**Etter endringen** får du et eget endepunkt for å legge til nye fullmaktssett på en systembruker, for eksempel når det kommer nye tilgangspakker. Foreløpig forslag til adresse:

```http
POST /authentication/api/v2/systemuser/vendor/{systemUserId}/clientaccesssets
```

- **Du kan ikke endre eller slette et sett.** Trenger du andre fullmakter, legger du til et nytt sett med en ny id.
- **Du kan trygt sende samme kall på nytt.** Sender du en id som finnes fra før, med likt innhold, svarer Altinn 200 og endrer ingenting. Er innholdet ulikt, svarer Altinn 409.
- **Det nye settet blir en ny rad i brukerlisten,** etter radene for settene du har fra før.
- **Det er ingen grense for hvor mange sett du kan legge til.** Men hvert sett er en rad i brukerlisten hos byrået, og mange rader gjør listen tung å bruke. Legg derfor bare til et nytt sett når du må.
- **Kunden trenger ikke godkjenne det nye settet.** Settet gir ingen fullmakt før virksomheten knytter klienter til det.
- **Du kan ikke stoppe et sett for bruk.** Alle settene står i brukerlisten så lenge systembrukeren finnes, og byrået kan fortsatt knytte nye klienter til et gammelt sett. Gi derfor settene navn som viser hvilket byrået bør bruke.
- **Du kan ikke si at et nytt sett erstatter et gammelt.** Altinn har ingen kobling mellom settene, så bare navnene kan vise byrået hvilket sett som er det nye.
- **Altinn knytter ingen klienter til det nye settet.** Virksomheten åpner raden og legger klientene til, én og én eller med **Legg til alle**.
- **Klientene i de gamle settene beholder det de har.** Altinn verken gir eller fjerner fullmakter. Virksomheten kan selv fjerne klienter fra et gammelt sett.
- **Endepunktet gjelder bare når leverandøren bestemmer.** Med `vendorLocked: false` gir det valideringsfeil.
- **Systemet ditt må tåle at klientene står i ulike sett.** Til virksomheten har lagt klienten til i det nye settet, kan kall til den nye tjenesten bli avvist for klienten.
- **Du kan ikke be klientene om fullmaktene gjennom API-et.** Det er ikke planlagt i denne endringen. Virksomheten må be klientene om det som mangler.

---
## Forbedring 7: Du kan be om flere fullmakter for egen virksomhet

**I dag** kan du bare be om nye fullmakter til en systembruker med en endringsforespørsel.

**Etter endringen** kan du også be kunden om flere fullmakter for egen virksomhet med API-et for forespørsler om fullmakt. Sluttbrukersystemer bruker det samme API-et i dag.

```http
/accessmanagement/api/v1/enduser/request
```

- Du kan be om tilgangspakker og enkeltrettigheter.
- Det gjelder både når leverandøren bestemmer og når virksomheten bestemmer.
- Kunden godkjenner eller avviser forespørselen i Altinn.
- Du kan ikke be om fullmakter for klienter på denne måten. Det er ikke planlagt i denne endringen.

---
## Kunden godkjenner som i dag

Kunden godkjenner forespørselen på samme måte som i dag, med lenken fra `confirmUrl`.

- **Alt eller ingenting.** Kunden godkjenner hele forespørselen eller avviser den. Kunden kan ikke fjerne enkelte rettigheter mens de godkjenner.
- **Den som godkjenner, må være tilgangsstyrer for virksomheten.** Det gjelder alle forespørsler, som i dag, og uansett flagg.
- **Fullmakter for egen virksomhet krever myndighet til hver fullmakt.** Mangler kunden myndighet til én av dem, kan de ikke godkjenne.

Eventuelle endringer gjør kunden etterpå, og bare når virksomheten bestemmer fullmaktene.

---
## Hva Altinn kontrollerer når kunden godkjenner

Du kan nå be om tomme lister for egen virksomhet. Da er det eneste Altinn kontrollerer ved godkjenning, at den som godkjenner er tilgangsstyrer.

| Forespørselen inneholder | Altinn kontrollerer ved godkjenning |
|---|---|
| Ingen fullmakter, med `vendorLocked: false` | At den som godkjenner er tilgangsstyrer |
| Bare fullmaktssett for klienter | At den som godkjenner er tilgangsstyrer |
| Fullmakter for egen virksomhet | At den som godkjenner er tilgangsstyrer, og har myndighet til å gi hver av fullmaktene |

Fullmaktssettene kontrollerer Altinn først når virksomheten knytter en klient til systembrukeren. Da må virksomheten ha fått fullmaktene fra klienten.

Flagget `vendorLocked` endrer ikke hva Altinn kontrollerer ved godkjenning.

---
## Fire kombinasjoner av flagg og fullmakter

Fullmakter betyr her noe i `accessPackages` eller `rights`, eller minst ett fullmaktssett.

| `vendorLocked` | Fullmakter i forespørselen | Resultat | Typisk bruk |
|---|---|---|---|
| `true` | Minst én | Gyldig. Fullmaktene er bindende, som i dag. | Systemet trenger et fast sett fullmakter. |
| `false` | Minst én, men ingen fullmaktssett | Gyldig. Fullmaktene er et forslag, og kunden kan endre dem etterpå. | Du vet hva de fleste trenger, men behovet varierer. |
| `false` | Ingen | Gyldig. Systembrukeren starter uten fullmakter, og kunden trenger bare å være tilgangsstyrer for å godkjenne. | Kunden vil gi alle fullmakter selv. |
| `true` | Ingen | Avvist | – |

I versjon 2 avviser Altinn forespørselen hvis `vendorLocked` mangler. Altinn avviser også fullmaktssett sammen med `vendorLocked: false`, og et fullmaktssett uten fullmakter. Flagget gir aldri fullmakter av seg selv. Kunden kan bare gi fullmakter de har myndighet til å gi.

---
## Dette er som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som i dag.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en fullmakt, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## Spørsmål vi regner med

**Trenger vi ikke systemregisteret lenger?** Jo, registeret består, og du må fortsatt registrere systemet. Det er bare rettighetene som er frikoblet. I versjon 2 begrenser ikke listene over rettigheter på systemet forespørslene dine.

**Må vi gå over til versjon 2?** Ikke nå. Versjon 1 virker som før. Vi regner med at den virker i minst to år, men det er ikke bekreftet.

**Hjelper dere oss med å gå over fra versjon 1 til versjon 2?** Vi lager god dokumentasjon for overgangen. Utover det må du gjøre overgangen selv. Lysbildet «Slik går du over til én systembruker» viser stegene.

**Kan vi be alle klientene om nye fullmakter gjennom API-et?** Nei. Det er ikke planlagt i denne endringen. Du kan be om flere fullmakter for egen virksomhet.

---
## Dette er ikke avklart ennå

- Endelig navn på `clientAccessSets`.
- Om grensesnittet skal bruke navnet «systembruker» i stedet for «systemtilgang», nå som systembrukeren står i brukerlisten. Det kan påvirke tekstene i dine egne flyter.
- Hvordan grensesnittet viser om leverandøren eller virksomheten bestemmer fullmaktene.
- Hvor lenge versjon 1 av forespørselen virker. Vi regner med minst to år, men det er ikke bekreftet.
- Hvordan du fjerner låsen på en systembruker, og hvordan virksomheten får vite det.
- Om endringsforespørselen skal virke for en systembruker der virksomheten bestemmer fullmaktene. Du kan uansett be om flere fullmakter for egen virksomhet med en forespørsel om fullmakt.
- Hvordan du kan lese hvilke fullmakter systembrukeren faktisk har, og hvilke klienter som er knyttet til den, og få varsel når det endrer seg.
- Hva som skjer når klienten trekker tilbake bare en del av settet. Vi foreslår at klienten blir stående i raden, og at raden viser hva som mangler. Altinn flytter ikke klienten til et annet sett.
- Om navn på fullmaktssett skal være påkrevd, og hvilket språk Altinn viser når navnet ikke finnes på brukerens språk.
- Hva listen skal vise når en klient mangler like mye til flere sett. Skissene viser ingen bestemt pakke.
- Hvilke virksomheter listen viser. Skissene forutsetter at listen viser en virksomhet først når den har gitt byrået en fullmakt.
- Om systembrukeren fortsatt har fullmakt for en klient som er slettet i Enhetsregisteret.
- Om klienten kan fjerne én ansatt eller systembruker hos byrået helt, uten å trekke fullmakten fra byrået.
- Når funksjonaliteten blir tilgjengelig i testmiljøet og i produksjon.

Vi oppdaterer veiledningene for systemleverandører og virksomheter før funksjonaliteten blir tilgjengelig.

---
## Slik går du over til én systembruker

Har selskapet i dag én systembruker per kundetype, beholder de dem til de er klare. En klient kan være knyttet til mange systembrukere samtidig, siden selskapet får fullmakten fra klienten og gir den videre til så mange systembrukere det trenger. Selskapet kan derfor gå over gradvis.

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
## Slik bruker byråene systembrukere i dag

Tall fra produksjon i november 2026, avrundet. Tallene gjelder systembrukere for klientforhold.

- **Rundt 1,9 millioner koblinger** mellom systembruker og klient.
- **99 % bruker bare pakker fra regnskapsfører- eller revisorrollen.** Regnskapsfører står for nesten 80 %, revisor for rundt 20 %.
- **Ingen systembruker har både regnskapsfører- og revisorpakker.** Har selskapet begge kundetypene, trenger det i dag én systembruker for hver. Det er det fullmaktssett løser.
- **Regnskapsfører med signeringsrettighet er langt vanligere enn uten signeringsrettighet.**
- **Lønnssystemer blander rollepakker og pakker klienten gir selv,** for eksempel Regnskapsfører lønn sammen med Lønn og Sykefravær med personopplysninger av særlig kategori. Der kan en klient mangle noe.

Eksemplene i presentasjonen bruker kombinasjoner som finnes i produksjon i dag.

---
## Brukstilfelle: regnskapsbyrå med a-melding og sykmelding

Et regnskapsbyrå sender a-melding og henter sykmeldinger for klientene sine med samme lønnssystem. Noen klienter har registrert byrået som regnskapsfører. Andre gir fullmaktene direkte.

- **A-meldingen følger av kundeforholdet.** Regnskapsfører lønn dekker den, og det gjør også A-ordningen.
- **Sykmeldingen gjør ikke det.** Ingen av disse pakkene dekker den, så klienten må gi den i tillegg.

| Fullmakt | A-melding | Sykmelding |
|---|---|---|
| `regnskapsforer-lonn` (fra rollen REGN) | Ja | Nei |
| `a-ordning` (gitt direkte) | Ja | Nei |
| `sykefravaer-personopplysninger-saerlig-kategori` (gitt direkte) | Nei | Ja |
| Enkelttjenesten `nav_sykepenger_sykmelding` (gitt direkte) | Nei | Ja |

Lønnssystemer ber i tillegg ofte om `lonn` og `lonn-personopplysninger-saerlig-kategori`. Tilgangspakkene og tjenestene er slik de ligger i produksjon i dag. Vi har ikke bekreftet at tjenestene er klare for systembruker.

---
## Scenario 1: bare tilgangspakker

Du beskriver de to kundetypene som hvert sitt sett. Begge settene dekker både a-melding og sykmelding.

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
        { "urn": "urn:altinn:accesspackage:lonn-personopplysninger-saerlig-kategori" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    },
    "uregistrert": {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:a-ordning" },
        { "urn": "urn:altinn:accesspackage:lonn" },
        { "urn": "urn:altinn:accesspackage:lonn-personopplysninger-saerlig-kategori" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    }
  },
  "redirectUrl": "https://lonn.example.no/altinn/callback"
}
```

Organisasjonsnumre, system-ID og URL-er er fiktive. Nøklene `regnskapsforer` og `uregistrert` er id-ene du velger for settene. Med `vendorLocked: true` er dette «Leverandøren bestemmer»: settene er bindende. Du kan legge til nye sett senere, men ikke endre eller slette disse.

---
## Scenario 2: tilgangspakker og enkelttjeneste

Settene er like, men sykmeldingen er en enkelttjeneste. Systemet får da fullmakt til sykmeldingen uten alt det andre som ligger i pakken.

```json
"clientAccessSets": {
  "regnskapsforer": {
    "name": {
      "nb": "Registrert regnskapsfører",
      "en": "Registered accountant"
    },
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:regnskapsforer-lonn" },
      { "urn": "urn:altinn:accesspackage:lonn-personopplysninger-saerlig-kategori" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  },
  "uregistrert": {
    "name": {
      "nb": "Uten regnskapsførerrolle",
      "en": "No accountant role"
    },
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:a-ordning" },
      { "urn": "urn:altinn:accesspackage:lonn" },
      { "urn": "urn:altinn:accesspackage:lonn-personopplysninger-saerlig-kategori" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  }
}
```

Id-en er nøkkelen og ligger fast. Den kan ha små bokstaver, tall og bindestrek, og høyst 50 tegn. Feltet `name` er navnet virksomheten ser. Det er et objekt med ett eller flere av språkene `nb`, `nn` og `en`, slik navn er i systemregisteret. Du trenger ikke oversette navnet. Finnes ikke navnet på språket brukeren har valgt i Altinn, viser Altinn det første språket i feltet. Uten `name` ser virksomheten «Alternativ 1», «Alternativ 2» og så videre. I eksempelet ser en bruker som har valgt nynorsk, det bokmålske navnet. Feltet er valgfritt, og navnet på feltet er foreløpig.

En klient som har gitt Sykefravær-pakken, oppfyller ikke disse settene. Virksomheten kan ikke gi videre en tjeneste alene når den har fått tjenesten gjennom en pakke.

---
## Slik går det med klientene i scenario 1

I tabellen er «Lønn med særlig kategori» og «Sykefravær med særlig kategori» forkortelser for pakkene med personopplysninger av særlig kategori.

| Klienten har gitt byrået | Sett | Resultat |
|---|---|---|
| Regnskapsførerrollen, Lønn med særlig kategori og Sykefravær med særlig kategori | 1 | Virksomheten kan knytte klienten til systembrukeren |
| A-ordningen, Lønn, Lønn med særlig kategori og Sykefravær med særlig kategori | 2 | Virksomheten kan knytte klienten til systembrukeren |
| Regnskapsførerrollen og Lønn med særlig kategori | Ingen | Flaten viser at Sykefravær med særlig kategori mangler, og at klienten må gi den |
| Regnskapsførerrollen, Lønn med særlig kategori og pakken Sykefravær | Ingen | Flaten viser at klienten har gitt en annen sykefraværspakke, og at Sykefravær med særlig kategori mangler |
| Lønn, Lønn med særlig kategori og Sykefravær med særlig kategori | Ingen | Flaten viser at klienten mangler én fullmakt til hvert sett: Regnskapsfører lønn til sett 1 og A-ordningen til sett 2 |
| Revisorrollen og Sykefravær med særlig kategori | Ingen | Flaten viser hva som mangler. Lønnssystemet har ikke noe sett for revisorkunder |
| Bare en annen pakke, for eksempel Merverdiavgift | Ingen | Flaten viser at klienten ikke har gitt noe av det systemet krever |

Klienten kan ikke delegere Regnskapsfører lønn direkte. En klient uten regnskapsførerrolle kan derfor bare oppfylle sett 2.

---
## Når klienten passer med flere sett

Klienten kan ha gitt nok til at flere sett er oppfylt. Da kan virksomheten legge klienten til i raden for hvert av settene, og velger selv hvilke sett den knytter klienten til. Systembrukeren får alle fullmaktene i settene klienten er knyttet til.

Eksempel fra scenario 1: Fjellvik Bygg AS har regnskapsførerrollen, og har også gitt A-ordningen, Lønn og begge pakkene med særlig kategori direkte.

| Sett | Oppfylt | Dette skjer |
|---|---|---|
| 1. Registrert regnskapsfører | Ja | Virksomheten kan legge klienten til i raden for settet |
| 2. Uten regnskapsførerrolle | Ja | Virksomheten kan legge klienten til i raden for settet |

**Virksomheten velger.** Legger byrået klienten til i begge radene, får systembrukeren både Regnskapsfører lønn og A-ordningen og Lønn. I hver rad ser byrået at systembrukeren også har fullmakter fra klienten gjennom det andre settet.

**Rekkefølgen avgjør bare rekkefølgen på radene.** Den hindrer ikke at systemet får mer fullmakt enn det trenger. I dag dekker Regnskapsfører lønn 700 tjenester og A-ordningen 8. Vil du gi systemet minst mulig fullmakt, må du lage settene så smale du kan.

---
## Slik lar du kunden styre fullmaktene selv

Sett `vendorLocked` til `false`. Listene for egen virksomhet blir da et forslag kunden får når de godkjenner. Du kan ikke sende fullmaktssett for klienter. Virksomheten velger selv hva hver klient gir systembrukeren.

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

Vil kunden gi alle fullmakter selv, sender du `vendorLocked: false` med tomme lister.

Når virksomheten bestemmer, har byrået ikke **Legg til alle klienter**. Byrået åpner hver klient og velger fullmakter. Trenger byrået å legge til mange klienter samtidig, bør du bruke `vendorLocked: true`.

---
## Hva du må tenke på når virksomheten bestemmer

Når kunden styrer fullmaktene, kan de fjerne noe systemet ditt trenger. Det kan også skje lenge etter godkjenningen.

- **Ikke anta at godkjent betyr at systemet har alt du foreslo.** Kunden kan endre fullmaktene når som helst.
- **Håndter avvist fullmakt i systemet ditt.** Får du `403` fra en tjeneste, bør du vise kunden hvilken fullmakt som mangler.
- **Fortell kunden hva systemet trenger.** Dokumenter hvilke tilgangspakker og enkeltrettigheter de ulike funksjonene i systemet ditt bruker.
- **Be om det som mangler.** Mangler systembrukeren en fullmakt for egen virksomhet, kan du sende kunden en forespørsel om fullmakt.

Vi vurderer et API og varsling slik at du kan se hvilke fullmakter systembrukeren faktisk har. Det er ikke avklart ennå.

---
## Hvilken måte bør du velge?

| Situasjon | Anbefaling |
|---|---|
| Systemet trenger alltid de samme fullmaktene, og bare du skal kunne endre dem | Leverandøren bestemmer, som i dag |
| Byrået har mange klienter og vil legge dem til samtidig | Leverandøren bestemmer. Bare da finnes **Legg til alle** |
| Kundene trenger ulike fullmakter, eller behovet endrer seg ofte | Virksomheten bestemmer, med et forslag |
| Kunden har egen kompetanse på tilgangsstyring og vil bestemme alt selv | Virksomheten bestemmer, uten lister |
| Du vil unngå mange endringsforespørsler for små justeringer | Virksomheten bestemmer, med et forslag |

Er du i tvil, velg `vendorLocked: true`. Da virker systembrukeren som i dag. Du kan fjerne låsen senere, men ikke låse en systembruker som har vært åpen.

---
## Om skissene

De neste lysbildene viser hvordan virksomhetene kan se og forvalte systembrukere i Tilgangsstyring.

- Dette er skisser for å forstå problemet, ikke designforslag. Både utformingen og funksjonaliteten kan endre seg, og vi vil gjerne ha innspill.
- Alle skissene følger oppsettet UX-teamet har foreslått. Innholdet står i grupper, byrået åpner en klient i listen, og siden har ingen dialoger bortsett fra bekreftelser.
- Alle brukerlister viser en systembruker med flere fullmaktssett som én rad per sett. Fullmakter for egen virksomhet har en egen rad. Det er fortsatt én systembruker.
- Når byrået åpner raden for et sett, viser siden bare det settet, med én **Legg til alle**. Altinn krysser ikke av for noe sett på forhånd.
- Når virksomheten bestemmer, finnes det ingen fullmaktssett. For klientene er systembrukeren lik en ansatt med klienttilganger.
- Skissene bruker navnene fra scenario 2: «Registrert regnskapsfører» og «Uten regnskapsførerrolle». Uten navn kaller Altinn settene «Alternativ 1», «Alternativ 2» og så videre, i den rekkefølgen du oppgir dem.
- Reglene bak skissene står til slutt i presentasjonen.

Alle navn, organisasjonsnumre og eksempeltilganger er fiktive.

---
## Virksomhetene finner systembrukerne under Brukere

Systembrukerne står i den samme listen som personer og virksomheter på den vanlige brukersiden, og i fanen **Brukere** i Klientadministrasjon. Det skal gå fram hvem som bestemmer fullmaktene, men vi har ikke bestemt hvordan. Klientadministrasjon viser bare en liste over brukere med klienttilgang, som i dag, og radene for systembrukeren står i den listen.

- En systembruker med to fullmaktssett er to rader, for eksempel «Personalportalen – Registrert regnskapsfører». Uten navn heter raden «Personalportalen – Alternativ 1».
- Fullmakter for egen virksomhet har en egen rad.
- Systembrukerne står alltid i listen, også når **Vis brukere med klienttilgang** er slått av.
- Sletter byrået systembrukeren fra en av radene, forsvinner alle radene. Bekreftelsen sier det.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-brukere.png" alt="Brukere for Tallmakerne AS: én liste der personer og systembrukere står sammen, med én rad per alternativ og egen virksomhet: Personalportalen – Registrert regnskapsfører og Personalportalen – Uten regnskapsførerrolle, SmartRegnskap – Egen virksomhet, Egen integrasjon – Egen virksomhet og Rapportrobot – Klienter"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" alt="Klientadministrasjon, fanen Brukere: én liste over brukere med klienttilgang, med Kari Nordmann, Ada Eksempel, Personalportalen – Registrert regnskapsfører og Personalportalen – Uten regnskapsførerrolle og Rapportrobot – Klienter. Radene for egen virksomhet står ikke her"></a><a href="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" alt="Bekreftelsen Slette systembrukeren Personalportalen? Begge radene for Personalportalen forsvinner, og Personalportalen mister alle fullmaktene for 2 klienter"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Brukersiden når leverandøren bestemmer

Virksomheten ser fullmaktene, men kan ikke fjerne eller legge til enkelte fullmakter. Det eneste virksomheten kan gjøre, er å slette hele systembrukeren. Siden forklarer at leverandøren endrer fullmaktene med en endringsforespørsel.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" alt="SmartRegnskap – Egen virksomhet: Eksempel Programvare AS bestemmer fullmaktene. Skattegrunnlag og Innsending av MVA-melding står uten knapper, og siden har Slett systembruker"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når leverandøren bestemmer

Byrået åpner raden for ett alternativ i brukerlisten. Siden viser bare det alternativet: klienter som er lagt til, klienter byrået kan legge til, og klienter som mangler noe. Altinn krysser ikke av for noe alternativ på forhånd.

- Byrået legger en klient til alternativet, eller bruker **Legg til alle**.
- Systembrukeren får alle fullmaktene i alternativet, både tilgangspakker og enkelttjenester, eller ingen av dem.
- Byrået vil se et annet alternativ, går de tilbake til listen og åpner en annen rad.
- Altinn vurderer hvert alternativ for seg. En klient kan være komplett i ett alternativ og mangle noe i et annet.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-havbris.png" alt="Raden Personalportalen – Registrert regnskapsfører åpnet: Eksempelklient AS under Har disse klientene, Fjellvik Bygg AS under Kan få disse klientene med Legg til alle, og seks klienter som ikke kan legges til ennå, for eksempel Nordavind Bygg AS med linjen Mangler Regnskapsfører lønn. Kan legges til i «Uten regnskapsførerrolle»."></a><a href="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" alt="Eksempelklient AS åpen i raden for «Registrert regnskapsfører»: de tre fullmaktene i alternativet er blå, fordi Personalportalen har dem, og knappen Fjern klienten fra alternativet"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Klienten oppfyller flere alternativer

Fjellvik Bygg AS oppfyller begge alternativene, så byrået kan legge klienten til i begge radene. Klienten er knyttet til «Uten regnskapsførerrolle», og står som mulig klient i raden for «Registrert regnskapsfører». Byrået knytter klienten til ett alternativ om gangen, og kan knytte den til begge.

- Er klienten knyttet til flere alternativer, får systembrukeren alle fullmaktene i dem.
- Uansett hvilken rad byrået åpner, viser klienten fullmakter systembrukeren har fra klienten utenfor alternativet. Det gjelder fullmakter fra andre alternativer. Ingen fullmakt skal være skjult.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" alt="Fjellvik Bygg AS åpen i raden for «Registrert regnskapsfører», med knappen Legg klienten til. Regnskapsfører lønn er grå, fordi byrået har den, men ikke har gitt den til Personalportalen. De to pakkene med særlig kategori er blå, fordi Personalportalen har dem gjennom «Uten regnskapsførerrolle»"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienten har allerede et annet alternativ

**Situasjon:** Eksempelklient AS er knyttet til «Registrert regnskapsfører», så Personalportalen har de tre fullmaktene i det alternativet. Klienten har også gitt Tallmakerne AS A-ordningen, men ikke Lønn. Byrået åpner raden for «Uten regnskapsførerrolle».

**Det byrået ser:** Klienten står blant dem som mangler noe. Når byrået åpner klienten, viser fargen hvor hver fullmakt står:

- **Blå:** Lønn med personopplysninger av særlig kategori og Sykefravær med personopplysninger av særlig kategori. Personalportalen har dem allerede, gjennom «Registrert regnskapsfører».
- **Grå:** A-ordningen. Byrået har den fra klienten, men har ikke gitt den til Personalportalen.
- **Rød, med merket Mangler:** Lønn. Klienten har ikke gitt den til byrået.

**Det byrået gjør:** Ingenting, så lenge klienten er komplett i «Registrert regnskapsfører». Skal klienten også inn i «Uten regnskapsførerrolle», må klienten gi Lønn først.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-eksempelklient-annet-alternativ.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-eksempelklient-annet-alternativ.png" alt="Eksempelklient AS åpen i raden for «Uten regnskapsførerrolle»: A-ordningen grå, Lønn rød med merket Mangler, og Lønn med personopplysninger av særlig kategori og Sykefravær med personopplysninger av særlig kategori blå, fordi Personalportalen har dem gjennom «Registrert regnskapsfører»"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Alternativene kan ha navn

Skissene viser fullmaktssett med navn, for eksempel «Personalportalen – Registrert regnskapsfører». Gir du ikke settene navn, ser byrået «Alternativ 1», «Alternativ 2» og så videre.

- **Navnet kan ha flere språk:** `nb`, `nn` og `en`, som navn i systemregisteret.
- **Du trenger ikke oversette.** Finnes ikke navnet på språket brukeren har valgt, viser Altinn det første språket i feltet.
- **Hold navnet kort.** Det står etter navnet på systemet i brukerlisten.

```json
"name": {
  "nb": "Registrert regnskapsfører",
  "en": "Registered accountant"
}
```

Feltet er et forslag. Si gjerne fra om du ønsker det, og om du vil bruke flere språk.

---
## Virksomheten legger til mange klienter samtidig

Raden for hvert alternativ har sin egen **Legg til alle**. Knappen knytter klientene som oppfyller alternativet, hvis de ikke er knyttet til det fra før. Har byrået fått tre nye klienter som oppfyller alternativet, legger knappen til de tre. Siden spør først.

En klient som oppfyller flere alternativer, blir bare knyttet til alternativet byrået bruker knappen for.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" alt="Bekreftelsen Legge til 2 klienter i Personalportalen – Uten regnskapsførerrolle? Personalportalen får fullmaktene i «Uten regnskapsførerrolle» for Nordavind Bygg AS og Solvang Transport AS"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Brukersiden når virksomheten bestemmer

Hver fullmakt har knappen **Fjern**. Linjen under fullmakten viser om den kom fra forespørselen, eller om virksomheten la den til. Virksomheten kan fjerne begge typene.

Med **Gi flere fullmakter** velger virksomheten tilgangspakker og enkelttjenester på samme side. Det virksomheten ikke har lov til å gi, står i en egen gruppe, med en forklaring.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" alt="Egen integrasjon – Egen virksomhet der virksomheten bestemmer: Skattegrunnlag fra forespørselen og A-ordningen lagt til av Tallmakerne AS, begge med knappen Fjern"></a><a href="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" alt="Gi Egen integrasjon flere fullmakter: gruppene Kan gis, Har allerede og Kan ikke gis, med forklaring på hvorfor Lønn ikke kan gis"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Systembruker uten fullmakter

Sender du `vendorLocked: false` med tomme lister, starter systembrukeren uten fullmakter. Virksomheten ser at systemet ikke kan gjøre noe før de gir fullmakter.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" alt="Systembrukeren Rapportrobot uten fullmakter, med knappen Gi fullmakter"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når virksomheten bestemmer

Når virksomheten bestemmer, har systembrukeren ingen fullmaktssett. Brukerlisten har én rad for klientene, og en egen rad for egen virksomhet hvis systembrukeren har fullmakter der. For klientene er systembrukeren lik en vanlig ansatt som byrået har gitt klienttilganger, og siden følger samme mønster som for en ansatt i Klientadministrasjon i dag. Byrået åpner en klient og gir én og én fullmakt med **Gi fullmakt**, eller alt klienten har gitt, med **Gi alle**. Endringen gjelder med en gang. Klienten står under **Har disse klientene** så snart systembrukeren har fått én fullmakt fra den.

- Tjenester klienten har gitt gjennom en tilgangspakke, kan virksomheten ikke gi alene.
- Trekker en klient tilbake en fullmakt, mister systembrukeren den samtidig.
- **Gi alle** gjelder én klient. Siden har ikke **Legg til alle klienter**, som bare finnes når leverandøren bestemmer.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-liste.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-liste.png" alt="Rapportrobot – Klienter der virksomheten bestemmer, i samme mønster som en ansatt i Klientadministrasjon: søket Søk etter klient, Vis slettede, og gruppene Har disse klientene og Kan få disse klientene, uten knapp for å legge til alle klienter"></a><a href="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-apen.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-uten-forslag-apen.png" alt="Rapportrobot – Klienter med Nordavind Bygg AS åpen under Kan få disse klientene: de fire fullmaktene klienten har gitt, hver med Gi fullmakt, og knappene Gi alle og Slett alle"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Klientens side viser systembrukerne

På siden for en klient ser virksomheten hvilke brukere som har fullmakt fra klienten, og hvilke som kan få det, som i Klientadministrasjon i dag. Systembrukerne står i de samme listene som personene. En systembruker med flere fullmaktssett står med én rad per sett. En rad som ikke kan få klienten, viser det som mangler, på samme måte som siden for raden.

- Solvang Transport AS: «Personalportalen – Uten regnskapsførerrolle» kan få klienten. Raden for «Registrert regnskapsfører» viser at Regnskapsfører lønn mangler. Rapportrobot – Klienter kan også få klienten.
- Elvebakken Kafé AS har bare gitt Merverdiavgift. Rapportrobot – Klienter kan få klienten, fordi virksomheten bestemmer. Begge radene for Personalportalen viser hva som mangler, og byrået må kontakte klienten.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" alt="Siden for Solvang Transport AS: ingen brukere har fullmakt fra klienten ennå. Under Brukere som kan få fullmakt viser Personalportalen – Registrert regnskapsfører at Regnskapsfører lønn mangler, og Personalportalen – Uten regnskapsførerrolle er åpen med Legg klienten til og de fire fullmaktene i grått, fordi byrået har dem, men ikke har gitt dem videre"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" alt="Siden for Elvebakken Kafé AS: ingen brukere har fullmakt fra klienten. Raden Personalportalen – Registrert regnskapsfører er åpen med alle tre fullmaktene røde og merket Mangler, og begge radene for Personalportalen viser at klienten ikke har gitt noe av det alternativet krever"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: klienten har gitt en helt annen pakke

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Klienten mangler alt systemet krever, og Altinn kan ikke vite hvilket kundeforhold klienten skal ha. Derfor står klienten blant dem som mangler noe i raden for hvert alternativ.

**Det byrået gjør:** Åpner klienten i en av radene, avklarer kundeforholdet, og ber klienten gi det som mangler. Merverdiavgift-pakken påvirker ikke Personalportalen.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" alt="Elvebakken Kafé AS åpen i raden for «Registrert regnskapsfører»: klienten har bare gitt Merverdiavgift, og alle tre fullmaktene i alternativet er røde med merket Mangler"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: pakke med nesten likt navn

**Situasjon:** Byrået ba Fjordbakeriet AS gi Sykefravær med personopplysninger av særlig kategori, men klienten ga pakken Sykefravær. Dette er to ulike pakker.

**Det byrået gjør:** Åpner klienten i listen, ser hva klienten ga, og ber klienten gi riktig pakke. Da slipper byrået å gå via support. Når pakken er gitt, kan byrået legge til klienten.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" alt="Fjordbakeriet AS åpen i raden for «Registrert regnskapsfører»: Regnskapsfører lønn og Lønn med personopplysninger av særlig kategori er grå, og Sykefravær med personopplysninger av særlig kategori er rød med merket Mangler, fordi klienten har gitt Sykefravær, som er en annen tilgangspakke"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten mangler like mye til flere alternativer

**Situasjon:** Kystlinjen Eiendom AS har gitt Lønn og begge pakkene med særlig kategori. Hvert alternativ mangler én fullmakt: Regnskapsfører lønn til «Registrert regnskapsfører» og A-ordningen til «Uten regnskapsførerrolle». Klienten står blant dem som mangler noe i begge radene. Altinn peker ikke på et bestemt alternativ.

**Det byrået gjør:** Avklarer kundeforholdet. Er byrået regnskapsfører, registrerer klienten det i Enhetsregisteret. Ellers kan klienten gi A-ordningen direkte.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" alt="Kystlinjen Eiendom AS åpen i raden for «Registrert regnskapsfører»: Regnskapsfører lønn er rød med merket Mangler og kommer fra regnskapsførerrollen, de to pakkene med særlig kategori er grå, og klienten mangler også A-ordningen til «Uten regnskapsførerrolle»"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten står ikke i listen

**Situasjon:** Byrået finner ikke Granly Hage. Det kan skyldes en skrivefeil, at virksomheten ikke har gitt noe, eller at de har gitt fullmakten til en annen virksomhet. Siden viser ikke noe om virksomheten.

**Det byrået gjør:** Sjekker søket, og ber virksomheten sjekke at de har gitt fullmakten til riktig organisasjonsnummer.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" alt="Søk etter Granly Hage uten treff, med forklaring om at en virksomhet vises først når den har gitt Tallmakerne AS en fullmakt"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten er slettet i Enhetsregisteret

**Situasjon:** Siden skjuler slettede klienter til byrået slår på **Vis slettede**. Byrået kan ikke legge dem til. Enhetsregisteret slettet Gamle Verksted AS mens klienten var knyttet til Personalportalen.

**Det byrået gjør:** Fjerner klienten fra systembrukeren. Vi har ikke avklart om systembrukeren fortsatt har fullmakt for en slettet klient.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-slettede.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-slettede.png" alt="Gruppen Slettede klienter med to klienter. Gamle Verksted AS har Personalportalen fortsatt, og kan fjernes"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: byrået fjerner fullmakter når virksomheten bestemmer

**Situasjon:** Rapportrobot har «Virksomheten bestemmer», og har fått Sykefravær-pakken og Lønn for Havbris Fiskeoppdrett AS. Byrået åpner klienten i raden for klientene og klikker **Slett fullmakt** på Sykefravær-pakken og Lønn. Endringen gjelder med en gang, som for en ansatt i dag.

**Det byrået ser etterpå:** Har systembrukeren ingen fullmakter igjen fra klienten, står klienten under **Kan få disse klientene**. **Slett alle** fjerner alle fullmaktene fra klienten på én gang.

Når virksomheten bestemmer, finnes det ikke noe forslag fra leverandøren for klienter. De tidligere scenariene der byrået velger noe annet enn forslaget, er derfor tatt ut.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" alt="Rapportrobot – Klienter med Havbris Fiskeoppdrett AS åpen under Har disse klientene: Sykefravær med personopplysninger av særlig kategori og Lønn med Slett fullmakt, de to andre fullmaktene med Gi fullmakt, og knappene Gi alle og Slett alle"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienten ser systembrukerne hos byrået

Klienten ser systembrukere hos byrået på samme måte som byråets ansatte, uansett om leverandøren eller virksomheten bestemmer. De står i den vanlige listen under **Brukere** når klienten slår på **Vis brukere med klienttilgang**, ikke under byrået. Linjen under navnet viser hvilket byrå fullmakten går gjennom.

- Klienten kan ikke fjerne enkelte fullmakter fra en ansatt eller en systembruker hos byrået.
- Klienten kan fjerne en fullmakt de har gitt byrået direkte. Da mister både ansatte og systembrukere den.
- Fullmakter fra revisor- eller regnskapsførerrollen forsvinner bare hvis klienten endrer rollen i Enhetsregisteret.
- Er klienten knyttet til flere fullmaktssett på samme systembruker, ser klienten én rad per sett.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" alt="Brukere hos Fjellvik Bygg AS med Vis brukere med klienttilgang slått på: én flat liste med to ansatte i Fjellvik, Tallmakerne AS med merket Regnskapsfører, Ola Nordmann og Personalportalen – Uten regnskapsførerrolle med merket Systembruker, der de to siste har linjen Regnskapsfører for Tallmakerne AS"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" alt="Siden for Personalportalen – Uten regnskapsførerrolle sett fra Fjellvik Bygg AS: de fire fullmaktene i alternativet gjennom Tallmakerne AS, uten knapper for å fjerne dem"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Mer informasjon

- [Slik ber du om systembruker i dag](/nb/authorization/guides/system-vendor/system-user/systemuserrequest/)
- [Slik endrer du rettighetene til en systembruker](/nb/authorization/guides/system-vendor/system-user/changerequest/)
- [Klientdelegering for systemleverandører](/nb/authorization/guides/system-vendor/system-user/client-delegation/)
- [Slik ber du om fullmakt fra en annen part med tilgangsstyrings-API-et](/nb/authorization/guides/system-vendor/access-management/#be-om-fullmakt-fra-en-annen-part)
- [Slik godkjenner virksomheten en systembruker](/nb/authorization/guides/end-user/system-user/accept-request/)
- [Vedtakene og de åpne valgene, presentasjonen for teamet](../diskusjonsgrunnlag/)
- [Arbeidet på GitHub, epic for systembrukermodellen](https://github.com/Altinn/altinn-auth/issues/4510)

---
## Reglene bak skissene: synlighet

| Regel | Hva den betyr |
|---|---|
| R1 | **Brukere** viser alle systembrukere virksomheten eier, i samme liste som personer og virksomheter. Systembrukerne står der alltid, også når **Vis brukere med klienttilgang** er slått av. |
| R2 | **Klientadministrasjon** og klientens side viser også systembrukere med klienttilganger eller klientkrav. |
| R3 | Det går fram at raden er en systembruker, og hvilket system og hvilken leverandør den tilhører. |
| R3a | Alle brukerlister viser en systembruker med fullmaktssett som én rad per sett, også hos klienten. Raden heter system + navnet på settet, ellers «Alternativ N». Fullmakter for egen virksomhet har en egen rad. Når virksomheten bestemmer, er det én rad for egen virksomhet og én for klienter. |
| R4 | Virksomheten oppretter ikke systembrukere med **Ny bruker**. De kommer fra en forespørsel fra leverandøren, eller fra siden **Systembrukere** når virksomheten velger et system selv. |

---
## Reglene bak skissene: leverandøren bestemmer

| Regel | Hva den betyr |
|---|---|
| R5 | Siden viser tilgangspakker og enkelttjenester uten knapper for å fjerne eller legge til enkelte fullmakter. |
| R6 | Virksomheten kan bare slette hele systembrukeren, med alle fullmakter og klientdelegeringer. Virksomheten kan starte slettingen fra hvilken som helst av radene, og bekreftelsen sier at alle radene forsvinner. |
| R7 | Siden forklarer at leverandøren bestemmer fullmaktene, og at endringer kommer som en endringsforespørsel. |
| R8 | Siden for en rad viser bare det fullmaktssettet. Virksomheten knytter klienten til settet og gir hele settet. En klient kan være knyttet til flere sett, altså flere rader. |
| R8a | Leverandøren kan ikke endre eller slette et fullmaktssett, bare legge til nye. Et nytt sett blir en ny rad etter de andre radene for systembrukeren, uten klienter. Unntaket er når leverandøren fjerner låsen. Da sletter Altinn alle settene (R25). |
| R9 | Virksomheten kan ikke knytte en klient til et sett klienten ikke oppfyller. Siden for raden viser klienten likevel. Når byrået åpner klienten, ser de hva klienten har gitt, og hva som mangler til settet. Altinn vurderer hvert sett for seg. |
| R9a | Når byrået åpner en klient i en rad, har hver fullmakt i alternativet én av tre farger. Blå: systembrukeren har den fra klienten, også gjennom et annet alternativ. Grå: byrået har den fra klienten, men har ikke gitt den til systembrukeren. Rød med merket **Mangler**: klienten har ikke gitt den til byrået. Tekstene under forklarer fargene, så de kan leses uten farge. |
| R10 | Virksomheten kan fjerne en klient fra settet i raden. Fullmakter som også ligger i et annet sett klienten er knyttet til, beholder systembrukeren. Dette er ikke bekreftet. |
| R11 | Virksomheten kan knytte mange klienter til settet i raden samtidig, med **Legg til alle**. Knappen gjelder bare klienter som ikke er knyttet til settet fra før. |
| R11a | Uansett hvilken rad virksomheten åpner, viser klienten fullmakter systembrukeren har fra klienten gjennom andre sett. Ingen fullmakt skal være skjult. |
| R12 | Siden skjuler slettede klienter som standard, med et valg for å vise dem. |

---
## Reglene bak skissene: virksomheten bestemmer

| Regel | Hva den betyr |
|---|---|
| R13 | Virksomheten kan fjerne hver tilgangspakke og enkelttjeneste for seg. For klienter skjer det med **Slett fullmakt** og **Slett alle**, som for en ansatt i Klientadministrasjon i dag. |
| R14 | Virksomheten kan gi nye fullmakter, men bare det de selv har lov til å gi. Siden viser resten med en forklaring. |
| R15 | For egen virksomhet går det fram om en fullmakt kom fra leverandørens forslag, eller om virksomheten la den til. Virksomheten kan fjerne begge typene. |
| R16 | En systembruker uten fullmakter forklarer at systemet ikke kan gjøre noe ennå, og har en tydelig inngang til å gi fullmakter. |
| R17 | Virksomheten kan slette hele systembrukeren. |
| R18 | For klientene er systembrukeren lik en vanlig ansatt med klienttilganger. For hver klient velger virksomheten tilgangspakker og enkelttjenester én og én, blant fullmaktene klienten har gitt. |
| R19 | Virksomheten kan bare gi en enkelttjeneste videre hvis klienten har gitt den som enkelttjeneste. Handlingene, for eksempel lese og skrive, følger det klienten har gitt. |
| R20 | Systembrukeren har ingen fullmaktssett, så den har ingen fullmakter fra en ny klient før virksomheten gir dem, med **Gi fullmakt** eller **Gi alle** for klienten. Siden har ikke **Legg til alle klienter** når virksomheten bestemmer. |

---
## Reglene bak skissene: felles

| Regel | Hva den betyr |
|---|---|
| R21 | Trekker en klient tilbake en fullmakt, forsvinner klientdelegeringene til systembrukeren automatisk, og virksomheten får vite det. |
| R22 | Bare den som har myndighet, ser handlingene. Den som ikke er tilgangsstyrer eller klientadministrator, ser det samme som i dag. |
| R23 | Lenker fra siden **Systembrukere** leder til de nye sidene, ikke til den gamle klientsiden. |
| R24 | Systembrukerens side viser hvem som bestemmer fullmaktene. Hvordan, har vi ikke bestemt. |
| R25 | Leverandøren kan fjerne låsen uten at virksomheten må godkjenne det. Da bestemmer virksomheten fullmaktene, og Altinn sletter fullmaktssettene uten å fjerne fullmakter. En systembruker som har vært åpen, kan ikke bli låst igjen. Bare leverandøren kan fjerne låsen. Virksomheten kan ikke fjerne den selv, med mindre den selv er leverandør av systemet. |
