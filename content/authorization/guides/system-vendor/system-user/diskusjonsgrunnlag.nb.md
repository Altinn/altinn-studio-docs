---
title: "Systembruker – valg av modell"
description: "Diskusjonsgrunnlag om nye typer, egenskaper og delegering."
type: systemuser-discussion
hidden: true
outputs: [HTML]
build:
  list: never
  render: always
---
# Systembruker

## Valg av modell for nye oppsett

Diskusjonsgrunnlag · 5. oktober 2026

**Målet:** Lande hvordan vi støtter vedtatte behov, og hva vi må avklare før implementering.

---
## Behovet for endring

- Virksomheter med egenutviklet system skal kunne bruke systembruker uten å forholde seg til systemregisteret.
- En eksisterende Maskinporten-klient skal kunne knyttes direkte til systembrukeren.
- Systembrukeren skal kunne opprettes uten forhåndsdefinerte tilgangspakker eller enkeltrettigheter. Tilgang gis senere via GUI i Altinn.

Dagens dokumenterte oppsett for egenutviklede systemer krever registrering i systemregisteret.

---
## Hva vi har landet

**Begge behovene skal støttes.**

- Behovene gjelder bruk som i dag dekkes av både Standard og Agent.
- Standard/Agent oppleves ikke som en meningsfull inndeling for de nye oppsettene.
- Klientdelegering for de nye oppsettene skal skje via standard brukergrensesnitt.

> Dette er avklart i samtalen. Modell, validering og nye begreper er fortsatt åpne.

---
## Vedtatt: Systembruker for eget system

**Systembruker for eget system skal være «fri».**

Den skal kunne få delegert både tilgangspakker og enkeltrettigheter:

- For egen virksomhet.
- For klienter.

Delegering skjer via standard brukergrensesnitt. Sletting av videredelegeringer følger rettighetsgrunnlaget, uavhengig av systembrukertype.

> Dette er en beslutning om det nye oppsettet. Endelig navn og hvordan «fri» representeres teknisk er fortsatt åpne valg.

---
## Dagens Standard og Agent

| | Standard | Agent |
|---|---|---|
| Dokumentert bruk | Egen virksomhet | Klienter |
| Tilganger | Pakker og enkeltrettigheter | Kun pakker |
| Opprettelse | Bruker- eller leverandørstyrt | Leverandørstyrt |
| Klientfullmakter | Ingen klientflyt i denne modellen | Videredelegering fra virksomhetens fullmakter |

Sletting av videredelegeringer bestemmes av hvordan eiervirksomheten har fått rettigheten, uavhengig av systembrukertype. Hvis grunnlaget er en delegering fra en klient og denne slettes, skal tilhørende videredelegeringer også slettes.

---
## Tilgang og sletting av videredelegeringer

**Avklart for de nye oppsettene:** Både enkeltrettigheter og tilgangspakker skal støttes.

**Sletting følger rettighetsgrunnlaget, ikke systembrukertypen.**

1. En klient delegerer tilgang til virksomheten som eier systembrukeren.
2. Eiervirksomheten videredelegerer tilgangen til systembrukeren via standard GUI.
3. Når klientens delegering til eiervirksomheten slettes, skal tilhørende videredelegeringer til systembrukeren også slettes.

> Avhengigheten ligger i delegeringskjeden. Den skal ikke modelleres som en særregel for en systembrukertype. Den tekniske løsningen er fortsatt åpen.

---
## Valg 1: Nye typer eller dagens to enum-verdier

**Skal enumen få flere verdier enn Standard og Agent?**

| | A: Opprette nye typer | B: Beholde dagens to enum-verdier |
|---|---|---|
| Enum | Standard og Agent beholdes; nye verdier legges til for de nye oppsettene | Enum består fortsatt bare av Standard og Agent |
| Hvordan nye oppsett beskrives | Nye typer får egne regler | Egenskaper eller andre data beskriver forskjellene |
| Fordel | Typen kan uttrykke det nye oppsettet direkte | Ingen nye enum-verdier som konsumenter må håndtere |
| Ulempe | Flere typer og typegrener i API, GUI og backend | Standard/Agent er ikke nok til å avgjøre oppførsel; eksisterende antakelser må endres |

**Vi skal lande:** Utvide enumen, eller beholde de to verdiene. Navn og antall nye typer er ikke bestemt.

---
## Valg 2: Eksplisitt eller implisitt deteksjon av «fri»

**Skal «fri» uttrykkes med en egenskap, eller utledes fra forespørselens innhold?**

| Alternativ | Regel | Fordel / ulempe |
|---|---|---|
| Eksplisitt egenskap | Forespørselen angir at systembrukeren skal være fri | Tydelig hensikt; krever et eget felt og regler for samsvar med tilgangslistene |
| Implisitt deteksjon | Forespørselen inneholder ingen tilgangspakker eller enkeltrettigheter → fri systembruker | Ingen egen egenskap; fravær av tilganger får en betydning alle konsumenter må forstå |

**Vi skal lande:** Eksplisitt egenskap eller implisitt deteksjon. Dette er separat fra valget om nye enum-verdier.

GUI må kunne identifisere oppsettet også etter at rettigheter er delegert. Faktisk delegerte rettigheter må ikke utilsiktet endre klassifiseringen.

---
## Valg 3: Hva «ingen tilganger i forespørselen» betyr

**Hvis implisitt deteksjon velges: Hvilke representasjoner skal bety fri?**

**Begge lister må være eksplisitt tomme:** Innsender må sende tomme lister for både tilgangspakker og enkeltrettigheter. Utelatte felter er ikke en markering av fri.

**Utelatte felter regnes også som ingen tilganger:** En forespørsel uten tilgangspakker og enkeltrettigheter tolkes som fri, også uten eksplisitte tomme lister. Manglende data kan dermed utløse klassifiseringen.

**Vi skal lande:** Én regel for tomme og utelatte lister, inkludert hvordan null behandles. Ingen forhåndsdefinerte tilganger må skilles fra faktisk delegerte tilganger.

---
## Valg 4: Fri delegering med registrert system

**Skal et system i systemregisteret også kunne brukes med kundestyrte rettigheter?**

**Ja:** Tilknytning og tilgangsmodell kan velges uavhengig. Flere kombinasjoner må beskrives og støttes.

**Nei:** Færre kombinasjoner, men fri delegering blir bundet til oppsett uten systemregisteret.

**Vi skal lande:** Om denne kombinasjonen skal støttes. Begge hovedbehovene er allerede vedtatt.

---
## Valg 5: Fri og Standard/Agent på samme system

**Skal ett registrert system kunne ha både frie systembrukere og dagens Standard/Agent-brukere samtidig?**

**Ja, begge oppsett kan brukes på samme system:** Kunden kan velge fri delegering eller dagens oppsett per systembruker. GUI og API må skille oppsettene, og tokenoppslaget må finne riktig systembruker.

**Nei, systemet bruker én modell om gangen:** Et system har enten frie brukere eller dagens Standard/Agent-oppsett. En leverandør som skal støtte begge oppsettene må bruke to forskjellige Maskinporten-klienter, én for hvert oppsett.

**Konsekvens av Nei:** Leverandøren må administrere separate klienter for de to oppsettene, selv om de brukes av samme programvare.

**Vi skal lande:** Om blandede oppsett skal være tillatt på samme system. Dette valget er relevant hvis fri delegering støttes for registrerte systemer.

> «Fri» er en tilgangsmodell og et arbeidsnavn. Dette valget avgjør ikke om enumen skal få nye verdier.

---
## Valg 6: Validering av oppgitte tilganger

**Skal tilgangspakker og enkeltrettigheter som er oppgitt i forespørselen valideres ved opprettelse?**

**Avhengighet til valg 5:** Hvis samme system kan ha både frie og Standard/Agent-brukere, må en forespørsel uten pakker eller enkeltrettigheter kunne aksepteres for å opprette en fri bruker – også når systemet har forhåndsdefinerte tilganger.

**Validere oppgitte tilganger ved opprettelse:** Feil oppdages tidlig. En forespørsel uten tilganger må fortsatt aksepteres for det frie oppsettet.

**Validere når tilgangen delegeres:** Identiteten opprettes først. Feil i oppgitte tilganger oppdages senere.

**Vi skal lande:** Når oppgitte tilganger kontrolleres. Ved Ja i valg 5 kan valideringen ikke kreve at alle forespørsler inneholder systemets forhåndsdefinerte tilganger. Faktisk tildeling av tilgang må kontrolleres når den skjer.

---
## Valg 7: Endring av tilgangsmodell

**Skal et oppsett som kan ha forhåndsdefinerte tilganger kunne endres til eller fra fri?**

**Tillat endring:** Samme identitet kan beholdes, men eksisterende delegeringer må håndteres når modellen endres.

**Krev ny systembruker:** Modellen er stabil gjennom levetiden, men kunden må opprette og konfigurere på nytt.

**Vi skal lande:** Om endringen skal være tillatt for oppsett der begge modeller støttes. Systembruker for eget system skal være fri. Ved implisitt deteksjon må endringer i forhåndsdefinerte lister følge den valgte regelen.

---
## Valg 8: Eksisterende brukere med tomme lister

**Hvis implisitt deteksjon velges: Skal eksisterende brukere uten forhåndsdefinerte tilganger bli tolket som fri?**

**Ja, automatisk:** Én regel for gamle og nye brukere, men eksisterende brukere kan få en ny betydning.

**Nei, bare etter eksplisitt overgang:** Bevarer tidligere betydning, men krever at gamle og nye oppsett kan skilles.

**Vi skal lande:** Om tolkningen skal gjelde eksisterende data. Kartlegg først om slike brukere finnes og hva tomme lister betyr i dag.

---
## Valg 9: API-overgang

**Skal de nye oppsettene innføres i dagens kontrakt eller i en ny versjon?**

**Utvid dagens kontrakt:** Færre parallelle API-er, men gamle konsumenter må tåle nye felter, verdier og regler.

**Ny kontrakt eller versjon:** Skiller ny betydning tydelig fra gammel, men krever parallelle kontrakter og en overgangsplan.

**Vi skal lande:** Overgangsstrategi etter at modell og konsumentenes antakelser er kartlagt.

---
## Valg 10: Navn på brukerne

**Hva skal vi kalle systembrukere uten leverandørdefinerte tilganger?**

| Navn | Fordel | Ulempe |
|---|---|---|
| Fri systembruker | Kort | Uklart hva «fri» gjelder |
| Ubegrenset systembruker | Uttrykker fravær av forhåndsdefinert liste | Kan tolkes som ubegrenset tilgang |
| Systembruker med kundestyrte rettigheter | Beskriver hvem som bestemmer rettighetene | Langt; «kunden» må være entydig i klientforhold |

**Vi skal lande:** Ett navn. «Fri» er foreløpig bare arbeidsnavn.

---
## Valg 11: Begreper i standard GUI

**Må brukeren velge en navngitt kategori?**

**Vis kategorien som et valg:** Gjør forskjellen tydelig, men krever at eksterne lærer begrepet før opprettelse.

**Vis konkrete handlinger:** For eksempel «Knytt Maskinporten-klient» og «Gi tilgang». Mindre begrepslæring, men forskjellen må forklares der den påvirker brukeren.

**Vi skal lande:** Om kategorien skal være et eksplisitt GUI-valg. Interne enum-verdier trenger ikke bli synlige begreper.

---
## Valg 12: Bytte av Maskinporten-klient

**Skal klienttilknytningen kunne byttes på en eksisterende systembruker?**

**Tillat bytte:** Bevarer identitet og delegeringer, men krever kontroll av den nye tilknytningen og at den gamle ikke lenger kan brukes.

**Krev ny systembruker:** Stabil klienttilknytning, men tilgangene må etableres på nytt.

**Vi skal lande:** Om bytte skal støttes. Maskinportens tekniske rammer og krav til eierskapskontroll må undersøkes først.

---
## Informasjonsbehov: Rettighetsgrunnlag i standard GUI

**Regelen er vedtatt:** Når klientens delegering til eiervirksomheten slettes, skal tilhørende videredelegeringer slettes, for både pakker og enkeltrettigheter.

Vi trenger en beskrivelse av hvordan standard GUI og backend sporer delegeringskjeden og finner videredelegeringene som skal slettes.

Dette er en teknisk avklaring. Det er ikke et nytt valg om systembrukertype eller om sletting skal skje.

---
## Informasjonsbehov: Maskinporten og token

Direkte klienttilknytning uten systemregisteret er vedtatt.

Vi trenger teknisk bekreftelse på eierskapskontroll, håndtering av slettet klient og tokeninnhold når system_id fra registeret mangler.

Funnene må brukes til å konkretisere klienttilknytningen og vurdere valget om klientbytte.

---
## Informasjonsbehov: Dagens validering

Den undersøkte valideringen i Authentication sammenligner forespurte tilganger med registrert systems liste.

Veiledningen beskriver andre krav til isAssignable enn den undersøkte ValidateAccessPackages-metoden. Lokal kode og dokumentasjon alene fastslår ikke produksjonsoppførsel.

Vi trenger en bekreftet beskrivelse av reglene i GUI, API og produksjon før vi bestemmer den nye valideringen.

---
## Beslutningslogg

For hvert valg noterer vi **valgt alternativ og begrunnelse** før vi går videre.

Hvis vi mangler grunnlag, noterer vi hva som må undersøkes og hvem som følger det opp. Valget forblir åpent til informasjonen foreligger.

Ingen av modellalternativene eller navnene er vedtatt i dette decket.

---
## Kilder og status

Avklarte behov: samtalen med RUNLAR. Alternativene og konsekvensvurderingene er forslag til diskusjon.

- [Systembrukerveiledning](../) og [brukerscenarier](../userscenarios/)
- [Opprettelse](../systemuserrequest/) og [token](../usetoken/)
- [Authentication: typer](https://github.com/Altinn/altinn-authentication/blob/main/src/Core/Enums/SystemUserType.cs), [validering](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Services/SystemUserService.cs) og [mapping](https://github.com/Altinn/altinn-authentication/blob/main/src/Integration/AccessManagement/AccessManagementClient.cs)
- [Frontend: systembruker-API](https://github.com/Altinn/altinn-access-management-frontend/blob/main/src/rtk/features/systemUserApi.ts)
- [Auth: entitetsvarianter](https://github.com/Altinn/altinn-auth/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/EntityVariantConstants.cs)

Kodefunn er fra lokale arbeidskopier lest 5. oktober 2026. Lenker til `main` kan endres. Utkast laget med Codex; skal gjennomgås av deltakerne.
