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

Oppdatert 10. november 2026

**Det du har laget i dag, virker som før.** Endringene gir nye muligheter som du kan ta i bruk når du vil.

Funksjonaliteten er under utvikling og er ikke tilgjengelig ennå. Vi sender endringene på høring og vil gjerne ha innspill. Navnet på `clientAccessSets` kan endre seg før lansering.

---
## Det viktigste

- **Ingen endring for eksisterende integrasjoner.** Versjon 1 av API-et og dagens systembrukere virker uendret. De nye feltene kommer i versjon 2.
- **Du velger hvem som bestemmer tilgangene.** Versjon 2 krever flagget `vendorLocked`. Med `false` kan virksomheten justere tilgangene etter at den har godkjent. Versjon 1 gir alltid `true`, som i dag.
- **Én systembruker for alle kundetyper.** Med rettighetssett kan ett selskap bruke samme systembruker for regnskapsfører-, revisor- og uregistrerte kunder. Du trenger ikke vite kundeforholdet for å hente token.
- **Én systembruker for egen virksomhet og klienter.** Du trenger ikke lenger velge mellom systembruker for eget system og for klientsystem.
- **Enkeltrettigheter også for klienter.** I dag kan du bare be om tilgangspakker for klientsystem.
- **Forespørselen bestemmer rettighetene.** Du trenger ikke registrere hver rettighet på systemet først.
- **Du kan oppdatere rettighetssettene og be om flere tilganger.** Du slipper å opprette en ny systembruker når det for eksempel kommer nye tilgangspakker. For egen virksomhet kan du be kunden om flere tilganger med en forespørsel.
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
## Forbedring 1: Én systembruker for alle kundetyper

**I dag** har hver systembruker ett fast sett tilgangspakker. Et regnskapsselskap trenger derfor én systembruker per kundetype. Du må vite kundeforholdet til klienten for å velge riktig systembruker før du henter token.

**Etter endringen** holder det med én systembruker. Du beskriver hva som er gyldig for hver kundetype, og henter token på samme måte for alle klienter.

| Kundetype | Slik oppstår kundeforholdet | Selskapet får |
|---|---|---|
| Registrert regnskapsfører | Klienten melder inn selskapet i Samordnet registermelding. Enhetsregisteret får rollen REGN. | Regnskapsførerpakkene, automatisk |
| Registrert revisor | Klienten melder inn selskapet i Samordnet registermelding. Enhetsregisteret får rollen REVI. | Revisorpakkene, automatisk |
| Uregistrert kunde | Klienten delegerer direkte i Altinn. | Det klienten gir, typisk A-ordningen |

---
## Slik virker rettighetssett

Et **rettighetssett** er tilgangspakker og enkeltrettigheter som hører sammen. Du oppgir en prioritert liste med rettighetssett for klientene.

- Klienten må ha gitt alt i et sett for at settet skal være oppfylt.
- Det holder å oppfylle ett av settene.
- Altinn går gjennom settene i rekkefølge og bruker det første klienten oppfyller fullt ut. Rekkefølgen i listen er prioriteten, og du trenger ikke oppgi noe tall.
- Oppfyller klienten flere sett, får systembrukeren bare det første.
- Når leverandøren bestemmer og klienten ikke oppfyller noen av settene, kan ikke virksomheten knytte klienten til systembrukeren. Flaten viser hva som mangler.
- Når virksomheten bestemmer, er settene et forslag. Virksomheten kan da knytte til klienten og velge blant det klienten har gitt.

Fordelen forutsetter at **alle settene dekker de samme tjenestene**. Ellers må du fortsatt vite hvilket sett klienten fikk.

---
## Forbedring 2: Én systembruker for egen virksomhet og klienter

**I dag** må du velge type når du ber om systembruker. Et regnskapssystem som både leverer for regnskapsbyrået selv og for kundene deres, trenger to systembrukere.

**Etter endringen** kan én forespørsel til versjon 2 inneholde begge deler:

| Felt | Gjelder | Status |
|---|---|---|
| `accessPackages` | Tilgangspakker for egen virksomhet | Finnes i dag |
| `rights` | Enkeltrettigheter for egen virksomhet | Finnes i dag |
| `clientAccessSets` | Prioritert liste med rettighetssett for klienter | Nytt, foreløpig navn |
| `vendorLocked` | Hvem som bestemmer tilgangene etter godkjenning | Nytt, påkrevd |

Kunden godkjenner én systembruker. Tilgangene for egen virksomhet får systembrukeren når kunden godkjenner. Tilgangene for klienter får den når virksomheten knytter klienter til systembrukeren.

---
## Forbedring 3: Enkeltrettigheter også for klienter

**I dag** kan systembruker for klientsystem bare få tilgangspakker. Har kunden din fått en enkelttjeneste fra klienten sin, kan de ikke gi den videre til systemet ditt.

**Etter endringen** kan et rettighetssett inneholde enkeltrettigheter. Virksomheten kan da klientdelegere enkelttjenester til systembrukeren, sammen med tilgangspakkene i settet.

Tre regler gjelder:

- Virksomheten kan bare gi videre enkelttjenester den har fått som enkelttjeneste fra klienten. Tjenester den har fått gjennom en tilgangspakke, kan den ikke gi videre én og én.
- Du oppgir ikke `action` i rettighetssett i første versjon. Trenger du finere styring, bruker du tilgangspakker.
- Systembrukeren får de samme handlingene, for eksempel lese og skrive, som klienten har gitt virksomheten.

---
## Forbedring 4: Forespørselen bestemmer rettighetene

**I dag** avviser Altinn en forespørsel som inneholder rettigheter du ikke har registrert på systemet i systemregisteret. Vil du be om en ny rettighet, må du først oppdatere systemet.

**Etter endringen** er det listene og rettighetssettene i forespørselen som bestemmer rettighetene. Systemregisteret verken fyller ut, erstatter eller begrenser dem.

Det betyr at du kan

- be om ulike rettigheter for ulike kunder av samme system
- be om bare det kunden faktisk trenger, i stedet for alt systemet kan gjøre
- legge til en ny tjeneste uten å oppdatere systemregisteret først

Altinn kontrollerer fortsatt at rettighetene finnes, at det går an å delegere dem, og at kunden har myndighet til å gi dem.

---
## Forbedring 5: Du kan oppdatere rettighetssettene

**I dag** kan du ikke endre en systembruker for klientforhold. Du må slette den og opprette den på nytt.

**Etter endringen** får du et eget endepunkt for å oppdatere rettighetssettene på en systembruker, for eksempel når det kommer nye tilgangspakker. Foreløpig forslag til adresse:

```http
PUT /authentication/api/v2/systemuser/vendor/{systemUserId}/clientaccesssets
```

- **Oppdateringen endrer ikke det som er delegert.** Altinn verken gir eller fjerner tilganger.
- **Virksomheten ser avviket.** Flaten viser at settet ikke er komplett for klienter som allerede er knyttet til.
- **Systemet ditt må tåle avviket.** Til virksomheten har gitt det som mangler, kan kall til den nye tjenesten bli avvist for disse klientene.

---
## Forbedring 6: Kunden kan styre tilgangene selv

Det nye flagget `vendorLocked` bestemmer hvem som forvalter tilgangene etter at kunden har godkjent. Flagget er påkrevd i versjon 2, så du må velge for hver forespørsel. Vi kaller de to måtene «Leverandøren bestemmer» og «Virksomheten bestemmer».

| | Leverandøren bestemmer | Virksomheten bestemmer |
|---|---|---|
| `vendorLocked` | `true`, som i dag | `false` |
| Listene og rettighetssettene | Bindende krav | Et forslag kunden starter med |
| Hvem endrer tilgangene etterpå | Du, med endringsforespørsel eller endepunktet for rettighetssett | Kunden selv, i Tilgangsstyring |
| Kan kunden fjerne én tilgang | Nei, bare slette hele systembrukeren | Ja |
| Kan kunden legge til tilganger | Nei | Ja, men bare det de selv har lov til å gi |
| Kan du be om flere tilganger for egen virksomhet | Ja, med en forespørsel om tilgang | Ja, med en forespørsel om tilgang |

Du kan fjerne låsen etter at systembrukeren er opprettet, altså gå fra `vendorLocked: true` til `false`. Virksomheten trenger ikke godkjenne det. Du kan ikke låse en systembruker som har vært åpen. Flagget gjelder bare forespørsler du sender selv. Forespørsler til versjon 1 får alltid `true`.

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
## Fire kombinasjoner av flagg og krav

Krav betyr her tilganger i `accessPackages` eller `rights`, eller minst ett rettighetssett.

| `vendorLocked` | Krav | Resultat | Typisk bruk |
|---|---|---|---|
| `true` | Minst ett | Gyldig. Kravene er bindende, som i dag. | Systemet trenger et fast sett tilganger. |
| `false` | Minst ett | Gyldig. Kravene er et forslag, og kunden kan endre etterpå. | Du vet hva de fleste trenger, men behovet varierer. |
| `false` | Ingen | Gyldig. Systembrukeren starter uten tilganger, og kunden trenger bare å være tilgangsstyrer for å godkjenne. | Kunden vil gi alle tilganger selv. |
| `true` | Ingen | Avvist | – |

I versjon 2 avviser Altinn forespørselen hvis `vendorLocked` mangler. Altinn avviser også et rettighetssett uten tilganger. Flagget gir aldri tilganger av seg selv. Kunden kan bare gi tilganger de har myndighet til å gi.

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
  "clientAccessSets": [
    {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:regnskapsforer-lonn" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    },
    {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:revisormedarbeider" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    },
    {
      "accessPackages": [
        { "urn": "urn:altinn:accesspackage:a-ordning" },
        { "urn": "urn:altinn:accesspackage:sykefravaer-personopplysninger-saerlig-kategori" }
      ]
    }
  ],
  "redirectUrl": "https://lonn.example.no/altinn/callback"
}
```

Organisasjonsnumre, system-ID og URL-er er fiktive. Med `vendorLocked: true` er dette «Leverandøren bestemmer»: settene er krav som bare du kan endre.

---
## Scenario 2: tilgangspakker og enkelttjeneste

Settene er like, men sykmeldingen er en enkelttjeneste. Systemet får da tilgang til sykmeldingen uten alt det andre som ligger i pakken.

```json
"clientAccessSets": [
  {
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:regnskapsforer-lonn" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  },
  {
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:revisormedarbeider" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  },
  {
    "accessPackages": [
      { "urn": "urn:altinn:accesspackage:a-ordning" }
    ],
    "rights": [
      { "resource": [ { "id": "urn:altinn:resource", "value": "nav_sykepenger_sykmelding" } ] }
    ]
  }
]
```

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

Klienten kan ha gitt nok til at flere sett er oppfylt. Da bruker Altinn **det første settet i listen**. Virksomheten velger ikke, og systembrukeren får ikke summen av settene.

Eksempel fra scenario 1: Fjellvik Bygg AS har regnskapsførerrollen, og har også gitt A-ordningen og Sykefravær-pakken direkte.

| Sett | Oppfylt | Dette skjer |
|---|---|---|
| 1. Regnskapsfører lønn + Sykefravær-pakken | Ja | Systembrukeren får dette settet |
| 2. Revisormedarbeider + Sykefravær-pakken | Nei | Ingenting |
| 3. A-ordningen + Sykefravær-pakken | Ja | Ingenting, siden sett 1 står først |

**Virksomheten ser ikke forskjell.** Når byrået åpner klienten i listen, har Altinn krysset av for alternativ 1, og systembrukeren får bare tilgangene i det.

**Rekkefølgen er ditt valg, og den avgjør hvor mye tilgang systemet får.** I dag dekker Regnskapsfører lønn 700 tjenester og A-ordningen 8. Vil du gi systemet minst mulig tilgang, setter du det smaleste settet først. For klienter som ikke oppfyller det, prøver Altinn neste sett.

---
## Slik går du over til én systembruker

Har selskapet i dag én systembruker per kundetype, beholder de dem til de er klare. En klient kan være knyttet til mange systembrukere samtidig, siden selskapet får tilgangen fra klienten og gir den videre til så mange systembrukere det trenger. Selskapet kan derfor gå over gradvis.

1. Du ber om en ny systembruker med `clientAccessSets` i versjon 2, og selskapet godkjenner.
2. Selskapet knytter klientene til den nye systembrukeren. Altinn flytter dem ikke automatisk.
3. Du bytter til den nye systembrukeren når du ber om token.
4. Selskapet sletter de gamle systembrukerne.

Kombinasjonen av `systemId`, organisasjonsnummer og `externalRef` må være unik, og uten `externalRef` bruker Altinn organisasjonsnummeret. Den nye systembrukeren må derfor ha en egen `externalRef`, som du oppgir når du ber om token.

---
## Slik lar du kunden styre tilgangene selv

Sett `vendorLocked` til `false`. Listene blir da et forslag kunden får når de godkjenner.

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
| Kundene trenger ulike tilganger, eller behovet endrer seg ofte | Virksomheten bestemmer, med et forslag |
| Kunden har egen kompetanse på tilgangsstyring og vil bestemme alt selv | Virksomheten bestemmer, uten lister |
| Du vil unngå mange endringsforespørsler for små justeringer | Virksomheten bestemmer, med et forslag |

Er du i tvil, velg `vendorLocked: true`. Da virker systembrukeren som i dag. Du kan fjerne låsen senere, men ikke låse en systembruker som har vært åpen.

---
## Om skissene

De neste lysbildene viser hvordan virksomhetene kan se og forvalte systembrukere i Tilgangsstyring.

- Dette er skisser for å forstå problemet, ikke designforslag. Både utformingen og funksjonaliteten kan endre seg, og vi vil gjerne ha innspill.
- Alle skissene følger oppsettet UX-teamet har foreslått. Innholdet står i grupper, byrået åpner en klient i listen, og siden har ingen dialoger bortsett fra bekreftelser.
- Rettighetssettene heter «Alternativ 1», «Alternativ 2» og så videre, i den rekkefølgen du oppgir dem. Et rettighetssett har ikke noe navn.
- Reglene bak skissene står til slutt i presentasjonen.

Alle navn, organisasjonsnumre og eksempeltilganger er fiktive.

---
## Virksomhetene finner systembrukerne under Brukere

Systembrukerne står i en egen gruppe på den vanlige brukersiden, og i fanen **Brukere** i Klientadministrasjon. Hver rad viser hvem som bestemmer tilgangene. Klientadministrasjon viser også hvor mange klienter hver bruker har.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-brukere.png" alt="Brukere-siden for Nordlys Regnskap AS med gruppene Personer og virksomheter og Systembrukere, der hver systembruker har merket Leverandøren bestemmer eller Virksomheten bestemmer" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" alt="Klientadministrasjon, fanen Brukere, med gruppene Har klienter og Har ingen klienter ennå" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Brukersiden når leverandøren bestemmer

Virksomheten ser tilgangene, men kan ikke fjerne eller legge til enkelttilganger. Det eneste virksomheten kan gjøre, er å slette hele systembrukeren. Siden forklarer at leverandøren endrer tilgangene med en endringsforespørsel.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" alt="Systembrukeren Regnskap Pluss der leverandøren bestemmer, med Skattegrunnlag og Innsending av MVA-melding uten knapper, og en lenke til klientene" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når leverandøren bestemmer

Byrået åpner en klient i listen. Der ser byrået hva klienten har gitt, og hva som mangler til hvert alternativ.

- Altinn krysser av for det første alternativet klienten oppfyller, og sier det under alternativene. Byrået velger ikke selv.
- Systembrukeren får alle tilgangene i alternativet, både tilgangspakker og enkelttjenester, eller ingen av dem.
- For en klient systembrukeren har, viser siden bare alternativet den har. De andre ligger bak en lenke.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-havbris.png" alt="Siden for Personalportalen med Havbris Fiskeoppdrett AS åpen: alternativ 2 er krysset av, og alternativ 1 og 3 viser hva som mangler" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" alt="Nordavind Bygg AS åpen: alternativ 3 er krysset av, og alternativ 1 og 2 viser hva som mangler" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" alt="Eksempelklient AS, som Personalportalen allerede har: bare alternativ 1 vises, med knappen Fjern klienten fra systembrukeren og lenken Se de andre alternativene" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Virksomheten legger til mange klienter samtidig

**Legg til alle klienter** gir systembrukeren det første alternativet hver klient oppfyller, og ingenting annet. Siden spør først.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" alt="Bekreftelsen Legge til 2 klienter? Personalportalen får tilgangene i det første alternativet hver klient oppfyller" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Brukersiden når virksomheten bestemmer

Hver tilgang har knappen **Fjern**. Linjen under tilgangen viser om den kom fra forespørselen, eller om virksomheten la den til. Virksomheten kan fjerne begge typene.

Med **Gi flere tilganger** velger virksomheten tilgangspakker og enkelttjenester på samme side. Det virksomheten ikke har lov til å gi, står i en egen gruppe, med en forklaring.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" alt="Systembrukeren Egen integrasjon der virksomheten bestemmer, med Skattegrunnlag fra forespørselen og A-ordningen lagt til av Nordlys Regnskap AS, begge med knappen Fjern" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-gi-tilganger.png" alt="Gi Egen integrasjon flere tilganger: gruppene Kan gis, Har allerede og Kan ikke gis, med forklaring på hvorfor Lønn ikke kan gis" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Systembruker uten tilganger

Sender du `vendorLocked: false` med tomme lister, starter systembrukeren uten tilganger. Virksomheten ser at systemet ikke kan gjøre noe før de gir tilganger.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-uten-tilganger.png" alt="Systembrukeren Rapportrobot uten tilganger, med knappen Gi tilganger" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når virksomheten bestemmer

For hver klient velger virksomheten hvilke av klientens tilganger systembrukeren skal få. Det klienten har gitt av leverandørens forslag, er krysset av når byrået åpner en ny klient.

- Tjenester klienten har gitt gjennom en tilgangspakke, kan virksomheten ikke gi alene.
- Trekker en klient tilbake en tilgang, mister systembrukeren den samtidig. Linjen under Eksempelklient AS viser hva som skjedde.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-klienter.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-klienter.png" alt="Personalportalen der virksomheten bestemmer: Eksempelklient AS har ikke alt leverandøren foreslår fordi klienten trakk tilbake en tilgang, to klienter kan legges til, og Elvebakken Kafé AS har ikke gitt det leverandøren foreslår" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klientens side viser systembrukerne

På siden for en klient ser virksomheten hva klienten har gitt, og hvilke systembrukere som kan få klienten. En systembruker som ikke kan få klienten, viser det som mangler, på samme måte som listen for systembrukeren.

- Havbris Fiskeoppdrett AS: Personalportalen kan få klienten, men får ikke Ansvarlig revisor. Lønn Direkte krever regnskapsførerrollen.
- Elvebakken Kafé AS har bare gitt Merverdiavgift. Mva-systemet kan få klienten. Personalportalen kan ikke, og byrået må kontakte klienten.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-havbris.png" alt="Siden for Havbris Fiskeoppdrett AS: Personalportalen kan få klienten, og Lønn Direkte mangler Regnskapsfører lønn, som kommer fra regnskapsførerrollen" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klient-elvebakken.png" alt="Siden for Elvebakken Kafé AS: klienten har gitt Merverdiavgift, Mva-systemet kan få klienten, og Personalportalen viser tre alternativer der alt mangler" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: klienten har gitt en helt annen pakke

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Klienten mangler alt systemet krever, og Altinn kan ikke vite hvilket kundeforhold klienten skal ha. Derfor viser siden alle alternativene likt.

**Det byrået gjør:** Åpner klienten i listen, avklarer kundeforholdet, og ber klienten gi det som mangler. Merverdiavgift-pakken påvirker ikke Personalportalen.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" alt="Elvebakken Kafé AS åpen: klienten har bare gitt Merverdiavgift, og Personalportalen får ingen tilgang gjennom den" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: pakke med nesten likt navn

**Situasjon:** Byrået ba Fjordbakeriet AS gi Sykefravær med personopplysninger av særlig kategori, men klienten ga pakken Sykefravær. Dette er to ulike pakker.

**Det byrået gjør:** Åpner klienten i listen, ser hva klienten ga, og ber klienten gi riktig pakke. Da slipper byrået å gå via support. Når pakken er gitt, kan byrået legge til klienten.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" alt="Fjordbakeriet AS åpen: klienten har gitt Sykefravær, som er en annen tilgangspakke enn Sykefravær med personopplysninger av særlig kategori" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten mangler like mye til flere alternativer

**Situasjon:** Kystlinjen Eiendom AS har bare gitt Sykefravær-pakken med særlig kategori. Hvert alternativ mangler én tilgang, så Altinn peker ikke på et bestemt av dem.

**Det byrået gjør:** Avklarer kundeforholdet. Er byrået regnskapsfører eller revisor, registrerer klienten det i Enhetsregisteret. Ellers kan klienten gi A-ordningen direkte.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" alt="Kystlinjen Eiendom AS åpen: klienten mangler én pakke til hvert av de tre alternativene, med ulik forklaring under hvert" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten står ikke i listen

**Situasjon:** Byrået finner ikke Granly Hage. Det kan skyldes en skrivefeil, at virksomheten ikke har gitt noe, eller at de har gitt tilgangen til en annen virksomhet. Siden viser ikke noe om virksomheten.

**Det byrået gjør:** Sjekker søket, og ber virksomheten sjekke at de har gitt tilgangen til riktig organisasjonsnummer.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" alt="Søk etter Granly Hage uten treff, med forklaring om at en virksomhet vises først når den har gitt Nordlys Regnskap AS en tilgang" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten er slettet i Enhetsregisteret

**Situasjon:** Siden skjuler slettede klienter til byrået slår på **Vis slettede**. Byrået kan ikke legge dem til. Enhetsregisteret slettet Gamle Verksted AS mens klienten var knyttet til Personalportalen.

**Det byrået gjør:** Fjerner klienten fra systembrukeren. Vi har ikke avklart om systembrukeren fortsatt har tilgang for en slettet klient.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-slettede.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-slettede.png" alt="Gruppen Slettede klienter med to klienter. Gamle Verksted AS har Personalportalen fortsatt, og kan fjernes" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: virksomheten bestemmer

**Situasjon:** Personalportalen har «Virksomheten bestemmer» og de samme settene som i scenario 1. Havbris Fiskeoppdrett AS har gitt Nordlys Regnskap AS fire tilganger.

**Det byrået gjør:** Åpner klienten i listen. Tilgangene i leverandørens forslag er krysset av, og de andre tilgangene klienten har gitt, står under. Klikker byrået **Legg klienten til systembrukeren**, får systembrukeren forslaget, som når leverandøren bestemmer.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-havbris.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-havbris.png" alt="Havbris Fiskeoppdrett AS åpen når virksomheten bestemmer: Revisormedarbeider og Sykefravær-pakken er krysset av som leverandørens forslag, og Ansvarlig revisor og Lønn kan velges i tillegg" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: byrået velger noe annet enn forslaget

**Situasjon:** Byrået tar bort Sykefravær-pakken og velger Lønn. Siden sier at systemet da kan mangle noe for klienten, men stopper ikke byrået.

**Det byrået ser etterpå:** Raden for klienten viser hvem som la til hver tilgang.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-annet-valg.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-annet-valg.png" alt="Havbris Fiskeoppdrett AS åpen: Sykefravær-pakken er tatt bort og Lønn er valgt, med teksten Personalportalen får da ikke alt Eksempel Programvare AS foreslår" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: byrået fjerner tilganger

**Situasjon:** Byrået fjerner Sykefravær-pakken og Lønn for Havbris. Byrået åpner klienten under **Har disse klientene**, fjerner kryssene og lagrer. Siden oppsummerer hva byrået fjerner.

**Det byrået ser etterpå:** Raden viser at klienten ikke har alt leverandøren foreslår. **Fjern klienten fra systembrukeren** fjerner alle tilgangene på én gang.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" alt="Havbris Fiskeoppdrett AS åpen under Har disse klientene: byrået fjerner Sykefravær-pakken og Lønn, med knappene Lagre endringene og Fjern klienten fra systembrukeren" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten har ikke gitt det leverandøren foreslår

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Når virksomheten bestemmer, kan byrået likevel legge til klienten.

**Det byrået gjør:** Velger blant det klienten har gitt. Ingenting er krysset av på forhånd, og listen har en egen gruppe for slike klienter.

<div style="max-width:720px"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-elvebakken.png" title="Åpne skissen i full størrelse" style="display:block"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-elvebakken.png" alt="Elvebakken Kafé AS åpen under Har ikke gitt det leverandøren foreslår: Merverdiavgift kan velges, og ingenting er krysset av" style="width:100%;height:auto"></a></div>

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienten ser systembrukerne hos byrået

Klienten ser systembrukere hos byrået på samme måte som byråets ansatte, uansett om leverandøren eller virksomheten bestemmer.

- Klienten kan ikke fjerne enkelttilganger fra en ansatt eller en systembruker hos byrået.
- Klienten kan fjerne en tilgang de har gitt byrået direkte. Da mister både ansatte og systembrukere den.
- Tilganger fra revisor- eller regnskapsførerrollen forsvinner bare hvis klienten endrer rollen i Enhetsregisteret.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-byraa.png" alt="Havbris Fiskeoppdrett AS ser Nordlys Regnskap AS: to tilganger fra revisorrollen, to tilganger gitt direkte med knappen Fjern, og Ola Nordmann og Personalportalen som har tilgang gjennom byrået" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klienten-ser-systembruker.png" alt="Samme side med Personalportalen åpen: tre tilganger gjennom Nordlys Regnskap AS, uten knapper for å fjerne dem" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Dette er som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som i dag.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en tilgang, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## Dette er ikke avklart ennå

- Endelig navn på `clientAccessSets`.
- Hvor lenge versjon 1 av forespørselen virker.
- Hvordan du fjerner låsen på en systembruker, og om virksomheten også kan fjerne den selv.
- Om endringsforespørselen skal virke for en systembruker der virksomheten bestemmer tilgangene. Du kan uansett be om flere tilganger for egen virksomhet med en forespørsel om tilgang.
- Hvordan du kan lese hvilke tilganger systembrukeren faktisk har, og hvilke klienter som er knyttet til den, og få varsel når det endrer seg.
- Hva som gjelder når du oppdaterer rettighetssett: om kunden må godkjenne, hva «komplett» betyr med flere sett, og hva som skjer når du fjerner en tilgang fra et sett.
- Hva som skjer når klienten trekker tilbake bare en del av settet, også om systembrukeren skal gå over til et annet sett klienten fortsatt oppfyller.
- Hvor mange rettighetssett du kan oppgi.
- Om Altinn sammenligner tilgangspakkene i settet, eller tjenestene pakkene gir tilgang til. Skissene forutsetter tilgangspakkene.
- Hva listen skal vise når en klient mangler like mye til flere sett. Skissene viser ingen bestemt pakke.
- Hvilke virksomheter listen viser. Skissene forutsetter at listen viser en virksomhet først når den har gitt byrået en tilgang.
- Om systembrukeren fortsatt har tilgang for en klient som er slettet i Enhetsregisteret.
- Om klienten kan fjerne én ansatt eller systembruker hos byrået helt, uten å trekke tilgangen fra byrået.
- Om byrået kan velge flere sett for samme klient, når klienten oppfyller mer enn ett.
- Når funksjonaliteten blir tilgjengelig i testmiljøet og i produksjon.

Vi oppdaterer veiledningene for systemleverandører og virksomheter før funksjonaliteten blir tilgjengelig.

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
| R1 | **Brukere** viser alle systembrukere virksomheten eier, sammen med personer og virksomheter. |
| R2 | **Klientadministrasjon** og klientens side viser også systembrukere med klienttilganger eller klientkrav. |
| R3 | Det går fram at raden er en systembruker, hvilket system og hvilken leverandør den tilhører, og hvem som bestemmer tilgangene. |
| R4 | Virksomheten oppretter ikke systembrukere med **Ny bruker**. De kommer fra en forespørsel fra leverandøren, eller fra siden **Systembrukere** når virksomheten velger et system selv. |

---
## Reglene bak skissene: leverandøren bestemmer

| Regel | Hva den betyr |
|---|---|
| R5 | Siden viser tilgangspakker og enkelttjenester uten knapper for å fjerne eller legge til enkelttilganger. |
| R6 | Virksomheten kan bare slette hele systembrukeren, med alle tilganger og klientdelegeringer. |
| R7 | Siden forklarer at leverandøren bestemmer tilgangene, og at endringer kommer som en endringsforespørsel. |
| R8 | Når virksomheten knytter til en klient, gir de det første rettighetssettet klienten oppfyller fullt ut, samlet. Det er hele settet eller ingenting. |
| R9 | Virksomheten kan ikke knytte til klienter som ikke oppfyller noen av settene. Siden viser dem likevel. Når byrået åpner en klient i listen, ser de hva klienten har gitt, og hva som mangler. |
| R10 | Virksomheten kan fjerne en klient. Da fjerner de hele settet for den klienten. |
| R11 | Virksomheten kan knytte til mange klienter samtidig. |
| R12 | Siden skjuler slettede klienter som standard, med et valg for å vise dem. |

---
## Reglene bak skissene: virksomheten bestemmer

| Regel | Hva den betyr |
|---|---|
| R13 | Virksomheten kan fjerne hver tilgangspakke og enkelttjeneste for seg, med bekreftelse. |
| R14 | Virksomheten kan gi nye tilganger, men bare det de selv har lov til å gi. Siden viser resten med en forklaring. |
| R15 | Det går fram om en tilgang kom fra leverandørens forslag, eller om virksomheten la den til. Virksomheten kan fjerne begge typene. |
| R16 | En systembruker uten tilganger forklarer at systemet ikke kan gjøre noe ennå, og har en tydelig inngang til å gi tilganger. |
| R17 | Virksomheten kan slette hele systembrukeren. |
| R18 | For hver klient velger virksomheten tilgangspakker og enkelttjenester én og én, blant tilgangene klienten har gitt. |
| R19 | Virksomheten kan bare gi en enkelttjeneste videre hvis klienten har gitt den som enkelttjeneste. Handlingene, for eksempel lese og skrive, følger det klienten har gitt. |
| R20 | Det klienten har gitt av leverandørens forslag, er krysset av når virksomheten åpner en ny klient. Har klienten ikke gitt noe av forslaget, er ingenting krysset av. Dette er et forslag, ikke et vedtak. |

---
## Reglene bak skissene: felles

| Regel | Hva den betyr |
|---|---|
| R21 | Trekker en klient tilbake en tilgang, forsvinner klientdelegeringene til systembrukeren automatisk, og virksomheten får vite det. |
| R22 | Bare den som har myndighet, ser handlingene. Den som ikke er tilgangsstyrer eller klientadministrator, ser det samme som i dag. |
| R23 | Lenker fra siden **Systembrukere** leder til de nye sidene, ikke til den gamle klientsiden. |
| R24 | Systembrukerens side viser hvem som bestemmer tilgangene. |
| R25 | Leverandøren kan fjerne låsen uten at virksomheten må godkjenne det. Da bestemmer virksomheten tilgangene. En systembruker som har vært åpen, kan ikke bli låst igjen. Om virksomheten også kan fjerne låsen selv, er ikke avklart. |
