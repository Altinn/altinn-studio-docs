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
## Vedtatt: Lister for egen virksomhet og fullmaktssett for klienter

| Felt | Hva det beskriver |
|---|---|
| `rights` | Enkeltrettigheter for egen virksomhet |
| `accessPackages` | Tilgangspakker for egen virksomhet |
| `clientAccessSets`* | Fullmaktssett for klienter, med id som nøkkel. Rekkefølgen bestemmer rekkefølgen på radene |

Leverandøren angir kravene i forespørselen, uavhengig av rettighetskravene på systemet i systemregisteret. Fullmaktssettene setter rammen for senere klientdelegering.

*Feltnavnet er et forslag. `clientAccessSets` erstatter forslagene `clientRights` og `clientAccessPackages`.*

---
## Vedtatt: Fullmaktssett

**Et fullmaktssett er tilgangspakker og enkeltrettigheter som hører sammen.**

- Klienten må oppfylle alt innenfor ett sett. Det holder å oppfylle ett av settene.
- `clientAccessSets` er et objekt der nøkkelen er id-en til settet. Leverandøren velger id-en, og den må være unik på systembrukeren. Når virksomheten knytter en klient til systembrukeren, viser vi til settet med id-en (vedtatt 18. november 2026).
- Id-en ligger fast. Det valgfrie feltet `name` er teksten virksomheten ser. Leverandøren kan ikke endre eller slette et sett, bare legge til nye med ny id (vedtatt 23. november 2026).
- Rekkefølgen i objektet bestemmer rekkefølgen på radene i brukerlisten, uten indeksfelt (vedtatt 23. november 2026). Nye sett kommer etter dem som finnes. Klienten står i en gruppe for hvert sett den oppfyller, og virksomheten knytter den til ett sett om gangen. En klient kan være knyttet til flere sett.
- Vi lagrer settene på systembrukeren etter opprettelsen.
- Fullmaktssett er bare lov med `vendorLocked=true`. Med `false` gir de valideringsfeil, og når leverandøren fjerner låsen, sletter Altinn settene uten å fjerne fullmakter (vedtatt 23. november 2026).

**Konsekvens av at rekkefølgen i objektet betyr noe:**

- PostgreSQL-typen `jsonb` tar ikke vare på rekkefølgen av nøklene. Vi må lagre rekkefølgen på en annen måte, for eksempel som en liste med id internt eller som `json`.
- JavaScript legger nøkler som bare er sifre, først. Id-en bør derfor ikke bare bestå av sifre.
- Klienten og serveren må lese JSON-objektet slik at de beholder rekkefølgen. Det må stå tydelig i API-dokumentasjonen.
- Fullmaktssett støtter ikke `action` i første versjon, og `action` i et sett gir 400 (vedtatt 24. november 2026). Behov for finere styring dekker vi med tilgangspakker.

Fordelen er at ett selskap kan bruke én systembruker for alle kundetyper: registrert regnskapsfører (rollen REGN), registrert revisor (rollen REVI) og uregistrert kunde (direkte delegering). Leverandøren trenger ikke vite kundeforholdet for å hente token, så lenge alle settene dekker de samme tjenestene.

API-et for å knytte en klient viser til systembrukeren, id-en til settet og klienten (vedtatt 23. november 2026).

Foreslått 24. november 2026: hvert sett kan ha et navn i det valgfrie feltet `name`, på ett eller flere av språkene `nb`, `nn` og `en`, som navn i systemregisteret. Oversettelse er ikke påkrevd. Finnes ikke navnet på brukerens språk, viser Altinn det første språket i feltet. Uten navn viser grensesnittet «Alternativ 1», «Alternativ 2» og så videre.

Id-en kan ha små bokstaver, tall og bindestrek, og høyst 50 tegn. Utelatt `clientAccessSets` og `null` betyr ingen fullmaktssett. Et tomt objekt, et sett uten tilganger og samme tilgangspakke to ganger i ett sett gir 400 (vedtatt 24. november 2026).

Åpent: om navn skal være påkrevd. Vi spør leverandørene i høringen.

---
## Vedtatt: Leverandøren kan legge til nye fullmaktssett

**Leverandøren får et eget endepunkt for å legge til nye fullmaktssett på en systembruker, for eksempel når det kommer nye tilgangspakker.**

Leverandøren kan ikke endre eller slette et sett, bare legge til nye (vedtatt 23. november 2026). Et nytt sett blir en ny rad i brukerlisten, og virksomheten legger klientene til selv. Det som er delegert, endrer seg ikke. Altinn vurderer «komplett» per sett. Endepunktet gir valideringsfeil når `vendorLocked=false` (vedtatt 23. november 2026).

Kunden trenger ikke godkjenne et nytt sett, og et sett kan ikke stoppes for bruk. Alle settene står i brukerlisten så lenge systembrukeren finnes. Modellen har ingen måte å si at et nytt sett erstatter et gammelt, så bare navnene kan vise det. En id som finnes på systembrukeren fra før, gir 200 uten endring når innholdet er likt, og 409 når innholdet er ulikt. Det er ingen grense for hvor mange sett en systembruker kan ha, men mange rader gjør brukerlisten tung, og det må UX ta høyde for (vedtatt 24. november 2026).

Uansett hvilket sett virksomheten åpner, viser flaten på klienten fullmakter systembrukeren har fra klienten gjennom andre sett.

Åpent: om kunden må godkjenne, hvordan virksomheten fullfører et sett, og hva som skjer når leverandøren fjerner en fullmakt fra et sett. Se #4845 og #4846 i altinn-auth.

---
## Vedtatt: Leverandøren kan be om flere fullmakter for egen virksomhet

**Leverandøren kan be kunden om flere fullmakter for egen virksomhet med API-et for forespørsler om fullmakt.**

```http
/accessmanagement/api/v1/enduser/request
```

Sluttbrukersystemer bruker det samme API-et i dag. Det gjelder både med `vendorLocked=true` og `vendorLocked=false`. Kunden godkjenner eller avviser forespørselen.

Forespørsel om fullmakter for klienter er ikke planlagt i denne endringen. Vedtatt 9. november 2026.

---
## Vedtatt: Fullmakter ved aksept

**Ved aksept opprettes systembrukeren, og de forespurte fullmaktene for egen virksomhet delegeres.**

Fullmaktssettene tildeler ingen klienttilgang på dette tidspunktet. De definerer hvilke fullmakter som kan delegeres senere.

Aksept krever alltid at den som godkjenner er tilgangsstyrer, uansett flagg. Fullmakter for egen virksomhet krever i tillegg myndighet til hver fullmakt. Er listene for egen virksomhet tomme, er tilgangsstyrer det eneste Altinn kontrollerer ved aksept. Med `vendorLocked=false` kan virksomheten gi fullmaktene senere i GUI.

---
## Vedtatt: Fullmakter når klienten knyttes til

**Klientrettighetene delegeres når klienten knyttes til systembrukeren.**

Når leverandøren bestemmer, gir virksomheten hvert valgte fullmaktssett samlet. Virksomheten velger settet, for én klient om gangen eller med **Legg til alle** for settet. Tildelingen må være innenfor eiervirksomhetens fullmakter for den aktuelle klienten.

Hvis klientens delegering til eiervirksomheten slettes, skal tilhørende videredelegeringer slettes. Avhengigheten følger rettighetsgrunnlaget, uavhengig av type og flagg.

---
## Vedtatt: Påkrevd flagg vendorLocked i versjon 2

```json
{ "vendorLocked": false }
```

Med `false` styrer eiervirksomheten fullmaktene etter aksept og kan legge til og fjerne pakker og enkeltrettigheter. Listene for egen virksomhet er da leverandørens initiale forslag. Forespørselen kan ikke ha fullmaktssett for klienter (vedtatt 23. november 2026).

**Ett flagg gjelder både egen virksomhet og klienter.** Virksomhetens delegeringsmyndighet og fullmakter gjelder fortsatt.

Flagget heter `vendorLocked` (tidligere forslag: `ownerControlledAccess` og `withoutPredefinedRights`). Det er påkrevd i versjon 2, så det har ingen standardverdi. Forespørsler til versjon 1 gir alltid `vendorLocked=true`. Vedtatt 9. november 2026, og vi sender det på høring. Tomme lister alene betyr ikke at virksomheten bestemmer.

I grensesnittet heter de to måtene «Leverandøren bestemmer» (`vendorLocked=true`) og «Virksomheten bestemmer» (`vendorLocked=false`). Vedtatt 27. oktober 2026.

Oppdatert 26. oktober 2026: flagget kan kombineres med lister, aksepten er alltid alt eller ingenting på listene, og flagget kan endres i etterkant.

---
## Vedtatt: Validering av flagg og krav

Krav betyr fullmakter i `rights` eller `accessPackages`, eller minst ett fullmaktssett.

| `vendorLocked` | Krav i forespørselen | Resultat |
|---|---|---|
| `true` | Minst ett | Gyldig kombinasjon |
| `true` | Ingen | Valideringsfeil |
| `false` | Ingen | Gyldig kombinasjon |
| `false` | Minst ett i `rights` eller `accessPackages`, ingen fullmaktssett | Gyldig kombinasjon, listene er initialt forslag |
| `false` | Minst ett fullmaktssett | Valideringsfeil (vedtatt 23. november 2026) |
| Ikke satt | Uansett | Valideringsfeil i versjon 2 |

«Gyldig kombinasjon» gjelder flagget og kravene. Øvrig validering og autorisasjon må fortsatt bestås. Detaljer for utelatte lister og `null` må beskrives i kontrakten.

---
## Vedtatt: Alle systembrukere vises i oversiktene

**Synlighet er uavhengig av `vendorLocked`.**

Alle systembrukere skal vises i den vanlige brukeroversikten og i den relevante klientdelegeringsoversikten, også når de har forhåndsdefinerte rettigheter.

Flagget styrer handlingsrommet for delegering. Det er ikke et filter for hvilke systembrukere brukeren får se.

På **Brukere** står systembrukere i samme liste som personer og virksomheter, og alltid, også når **Vis brukere med klienttilgang** er slått av. Fanen **Brukere** i Klientadministrasjon er én liste over brukere med klienttilgang, som i dag (vedtatt 23. november 2026).

---
## Vedtatt: Én rad per fullmaktssett

**Alle brukerlister viser en systembruker med flere fullmaktssett som én rad per sett.** Det gjelder **Brukere**, **Klientadministrasjon** og klientens oversikt over byråets systembrukere. Vedtatt 23. november 2026.

- Radene er bare visning. Det er fortsatt én systembruker, ett token og én `externalRef`. BFF-en i frontend lager radene, og vi endrer ikke API-et i Authentication for listene.
- Fullmakter for egen virksomhet får en egen rad. Med `vendorLocked=false` har systembrukeren én rad for egen virksomhet og én for klienter.
- Raden heter system + `name` på settet, ellers «Alternativ N».
- En åpnet rad viser bare det settet, med én **Legg til alle**.
- Virksomheten kan knytte samme klient til flere rader. Systembrukeren får summen.
- Sletter virksomheten fra en rad, sletter de hele systembrukeren.
- Altinn vurderer «komplett» per rad, og flaten viser alltid fullmakter systembrukeren har fra klienten utenfor settet.

---
## Illustrasjon: Felles brukeroversikt

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-brukere.png" alt="Brukere for Tallmakerne AS: én liste der personer og systembrukere står sammen, med én rad per alternativ og egen virksomhet: Personalportalen – Registrert regnskapsfører og Personalportalen – Uten regnskapsførerrolle, SmartRegnskap – Egen virksomhet, Egen integrasjon – Egen virksomhet og Rapportrobot – Klienter"></a><a href="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-klientadm-brukere.png" alt="Klientadministrasjon, fanen Brukere: én liste over brukere med klienttilgang, med Kari Nordmann, Ada Eksempel, Personalportalen – Registrert regnskapsfører og Personalportalen – Uten regnskapsførerrolle og Rapportrobot – Klienter. Radene for egen virksomhet står ikke her"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Vedtatt: Klientdelegering på én felles side

**Den særskilte klientdelegeringssiden for systembrukere med forhåndsdefinerte klientrettigheter fjernes.**

Disse systembrukerne åpnes og håndteres på den vanlige klientdelegeringssiden.

Begrunnelsen er at brukeren skal slippe å administrere denne delegeringen et eget sted.

---
## Vedtatt: Hele fullmaktssettet eller ingen

**Når leverandøren bestemmer, gir virksomheten hele fullmaktssett, og bare sett klienten oppfyller fullt ut.** Hvert sett er en egen rad i brukerlisten, med **Legg til alle** når raden er åpnet. **Legg til alle** finnes bare når leverandøren bestemmer (vedtatt 23. november 2026).

- Hele settet delegeres samlet, eller ingen av fullmaktene delegeres.
- Man kan ikke velge en delmengde av settet.
- Oppfyller klienten flere sett, kan man knytte den til flere av dem (vedtatt 10. november 2026).
- Man kan ikke utvide det med pakker eller rettigheter utenfor settet.
- Oppfyller klienten ingen av settene, kan den ikke knyttes til, og flaten viser hva som mangler.

Dette gjelder per klient. Når virksomheten bestemmer, kan fullmakter velges innenfor virksomhetens fullmakter.

Når virksomheten bestemmer, har systembrukeren ingen fullmaktssett, og flaten tilbyr ikke **Legg til alle klienter**. Det finnes ikke noe som sier hva klientene skal gi, og flaten skal ikke legge til alt klienten har gitt (10. og 23. november 2026).

---
## Illustrasjon: Klienttilganger som ett sett

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-havbris.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-havbris.png" alt="Raden Personalportalen – Registrert regnskapsfører åpnet: Eksempelklient AS under Har disse klientene, Fjellvik Bygg AS under Kan få disse klientene med Legg til alle, og seks klienter som ikke kan legges til ennå, for eksempel Nordavind Bygg AS med linjen Mangler Regnskapsfører lønn. Kan legges til i «Uten regnskapsførerrolle»."></a><a href="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-nordavind.png" alt="Fjellvik Bygg AS åpen i raden for «Registrert regnskapsfører», med knappen Legg klienten til og linjen Personalportalen har allerede Lønn med personopplysninger av særlig kategori og Sykefravær med personopplysninger av særlig kategori fra klienten, gjennom «Uten regnskapsførerrolle»"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Vedtatt: Forhåndsdefinerte fullmakter på brukersiden

**Systembrukeren kan åpnes fra den vanlige brukersiden.**

For forhåndsdefinerte rettigheter for egen virksomhet er eneste endringshandling å slette systembrukeren med alle tilhørende rettigheter samlet.

Man kan ikke fjerne en enkelt tilgangspakke eller enkeltrettighet separat på denne siden.

---
## Illustrasjon: Samlet sletting fra brukersiden

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-lb-systembruker.png" alt="SmartRegnskap – Egen virksomhet: Eksempel Programvare AS bestemmer fullmaktene. Skattegrunnlag og Innsending av MVA-melding står uten knapper, og siden har Slett systembruker"></a><a href="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-slett-systembruker.png" alt="Bekreftelsen Slette systembrukeren Personalportalen? Begge radene for Personalportalen forsvinner, og Personalportalen mister alle fullmaktene for 2 klienter"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Illustrasjon: Når virksomheten bestemmer

For klientene er systembrukeren lik en ansatt som byrået har gitt klienttilganger, og siden følger siden for en ansatt i Klientadministrasjon (vedtatt 23. november 2026).

<div style="display:flex;gap:16px;align-items:flex-start"><a href="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-systembruker.png" alt="Egen integrasjon – Egen virksomhet der virksomheten bestemmer: Skattegrunnlag fra forespørselen og A-ordningen lagt til av Tallmakerne AS, begge med knappen Fjern"></a><a href="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" title="Åpne skissen i full størrelse" style="flex:1 1 0;min-width:0"><img src="/images/authorization/systemuser/2026-11-09/ux-vb-endre.png" alt="Rapportrobot – Klienter med Havbris Fiskeoppdrett AS åpen under Har disse klientene: Sykefravær med personopplysninger av særlig kategori og Lønn med Slett fullmakt, de to andre fullmaktene med Gi fullmakt, og knappene Gi alle og Slett alle"></a></div>

*Skisser, ikke designforslag. Klikk på et bilde for full størrelse.*

---
## Vedtatt: Rettighetskrav følger opprettelsesflyten

| Hvordan starter opprettelsen? | Hvor kommer rettighetskravene fra? |
|---|---|
| Leverandøren sender en forespørsel | Listene og fullmaktssettene i forespørselen |
| Brukeren oppretter selv fra et synlig system | Listene på systemet i systemregisteret |

Forespørselens krav skal verken fylles fra eller begrenses av listene i systemregisteret. Dette gjelder pakker og enkeltrettigheter for både egen virksomhet og klienter. Regelen gjelder versjon 2. Versjon 1 virker som før.

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

Når leverandøren fjerner låsen, sletter Altinn fullmaktssettene. Klientene beholder det som er delegert, og virksomheten kan endre fritt etterpå. Ingen fullmakter forsvinner (vedtatt 23. november 2026).

Bare leverandøren kan fjerne låsen. Virksomheten kan ikke fjerne den, med mindre virksomheten selv er leverandør av systemet. Da fjerner den låsen som leverandør (vedtatt 24. november 2026).

Fortsatt åpent: hvordan endringen audit-loggføres og varsles.

Samlet sletting på brukersiden med `vendorLocked=true` er vedtatt. Flyten for å fjerne låsen er fortsatt uavklart.

---
## Åpent valg: Eksisterende Agent-brukere

**Skal eksisterende Agent-brukere videreføres som de er eller overføres til den utvidede modellen?**

**Viderefør:** Bevarer dagens kontrakter og lagrede brukere, men krever kompatibilitet i de felles flatene.

**Overfør:** Samler behandlingen, men krever mapping av klientpakker, typer og eksisterende delegeringer.

Én ekstern betegnelse «systembruker» avgjør ikke alene intern enum, lagringsformat eller utfasing av Agent-endepunktet.

**Avklart 5. november 2026:** Eksisterende klientkoblinger flyttes ikke automatisk. Klientene må knyttes til de nye systembrukerne som opprettes med fullmaktssett. En klient kan være knyttet til mange systembrukere samtidig, så selskapene kan gå over gradvis.

---
## Åpent valg: Bytte Maskinporten-klient

**Skal en eksisterende systembruker kunne få en annen Maskinporten-klient?**

**Tillat bytte:** Bevarer identiteten og fullmaktene. Ny tilknytning må verifiseres og gammel tilknytning avsluttes.

**Krev ny systembruker:** Stabil tilknytning, men kunden må etablere oppsettet på nytt.

Dette må vurderes mot Maskinportens tekniske rammer.

---
## Teknisk avklaring: Valideringskontrakten

De vedtatte reglene for flagg og tomme lister må gjennomføres i opprettelsesflyten.

Vi må fortsatt beskrive:

- Hvordan utelatte lister og `null` behandles i listene for egen virksomhet. For fullmaktssettene er det vedtatt.
- Hvilke regler som gjelder for innholdet i listene og fullmaktssettene, inkludert validering ved aksept.
- Hva som skjer når samme eksterne referanse sendes på nytt med endrede lister.

Rettighetskravene i systemregisteret inngår ikke i innholdsvalideringen av forespørselens lister. Det skillet er vedtatt.

---
## Teknisk avklaring: Gjennomføring i kode og GUI

Forespørsel, lagring, svarmodeller og godkjenningsbilde må bevare skillet mellom egen- og klienttilganger. Aksept og senere delegering må bruke kravene fra forespørselen, også når systemets lister er tomme eller endres.

Standard GUI må håndtere ett fullmaktssett samlet for hver klient, samlet sletting for egen virksomhet og individuell delegering når virksomheten bestemmer.

Direkte klienttilknytning, tokeninnhold uten registertilknytning og sporing av rettighetsgrunnlag må beskrives videre.

---
## Kilder og status

Vedtakene bygger på avklaringene med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Åpne valg er beholdt som åpne.

- [Opprettelsesendepunktet i altinn-auth](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Controllers/RequestSystemUserController.cs)
- [Request-modell](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication.Core/Models/SystemUsers/CreateRequestSystemUser.cs) og [opprettelsesflyt](https://github.com/Altinn/altinn-auth/blob/1c63f782017566768c637337f7571a3b20b0d594/src/apps/Altinn.Authentication/src/Altinn.Platform.Authentication/Services/SystemUserService.cs)
- Frontend-referanser: `UsersList`, `ClientAdministrationPageContent`, `AgentDetails` og `DelegationModal` i [access-management-frontend](https://github.com/Altinn/altinn-access-management-frontend).

Illustrasjonene bruker dagens flater som visuell referanse. De viser foreslåtte UI-detaljer for vedtatt oppførsel, med fiktive eksempler. De dokumenterer ikke en implementert løsning.

Oppdatert med Codex og Claude Code. Innhold og utforming skal gjennomgås av teamet.
