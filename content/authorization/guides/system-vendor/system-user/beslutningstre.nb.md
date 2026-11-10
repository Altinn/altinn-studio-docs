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
  FLOW -->|Leverandørforespørsel| REQUESTLISTS["Bruk forespørselens lister for egen virksomhet og rettighetssett for klienter"]
  REQUESTLISTS --> INDEPENDENT["Ingen utfylling eller begrensning fra systemets rettighetskrav"]
  FLOW -->|Brukeren oppretter selv| VISIBLE["Velg et synlig system i systemregisteret"]
  VISIBLE --> REGISTERLISTS["Bruk rettighetskravene på det valgte systemet"]
{{< /mermaid >}}

Listene på systemet i systemregisteret gjelder bare når brukeren selv oppretter systembruker for et synlig system. I forespørselsflyten angir leverandøren listene og rettighetssettene uavhengig av systemets lister. Forespørselens krav trenger ikke være en delmengde av disse.

Ved aksept og senere delegering gjelder de lagrede kravene fra forespørselen, også hvis systemets lister er tomme eller endres. Kontroll av gyldige rettigheter, systemeierskap og delegeringsmyndighet gjelder fortsatt. Systemregisteret er fortsatt kilde til systemets identitet og annen relevant metadata.

Synlig system i opprettelsesvalget er et annet begrep enn synlighet for opprettede systembrukere i bruker- og klientoversiktene.

## Vedtatt: Forespørsel og validering

Vi lager `POST /authentication/api/v2/systemuser/request/vendor` med den utvidede forespørselen og kaller brukeren systembruker. Versjon 1 virker som før og får ingen nye felt. Systembrukere fra versjon 1 får `vendorLocked=true`. Autentisering ligger nå i `altinn-auth`.

Forespørselen har to lister for egen virksomhet, pakker og enkeltrettigheter, og en prioritert liste med rettighetssett for klienter. Navnet på det nye klientfeltet er ikke endelig fastsatt.

Systembruker for eget system uten systemregisteret skal være uten forhåndsdefinerte rettigheter, og kunne brukes for både egen virksomhet og klienter. Den skal dermed ha `vendorLocked=false`, typisk uten krav i forespørselen. Direkte Maskinporten-tilknytning er fortsatt et eget teknisk arbeidspunkt.

{{< mermaid >}}
graph TD
  REQUEST["Forespørsel om systembruker: lister og rettighetssett"] --> FLAG{"vendorLocked?"}
  FLAG -->|Mangler| ERROR1["Valideringsfeil: vendorLocked er påkrevd i versjon 2"]
  FLAG -->|false| EMPTY{"Er forespørselen uten krav?"}
  EMPTY -->|Ja| FREE["Gyldig: Virksomheten bestemmer, ingen tilganger ved aksept"]
  EMPTY -->|Nei| PROPOSAL["Gyldig: Virksomheten bestemmer, kravene er initialt forslag. Listene for egen virksomhet delegeres ved aksept"]
  FLAG -->|true| CONTENT{"Minst én pakke, rettighet eller ett rettighetssett?"}
  CONTENT -->|Ja| PRESET["Gyldig: Leverandøren bestemmer, bindende krav"]
  CONTENT -->|Nei| ERROR2["Valideringsfeil: mangler tilganger"]
{{< /mermaid >}}

Gyldig kombinasjon betyr at reglene for flagg og lister er oppfylt. Øvrig validering og autorisasjon gjelder fortsatt. Behandling av `null` og utelatte lister må beskrives i kontrakten.

## Vedtatt: Aksept og senere klientdelegering

{{< mermaid >}}
graph TD
  APPROVE["Forespørselen aksepteres"] --> CREATE["Systembrukeren opprettes"]
  CREATE --> OWN["Forespurte tilganger for egen virksomhet delegeres"]
  CREATE --> CLIENTCONFIG["Rettighetssettene lagres på systembrukeren som ramme for senere delegering"]
  CLIENTCONFIG --> LINK["En klient knyttes til systembrukeren"]
  LINK --> CHECK["Det første rettighetssettet klienten oppfyller fullt ut, er forhåndsvalgt. Brukeren kan velge et annet sett klienten oppfyller"]
  CHECK --> DELEGATE["Deleger hele settet samlet"]
{{< /mermaid >}}

Ved `vendorLocked=false` delegeres eventuelle lister for egen virksomhet ved aksept som initialt forslag. Klienttilgangene delegeres først når en klient knyttes til systembrukeren. Aksept er alt eller ingenting på listene. Den som godkjenner, må alltid være tilgangsstyrer, uansett flagg. Er listene for egen virksomhet tomme, er det eneste Altinn kontrollerer ved aksept. Pakker og enkeltrettigheter kan deretter legges til og fjernes i GUI. Flagget gjelder både egen virksomhet og klienter.

## Vedtatt: Vanlige bruker- og klientflater

Alle systembrukere vises i brukeroversikten og den relevante klientdelegeringsoversikten, uavhengig av flagget.

{{< mermaid >}}
graph TD
  OPEN["Åpne systembrukeren på vanlig bruker- eller klientflate"] --> MODE{"vendorLocked?"}
  MODE -->|false| CHOOSE["Velg pakker og enkeltrettigheter innenfor virksomhetens fullmakter"]
  MODE -->|true| CONTEXT{"Hvilke forhåndsdefinerte tilganger håndteres?"}
  CONTEXT -->|Klient| SET["Det første oppfylte rettighetssettet er forhåndsvalgt på vanlig klientdelegeringsside"]
  SET --> ALL["Deleger hele settet samlet"]
  SET --> NONE["Velg ingen av tilgangene"]
  CONTEXT -->|Egen virksomhet| VIEW["Se forhåndsdefinerte tilganger på vanlig brukerside"]
  VIEW --> DELETE["Eneste endringshandling her: slett bruker og rettigheter samlet"]
{{< /mermaid >}}

Et rettighetssett kan inneholde både pakker og enkeltrettigheter. Det kan ikke deles opp eller utvides. Oppfyller klienten flere sett, kan brukeren velge et annet av dem (vedtatt 10. november 2026). `action` støttes ikke i rettighetssett i første versjon. Den særskilte klientdelegeringssiden for disse systembrukerne fjernes, slik at delegeringen håndteres ett sted.

For forhåndsdefinerte tilganger for egen virksomhet kan enkeltpakker eller enkeltrettigheter ikke fjernes separat på brukersiden.

## Vedtatt: Leverandøren oppdaterer rettighetssettene

{{< mermaid >}}
graph TD
  UPDATE["Leverandøren oppdaterer rettighetssettene med eget endepunkt"] --> STORED["De nye settene lagres på systembrukeren"]
  STORED --> UNCHANGED["Det som er delegert, endres ikke"]
  UNCHANGED --> VISIBLE["Brukerflaten viser at settet ikke er komplett"]
{{< /mermaid >}}

Eksisterende klientkoblinger flyttes ikke automatisk til nye systembrukere. Klientene må knyttes til de nye systembrukerne som opprettes med rettighetssett. En klient kan være knyttet til mange systembrukere samtidig.

## Vedtatt: Forespørsel om flere tilganger for egen virksomhet

Leverandøren kan be kunden om flere tilganger for egen virksomhet med `/accessmanagement/api/v1/enduser/request`, det samme API-et som sluttbrukersystemer bruker i dag. Det gjelder både med `vendorLocked=true` og `vendorLocked=false`. Forespørsel om tilganger for klienter er ikke planlagt i denne endringen. Vedtatt 9. november 2026.

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

## Fortsatt åpent: Ett valg om gangen

| Valg | Alternativer som må avklares |
|---|---|
| Kombinasjoner på samme system | Tillate eller avvise samtidig bruk med og uten forhåndsdefinerte rettigheter |
| Endre tilgangsmodell | Vedtatt 26. oktober 2026: flagget kan endres på eksisterende bruker. Vedtatt 10. november 2026: bare fra `vendorLocked=true` til `false`. En åpen systembruker kan ikke låses. Leverandøren kan fjerne låsen uten at virksomheten er involvert. Åpent: om virksomheten også kan fjerne låsen |
| Eksisterende Agent-brukere | Intern representasjon: videreføre med kompatibilitet eller overføre til utvidet modell. Klientene flyttes ikke automatisk |
| Oppdatering av rettighetssett | Om kunden må godkjenne, hva «komplett» betyr med flere sett, og hva som skjer når leverandøren fjerner en tilgang |
| Navn på rettighetssett | Valgfritt `name` fra leverandøren, eller bare «Alternativ 1», «Alternativ 2» i grensesnittet. Vi spør leverandørene i høringen |
| Delvis tilbakekalling | Fjerne hele klienttilknytningen, beholde resten, eller bytte til et annet sett |
| Bytte Maskinporten-klient | Tillate bytte eller kreve ny bruker |

Presentasjonen har ett åpent valg per lysbilde. Ingen av disse alternativene er markert som vedtatt.

## Tekniske detaljer som må beskrives videre

- Behandling av utelatte lister og `null`, og endrede forespørsler med samme eksterne referanse.
- Innholdsvalidering av lister og rettighetssett ved forespørsel og aksept, uten sammenligning mot systemets rettighetskrav.
- Lagring, svarmodeller, godkjenningsbilde og kobling til standard bruker- og klientflater.
- Direkte Maskinporten-tilknytning, tokeninnhold og sporing av rettighetsgrunnlaget.
- Intern enum og kompatibilitet: betegnelsen systembruker avgjør ikke alene den tekniske migreringen.

Vedtak: avklaringer med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Oppdatert med Codex og Claude Code; teamet skal gjennomgå innholdet. UI-detaljene i presentasjonen er illustrasjoner, ikke dokumentasjon av implementert produkt.
