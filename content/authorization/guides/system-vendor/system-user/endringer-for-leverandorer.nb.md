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
- **Tomme lister for egen virksomhet er lov.** Forespørselen må da ha klienttilganger eller flagget `ownerControlledAccess`. Kunden trenger bare å være tilgangsstyrer for å godkjenne.
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

Det nye flagget `ownerControlledAccess` bestemmer hvem som forvalter tilgangene etter at kunden har godkjent. Vi kaller de to måtene «Leverandøren bestemmer» og «Virksomheten bestemmer».

| | Leverandøren bestemmer | Virksomheten bestemmer |
|---|---|---|
| Flagget | `false` eller utelatt, som i dag | `true` |
| Listene i forespørselen | Bindende krav | Et forslag kunden starter med |
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

Uten `ownerControlledAccess` er dette «Leverandøren bestemmer»: listene er krav som bare du kan endre.

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
## Om skjermbildene

De neste lysbildene viser hvordan virksomhetene vil se og forvalte systembrukere i Tilgangsstyring.

- Skjermbildene er forslag til design fra en prototype. Vi kan endre utformingen, men det funksjonelle er vedtatt.
- De stiplede merkene R1–R25 viser hvilken regel et element oppfyller. Reglene står forklart til slutt i presentasjonen.
- To ting i skjermbildene er ikke vedtatt: lenken **Endre hvem som bestemmer tilgangene**, og at leverandørens forslag er forhåndsvalgt når virksomheten knytter til en ny klient. Det siste er merket **Designforslag**.

Alle navn, organisasjonsnumre og tilganger er fiktive.

---
## Virksomhetene finner systembrukerne under Brukere

Systembrukerne ligger i en egen gruppe på den vanlige brukersiden. Virksomheten kan filtrere på systembrukere, og ser hvem som bestemmer tilgangene for hver av dem.

[![Brukere-siden for Nordlys Regnskap AS med personen Ada Eksempel og fire systembrukere i en egen gruppe](/images/authorization/systemuser/2026-10-27/brukere-oversikt.webp)](/images/authorization/systemuser/2026-10-27/brukere-oversikt.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Klientadministrasjon viser også systembrukerne

Fanen **Brukere** i Klientadministrasjon viser personer og systembrukere med klienttilgang, og hvor mange klienter hver av dem har.

[![Klientadministrasjon, fanen Brukere, med Kari Nordmann og tre systembrukere med klienttilgang, og to brukere uten klienter ennå](/images/authorization/systemuser/2026-10-27/klientadministrasjon-brukere.webp)](/images/authorization/systemuser/2026-10-27/klientadministrasjon-brukere.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Brukersiden når leverandøren bestemmer

Virksomheten ser tilgangene, men kan ikke fjerne eller legge til enkelttilganger. Den eneste endringen er å slette hele systembrukeren. Siden forklarer at leverandøren endrer tilgangene med en endringsforespørsel.

[![Systembrukeren Regnskap Pluss der leverandøren bestemmer tilgangene, med tilgangspakken Skattegrunnlag uten knapper for å fjerne den](/images/authorization/systemuser/2026-10-27/systembruker-leverandoren-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/systembruker-leverandoren-bestemmer.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Klienter når leverandøren bestemmer

Øverst står settet systembrukeren får for hver klient. Virksomheten ser hvilke klienter som er knyttet til, hvilke de kan knytte til, og hvilke som mangler noe. Klientene som mangler fullmakter, viser nøyaktig hva som mangler.

[![Regnskap Pluss i Klientadministrasjon med én klient knyttet til og to klienter som mangler enkelttjenesten Innsending av MVA-melding](/images/authorization/systemuser/2026-10-27/klienter-leverandoren-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/klienter-leverandoren-bestemmer.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Virksomheten knytter til en klient

Når virksomheten knytter til en klient, bekrefter de hele settet samtidig. De kan ikke velge bort deler av det.

[![Bekreftelse: Vil du knytte Havbris Fiskeoppdrett AS til Lønn Direkte? Lønn Direkte får hele settet samtidig](/images/authorization/systemuser/2026-10-27/knytt-klient-hele-settet.webp)](/images/authorization/systemuser/2026-10-27/knytt-klient-hele-settet.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Brukersiden når virksomheten bestemmer

Hver tilgang har en knapp for å slette fullmakten. Merket viser om tilgangen kom fra leverandørens forslag eller ble lagt til av virksomheten. Virksomheten kan fjerne begge typene.

[![Systembrukeren Egen integrasjon der virksomheten bestemmer, med Skattegrunnlag fra leverandørens forslag og A-ordningen lagt til av virksomheten](/images/authorization/systemuser/2026-10-27/systembruker-virksomheten-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/systembruker-virksomheten-bestemmer.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Virksomheten gir flere tilganger

Med **Gi fullmakt** velger virksomheten tilgangspakker og enkelttjenester én og én. Det virksomheten ikke har myndighet til å gi, er merket **Kan ikke gis**, med en forklaring.

[![Dialogen Hva skal Egen integrasjon få tilgang til? med tilgangspakker virksomheten kan gi, har gitt og ikke kan gi](/images/authorization/systemuser/2026-10-27/gi-fullmakt-systembruker.webp)](/images/authorization/systemuser/2026-10-27/gi-fullmakt-systembruker.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Systembruker uten tilganger

Sender du flagget uten lister, starter systembrukeren uten tilganger. Virksomheten ser at systemet ikke kan gjøre noe før de gir fullmakt.

[![Systembrukeren Rapportrobot uten tilgangspakker, med knappen Gi fullmakt](/images/authorization/systemuser/2026-10-27/systembruker-uten-tilganger.webp)](/images/authorization/systemuser/2026-10-27/systembruker-uten-tilganger.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Klienter når virksomheten bestemmer

For hver klient velger virksomheten hvilke av klientens fullmakter systembrukeren skal få. Tjenester klienten har gitt gjennom en tilgangspakke, kan virksomheten ikke gi alene. Varselet øverst viser hva som skjer når en klient trekker tilbake en fullmakt.

[![Egen integrasjon i Klientadministrasjon med valg per klient, et varsel om at Fjordbakeriet AS trakk tilbake en fullmakt, og en ny klient med forhåndsvalg](/images/authorization/systemuser/2026-10-27/klienter-virksomheten-bestemmer.webp)](/images/authorization/systemuser/2026-10-27/klienter-virksomheten-bestemmer.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Klientens side viser alle systembrukerne

På siden for en klient ser virksomheten hvem som har tilgang, hvem som kan få tilgang, og hvem som ikke kan. Systembrukere står sammen med personene.

[![Klientsiden for Eksempelklient AS med brukere og systembrukere som har tilgang, kan få tilgang og ikke kan få tilgang](/images/authorization/systemuser/2026-10-27/klientside-eksempelklient.webp)](/images/authorization/systemuser/2026-10-27/klientside-eksempelklient.webp "Åpne skjermbildet i full størrelse")

*Forslag til design. Klikk på bildet for full størrelse.*

---
## Dette er likt som i dag for virksomhetene

- Virksomheten godkjenner forespørselen fra lenken du sender, som nå.
- Virksomheten kan alltid slette systembrukeren.
- Trekker klienten tilbake en fullmakt, fjerner Altinn de tilhørende klientdelegeringene til systembrukeren automatisk. Det gjelder både tilgangspakker og enkeltrettigheter.

---
## Dette er ikke avklart ennå

- Endelige navn på `clientRights` og `clientAccessPackages`.
- Hvem som kan bytte mellom «Leverandøren bestemmer» og «Virksomheten bestemmer», og hva som skjer med tilganger kunden har lagt til hvis de bytter tilbake.
- Om du kan sende endringsforespørsel til en systembruker der virksomheten bestemmer tilgangene.
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

---
## Reglene bak skjermbildene: synlighet

| Regel | Hva den betyr |
|---|---|
| R1 | **Brukere** viser alle systembrukere virksomheten eier, sammen med personer og virksomheter. |
| R2 | **Klientadministrasjon** og klientens side viser også systembrukere med klienttilganger eller klientkrav. |
| R3 | Det går fram at raden er en systembruker, hvilket system og hvilken leverandør den tilhører, og hvem som bestemmer tilgangene. |
| R4 | Virksomheten oppretter ikke systembrukere med **Ny bruker**. De kommer fra en forespørsel fra leverandøren, eller fra siden **Systembrukere** når virksomheten velger et system selv. |

---
## Reglene bak skjermbildene: leverandøren bestemmer

| Regel | Hva den betyr |
|---|---|
| R5 | Siden viser tilgangspakker og enkelttjenester uten knapper for å fjerne eller legge til enkelttilganger. |
| R6 | Den eneste endringen er å slette hele systembrukeren, med alle tilganger og klientdelegeringer. |
| R7 | Siden forklarer at leverandøren bestemmer tilgangene, og at endringer kommer som en endringsforespørsel. |
| R8 | Når virksomheten knytter til en klient, gir de hele klientsettet samtidig. Det er hele settet eller ingenting. |
| R9 | Virksomheten kan ikke knytte til klienter som ikke har gitt dem hele settet. Siden viser dem likevel, med hva som mangler. |
| R10 | Virksomheten kan fjerne en klient. Da fjerner de hele settet for den klienten. |
| R11 | Virksomheten kan knytte til mange klienter samtidig. |
| R12 | Siden skjuler slettede klienter som standard, med et valg for å vise dem. |

---
## Reglene bak skjermbildene: virksomheten bestemmer

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
## Reglene bak skjermbildene: felles

| Regel | Hva den betyr |
|---|---|
| R21 | Trekker en klient tilbake en fullmakt, forsvinner klientdelegeringene til systembrukeren automatisk, og virksomheten får vite det. |
| R22 | Bare den som har myndighet, ser handlingene. Den som ikke er tilgangsstyrer eller klientadministrator, ser det samme som i dag. |
| R23 | Lenker fra siden **Systembrukere** leder til de nye sidene, ikke til den gamle klientsiden. |
| R24 | Systembrukerens side viser hvem som bestemmer tilgangene. |
| R25 | Virksomheten kan bytte hvem som bestemmer tilgangene. Reglene for byttet er ikke avklart, så dette er bare et forslag. |
