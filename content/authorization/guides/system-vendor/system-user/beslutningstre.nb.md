---
title: "Beslutningstre for systembruker"
description: "Vedtatte regler for opprettelse, forespørsel og delegering, med avklaringer til og med 5. november 2026."
hidden: true
disablePagefind: true
toc: true
outputs: [HTML]
build:
  list: never
  render: always
---
Dette beslutningstreet er oppdatert 10. november 2026. [Åpne presentasjonen med UI-illustrasjoner](../diskusjonsgrunnlag/).

Trærne under «Vedtatt» viser regler, ikke åpne alternativer. Punktene under «Fortsatt åpent» er ikke besluttet. Tidligere valg om implisitt deteksjon er erstattet av et eksplisitt flagg.

## Vedtatt: Hvor rettighetskravene kommer fra

{{< mermaid >}}
graph TD
  START["Opprette systembruker"] --> FLOW{"Hvordan starter opprettelsen?"}
  FLOW -->|Leverandørforespørsel| REQUESTLISTS["Bruk forespørselens lister for egen virksomhet og fullmaktssett for klienter"]
  REQUESTLISTS --> INDEPENDENT["Ingen utfylling eller begrensning fra systemets rettighetskrav"]
  FLOW -->|Brukeren oppretter selv| VISIBLE["Velg et synlig system i systemregisteret"]
  VISIBLE --> REGISTERLISTS["Bruk rettighetskravene på det valgte systemet"]
{{< /mermaid >}}

Listene på systemet i systemregisteret gjelder bare i versjon 1, og når brukeren selv oppretter systembruker for et synlig system. I forespørselsflyten i versjon 2 angir leverandøren listene og fullmaktssettene uavhengig av systemets lister. Forespørselens krav trenger ikke være en delmengde av disse.

Ved aksept og senere delegering gjelder de lagrede kravene fra forespørselen, også hvis systemets lister er tomme eller endres. Kontroll av gyldige rettigheter, systemeierskap og delegeringsmyndighet gjelder fortsatt. Systemregisteret er fortsatt kilde til systemets identitet og annen relevant metadata.

Synlig system i opprettelsesvalget er et annet begrep enn synlighet for opprettede systembrukere i bruker- og klientoversiktene.

## Vedtatt: Forespørsel og validering

Vi lager `POST /authentication/api/v2/systemuser/request/vendor` med den utvidede forespørselen og kaller brukeren systembruker. Versjon 1 virker som før og får ingen nye felt. Systembrukere fra versjon 1 får `vendorLocked=true`. Autentisering ligger nå i `altinn-auth`.

Forespørselen har to lister for egen virksomhet, pakker og enkeltrettigheter, og fullmaktssett for klienter. Fullmaktssettene er et objekt der nøkkelen er en id leverandøren velger, og rekkefølgen i objektet bestemmer rekkefølgen på radene i brukerlisten. Når virksomheten knytter en klient til systembrukeren, viser vi til settet med id-en (vedtatt 18. november 2026). Navnet på det nye klientfeltet er ikke endelig fastsatt.

Systembruker for eget system uten systemregisteret skal være uten forhåndsdefinerte rettigheter, og kunne brukes for både egen virksomhet og klienter. Den skal dermed ha `vendorLocked=false`, typisk uten krav i forespørselen. Direkte Maskinporten-tilknytning er fortsatt et eget teknisk arbeidspunkt.

{{< mermaid >}}
graph TD
  REQUEST["Forespørsel om systembruker: lister og fullmaktssett"] --> FLAG{"vendorLocked?"}
  FLAG -->|Mangler| ERROR1["Valideringsfeil: vendorLocked er påkrevd i versjon 2"]
  FLAG -->|false| SETS{"Har forespørselen fullmaktssett?"}
  SETS -->|Ja| ERROR3["Valideringsfeil: fullmaktssett krever vendorLocked=true"]
  SETS -->|Nei| EMPTY{"Er listene for egen virksomhet tomme?"}
  EMPTY -->|Ja| FREE["Gyldig: Virksomheten bestemmer, ingen fullmakter ved aksept"]
  EMPTY -->|Nei| PROPOSAL["Gyldig: Virksomheten bestemmer, og Altinn delegerer listene ved aksept som initialt forslag"]
  FLAG -->|true| CONTENT{"Minst én pakke, rettighet eller ett fullmaktssett?"}
  CONTENT -->|Ja| PRESET["Gyldig: Leverandøren bestemmer, bindende krav"]
  CONTENT -->|Nei| ERROR2["Valideringsfeil: mangler fullmakter"]
{{< /mermaid >}}

Fullmaktssett (`clientAccessSets`) er bare lov med `vendorLocked=true` (vedtatt 23. november 2026). Når virksomheten bestemmer, velger byrået selv hva hver klient gir, så settene har ingen funksjon.

Gyldig kombinasjon betyr at reglene for flagg og lister er oppfylt. Øvrig validering og autorisasjon gjelder fortsatt. Behandling av `null` og utelatte lister må beskrives i kontrakten.

## Vedtatt: Aksept og senere klientdelegering

{{< mermaid >}}
graph TD
  APPROVE["Forespørselen aksepteres"] --> CREATE["Systembrukeren opprettes"]
  CREATE --> OWN["Forespurte fullmakter for egen virksomhet delegeres"]
  CREATE --> CLIENTCONFIG["Fullmaktssettene lagres på systembrukeren som ramme for senere delegering"]
  CLIENTCONFIG --> LINK["En klient knyttes til systembrukeren"]
  LINK --> CHECK["Klienten står i en gruppe for hvert sett den oppfyller fullt ut. Brukeren knytter den til ett sett om gangen, eller med Legg til alle for settet"]
  CHECK --> DELEGATE["Deleger hele settet samlet"]
{{< /mermaid >}}

Ved `vendorLocked=false` delegerer Altinn eventuelle lister for egen virksomhet ved aksept, som initialt forslag. Systembrukeren har da ingen fullmaktssett. Klienttilgangene delegerer virksomheten først når den knytter en klient til systembrukeren og velger dem. Aksept er alt eller ingenting på listene. Den som godkjenner, må alltid være tilgangsstyrer, uansett flagg. Er listene for egen virksomhet tomme, er det eneste Altinn kontrollerer ved aksept. Pakker og enkeltrettigheter kan deretter legges til og fjernes i GUI. Flagget gjelder både egen virksomhet og klienter.

## Vedtatt: Vanlige bruker- og klientflater

Alle systembrukere vises i brukeroversikten og den relevante klientdelegeringsoversikten, uavhengig av flagget.

{{< mermaid >}}
graph TD
  OPEN["Åpne systembrukeren på vanlig bruker- eller klientflate"] --> MODE{"vendorLocked?"}
  MODE -->|false| CHOOSE["Velg pakker og enkeltrettigheter innenfor virksomhetens fullmakter. Ingen fullmaktssett"]
  MODE -->|true| CONTEXT{"Hvilke forhåndsdefinerte fullmakter håndteres?"}
  CONTEXT -->|Klient| SET["Brukeren åpner raden for ett fullmaktssett i brukerlisten og knytter klienter som oppfyller settet"]
  SET --> ALL["Deleger hele settet samlet"]
  SET --> NONE["Velg ingen av fullmaktene"]
  CONTEXT -->|Egen virksomhet| VIEW["Se forhåndsdefinerte fullmakter på vanlig brukerside"]
  VIEW --> DELETE["Eneste endringshandling her: slett bruker og rettigheter samlet"]
{{< /mermaid >}}

Et fullmaktssett kan inneholde både pakker og enkeltrettigheter. Virksomheten kan ikke dele det opp, og leverandøren kan ikke utvide det. Oppfyller klienten flere sett, kan brukeren knytte den til flere av dem (vedtatt 10. november 2026). Fullmaktssett støtter ikke `action` i første versjon. Den særskilte klientdelegeringssiden for disse systembrukerne fjernes, slik at delegeringen håndteres ett sted.

Når virksomheten bestemmer, har systembrukeren ingen fullmaktssett, og flaten tilbyr ikke **Legg til alle klienter**. Det finnes ikke noe som sier hva klientene skal gi, og flaten skal ikke legge til alt klienten har gitt (10. og 23. november 2026).

For forhåndsdefinerte fullmakter for egen virksomhet kan enkeltpakker eller enkeltrettigheter ikke fjernes separat på brukersiden.

## Vedtatt: Leverandøren legger til nye fullmaktssett

{{< mermaid >}}
graph TD
  ADD["Leverandøren legger til et nytt fullmaktssett med eget endepunkt"] --> STORED["Altinn lagrer settet på systembrukeren"]
  STORED --> ROW["Settet blir en ny rad i brukerlisten, uten klienter"]
  ROW --> CLIENTS["Virksomheten legger klientene til selv"]
{{< /mermaid >}}

Leverandøren kan ikke endre eller slette et fullmaktssett, bare legge til nye (vedtatt 23. november 2026). Det som er delegert, endrer seg ikke. Kunden trenger ikke godkjenne et nytt sett, et sett kan ikke stoppes for bruk, og modellen har ingen måte å si at et nytt sett erstatter et gammelt. Det er ingen grense for hvor mange sett en systembruker kan ha, så flaten må tåle mange rader (vedtatt 24. november 2026). Endepunktet gjelder bare `vendorLocked=true`. Mot en systembruker med `vendorLocked=false` gir det valideringsfeil. Altinn vurderer «komplett» per sett: en klient kan være komplett i ett sett og mangle noe i et annet (vedtatt 23. november 2026).

Fullmaktene skal aldri bli usynlige. Uansett hvilket sett virksomheten åpner, viser flaten på klienten at systembrukeren har fullmakter fra klienten gjennom andre sett.

Eksisterende klientkoblinger flyttes ikke automatisk til nye systembrukere. Klientene må knyttes til de nye systembrukerne som opprettes med fullmaktssett. En klient kan være knyttet til mange systembrukere samtidig.

## Vedtatt: Forespørsel om flere fullmakter for egen virksomhet

Leverandøren kan be kunden om flere fullmakter for egen virksomhet med `/accessmanagement/api/v1/enduser/request`, det samme API-et som sluttbrukersystemer bruker i dag. Det gjelder både med `vendorLocked=true` og `vendorLocked=false`. Forespørsel om fullmakter for klienter er ikke planlagt i denne endringen. Vedtatt 9. november 2026.

## Vedtatt: Tilbakekalling følger rettighetsgrunnlaget

{{< mermaid >}}
graph TD
  CLIENT["Klient delegerer til eiervirksomheten"] --> FORWARD["Eiervirksomheten videredelegerer til systembrukeren"]
  FORWARD --> REVOKE["Klientens delegering til eiervirksomheten slettes"]
  REVOKE --> CASCADE["Tilhørende videredelegeringer slettes"]
{{< /mermaid >}}

Dette gjelder både enkeltrettigheter og tilgangspakker, uavhengig av systembrukertype og flagg.

## Vedtatt: Flagget heter vendorLocked

Vedtatt 9. november 2026, og vi sender det på høring. Flagget heter `vendorLocked` og er påkrevd i versjon 2 av forespørselen, så det har ingen standardverdi. Forespørsler til versjon 1 gir alltid `vendorLocked=true`. Navnet erstatter forslaget `ownerControlledAccess`.

## Vedtatt: Legg til alle per sett

Vedtatt 23. november 2026. Klientlisten har én gruppe per fullmaktssett, og en klient står i gruppen for hvert sett den oppfyller fullt ut. Brukeren knytter klienter til ett sett om gangen, én og én eller med **Legg til alle** for settet. Knappen knytter bare klienter i gruppen som ikke er knyttet til settet fra før. En klient kan være knyttet til flere sett. **Legg til alle** finnes bare med `vendorLocked=true`. Se #5055, #5056 og #5057 i altinn-auth.

## Vedtatt: Én rad per fullmaktssett i brukerlistene

Vedtatt 23. november 2026. Alle brukerlister viser en systembruker med flere fullmaktssett som én rad per sett: **Brukere**, **Klientadministrasjon** og klientens oversikt over byråets systembrukere. Har systembrukeren fullmakter for egen virksomhet, får de en egen rad. Med `vendorLocked=false` har systembrukeren én rad for egen virksomhet, hvis den har fullmakter der, og én rad for klienter.

{{< mermaid >}}
graph TD
  SU["Én systembruker, ett token, én externalRef"] --> OWNROW["Rad: fullmakter for egen virksomhet"]
  SU --> ROW1["Rad: system + sett 1"]
  SU --> ROW2["Rad: system + sett 2"]
  ROW1 --> OPEN["Åpnet rad viser bare det settet: klienter som er lagt til, klienter virksomheten kan legge til og klienter som mangler noe, og én Legg til alle"]
{{< /mermaid >}}

- Radene er bare visning. Datamodellen er uendret: én systembruker, ett token og summen av fullmaktene i settene klienten er knyttet til.
- BFF-en i frontend deler systembrukeren i rader. Vi endrer ikke API-et i Authentication for listene.
- Raden heter system + `name` på settet, ellers «Alternativ N». `name` er fortsatt valgfritt.
- Virksomheten kan knytte samme klient til flere rader. Systembrukeren får summen.
- Sletter virksomheten fra en rad, sletter de hele systembrukeren. Bekreftelsen sier at alle radene forsvinner.
- API-et for å knytte en klient viser til systembrukeren, id-en til settet og klienten.
- Altinn vurderer «komplett» per rad.
- Uansett hvilken rad virksomheten åpner, viser flaten på klienten fullmakter systembrukeren har fra klienten utenfor settet.

## Vedtatt: Ingen fullmaktssett når virksomheten bestemmer

Vedtatt 23. november 2026.

- En forespørsel med `vendorLocked=false` og `clientAccessSets` gir valideringsfeil. Listene for egen virksomhet er fortsatt lov.
- Fjerner leverandøren låsen (fra `true` til `false`), sletter Altinn fullmaktssettene. Klientene beholder det som er delegert, og virksomheten kan deretter endre fritt. Ingen fullmakter forsvinner.
- Endepunktet for å legge til fullmaktssett gir valideringsfeil når `vendorLocked=false`.

## Fortsatt åpent: Ett valg om gangen

| Valg | Alternativer som må avklares |
|---|---|
| Kombinasjoner på samme system | Tillate eller avvise samtidig bruk med og uten forhåndsdefinerte rettigheter |
| Endre tilgangsmodell | Vedtatt 26. oktober 2026: flagget kan endres på eksisterende bruker. Vedtatt 10. november 2026: bare fra `vendorLocked=true` til `false`. En åpen systembruker kan ikke låses. Leverandøren kan fjerne låsen uten at virksomheten er involvert. Åpent: om virksomheten også kan fjerne låsen |
| Eksisterende Agent-brukere | Intern representasjon: videreføre med kompatibilitet eller overføre til utvidet modell. Klientene flyttes ikke automatisk |
| Navn på fullmaktssett | Foreslått 24. november 2026: valgfritt `name` på ett eller flere språk (`nb`, `nn`, `en`), uten krav om oversettelse. Finnes ikke brukerens språk, viser Altinn det første språket i feltet. Uten navn: «Alternativ 1», «Alternativ 2». Vi spør leverandørene i høringen om navn skal være påkrevd |
| Navn og merker i grensesnittet | Om grensesnittet skal si «systembruker» i stedet for «systemtilgang», og hvordan det viser om leverandøren eller virksomheten bestemmer. Kom fra UX 24. november 2026 |
| Levetid for versjon 1 | Antatt minst to år, ikke bekreftet. Leverandørene får god dokumentasjon, men ikke annen hjelp til overgangen |
| Delvis tilbakekalling | Fjerne hele klienttilknytningen, beholde resten, eller bytte til et annet sett |
| Bytte Maskinporten-klient | Tillate bytte eller kreve ny bruker |

Presentasjonen har ett åpent valg per lysbilde. Ingen av disse alternativene er markert som vedtatt.

## Tekniske detaljer som må beskrives videre

- Behandling av utelatte lister og `null`, og endrede forespørsler med samme eksterne referanse.
- Innholdsvalidering av lister og fullmaktssett ved forespørsel og aksept, uten sammenligning mot systemets rettighetskrav.
- Lagring, svarmodeller, godkjenningsbilde og kobling til standard bruker- og klientflater.
- Direkte Maskinporten-tilknytning, tokeninnhold og sporing av rettighetsgrunnlaget.
- Intern enum og kompatibilitet: betegnelsen systembruker avgjør ikke alene den tekniske migreringen.

Vedtak: avklaringer med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Oppdatert med Codex og Claude Code; teamet skal gjennomgå innholdet. UI-detaljene i presentasjonen er illustrasjoner, ikke dokumentasjon av implementert produkt.
