---
title: "Systembruker – vedtak og videre avklaringer"
description: "Vedtak fra møtet 16. oktober og avklaringer 19. oktober 2026, illustrasjoner og gjenstående valg."
type: systemuser-discussion
hidden: true
outputs: [HTML]
build:
  list: never
  render: always
---
# Systembruker

## Vedtak og videre avklaringer

Oppdatert 19. oktober 2026 etter møtet 16. oktober

Én forespørsel for egen virksomhet og klienter. Tilgangsstyring på de vanlige bruker- og klientflatene.

[Åpne beslutningstreet og reglene](../beslutningstre/)

---
## Behovene som ligger til grunn

- Egenutviklede systemer skal kunne knytte en Maskinporten-klient direkte til en systembruker uten å bruke systemregisteret.
- Virksomheter skal kunne delegere pakker og enkeltrettigheter uten forhåndsdefinerte rettighetskrav.
- Systembrukere skal kunne brukes for både egen virksomhet og klienter.

Direkte klienttilknytning er fortsatt et eget behov. Utvidelsen av forespørselsendepunktet beskrives her med registrert system som utgangspunkt.

---
## Vedtatt: Eget system uten systemregisteret

**Systembruker for eget system skal være uten forhåndsdefinerte rettigheter.**

Virksomheten skal kunne knytte sin Maskinporten-klient direkte til systembrukeren og gi pakker og enkeltrettigheter for både egen virksomhet og klienter.

Med den nye flaggregelen betyr dette `withoutPredefinedRights=true` og fire tomme lister over påkrevde rettigheter. Den tekniske flyten for direkte klienttilknytning må fortsatt beskrives.

---
## Vedtatt: Vi kaller det systembruker

**Vi utvider dagens endepunkt for forespørsel om opprettelse.**

```http
POST /authentication/api/v1/systemuser/request/vendor
```

Vi omtaler brukeren som **systembruker**. Rettigheter for egen virksomhet og klienter beskrives i samme forespørsel.

Autentiseringskoden ligger nå under `src/apps/Altinn.Authentication` i `altinn-auth`.

---
## Vedtatt: Fire lister over påkrevde rettigheter

| Liste | Hva den beskriver |
|---|---|
| `rights` | Enkeltrettigheter for egen virksomhet |
| `accessPackages` | Tilgangspakker for egen virksomhet |
| `clientRights`* | Enkeltrettigheter som kan delegeres for klienter |
| `clientAccessPackages`* | Tilgangspakker som kan delegeres for klienter |

Leverandøren angir alle fire lister i forespørselen, uavhengig av rettighetskravene på systemet i systemregisteret. Klientlistene setter rammen for senere klientdelegering.

*Feltnavnene for klientlistene er forslag. Egne lister for begge rettighetstyper er vedtatt.*

---
## Vedtatt: Tilganger ved aksept

**Ved aksept opprettes systembrukeren, og de forespurte tilgangene for egen virksomhet delegeres.**

Klientlistene tildeler ingen klienttilgang på dette tidspunktet. De definerer hvilke tilganger som kan delegeres senere.

For systembruker uten forhåndsdefinerte rettigheter krever aksept tilgangsstyringspakken. Tilgangene gis senere gjennom GUI.

---
## Vedtatt: Tilganger når klienten knyttes til

**Klientrettighetene delegeres når klienten knyttes til systembrukeren.**

For forhåndsdefinerte klienttilganger gjelder hele settet av klientpakker og enkeltrettigheter samlet. Tildelingen må være innenfor eiervirksomhetens fullmakter for den aktuelle klienten.

Hvis klientens delegering til eiervirksomheten slettes, skal tilhørende videredelegeringer slettes. Avhengigheten følger rettighetsgrunnlaget, uavhengig av type og flagg.

---
## Vedtatt: Eksplisitt flagg for fri delegering

```json
{ "withoutPredefinedRights": true }
```

Flagget sier at eiervirksomheten kan delegere pakker og enkeltrettigheter uten forhåndsdefinerte rettighetskrav.

**Ett flagg gjelder både egen virksomhet og klienter.** Virksomhetens delegeringsmyndighet og fullmakter gjelder fortsatt.

Vi bruker navnet `withoutPredefinedRights` i kontraktsforslaget. Tomme lister alene markerer ikke fri delegering.

---
## Vedtatt: Validering av flagg og lister

| Flagget | Innhold i de fire listene samlet | Resultat |
|---|---|---|
| Ikke satt / `false` | Minst én pakke eller enkeltrettighet på minst én liste | Gyldig kombinasjon |
| Ikke satt / `false` | Alle lister tomme | Valideringsfeil |
| `true` | Alle lister tomme | Gyldig kombinasjon |
| `true` | Innhold på én eller flere lister | Valideringsfeil |

«Gyldig kombinasjon» gjelder flagget og listene. Øvrig validering og autorisasjon må fortsatt bestås. Detaljer for utelatte lister og `null` må beskrives i kontrakten.

---
## Vedtatt: Alle systembrukere vises i oversiktene

**Synlighet er uavhengig av `withoutPredefinedRights`.**

Alle systembrukere skal vises i den vanlige brukeroversikten og i den relevante klientdelegeringsoversikten, også når de har forhåndsdefinerte rettigheter.

Flagget styrer handlingsrommet for delegering. Det er ikke et filter for hvilke systembrukere brukeren får se.

---
## Illustrasjon: Felles brukeroversikt

{{< systemuser-ui "overview" >}}

---
## Vedtatt: Klientdelegering på én felles side

**Den særskilte klientdelegeringssiden for systembrukere med forhåndsdefinerte klientrettigheter fjernes.**

Disse systembrukerne åpnes og håndteres på den vanlige klientdelegeringssiden.

Begrunnelsen er at brukeren skal slippe å administrere denne delegeringen et eget sted.

---
## Vedtatt: Hele klientsettet eller ingen

**Forhåndsdefinerte klientpakker og enkeltrettigheter er forhåndsvalgt.**

- Hele settet delegeres samlet, eller ingen av tilgangene delegeres.
- Man kan ikke velge en delmengde av settet.
- Man kan ikke utvide det med pakker eller rettigheter utenfor klientlistene.

Dette gjelder per klient. Brukere uten forhåndsdefinerte rettigheter kan få tilganger valgt innenfor virksomhetens fullmakter.

---
## Illustrasjon: Klienttilganger som ett sett

{{< systemuser-ui "preset-client" >}}

---
## Vedtatt: Forhåndsdefinerte tilganger på brukersiden

**Systembrukeren kan åpnes fra den vanlige brukersiden.**

For forhåndsdefinerte rettigheter for egen virksomhet er eneste endringshandling å slette systembrukeren med alle tilhørende rettigheter samlet.

Man kan ikke fjerne en enkelt tilgangspakke eller enkeltrettighet separat på denne siden.

---
## Illustrasjon: Samlet sletting fra brukersiden

{{< systemuser-ui "preset-own" >}}

---
## Illustrasjon: Uten forhåndsdefinerte rettigheter

{{< systemuser-ui "free" >}}

---
## Vedtatt: Rettighetskrav følger opprettelsesflyten

| Hvordan starter opprettelsen? | Hvor kommer rettighetskravene fra? |
|---|---|
| Leverandøren sender en forespørsel | De fire listene i forespørselen |
| Brukeren oppretter selv fra et synlig system | Listene på systemet i systemregisteret |

Forespørselens lister skal verken fylles fra eller begrenses av listene i systemregisteret. Dette gjelder pakker og enkeltrettigheter for både egen virksomhet og klienter.

Kontroll av gyldige rettigheter, systemeierskap og delegeringsmyndighet gjelder fortsatt. At et system er synlig ved opprettelse, er noe annet enn at alle opprettede systembrukere skal vises i brukeroversikten.

---
## Åpent valg: Kombinasjoner på samme system

**Skal samme registrerte system kunne ha brukere med og uten forhåndsdefinerte rettigheter samtidig?**

**Ja:** Fleksibilitet per systembruker. Oppslag og GUI må håndtere begge oppsett på samme system.

**Nei:** Separate oppsett. Som avklart tidligere vil en leverandør som støtter begge, trenge to forskjellige Maskinporten-klienter.

Felles brukeroversikt er vedtatt. Samtidige oppsett på samme system er ikke uttrykkelig avklart i møtereferatet her.

---
## Åpent valg: Endre tilgangsmodell etter opprettelse

**Skal flagget kunne endres på en eksisterende systembruker?**

**Tillat endring:** Beholder identiteten, men må håndtere lister over påkrevde rettigheter og eksisterende delegeringer.

**Krev ny systembruker:** Stabil modell gjennom levetiden, men nytt oppsett må etableres.

Samlet sletting på brukersiden for forhåndsdefinerte rettigheter er vedtatt. En eventuell egen flyt for endring av modellen er fortsatt uavklart.

---
## Åpent valg: Eksisterende Agent-brukere

**Skal eksisterende Agent-brukere videreføres som de er eller overføres til den utvidede modellen?**

**Viderefør:** Bevarer dagens kontrakter og lagrede brukere, men krever kompatibilitet i de felles flatene.

**Overfør:** Samler behandlingen, men krever mapping av klientpakker, typer og eksisterende delegeringer.

Én ekstern betegnelse «systembruker» avgjør ikke alene intern enum, lagringsformat eller utfasing av Agent-endepunktet.

---
## Åpent valg: Bytte Maskinporten-klient

**Skal en eksisterende systembruker kunne få en annen Maskinporten-klient?**

**Tillat bytte:** Bevarer identiteten og tilgangene. Ny tilknytning må verifiseres og gammel tilknytning avsluttes.

**Krev ny systembruker:** Stabil tilknytning, men kunden må etablere oppsettet på nytt.

Dette må vurderes mot Maskinportens tekniske rammer.

---
## Teknisk avklaring: Valideringskontrakten

De vedtatte reglene for flagg og tomme lister må gjennomføres i opprettelsesflyten.

Vi må fortsatt beskrive:

- Hvordan utelatte lister og `null` behandles.
- Hvilke regler som gjelder for innholdet i egen- og klientlistene, inkludert validering ved aksept.
- Hva som skjer når samme eksterne referanse sendes på nytt med endrede lister.

Rettighetskravene i systemregisteret inngår ikke i innholdsvalideringen av forespørselens lister. Det skillet er vedtatt.

---
## Teknisk avklaring: Gjennomføring i kode og GUI

Forespørsel, lagring, svarmodeller og godkjenningsbilde må bevare skillet mellom egen- og klienttilganger. Aksept og senere delegering må bruke kravene fra forespørselen, også når systemets lister er tomme eller endres.

Standard GUI må håndtere rettighetssettet samlet for klienter, samlet sletting for egen virksomhet og fri delegering når flagget er satt.

Direkte klienttilknytning, tokeninnhold uten registertilknytning og sporing av rettighetsgrunnlag må beskrives videre.

---
## Kilder og status

Vedtakene bygger på avklaringene med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Åpne valg er beholdt som åpne.

- [Opprettelsesendepunktet i altinn-auth](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Controllers/RequestSystemUserController.cs)
- [Request-modell](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication.Core/Models/SystemUsers/CreateRequestSystemUser.cs) og [opprettelsesflyt](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Services/SystemUserService.cs)
- Frontend-referanser: `UsersList`, `ClientAdministrationPageContent`, `AgentDetails` og `DelegationModal` i [access-management-frontend](https://github.com/Altinn/altinn-access-management-frontend).

Illustrasjonene bruker dagens flater som visuell referanse. De viser foreslåtte UI-detaljer for vedtatt oppførsel, med fiktive eksempler. De dokumenterer ikke en implementert løsning.

Oppdatert med Codex. Innhold og utforming skal gjennomgås av teamet.
