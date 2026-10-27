---
title: "Beslutningstre for systembruker"
description: "Vedtatte regler for opprettelse, forespørsel og delegering, med avklaringer til og med 19. oktober 2026."
hidden: true
disablePagefind: true
toc: true
outputs: [HTML]
build:
  list: never
  render: always
---
Dette beslutningstreet er oppdatert 19. oktober 2026 etter møtet 16. oktober. [Åpne presentasjonen med UI-illustrasjoner](../diskusjonsgrunnlag/).

Trærne under «Vedtatt» viser regler, ikke åpne alternativer. Punktene under «Fortsatt åpent» er ikke besluttet. Tidligere valg om implisitt deteksjon er erstattet av et eksplisitt flagg.

## Vedtatt: Hvor rettighetskravene kommer fra

{{< mermaid >}}
graph TD
  START["Opprette systembruker"] --> FLOW{"Hvordan starter opprettelsen?"}
  FLOW -->|Leverandørforespørsel| REQUESTLISTS["Bruk forespørselens fire lister for egen virksomhet og klienter"]
  REQUESTLISTS --> INDEPENDENT["Ingen utfylling eller begrensning fra systemets rettighetskrav"]
  FLOW -->|Brukeren oppretter selv| VISIBLE["Velg et synlig system i systemregisteret"]
  VISIBLE --> REGISTERLISTS["Bruk rettighetskravene på det valgte systemet"]
{{< /mermaid >}}

Listene på systemet i systemregisteret gjelder bare når brukeren selv oppretter systembruker for et synlig system. I forespørselsflyten angir leverandøren alle fire lister uavhengig av systemets lister. Forespørselens lister trenger ikke være en delmengde av disse.

Ved aksept og senere delegering gjelder de lagrede kravene fra forespørselen, også hvis systemets lister er tomme eller endres. Kontroll av gyldige rettigheter, systemeierskap og delegeringsmyndighet gjelder fortsatt. Systemregisteret er fortsatt kilde til systemets identitet og annen relevant metadata.

Synlig system i opprettelsesvalget er et annet begrep enn synlighet for opprettede systembrukere i bruker- og klientoversiktene.

## Vedtatt: Forespørsel og validering

Vi utvider `POST /authentication/api/v1/systemuser/request/vendor` og kaller brukeren systembruker. Autentisering ligger nå i `altinn-auth`.

Forespørselen har fire lister: pakker og enkeltrettigheter for egen virksomhet, og pakker og enkeltrettigheter for klienter. Navnene på de nye klientfeltene er ikke endelig fastsatt.

Systembruker for eget system uten systemregisteret skal være uten forhåndsdefinerte rettigheter, og kunne brukes for både egen virksomhet og klienter. Den skal dermed ha flagget `ownerControlledAccess` satt, typisk med fire tomme lister. Direkte Maskinporten-tilknytning er fortsatt et eget teknisk arbeidspunkt.

{{< mermaid >}}
graph TD
  REQUEST["Forespørsel om systembruker: fire lister over påkrevde rettigheter"] --> FLAG{"ownerControlledAccess satt?"}
  FLAG -->|Ja| EMPTY{"Er alle fire lister tomme?"}
  EMPTY -->|Ja| FREE["Gyldig: eierstyrt tilgang, ingen tilganger ved aksept"]
  EMPTY -->|Nei| PROPOSAL["Gyldig: eierstyrt tilgang, listene er initialt forslag og delegeres ved aksept"]
  FLAG -->|Nei| CONTENT{"Minst én pakke eller rettighet på minst én liste?"}
  CONTENT -->|Ja| PRESET["Gyldig: leverandørstyrt tilgang, bindende krav"]
  CONTENT -->|Nei| ERROR2["Valideringsfeil: mangler tilganger"]
{{< /mermaid >}}

Gyldig kombinasjon betyr at reglene for flagg og lister er oppfylt. Øvrig validering og autorisasjon gjelder fortsatt. Behandling av `null` og utelatte lister må beskrives i kontrakten.

## Vedtatt: Aksept og senere klientdelegering

{{< mermaid >}}
graph TD
  APPROVE["Forespørselen aksepteres"] --> CREATE["Systembrukeren opprettes"]
  CREATE --> OWN["Forespurte tilganger for egen virksomhet delegeres"]
  CREATE --> CLIENTCONFIG["Klientlistene lagres som ramme for senere delegering"]
  CLIENTCONFIG --> LINK["En klient knyttes til systembrukeren"]
  LINK --> CHECK["Kontroller fullmakter for klienten"]
  CHECK --> DELEGATE["Deleger klienttilgangene innenfor oppsettet"]
{{< /mermaid >}}

Ved `ownerControlledAccess=true` delegeres eventuelle lister ved aksept som initialt forslag. Aksept er alt eller ingenting på listene. Den som godkjenner, må alltid være tilgangsstyrer, uansett flagg. Er listene for egen virksomhet tomme, er det eneste Altinn kontrollerer ved aksept. Pakker og enkeltrettigheter kan deretter legges til og fjernes i GUI. Flagget gjelder både egen virksomhet og klienter.

## Vedtatt: Vanlige bruker- og klientflater

Alle systembrukere vises i brukeroversikten og den relevante klientdelegeringsoversikten, uavhengig av flagget.

{{< mermaid >}}
graph TD
  OPEN["Åpne systembrukeren på vanlig bruker- eller klientflate"] --> MODE{"ownerControlledAccess?"}
  MODE -->|Ja| CHOOSE["Velg pakker og enkeltrettigheter innenfor virksomhetens fullmakter"]
  MODE -->|Nei| CONTEXT{"Hvilke forhåndsdefinerte tilganger håndteres?"}
  CONTEXT -->|Klient| SET["Hele klientsettet er forhåndsvalgt på vanlig klientdelegeringsside"]
  SET --> ALL["Deleger hele settet samlet"]
  SET --> NONE["Velg ingen av tilgangene"]
  CONTEXT -->|Egen virksomhet| VIEW["Se forhåndsdefinerte tilganger på vanlig brukerside"]
  VIEW --> DELETE["Eneste endringshandling her: slett bruker og rettigheter samlet"]
{{< /mermaid >}}

Klientsettet omfatter både pakker og enkeltrettigheter. Det kan ikke deles opp eller utvides. Den særskilte klientdelegeringssiden for disse systembrukerne fjernes, slik at delegeringen håndteres ett sted.

For forhåndsdefinerte tilganger for egen virksomhet kan enkeltpakker eller enkeltrettigheter ikke fjernes separat på brukersiden.

## Vedtatt: Tilbakekalling følger rettighetsgrunnlaget

{{< mermaid >}}
graph TD
  CLIENT["Klient delegerer til eiervirksomheten"] --> FORWARD["Eiervirksomheten videredelegerer til systembrukeren"]
  FORWARD --> REVOKE["Klientens delegering til eiervirksomheten slettes"]
  REVOKE --> CASCADE["Tilhørende videredelegeringer slettes"]
{{< /mermaid >}}

Dette gjelder både enkeltrettigheter og tilgangspakker, uavhengig av systembrukertype og flagg.

## Fortsatt åpent: Ett valg om gangen

| Valg | Alternativer som må avklares |
|---|---|
| Kombinasjoner på samme system | Tillate eller avvise samtidig bruk med og uten forhåndsdefinerte rettigheter |
| Endre tilgangsmodell | Vedtatt 26. oktober 2026: flagget kan endres på eksisterende bruker. Åpent: hvem kan bytte, og hva skjer med tillagte rettigheter ved bytte til `false` |
| Eksisterende Agent-brukere | Videreføre med kompatibilitet eller overføre til utvidet modell |
| Bytte Maskinporten-klient | Tillate bytte eller kreve ny bruker |

Presentasjonen har ett åpent valg per lysbilde. Ingen av disse alternativene er markert som vedtatt.

## Tekniske detaljer som må beskrives videre

- Behandling av utelatte lister og `null`, og endrede forespørsler med samme eksterne referanse.
- Innholdsvalidering av egen- og klientlister ved forespørsel og aksept, uten sammenligning mot systemets rettighetskrav.
- Lagring, svarmodeller, godkjenningsbilde og kobling til standard bruker- og klientflater.
- Direkte Maskinporten-tilknytning, tokeninnhold og sporing av rettighetsgrunnlaget.
- Intern enum og kompatibilitet: betegnelsen systembruker avgjør ikke alene den tekniske migreringen.

Vedtak: avklaringer med RUNLAR etter møtet 16. oktober og oppfølgingen 19. oktober 2026. Oppdatert med Codex; teamet skal gjennomgå innholdet. UI-detaljene i presentasjonen er illustrasjoner, ikke dokumentasjon av implementert produkt.
