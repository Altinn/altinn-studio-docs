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

Oppdatert 5. november 2026

**Det du har laget i dag, virker som før.** Endringene gir nye muligheter som du kan ta i bruk når du vil.

Funksjonaliteten er under utvikling og er ikke tilgjengelig ennå. Vi kan endre navnene på de nye feltene før lansering.

---
## Det viktigste

- **Ingen endring for eksisterende integrasjoner.** Dagens endepunkter, felt og systembrukere virker uendret. Alle nye felt er valgfrie.
- **Én systembruker for alle kundetyper.** Med rettighetssett kan ett selskap bruke samme systembruker for regnskapsfører-, revisor- og uregistrerte kunder. Du trenger ikke vite kundeforholdet for å hente token.
- **Én systembruker for egen virksomhet og klienter.** Du trenger ikke lenger velge mellom systembruker for eget system og for klientsystem.
- **Enkeltrettigheter også for klienter.** I dag kan du bare be om tilgangspakker for klientsystem.
- **Forespørselen bestemmer rettighetene.** Du trenger ikke registrere hver rettighet på systemet først.
- **Du kan oppdatere rettighetssettene.** Du slipper å opprette en ny systembruker når det for eksempel kommer nye tilgangspakker.
- **Tomme lister for egen virksomhet er lov.** Forespørselen må da ha rettighetssett eller flagget `ownerControlledAccess`. Kunden trenger bare å være tilgangsstyrer for å godkjenne.
- **Kunden kan få styre tilgangene selv.** Med det nye flagget `ownerControlledAccess` kan virksomheten justere tilgangene etter at den har godkjent.

---
## Det du har laget i dag, virker som før

| Det du bruker i dag | Etter endringen |
|---|---|
| Forespørsel om systembruker for eget system med `rights` og `accessPackages` | Virker som før. Du trenger ikke sende de nye feltene. |
| Forespørsel om systembruker for klientsystem (`/request/vendor/agent`) | Virker som før. |
| Endringsforespørsel (`/changerequest/vendor`) | Virker som før. |
| Klientdelegerings-API-et | Virker som før. |
| Systembrukere kundene dine allerede har godkjent | Beholder tilgangene og oppførselen sin. Ingen systembruker går over til «Virksomheten bestemmer» av seg selv. |
| Klienter som er knyttet til systembrukerne dine | Blir der de er. Altinn flytter dem ikke automatisk. |
| Brukerstyrt opprettelse fra systemer i systemregisteret | Virker som før, med rettighetene som er registrert på systemet. |

Sender du ikke `ownerControlledAccess`, får du samme oppførsel som i dag.

---
## Forbedring 1: Én systembruker for alle kundetyper

**I dag** har hver systembruker ett fast sett tilgangspakker. Et regnskapsselskap trenger derfor én systembruker per kundetype. Du må vite kundeforholdet til klienten for å velge riktig systembruker før du henter token.

**Nå** holder det med én systembruker. Du beskriver hva som er gyldig for hver kundetype, og henter token på samme måte for alle klienter.

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
- Oppfyller klienten ingen av settene, kan ikke virksomheten knytte klienten til systembrukeren. Flaten viser hva som mangler.

Fordelen forutsetter at **alle settene dekker de samme tjenestene**. Ellers må du fortsatt vite hvilket sett klienten fikk.

---
## Forbedring 2: Én systembruker for egen virksomhet og klienter

**I dag** må du velge type når du ber om systembruker. Et regnskapssystem som både leverer for regnskapsbyrået selv og for kundene deres, trenger to systembrukere.

**Nå** kan én forespørsel inneholde begge deler:

| Felt | Gjelder | Status |
|---|---|---|
| `accessPackages` | Tilgangspakker for egen virksomhet | Finnes i dag |
| `rights` | Enkeltrettigheter for egen virksomhet | Finnes i dag |
| `clientAccessSets` | Prioritert liste med rettighetssett for klienter | Nytt, foreløpig navn |

Kunden godkjenner én systembruker. Tilgangene for egen virksomhet får systembrukeren når kunden godkjenner. Tilgangene for klienter får den når virksomheten knytter klienter til systembrukeren.

---
## Forbedring 3: Enkeltrettigheter også for klienter

**I dag** kan systembruker for klientsystem bare få tilgangspakker. Har kunden din fått en enkelttjeneste fra klienten sin, kan de ikke gi den videre til systemet ditt.

**Nå** kan et rettighetssett inneholde enkeltrettigheter. Virksomheten kan da klientdelegere enkelttjenester til systembrukeren, sammen med tilgangspakkene i settet.

Tre regler gjelder:

- Virksomheten kan bare gi videre enkelttjenester den har fått som enkelttjeneste fra klienten. Tjenester den har fått gjennom en tilgangspakke, kan den ikke gi videre én og én.
- Du oppgir ikke `action` i rettighetssett i første versjon. Trenger du finere styring, bruker du tilgangspakker.
- Systembrukeren får de samme handlingene, for eksempel lese og skrive, som klienten har gitt virksomheten.

---
## Forbedring 4: Forespørselen bestemmer rettighetene

**I dag** avviser Altinn en forespørsel som inneholder rettigheter du ikke har registrert på systemet i systemregisteret. Vil du be om en ny rettighet, må du først oppdatere systemet.

**Nå** er det listene og rettighetssettene i forespørselen som bestemmer rettighetene. Systemregisteret verken fyller ut, erstatter eller begrenser dem.

Det betyr at du kan

- be om ulike rettigheter for ulike kunder av samme system
- be om bare det kunden faktisk trenger, i stedet for alt systemet kan gjøre
- legge til en ny tjeneste uten å oppdatere systemregisteret først

Altinn kontrollerer fortsatt at rettighetene finnes, at det går an å delegere dem, og at kunden har myndighet til å gi dem.

---
## Forbedring 5: Du kan oppdatere rettighetssettene

**I dag** kan du ikke endre en systembruker for klientforhold. Du må slette den og opprette den på nytt.

**Nå** får du et eget endepunkt for å oppdatere rettighetssettene på en systembruker, for eksempel når det kommer nye tilgangspakker. Foreløpig forslag til adresse:

```http
PUT /authentication/api/v1/systemuser/vendor/{systemUserId}/clientaccesssets
```

- **Oppdateringen endrer ikke det som er delegert.** Altinn verken gir eller fjerner tilganger.
- **Virksomheten ser avviket.** Flaten viser at settet ikke er komplett for klienter som allerede er knyttet til.
- **Systemet ditt må tåle avviket.** Til virksomheten har gitt det som mangler, kan kall til den nye tjenesten bli avvist for disse klientene.

---
## Forbedring 6: Kunden kan styre tilgangene selv

Det nye flagget `ownerControlledAccess` bestemmer hvem som forvalter tilgangene etter at kunden har godkjent. Vi kaller de to måtene «Leverandøren bestemmer» og «Virksomheten bestemmer».

| | Leverandøren bestemmer | Virksomheten bestemmer |
|---|---|---|
| Flagget | `false` eller utelatt, som i dag | `true` |
| Listene og rettighetssettene | Bindende krav | Et forslag kunden starter med |
| Hvem endrer tilgangene etterpå | Du, med endringsforespørsel | Kunden selv, i Tilgangsstyring |
| Kan kunden fjerne én tilgang | Nei, bare slette hele systembrukeren | Ja |
| Kan kunden legge til tilganger | Nei | Ja, innenfor sine egne fullmakter |

Det går an å bytte mellom de to måtene etter at systembrukeren er opprettet. Hvem som kan bytte, og hva som skjer med tilgangene, er ikke avklart ennå. Flagget gjelder bare forespørsler du sender selv.

---
## Godkjenningen er lik som i dag

Kunden godkjenner forespørselen på samme måte som nå, med lenken fra `confirmUrl`.

- **Alt eller ingenting.** Kunden godkjenner hele forespørselen eller avviser den. Kunden kan ikke fjerne enkelte rettigheter mens de godkjenner.
- **Den som godkjenner, må være tilgangsstyrer for virksomheten.** Det gjelder alle forespørsler, som i dag, og uansett flagg.
- **Tilganger for egen virksomhet krever myndighet til hver tilgang.** Mangler kunden myndighet til én av dem, kan de ikke godkjenne.

Eventuelle endringer gjør kunden etterpå, og bare når virksomheten bestemmer tilgangene.

---
## Hva Altinn kontrollerer når kunden godkjenner

Du kan nå be om tomme lister for egen virksomhet. Da er det eneste Altinn kontrollerer ved godkjenning, at den som godkjenner er tilgangsstyrer.

| Forespørselen inneholder | Altinn kontrollerer ved godkjenning |
|---|---|
| Ingen tilganger, med `ownerControlledAccess` | At den som godkjenner er tilgangsstyrer |
| Bare rettighetssett for klienter | At den som godkjenner er tilgangsstyrer |
| Tilganger for egen virksomhet | At den som godkjenner er tilgangsstyrer, og har myndighet til å gi hver av tilgangene |

Rettighetssettene kontrollerer Altinn først når virksomheten knytter en klient til systembrukeren. Da må virksomheten ha fått fullmaktene fra klienten.

Flagget `ownerControlledAccess` endrer ikke hva Altinn kontrollerer ved godkjenning.

---
## Fire kombinasjoner av flagg og krav

Krav betyr her tilganger i `accessPackages` eller `rights`, eller minst ett rettighetssett.

| `ownerControlledAccess` | Krav | Resultat | Typisk bruk |
|---|---|---|---|
| `false` eller utelatt | Minst ett | Gyldig. Kravene er bindende, som i dag. | Systemet trenger et fast sett tilganger. |
| `true` | Minst ett | Gyldig. Kravene er et forslag, og kunden kan endre etterpå. | Du vet hva de fleste trenger, men behovet varierer. |
| `true` | Ingen | Gyldig. Systembrukeren starter uten tilganger, og kunden trenger bare å være tilgangsstyrer for å godkjenne. | Kunden vil gi alle tilganger selv. |
| `false` eller utelatt | Ingen | Avvist | – |

Et rettighetssett uten tilganger blir også avvist. Flagget gir aldri tilganger av seg selv. Kunden kan bare gi tilganger de har myndighet til å gi.

---
## Slik ber du om klientsystem i dag

Denne forespørselen virker som før, og du trenger ikke endre den.

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
POST /authentication/api/v1/systemuser/request/vendor

{
  "systemId": "912345678_lonnssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4711",
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

Organisasjonsnumre, system-ID og URL-er er fiktive. Uten `ownerControlledAccess` er dette «Leverandøren bestemmer»: settene er krav som bare du kan endre.

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

**Virksomheten ser ikke forskjell.** Klienten står under **Kan legges til** med én knapp, og bekreftelsen viser bare tilgangene i sett 1.

**Rekkefølgen er ditt valg, og den avgjør hvor mye tilgang systemet får.** I dag dekker Regnskapsfører lønn 700 ressurser og A-ordningen 8. Vil du gi systemet minst mulig tilgang, setter du det smaleste settet først. Klienter som ikke oppfyller det, går videre til neste sett.

---
## Slik går du over til én systembruker

Har selskapet i dag én systembruker per kundetype, beholder de den til de er klare. En klient kan være knyttet til mange systembrukere samtidig, siden selskapet mottar fullmakten og gir den videre til så mange systembrukere det trenger. Selskapet kan derfor gå over gradvis.

1. Du ber om en ny systembruker med `clientAccessSets`, og selskapet godkjenner.
2. Selskapet knytter klientene til den nye systembrukeren. Altinn flytter dem ikke automatisk.
3. Du bytter til den nye systembrukeren når du ber om token.
4. Selskapet sletter de gamle systembrukerne.

Kombinasjonen av `systemId`, organisasjonsnummer og `externalRef` må være unik, og uten `externalRef` bruker Altinn organisasjonsnummeret. Den nye systembrukeren må derfor ha en egen `externalRef`, som du oppgir når du ber om token.

---
## Slik lar du kunden styre tilgangene selv

Legg til flagget. Listene blir da et forslag kunden får når de godkjenner.

```json
POST /authentication/api/v1/systemuser/request/vendor

{
  "systemId": "912345678_regnskapssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4712",
  "ownerControlledAccess": true,
  "accessPackages": [
    { "urn": "urn:altinn:accesspackage:skattegrunnlag" }
  ],
  "redirectUrl": "https://regnskap.example.no/altinn/callback"
}
```

Vil kunden gi alle tilganger selv, sender du flagget uten lister.

---
## Hva du må tenke på når virksomheten bestemmer

Når kunden styrer tilgangene, kan de fjerne noe systemet ditt trenger. Det kan også skje lenge etter godkjenningen.

- **Ikke anta at godkjent betyr at systemet har alt du foreslo.** Kunden kan endre tilgangene når som helst.
- **Håndter avvist tilgang i systemet ditt.** Får du `403` fra en tjeneste, bør du vise kunden hvilken tilgang som mangler.
- **Fortell kunden hva systemet trenger.** Dokumenter hvilke tilgangspakker og enkeltrettigheter de ulike funksjonene i systemet ditt bruker.

Vi vurderer et API og varsling slik at du kan se hvilke tilganger systembrukeren faktisk har. Det er ikke avklart ennå.

---
## Hvilken måte bør du velge?

| Situasjon | Anbefaling |
|---|---|
| Systemet trenger alltid de samme tilgangene, og bare du skal kunne endre dem | Leverandøren bestemmer, som i dag |
| Kundene trenger ulike tilganger, eller behovet endrer seg ofte | Virksomheten bestemmer, med et forslag |
| Kunden har egen kompetanse på tilgangsstyring og vil bestemme alt selv | Virksomheten bestemmer, uten lister |
| Du vil unngå mange endringsforespørsler for små justeringer | Virksomheten bestemmer, med et forslag |

Er du i tvil, fortsett som i dag. Du kan ta i bruk flagget for nye kunder senere.

---
## Om skissene

De neste lysbildene viser hvordan virksomhetene kan se og forvalte systembrukere i Tilgangsstyring.

- Dette er skisser for å forstå problemet, ikke designforslag. Både utformingen og funksjonaliteten kan endre seg, og vi vil gjerne ha innspill.
- Skissene for klienter når leverandøren bestemmer viser rettighetssett.
- De øvrige skissene er laget tidligere. De har mer informasjon, og stiplede merker som viser hvilken regel et element oppfyller. Reglene R1–R25 står forklart til slutt i presentasjonen.
- Dette er blant annet ikke vedtatt i de eldre skissene: lenken **Endre hvem som bestemmer tilgangene**, og at leverandørens forslag er forhåndsvalgt når virksomheten knytter til en ny klient.

Alle navn, organisasjonsnumre og eksempeltilganger er fiktive.

---
## Virksomhetene finner systembrukerne under Brukere

Systembrukerne ligger i en egen gruppe på den vanlige brukersiden. Virksomheten kan filtrere på systembrukere, og ser hvem som bestemmer tilgangene for hver av dem.

[![Brukere-siden for Nordlys Regnskap AS med personen Ada Eksempel og fire systembrukere i en egen gruppe](/images/authorization/systemuser/2026-10-27/brukere-oversikt.webp)](/images/authorization/systemuser/2026-10-27/brukere-oversikt.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klientadministrasjon viser også systembrukerne

Fanen **Brukere** i Klientadministrasjon viser personer og systembrukere med klienttilgang, og hvor mange klienter hver av dem har.

[![Klientadministrasjon, fanen Brukere, med Kari Nordmann og tre systembrukere med klienttilgang, og to brukere uten klienter ennå](/images/authorization/systemuser/2026-10-27/klientadministrasjon-brukere.webp)](/images/authorization/systemuser/2026-10-27/klientadministrasjon-brukere.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Brukersiden når leverandøren bestemmer

Virksomheten ser tilgangene, men kan ikke fjerne eller legge til enkelttilganger. Den eneste endringen er å slette hele systembrukeren. Siden forklarer at leverandøren endrer tilgangene med en endringsforespørsel.

[![Systembrukeren Regnskap Pluss der leverandøren bestemmer tilgangene, med tilgangspakken Skattegrunnlag uten knapper for å fjerne den](/images/authorization/systemuser/2026-10-27/systembruker-leverandoren-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/systembruker-leverandoren-bestemmer.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når leverandøren bestemmer

Virksomheten ser hvilke klienter som er lagt til, hvilke de kan legge til, og hvor mange som ikke kan legges til ennå. Ordet «rettighetssett» bruker vi bare overfor deg som leverandør. Virksomheten ser «det systemet krever».

[![Personalportalen i Klientadministrasjon: én klient er knyttet til, to kan legges til med hver sin knapp, og fire kan ikke legges til ennå](/images/authorization/systemuser/2026-11-05/klienter-oversikt.png)](/images/authorization/systemuser/2026-11-05/klienter-oversikt.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter som ikke kan legges til ennå

Hver klient viser kort hva som mangler, og lenken **Se hva som mangler** åpner detaljene for den klienten. Dette kan du vise til når en kunde spør hvorfor en klient ikke kan legges til.

[![Personalportalen med listen over klienter som ikke kan legges til ennå: tre mangler Sykefravær-pakken, Kystlinjen Eiendom AS har gitt en del av det systemet krever, og Elvebakken Kafé AS har ikke gitt noe av det, alle med lenken Se hva som mangler](/images/authorization/systemuser/2026-11-05/klienter-kan-ikke-legges-til.png)](/images/authorization/systemuser/2026-11-05/klienter-kan-ikke-legges-til.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Virksomheten knytter til en klient

Når virksomheten klikker **Legg til**, ser de hvilke tilganger systembrukeren får. Tilgangene følger med samtidig, og virksomheten kan ikke velge bort noen av dem.

[![Bekreftelse: Legge til Havbris Fiskeoppdrett AS? Personalportalen får Revisormedarbeider og Sykefravær-pakken samtidig](/images/authorization/systemuser/2026-11-05/bekreftelse-legg-til.png)](/images/authorization/systemuser/2026-11-05/bekreftelse-legg-til.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Det systemet krever

Rettighetssettene du har oppgitt, ligger bak lenken **Se hva systemet krever**. Virksomheten trenger dem bare hvis de vil forstå hvorfor en klient ikke kan legges til. Dialogen forklarer også hvilke tilganger klienten gir ved å registrere regnskapsfører eller revisor i Enhetsregisteret, og hvilke klienten kan gi direkte.

[![Dialogen Det systemet krever: de tre kombinasjonene av tilgangspakker klienten må ha gitt én av, og hvordan klienten gir dem](/images/authorization/systemuser/2026-11-05/det-systemet-krever.png)](/images/authorization/systemuser/2026-11-05/det-systemet-krever.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Brukersiden når virksomheten bestemmer

Hver tilgang har en knapp for å slette fullmakten. Merket viser om tilgangen kom fra leverandørens forslag eller ble lagt til av virksomheten. Virksomheten kan fjerne begge typene.

[![Systembrukeren Egen integrasjon der virksomheten bestemmer, med Skattegrunnlag fra leverandørens forslag og A-ordningen lagt til av virksomheten](/images/authorization/systemuser/2026-10-27/systembruker-virksomheten-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/systembruker-virksomheten-bestemmer.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Virksomheten gir flere tilganger

Med **Gi fullmakt** velger virksomheten tilgangspakker og enkelttjenester én og én. Det virksomheten ikke har myndighet til å gi, er merket **Kan ikke gis**, med en forklaring.

[![Dialogen Hva skal Egen integrasjon få tilgang til? med tilgangspakker virksomheten kan gi, har gitt og ikke kan gi](/images/authorization/systemuser/2026-10-27/gi-fullmakt-systembruker.webp)](/images/authorization/systemuser/2026-10-27/gi-fullmakt-systembruker.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Systembruker uten tilganger

Sender du flagget uten lister, starter systembrukeren uten tilganger. Virksomheten ser at systemet ikke kan gjøre noe før de gir fullmakt.

[![Systembrukeren Rapportrobot uten tilgangspakker, med knappen Gi fullmakt](/images/authorization/systemuser/2026-10-27/systembruker-uten-tilganger.webp)](/images/authorization/systemuser/2026-10-27/systembruker-uten-tilganger.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klienter når virksomheten bestemmer

For hver klient velger virksomheten hvilke av klientens fullmakter systembrukeren skal få. Tjenester klienten har gitt gjennom en tilgangspakke, kan virksomheten ikke gi alene. Varselet øverst viser hva som skjer når en klient trekker tilbake en fullmakt.

[![Egen integrasjon i Klientadministrasjon med valg per klient, et varsel om at Fjordbakeriet AS trakk tilbake en fullmakt, og en ny klient med forhåndsvalg](/images/authorization/systemuser/2026-10-27/klienter-virksomheten-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/klienter-virksomheten-bestemmer.webp "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Klientens side viser systembrukerne

På siden for en klient ser virksomheten hva klienten har gitt, hvilke systembrukere de kan legge til, og hva som hindrer de andre. Personalportalen får bare settet klienten oppfyller, så Ansvarlig revisor følger ikke med.

[![Siden for Havbris Fiskeoppdrett AS: klienten har gitt tre tilganger, Personalportalen kan legges til, og Lønn Direkte krever rollen regnskapsfører](/images/authorization/systemuser/2026-11-05/klient-valgt.png)](/images/authorization/systemuser/2026-11-05/klient-valgt.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Når klienten har gitt en annen pakke

Elvebakken Kafé AS har bare gitt Merverdiavgift. Pakken finnes ikke i noen av settene til Personalportalen, så klienten kan ikke legges til. Virksomheten kan ikke rette dette selv, og må kontakte klienten. Mva-systemet krever pakken og kan legges til.

[![Siden for Elvebakken Kafé AS: klienten har gitt Merverdiavgift, Mva-systemet kan legges til, og Personalportalen kan ikke legges til fordi klienten ikke har gitt noe av det systemet krever](/images/authorization/systemuser/2026-11-05/klient-annen-pakke.png)](/images/authorization/systemuser/2026-11-05/klient-annen-pakke.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten har gitt en helt annen pakke

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Klienten mangler alt systemet krever, og Altinn kan ikke vite hvilket kundeforhold klienten skal ha. Derfor viser dialogen alle kombinasjonene.

**Det byrået gjør:** Åpner **Se hva som mangler**, avklarer kundeforholdet, og ber klienten gi det som mangler. Merverdiavgift-pakken påvirker ikke Personalportalen.

[![Dialogen Hvorfor kan ikke Elvebakken Kafé AS legges til: klienten har gitt Merverdiavgift, og mangler én av tre kombinasjoner](/images/authorization/systemuser/2026-11-05/hvorfor-elvebakken.png)](/images/authorization/systemuser/2026-11-05/hvorfor-elvebakken.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: pakke med nesten likt navn

**Situasjon:** Byrået ba Fjordbakeriet AS gi Sykefravær med personopplysninger av særlig kategori, men klienten ga pakken Sykefravær. Dette er to ulike pakker.

**Det byrået gjør:** Åpner **Se hva som mangler**, ser hva klienten ga, og ber klienten gi riktig pakke. Da slipper byrået å gå via support. Når pakken er gitt, kan byrået legge til klienten.

[![Dialogen Hvorfor kan ikke Fjordbakeriet AS legges til: klienten har gitt tre regnskapsførerpakker og Sykefravær, og mangler Sykefravær med personopplysninger av særlig kategori](/images/authorization/systemuser/2026-11-05/hvorfor-fjordbakeriet.png)](/images/authorization/systemuser/2026-11-05/hvorfor-fjordbakeriet.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten mangler like mye til flere sett

**Situasjon:** Kystlinjen Eiendom AS har bare gitt Sykefravær-pakken med særlig kategori. Hver kombinasjon mangler én tilgang, så Altinn peker ikke på en bestemt av dem.

**Det byrået gjør:** Avklarer kundeforholdet. Er byrået regnskapsfører eller revisor, registrerer klienten det i Enhetsregisteret. Ellers kan klienten gi A-ordningen direkte.

[![Dialogen Hvorfor kan ikke Kystlinjen Eiendom AS legges til: klienten har gitt Sykefravær-pakken, og mangler én av Regnskapsfører lønn, Revisormedarbeider og A-ordningen](/images/authorization/systemuser/2026-11-05/hvorfor-kystlinjen.png)](/images/authorization/systemuser/2026-11-05/hvorfor-kystlinjen.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten står ikke i listen

**Situasjon:** Byrået finner ikke Granly Hage. Det kan skyldes en skrivefeil, at virksomheten ikke har gitt noe, eller at de har gitt tilgangen til en annen virksomhet. Siden viser ikke noe om virksomheten.

**Det byrået gjør:** Sjekker søket, og ber virksomheten sjekke at tilgangen er gitt til riktig organisasjonsnummer.

[![Siden for Personalportalen etter søk på Granly Hage: ingen treff, med råd om å sjekke søket og be virksomheten sjekke tilgangen](/images/authorization/systemuser/2026-11-05/sok-uten-treff.png)](/images/authorization/systemuser/2026-11-05/sok-uten-treff.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: klienten er slettet i Enhetsregisteret

**Situasjon:** Slettede klienter er skjult til byrået slår på **Vis slettede klienter**. De kan ikke legges til. Gamle Verksted AS ble slettet mens klienten var knyttet til Personalportalen.

**Det byrået gjør:** Fjerner klienten fra systembrukeren. Vi har ikke avklart om systembrukeren fortsatt har tilgang for en slettet klient.

[![Siden for Personalportalen med Vis slettede klienter slått på: Slettet Bygg AS uten handling, og Gamle Verksted AS med knappen Fjern](/images/authorization/systemuser/2026-11-05/slettede-klienter.png)](/images/authorization/systemuser/2026-11-05/slettede-klienter.png "Åpne skissen i full størrelse")

*Skisse, ikke et designforslag. Klikk på bildet for full størrelse.*

---
## Scenario: virksomheten bestemmer

**Situasjon:** Personalportalen har «Virksomheten bestemmer» og de samme settene som i scenario 1. Havbris Fiskeoppdrett AS har gitt Nordlys Regnskap AS fire tilganger.

**Det byrået gjør:** Klikker **Legg til** og får leverandørens forslag, som når leverandøren bestemmer. Vil byrået velge noe annet, åpner de **Velg andre tilganger**.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-06/vb-dialog-lukket.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-dialog-lukket.png" alt="Dialogen Legge til Havbris Fiskeoppdrett AS, som viser de to tilgangene leverandøren foreslår, og lenken Velg andre tilganger" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-06/vb-dialog-apnet.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-dialog-apnet.png" alt="Samme dialog med valgene åpne: forslaget er krysset av, og Ansvarlig revisor og Lønn kan velges i tillegg" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: byrået velger noe annet enn forslaget

**Situasjon:** Byrået tar bort Sykefravær-pakken og velger Lønn. Dialogen sier at systemet da kan slutte å virke for klienten, men stopper ikke byrået.

**Det byrået ser etterpå:** Klientsiden viser hvem som la til hver tilgang.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-06/vb-fjernet-fra-forslaget.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-fjernet-fra-forslaget.png" alt="Dialogen der Sykefravær-pakken er tatt bort og Lønn er valgt, med teksten om at systemet kan slutte å virke for klienten" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-06/vb-klientsiden.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-klientsiden.png" alt="Klientsiden for Havbris Fiskeoppdrett AS med tre tilganger, merket Foreslått av Eksempel Programvare AS eller Lagt til av Nordlys Regnskap AS" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: byrået fjerner tilganger

**Situasjon:** Byrået fjerner Sykefravær-pakken og Lønn for Havbris. Hver tilgang kan fjernes for seg, i samme dialog som byrået brukte da klienten ble lagt til.

**Det byrået ser etterpå:** Klientsiden og listen viser at klienten ikke har alt leverandøren foreslår. **Fjern klienten** fjerner alle tilgangene på én gang.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-06/vb-endre-tilganger.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-endre-tilganger.png" alt="Dialogen Endre tilganger for Havbris Fiskeoppdrett AS, som viser at byrået fjerner Sykefravær-pakken og Lønn" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-06/vb-klientsiden-etter-endring.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-klientsiden-etter-endring.png" alt="Klientsiden etter endringen: bare Revisormedarbeider er igjen, med linjen Har ikke alt Eksempel Programvare AS foreslår" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Scenario: klienten har ikke gitt det leverandøren foreslår

**Situasjon:** Elvebakken Kafé AS har bare gitt Merverdiavgift. Når virksomheten bestemmer, kan byrået likevel legge til klienten.

**Det byrået gjør:** Velger blant det klienten har gitt. Ingenting er valgt på forhånd, og listen har en egen gruppe for slike klienter.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-06/vb-elvebakken.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-elvebakken.png" alt="Dialogen Legge til Elvebakken Kafé AS, der klienten ikke har gitt det leverandøren foreslår, og Merverdiavgift kan velges" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-06/vb-klientlisten.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/vb-klientlisten.png" alt="Klientlisten for Personalportalen med gruppene Knyttet til, Kan legges til og Har ikke gitt det leverandøren foreslår" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Et annet oppsett: klientene åpnes i listen

UX-teamet har foreslått et annet oppsett for Klientadministrasjon. Reglene og scenarioene er de samme som på de forrige lysbildene, bare oppsettet er nytt.

- Byrået åpner en klient i listen og ser alle settene, med det som mangler. Byrået trenger ikke en egen dialog.
- Settene heter «Alternativ 1», «Alternativ 2» og så videre, i den rekkefølgen du oppgir dem. Et rettighetssett har ikke noe navn.
- Altinn krysser av for det første settet klienten oppfyller, og sier det under settene.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-havbris.png" alt="Siden for Personalportalen med Havbris Fiskeoppdrett AS åpen: alternativ 2 er krysset av, og alternativ 1 og 3 viser hva som mangler" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" alt="Nordavind Bygg AS åpen: alternativ 3 er krysset av, og alternativ 1 og 2 viser hva som mangler" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-eksempelklient.png" alt="Eksempelklient AS, som Personalportalen allerede har: bare alternativ 1 vises, med knappen Fjern klienten fra systembrukeren og lenken Se de andre alternativene" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Et annet oppsett: klienter som ikke kan legges til ennå

Det er de samme tre scenarioene som før: en pakke med nesten likt navn, en klient som mangler like mye til alle settene, og en klient som har gitt en helt annen pakke.

- Det klienten har gitt byrået, står alltid øverst.
- Under hvert sett står hvordan klienten løser det. En pakke fra regnskapsfører- eller revisorrollen krever at klienten registrerer byrået i Enhetsregisteret. Andre pakker kan klienten gi direkte i Altinn.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-fjordbakeriet.png" alt="Fjordbakeriet AS åpen: klienten har gitt Sykefravær, som er en annen tilgangspakke enn Sykefravær med personopplysninger av særlig kategori" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-kystlinjen.png" alt="Kystlinjen Eiendom AS åpen: klienten mangler én pakke til hvert av de tre alternativene, med ulik forklaring under hvert" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-elvebakken.png" alt="Elvebakken Kafé AS åpen: klienten har bare gitt Merverdiavgift, og Personalportalen får ingen tilgang gjennom den" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Et annet oppsett: legg til alle, søk og slettede klienter

- **Legg til alle klienter** gir hver klient det første settet den oppfyller, og spør først.
- Et søk uten treff sier ikke noe om virksomheten, bare hva klienten må gjøre for å vises.
- Slettede klienter er skjult til byrået slår på **Vis slettede**.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-legg-til-alle.png" alt="Bekreftelsen Legge til 2 klienter? Hver klient får det første alternativet den oppfyller" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-sok-uten-treff.png" alt="Søk etter Granly Hage uten treff, med forklaring om at en virksomhet vises først når den har gitt Nordlys Regnskap AS en tilgang" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-09/ux-slettede.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-slettede.png" alt="Gruppen Slettede klienter med to klienter. Den ene har Personalportalen fortsatt, og kan fjernes" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Klienten ser systembrukerne hos byrået

Klienten ser systembrukere hos byrået på samme måte som byråets ansatte, uansett om leverandøren eller virksomheten bestemmer.

- Klienten kan ikke fjerne enkelttilganger fra en ansatt eller en systembruker hos byrået.
- Klienten kan fjerne en tilgang de har gitt byrået direkte. Da mister både ansatte og systembrukere den.
- Tilganger fra revisor- eller regnskapsførerrollen forsvinner bare hvis klienten endrer rollen i Enhetsregisteret.

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-06/klient-byraa.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/klient-byraa.png" alt="Havbris Fiskeoppdrett AS ser Nordlys Regnskap AS: tilgangene fra revisorrollen, to tilganger gitt direkte med knappen Fjern, og Ola Nordmann og Personalportalen som har tilgang gjennom byrået" style="width:100%;height:auto"></a><a href="/images/authorization/systemuser/2026-11-06/klient-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-06/klient-systembruker.png" alt="Havbris Fiskeoppdrett AS har åpnet Personalportalen: tre tilganger gjennom Nordlys Regnskap AS, uten mulighet til å fjerne dem her" style="width:100%;height:auto"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Dette er likt som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som nå.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en fullmakt, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## Dette er ikke avklart ennå

- Endelig navn på `clientAccessSets`, og navnet på flagget. `ownerControlledAccess` kan bli erstattet av et annet navn.
- Hvem som kan bytte mellom «Leverandøren bestemmer» og «Virksomheten bestemmer», og hva som skjer med tilganger kunden har lagt til hvis de bytter tilbake.
- Om du kan sende endringsforespørsel til en systembruker der virksomheten bestemmer tilgangene.
- Hvordan du kan lese hvilke tilganger systembrukeren faktisk har, og hvilke klienter som er knyttet til den, og få varsel når det endrer seg.
- Oppdatering av rettighetssett: om kunden må godkjenne, hva «komplett» betyr med flere sett, og hva som skjer når du fjerner en tilgang fra et sett.
- Hva som skjer når klienten trekker tilbake bare en del av settet, også om systembrukeren skal gå over til et annet sett klienten fortsatt oppfyller.
- Hvor mange rettighetssett du kan oppgi.
- Om Altinn sammenligner tilgangspakkene i settet, eller tjenestene pakkene gir tilgang til. Skissene forutsetter tilgangspakkene.
- Hva listen skal vise når en klient mangler like mye til flere sett. Skissene viser ingen bestemt pakke.
- Hvilke virksomheter listen viser. Skissene forutsetter at en virksomhet vises først når den har gitt byrået en tilgang.
- Om systembrukeren fortsatt har tilgang for en klient som er slettet i Enhetsregisteret.
- Om klienten kan fjerne én ansatt eller systembruker hos byrået helt, uten å trekke tilgangen fra byrået.
- Hvilket oppsett Klientadministrasjon får: dialoger, eller klienter som åpnes i listen.
- Om byrået kan velge flere sett for samme klient, når klienten oppfyller mer enn ett.
- Når funksjonaliteten blir tilgjengelig i testmiljøet og i produksjon.

Vi oppdaterer veiledningene for systemleverandører og virksomheter før funksjonaliteten blir tilgjengelig.

---
## Mer informasjon

- [Slik ber du om systembruker i dag](/nb/authorization/guides/system-vendor/system-user/systemuserrequest/)
- [Slik endrer du rettighetene til en systembruker](/nb/authorization/guides/system-vendor/system-user/changerequest/)
- [Klientdelegering for systemleverandører](/nb/authorization/guides/system-vendor/system-user/client-delegation/)
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
| R6 | Den eneste endringen er å slette hele systembrukeren, med alle tilganger og klientdelegeringer. |
| R7 | Siden forklarer at leverandøren bestemmer tilgangene, og at endringer kommer som en endringsforespørsel. |
| R8 | Når virksomheten knytter til en klient, gir de det første rettighetssettet klienten oppfyller fullt ut, samlet. Det er hele settet eller ingenting. |
| R9 | Virksomheten kan ikke knytte til klienter som ikke oppfyller noen av settene. Siden viser dem likevel, med hva som mangler. En dialog per klient viser hva klienten har gitt, og hva som mangler. |
| R10 | Virksomheten kan fjerne en klient. Da fjerner de hele settet for den klienten. |
| R11 | Virksomheten kan knytte til mange klienter samtidig. |
| R12 | Siden skjuler slettede klienter som standard, med et valg for å vise dem. |

---
## Reglene bak skissene: virksomheten bestemmer

| Regel | Hva den betyr |
|---|---|
| R13 | Virksomheten kan fjerne hver tilgangspakke og enkelttjeneste for seg, med bekreftelse. |
| R14 | Virksomheten kan gi nye tilganger med den vanlige flyten for å gi fullmakt, men bare det de selv har myndighet til å gi. Siden viser resten med en forklaring. |
| R15 | Det går fram om en tilgang kom fra leverandørens forslag eller ble lagt til av virksomheten. Virksomheten kan fjerne begge typene. |
| R16 | En systembruker uten tilganger forklarer at systemet ikke kan gjøre noe ennå, og har en tydelig inngang til å gi fullmakt. |
| R17 | Virksomheten kan slette hele systembrukeren. |
| R18 | For hver klient velger virksomheten tilgangspakker og enkelttjenester én og én, blant fullmaktene klienten har gitt. |
| R19 | Virksomheten kan bare gi en enkelttjeneste videre hvis klienten har gitt den som enkelttjeneste. Handlingene, for eksempel lese og skrive, følger det klienten har gitt. |
| R20 | Leverandørens forslag kan være forhåndsvalgt når virksomheten knytter til en ny klient. Dette er et designforslag, ikke et vedtak. |

---
## Reglene bak skissene: felles

| Regel | Hva den betyr |
|---|---|
| R21 | Trekker en klient tilbake en fullmakt, forsvinner klientdelegeringene til systembrukeren automatisk, og virksomheten får vite det. |
| R22 | Bare den som har myndighet, ser handlingene. Den som ikke er tilgangsstyrer eller klientadministrator, ser det samme som i dag. |
| R23 | Lenker fra siden **Systembrukere** leder til de nye sidene, ikke til den gamle klientsiden. |
| R24 | Systembrukerens side viser hvem som bestemmer tilgangene. |
| R25 | Virksomheten kan bytte hvem som bestemmer tilgangene. Reglene for byttet er ikke avklart, så dette er bare et forslag. |
