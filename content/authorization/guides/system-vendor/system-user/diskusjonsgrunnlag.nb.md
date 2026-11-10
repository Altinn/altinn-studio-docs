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

Oppdatert 10. november 2026. Vedtakene fra møtet 16. oktober er supplert med senere avklaringer.

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

Med den nye flaggregelen betyr dette `vendorLocked=false`, typisk uten krav i forespørselen. Den tekniske flyten for direkte klienttilknytning må fortsatt beskrives.

---
## Vedtatt: Vi kaller det systembruker

**Vi lager versjon 2 av endepunktet for forespørsel om opprettelse.**

```http
POST /authentication/api/v2/systemuser/request/vendor
```

Versjon 1 virker som før og får ingen nye felt. Systembrukere fra versjon 1 får `vendorLocked=true`.

Vi omtaler brukeren som **systembruker**. Rettigheter for egen virksomhet og klienter beskrives i samme forespørsel.

Autentiseringskoden ligger nå under `src/apps/Altinn.Authentication` i `altinn-auth`.

---
## Vedtatt: Lister for egen virksomhet og rettighetssett for klienter

| Felt | Hva det beskriver |
|---|---|
| `rights` | Enkeltrettigheter for egen virksomhet |
| `accessPackages` | Tilgangspakker for egen virksomhet |
| `clientAccessSets`* | Prioritert liste med rettighetssett for klienter |

Leverandøren angir kravene i forespørselen, uavhengig av rettighetskravene på systemet i systemregisteret. Rettighetssettene setter rammen for senere klientdelegering.

*Feltnavnet er et forslag. `clientAccessSets` erstatter forslagene `clientRights` og `clientAccessPackages`.*

---
## Vedtatt: Rettighetssett

**Et rettighetssett er tilgangspakker og enkeltrettigheter som hører sammen.**

- Klienten må oppfylle alt innenfor ett sett. Det holder å oppfylle ett av settene.
- Rekkefølgen i listen er prioriteten, uten indeksfelt. Altinn forhåndsvelger det første settet klienten oppfyller fullt ut. Oppfyller klienten flere, kan virksomheten velge et annet av dem.
- Settene lagres som `jsonb` på systembrukeren etter opprettelse.
- `action` støttes ikke i rettighetssett i første versjon. Behov for finere styring håndteres med tilgangspakker.

Fordelen er at ett selskap kan bruke én systembruker for alle kundetyper: registrert regnskapsfører (rollen REGN), registrert revisor (rollen REVI) og uregistrert kunde (direkte delegering). Leverandøren trenger ikke vite kundeforholdet for å hente token, så lenge alle settene dekker de samme tjenestene.

Åpent: om leverandøren skal kunne gi hvert sett et navn med det valgfrie feltet `name`. Uten navn viser grensesnittet «Alternativ 1», «Alternativ 2» og så videre. Vi spør leverandørene i høringen.

---
## Vedtatt: Leverandøren kan oppdatere rettighetssettene

**Leverandøren får et eget endepunkt for å oppdatere rettighetssettene på en systembruker, for eksempel når det kommer nye tilgangspakker.**

Oppdateringen påvirker ikke hva som faktisk er delegert. Brukerflaten viser at settet ikke er komplett.

Åpent: om kunden må godkjenne, hva «komplett» betyr med flere sett, hvordan virksomheten fullfører et sett, og hva som skjer når leverandøren fjerner en tilgang. Se #4845 og #4846 i altinn-auth.

---
## Vedtatt: Leverandøren kan be om flere tilganger for egen virksomhet

**Leverandøren kan be kunden om flere tilganger for egen virksomhet med API-et for forespørsler om tilgang.**

```http
/accessmanagement/api/v1/enduser/request
```

Sluttbrukersystemer bruker det samme API-et i dag. Det gjelder både med `vendorLocked=true` og `vendorLocked=false`. Kunden godkjenner eller avviser forespørselen.

Forespørsel om tilganger for klienter er ikke planlagt i denne endringen. Vedtatt 9. november 2026.

---
## Vedtatt: Tilganger ved aksept

**Ved aksept opprettes systembrukeren, og de forespurte tilgangene for egen virksomhet delegeres.**

Rettighetssettene tildeler ingen klienttilgang på dette tidspunktet. De definerer hvilke tilganger som kan delegeres senere.

Aksept krever alltid at den som godkjenner er tilgangsstyrer, uansett flagg. Tilganger for egen virksomhet krever i tillegg myndighet til hver tilgang. Er listene for egen virksomhet tomme, er tilgangsstyrer det eneste Altinn kontrollerer ved aksept. Med `vendorLocked=false` kan virksomheten gi tilgangene senere i GUI.

---
## Vedtatt: Tilganger når klienten knyttes til

**Klientrettighetene delegeres når klienten knyttes til systembrukeren.**

Når leverandøren bestemmer, gir virksomheten hele det valgte rettighetssettet samlet. Det første settet klienten oppfyller fullt ut, er forhåndsvalgt. Tildelingen må være innenfor eiervirksomhetens fullmakter for den aktuelle klienten.

Hvis klientens delegering til eiervirksomheten slettes, skal tilhørende videredelegeringer slettes. Avhengigheten følger rettighetsgrunnlaget, uavhengig av type og flagg.

---
## Vedtatt: Påkrevd flagg vendorLocked i versjon 2

```json
{ "vendorLocked": false }
```

Med `false` styrer eiervirksomheten tilgangene etter aksept og kan legge til og fjerne pakker og enkeltrettigheter. Listene i forespørselen er da leverandørens initiale forslag.

**Ett flagg gjelder både egen virksomhet og klienter.** Virksomhetens delegeringsmyndighet og fullmakter gjelder fortsatt.

Flagget heter `vendorLocked` (tidligere forslag: `ownerControlledAccess` og `withoutPredefinedRights`). Det er påkrevd i versjon 2, så det har ingen standardverdi. Forespørsler til versjon 1 gir alltid `vendorLocked=true`. Vedtatt 9. november 2026, og vi sender det på høring. Tomme lister alene betyr ikke at virksomheten bestemmer.

I grensesnittet heter de to måtene «Leverandøren bestemmer» (`vendorLocked=true`) og «Virksomheten bestemmer» (`vendorLocked=false`). Vedtatt 27. oktober 2026.

Oppdatert 26. oktober 2026: flagget kan kombineres med lister, aksepten er alltid alt eller ingenting på listene, og flagget kan endres i etterkant.

---
## Vedtatt: Validering av flagg og krav

Krav betyr tilganger i `rights` eller `accessPackages`, eller minst ett rettighetssett.

| `vendorLocked` | Krav i forespørselen | Resultat |
|---|---|---|
| `true` | Minst ett | Gyldig kombinasjon |
| `true` | Ingen | Valideringsfeil |
| `false` | Ingen | Gyldig kombinasjon |
| `false` | Minst ett | Gyldig kombinasjon, kravene er initialt forslag |
| Ikke satt | Uansett | Valideringsfeil i versjon 2 |

«Gyldig kombinasjon» gjelder flagget og kravene. Øvrig validering og autorisasjon må fortsatt bestås. Detaljer for utelatte lister og `null` må beskrives i kontrakten.

---
## Vedtatt: Alle systembrukere vises i oversiktene

**Synlighet er uavhengig av `vendorLocked`.**

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
## Vedtatt: Hele rettighetssettet eller ingen

**Når leverandøren bestemmer, er det første rettighetssettet klienten oppfyller fullt ut, forhåndsvalgt.**

- Hele settet delegeres samlet, eller ingen av tilgangene delegeres.
- Man kan ikke velge en delmengde av settet.
- Oppfyller klienten flere sett, kan man velge et annet av dem (vedtatt 10. november 2026).
- Man kan ikke utvide det med pakker eller rettigheter utenfor settet.
- Oppfyller klienten ingen av settene, kan den ikke knyttes til, og flaten viser hva som mangler.

Dette gjelder per klient. Når virksomheten bestemmer, kan tilganger velges innenfor virksomhetens fullmakter.

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
| Leverandøren sender en forespørsel | Listene og rettighetssettene i forespørselen |
| Brukeren oppretter selv fra et synlig system | Listene på systemet i systemregisteret |

Forespørselens krav skal verken fylles fra eller begrenses av listene i systemregisteret. Dette gjelder pakker og enkeltrettigheter for både egen virksomhet og klienter.

Kontroll av gyldige rettigheter, systemeierskap og delegeringsmyndighet gjelder fortsatt. At et system er synlig ved opprettelse, er noe annet enn at alle opprettede systembrukere skal vises i brukeroversikten.

---
## Åpent valg: Kombinasjoner på samme system

**Skal samme registrerte system kunne ha brukere med og uten forhåndsdefinerte rettigheter samtidig?**

**Ja:** Fleksibilitet per systembruker. Oppslag og GUI må håndtere begge oppsett på samme system.

**Nei:** Separate oppsett. Som avklart tidligere vil en leverandør som støtter begge, trenge to forskjellige Maskinporten-klienter.

Felles brukeroversikt er vedtatt. Samtidige oppsett på samme system er ikke uttrykkelig avklart i møtereferatet her.

---
## Vedtatt: Låsen kan fjernes etter opprettelse

**Låsen kan fjernes på en eksisterende systembruker**, altså fra `vendorLocked=true` til `false`. Identiteten beholdes. En systembruker som har vært åpen, kan ikke låses. Leverandøren kan fjerne låsen uten at virksomheten er involvert. Vi vedtok at flagget kan endres 26. oktober 2026, og retningen 10. november 2026.

Fortsatt åpent: om virksomheten også kan fjerne låsen, og hvordan endringen audit-loggføres og varsles.

Samlet sletting på brukersiden med `vendorLocked=true` er vedtatt. Flyten for å fjerne låsen er fortsatt uavklart.

---
## Åpent valg: Eksisterende Agent-brukere

**Skal eksisterende Agent-brukere videreføres som de er eller overføres til den utvidede modellen?**

**Viderefør:** Bevarer dagens kontrakter og lagrede brukere, men krever kompatibilitet i de felles flatene.

**Overfør:** Samler behandlingen, men krever mapping av klientpakker, typer og eksisterende delegeringer.

Én ekstern betegnelse «systembruker» avgjør ikke alene intern enum, lagringsformat eller utfasing av Agent-endepunktet.

**Avklart 5. november 2026:** Eksisterende klientkoblinger flyttes ikke automatisk. Klientene må knyttes til de nye systembrukerne som opprettes med rettighetssett. En klient kan være knyttet til mange systembrukere samtidig, så selskapene kan gå over gradvis.

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
- Hvilke regler som gjelder for innholdet i listene og rettighetssettene, inkludert validering ved aksept og tak på antall sett.
- Hva som skjer når samme eksterne referanse sendes på nytt med endrede lister.

Rettighetskravene i systemregisteret inngår ikke i innholdsvalideringen av forespørselens lister. Det skillet er vedtatt.

---
## Teknisk avklaring: Gjennomføring i kode og GUI

Forespørsel, lagring, svarmodeller og godkjenningsbilde må bevare skillet mellom egen- og klienttilganger. Aksept og senere delegering må bruke kravene fra forespørselen, også når systemets lister er tomme eller endres.

Standard GUI må håndtere ett rettighetssett samlet for hver klient, samlet sletting for egen virksomhet og individuell delegering når virksomheten bestemmer.

Direkte klienttilknytning, tokeninnhold uten registertilknytning og sporing av rettighetsgrunnlag må beskrives videre.

---
## Kilder og status

Vedtakene bygger på avklaringene med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Åpne valg er beholdt som åpne.

- [Opprettelsesendepunktet i altinn-auth](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Controllers/RequestSystemUserController.cs)
- [Request-modell](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication.Core/Models/SystemUsers/CreateRequestSystemUser.cs) og [opprettelsesflyt](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Services/SystemUserService.cs)
- Frontend-referanser: `UsersList`, `ClientAdministrationPageContent`, `AgentDetails` og `DelegationModal` i [access-management-frontend](https://github.com/Altinn/altinn-access-management-frontend).

Illustrasjonene bruker dagens flater som visuell referanse. De viser foreslåtte UI-detaljer for vedtatt oppførsel, med fiktive eksempler. De dokumenterer ikke en implementert løsning.

Oppdatert med Codex og Claude Code. Innhold og utforming skal gjennomgås av teamet.
