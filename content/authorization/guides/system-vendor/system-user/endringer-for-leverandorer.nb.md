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

Oppdatert 27. oktober 2026

**Det du har laget i dag, virker som før.** Endringene gir nye muligheter som du kan ta i bruk når du vil.

Funksjonaliteten er under utvikling og er ikke tilgjengelig ennå. Vi kan endre navnene på de nye feltene før lansering.

---
## Det viktigste

- **Ingen endring for eksisterende integrasjoner.** Dagens endepunkter, felt og systembrukere virker uendret. Alle nye felt er valgfrie.
- **Én systembruker for egen virksomhet og klienter.** Du trenger ikke lenger velge mellom systembruker for eget system og for klientsystem.
- **Enkeltrettigheter også for klienter.** I dag kan du bare be om tilgangspakker for klientsystem.
- **Forespørselen bestemmer rettighetene.** Du trenger ikke registrere hver rettighet på systemet først.
- **Tomme lister for egen virksomhet er lov.** Da trenger kunden bare å være tilgangsstyrer for å godkjenne.
- **Kunden kan få styre tilgangene selv.** Med det nye flagget `ownerControlledAccess` kan virksomheten justere tilgangene etter at den har godkjent.

---
## Det du har laget i dag, virker som før

| Det du bruker i dag | Etter endringen |
|---|---|
| Forespørsel om systembruker for eget system med `rights` og `accessPackages` | Virker som før. Du trenger ikke sende de nye feltene. |
| Forespørsel om systembruker for klientsystem (`/request/vendor/agent`) | Virker som før. |
| Endringsforespørsel (`/changerequest/vendor`) | Virker som før. |
| Klientdelegerings-API-et | Virker som før. |
| Systembrukere kundene dine allerede har godkjent | Beholder tilgangene og oppførselen sin. Ingen systembruker blir eierstyrt av seg selv. |
| Brukerstyrt opprettelse fra systemer i systemregisteret | Virker som før, med rettighetene som er registrert på systemet. |

Sender du ikke `ownerControlledAccess`, får du samme oppførsel som i dag.

---
## Forbedring 1: Én systembruker for egen virksomhet og klienter

**I dag** må du velge type når du ber om systembruker. Et regnskapssystem som både leverer for regnskapsbyrået selv og for kundene deres, trenger to systembrukere.

**Nå** kan én forespørsel inneholde fire lister:

| Liste | Gjelder | Status |
|---|---|---|
| `accessPackages` | Tilgangspakker for egen virksomhet | Finnes i dag |
| `rights` | Enkeltrettigheter for egen virksomhet | Finnes i dag |
| `clientAccessPackages` | Tilgangspakker for klienter | Nytt, foreløpig navn |
| `clientRights` | Enkeltrettigheter for klienter | Nytt, foreløpig navn |

Kunden godkjenner én systembruker. Tilgangene for egen virksomhet får systembrukeren når kunden godkjenner. Tilgangene for klienter får den når kunden knytter klienter til systembrukeren.

---
## Forbedring 2: Enkeltrettigheter også for klienter

**I dag** kan systembruker for klientsystem bare få tilgangspakker. Har kunden din fått en enkelttjeneste fra klienten sin, kan de ikke gi den videre til systemet ditt.

**Nå** kan du be om enkeltrettigheter i `clientRights`. Virksomheten kan da klientdelegere enkelttjenester til systembrukeren, på samme måte som tilgangspakker.

To regler gjelder:

- Virksomheten kan bare gi videre enkelttjenester den har fått som enkelttjeneste fra klienten. Tjenester den har fått gjennom en tilgangspakke, kan den ikke gi videre én og én.
- Systembrukeren får de samme handlingene, for eksempel lese og skrive, som klienten har gitt virksomheten.

---
## Forbedring 3: Forespørselen bestemmer rettighetene

**I dag** avviser Altinn en forespørsel som inneholder rettigheter du ikke har registrert på systemet i systemregisteret. Vil du be om en ny rettighet, må du først oppdatere systemet.

**Nå** er det de fire listene i forespørselen som bestemmer rettighetene. Systemregisteret verken fyller ut, erstatter eller begrenser dem.

Det betyr at du kan

- be om ulike rettigheter for ulike kunder av samme system
- be om bare det kunden faktisk trenger, i stedet for alt systemet kan gjøre
- legge til en ny tjeneste uten å oppdatere systemregisteret først

Altinn kontrollerer fortsatt at rettighetene finnes, at det går an å delegere dem, og at kunden har myndighet til å gi dem.

---
## Forbedring 4: Kunden kan styre tilgangene selv

Det nye flagget `ownerControlledAccess` bestemmer hvem som forvalter tilgangene etter at kunden har godkjent.

| | Leverandørstyrt tilgang | Eierstyrt tilgang |
|---|---|---|
| Flagget | `false` eller utelatt, som i dag | `true` |
| Listene i forespørselen | Bindende krav | Et forslag kunden starter med |
| Hvem endrer tilgangene etterpå | Du, med endringsforespørsel | Kunden selv, i Tilgangsstyring |
| Kan kunden fjerne én tilgang | Nei, bare slette hele systembrukeren | Ja |
| Kan kunden legge til tilganger | Nei | Ja, innenfor sine egne fullmakter |

Kunden kan bytte mellom de to måtene etter at systembrukeren er opprettet.

---
## Godkjenningen er lik som i dag

Kunden godkjenner forespørselen på samme måte som nå, med lenken fra `confirmUrl`.

- **Alt eller ingenting.** Kunden godkjenner hele forespørselen eller avviser den. Kunden kan ikke fjerne enkelte rettigheter mens de godkjenner.
- **Den som godkjenner, må være tilgangsstyrer for virksomheten.** Det gjelder alle forespørsler, som i dag, og uansett flagg.
- **Tilganger for egen virksomhet krever myndighet til hver tilgang.** Mangler kunden myndighet til én av dem, kan de ikke godkjenne.

Eventuelle endringer gjør kunden etterpå, og bare når systembrukeren har eierstyrt tilgang.

---
## Hva Altinn kontrollerer når kunden godkjenner

Du kan nå be om tomme lister for egen virksomhet. Da er det eneste Altinn kontrollerer ved godkjenning, at den som godkjenner er tilgangsstyrer.

| Forespørselen inneholder | Altinn kontrollerer ved godkjenning |
|---|---|
| Ingen tilganger, med `ownerControlledAccess` | At den som godkjenner er tilgangsstyrer |
| Bare tilganger for klienter | At den som godkjenner er tilgangsstyrer |
| Tilganger for egen virksomhet | At den som godkjenner er tilgangsstyrer, og har myndighet til å gi hver av tilgangene |

Klienttilgangene kontrollerer Altinn først når virksomheten knytter en klient til systembrukeren. Da må virksomheten ha fått fullmakten fra klienten.

Flagget `ownerControlledAccess` endrer ikke hva Altinn kontrollerer ved godkjenning.

---
## Fire kombinasjoner av flagg og lister

| `ownerControlledAccess` | De fire listene | Resultat | Typisk bruk |
|---|---|---|---|
| `false` eller utelatt | Minst én tilgang | Gyldig. Listene er krav, som i dag. | Systemet trenger et fast sett tilganger. |
| `true` | Minst én tilgang | Gyldig. Kunden får forslaget ved godkjenning og kan endre etterpå. | Du vet hva de fleste trenger, men behovet varierer. |
| `true` | Alle tomme | Gyldig. Systembrukeren starter uten tilganger, og kunden trenger bare å være tilgangsstyrer for å godkjenne. | Kunden vil gi alle tilganger selv. |
| `false` eller utelatt | Alle tomme | Avvist | – |

Flagget gir aldri tilganger av seg selv. Kunden kan bare gi tilganger de har myndighet til å gi.

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
## Slik ber du om én systembruker for egen virksomhet og klienter

Samme kunde, nå med tilganger for både regnskapsbyrået selv og klientene, og med en enkeltrettighet for klientene.

```json
POST /authentication/api/v1/systemuser/request/vendor

{
  "systemId": "912345678_regnskapssystem",
  "partyOrgNo": "310000001",
  "externalRef": "kunde-4711",
  "accessPackages": [
    { "urn": "urn:altinn:accesspackage:skattegrunnlag" }
  ],
  "clientAccessPackages": [
    { "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet" }
  ],
  "clientRights": [
    {
      "action": "write",
      "resource": [ { "id": "urn:altinn:resource", "value": "ttd-eksempel-mva" } ]
    }
  ],
  "redirectUrl": "https://regnskap.example.no/altinn/callback"
}
```

Uten `ownerControlledAccess` er dette leverandørstyrt tilgang: listene er krav som bare du kan endre.

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
## Hva du må tenke på med eierstyrt tilgang

Når kunden styrer tilgangene, kan de fjerne noe systemet ditt trenger. Det kan også skje lenge etter godkjenningen.

- **Ikke anta at godkjent betyr at systemet har alt du foreslo.** Kunden kan endre tilgangene når som helst.
- **Håndter avvist tilgang i systemet ditt.** Får du `403` fra en tjeneste, bør du vise kunden hvilken tilgang som mangler.
- **Fortell kunden hva systemet trenger.** Dokumenter hvilke tilgangspakker og enkeltrettigheter de ulike funksjonene i systemet ditt bruker.

Vi vurderer et API og varsling slik at du kan se hvilke tilganger systembrukeren faktisk har. Det er ikke avklart ennå.

---
## Hvilken måte bør du velge?

| Situasjon | Anbefaling |
|---|---|
| Systemet trenger alltid de samme tilgangene, og bare du skal kunne endre dem | Leverandørstyrt tilgang, som i dag |
| Kundene trenger ulike tilganger, eller behovet endrer seg ofte | Eierstyrt tilgang med et forslag |
| Kunden har egen kompetanse på tilgangsstyring og vil bestemme alt selv | Eierstyrt tilgang uten lister |
| Du vil unngå mange endringsforespørsler for små justeringer | Eierstyrt tilgang med et forslag |

Er du i tvil, fortsett som i dag. Du kan ta i bruk flagget for nye kunder senere.

---
## Virksomhetene finner systembrukerne i de vanlige oversiktene

Virksomhetene finner alle systembrukere på de samme sidene som andre brukere, under **Brukere** og **Klientadministrasjon** i Tilgangsstyring. Den egne siden for klientdelegering til systembruker forsvinner.

{{< systemuser-ui "overview" >}}

---
## Brukersiden ved leverandørstyrt tilgang

Virksomheten ser tilgangene på brukersiden. Den eneste endringen de kan gjøre der, er å slette hele systembrukeren med alle tilganger.

{{< systemuser-ui "preset-own" >}}

---
## Klienter ved leverandørstyrt tilgang

Når virksomheten knytter en klient til systembrukeren, gir de hele settet med klienttilganger fra forespørselen samtidig. De kan velge hele settet eller ingenting.

{{< systemuser-ui "preset-client" >}}

---
## Brukersiden ved eierstyrt tilgang

Virksomheten ser tilgangene systembrukeren har, både de som kom fra forslaget ditt og de virksomheten har lagt til selv. Hver tilgang har en egen knapp for å fjerne den. Prøv å klikke **Fjern**.

{{< systemuser-ui "owner-edit" >}}

---
## Virksomheten gir flere tilganger

Med **Gi flere fullmakter** velger virksomheten nye tilgangspakker og enkeltrettigheter én og én. De kan bare gi tilganger de selv har myndighet til å gi.

{{< systemuser-ui "free" >}}

---
## Klienter ved eierstyrt tilgang

For hver klient velger virksomheten hvilke av klientens fullmakter systembrukeren skal få. De trenger ikke ta hele settet, og de kan endre valgene senere.

{{< systemuser-ui "owner-client" >}}

---
## Dette er likt som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som nå.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en fullmakt, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## To begreper som ligner hverandre

Dokumentasjonen bruker allerede «leverandørstyrt opprettelse». Det er noe annet enn «leverandørstyrt tilgang».

| Begrep | Svarer på | Verdier |
|---|---|---|
| Opprettelse | Hvem starter opprettelsen av systembrukeren? | Leverandørstyrt (du sender forespørsel) eller brukerstyrt (kunden velger systemet i Altinn) |
| Tilgang | Hvem forvalter tilgangene etter godkjenning? | Leverandørstyrt (`ownerControlledAccess` er `false`) eller eierstyrt (`true`) |

`ownerControlledAccess` gjelder bare når du sender forespørselen selv.

---
## Dette er ikke avklart ennå

- Endelige navn på `clientRights` og `clientAccessPackages`.
- Hvem som kan bytte mellom leverandørstyrt og eierstyrt tilgang, og hva som skjer med tilganger kunden har lagt til hvis de bytter tilbake.
- Om du kan sende endringsforespørsel til en systembruker med eierstyrt tilgang.
- Hvordan du kan lese hvilke tilganger systembrukeren faktisk har, og få varsel når de endrer seg.
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
