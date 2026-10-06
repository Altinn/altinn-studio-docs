---
title: "Beslutningstre for systembruker"
description: "Avhengigheter og alternativer for de 12 valgene i diskusjonsgrunnlaget."
hidden: true
disablePagefind: true
toc: true
outputs: [HTML]
build:
  list: never
  render: always
---

Dette beslutningstreet supplerer [slidedecket](../diskusjonsgrunnlag/). Numrene viser til valgene i decket. Alle grener er alternativer; ingen åpne valg er markert som vedtatt.

Trærne er delt opp for lesbarhet. En heltrukken pil viser hvilken gren som følger av et svar. En stiplet pil viser en avhengighet som må tas med i et annet valg. Valg under «uavhengige valg» kan tas hver for seg.

## Vedtatte rammer

- Systembruker for eget system skal være fri og kunne få tilgang for egen virksomhet og klienter.
- Både tilgangspakker og enkeltrettigheter skal støttes. Klientdelegering skjer via standard GUI.
- Vi bruker standard API for å be om en fri bruker. Aksept krever tilgangsstyringspakken.
- Sletting av videredelegeringer følger virksomhetens rettighetsgrunnlag, uavhengig av systembrukertype.

## Modell og deteksjon av fri

{{< mermaid >}}
graph TD
  V1{"Valg 1: Nye enum-verdier?"}
  V1 -->|Ja| NEW["Legg til nye typer utover Standard og Agent"]
  V1 -->|Nei| V2{"Valg 2: Hvordan markere fri på standard request?"}
  V2 -->|Eksplisitt| FLAG["Nytt flagg angir fri"]
  V2 -->|Implisitt| EMPTY["Tomme tilgangslister betyr fri"]
  EMPTY --> V3{"Valg 3: Hvilke representasjoner betyr ingen tilganger?"}
  V3 -->|Kun eksplisitt tomme| BOTH["Begge listene må sendes tomme"]
  V3 -->|Også utelatte| OMIT["Utelatte lister tolkes også som ingen tilganger"]
  BOTH --> V8{"Valg 8: Skal eksisterende brukere uten tilganger tolkes som fri?"}
  OMIT --> V8
  V8 -->|Ja| AUTO["Bruk samme tolkning på eksisterende data"]
  V8 -->|Nei| MIGRATE["Krev eksplisitt overgang for eksisterende brukere"]
{{< /mermaid >}}

Valg 2 er relevant hvis dagens enum-verdier beholdes. Ved implisitt deteksjon må null håndteres entydig i valg 3. Kartlegg eksisterende data før valg 8 landes. GUI må skille forhåndsdefinerte lister fra faktisk delegerte rettigheter.

## Registrerte systemer og validering

{{< mermaid >}}
graph TD
  V4{"Valg 4: Fri delegering med registrert system?"}
  V4 -->|Nei| DIRECT["Fri delegering bruker oppsett uten systemregisteret"]
  V4 -->|Ja| V5{"Valg 5: Fri og Standard/Agent på samme system samtidig?"}
  V5 -->|Ja| MIX["Begge oppsett på samme system"]
  V5 -->|Nei| SPLIT["Separate oppsett: to Maskinporten-klienter for leverandør som støtter begge"]
  MIX --> REQUIRED["Forespørsel uten pakker eller enkeltrettigheter må aksepteres for fri"]
  REQUIRED -.-> V6{"Valg 6: Validere oppgitte tilganger ved opprettelse?"}
  V6 -->|Ja| EARLY["Kontroller oppgitte tilganger tidlig; tom forespørsel må fortsatt støttes"]
  V6 -->|Nei| LATER["Kontroller når tilgang delegeres"]
{{< /mermaid >}}

Valg 5 er relevant hvis valg 4 er Ja. Valg 6 må avklares uansett modell; Ja i valg 5 legger et krav på valideringen. Faktisk tildeling av tilgang må kontrolleres når den skjer, også hvis dette skjer under opprettelsen.

## Uavhengige valg: Endringer og API

Disse valgene er ikke én sekvens. Hvert spørsmål har egne alternativer.

{{< mermaid >}}
graph TD
  ROOT["Endringer og kompatibilitet"]
  ROOT --- V7{"Valg 7: Endre tilgangsmodell på eksisterende bruker?"}
  V7 -->|Tillat| CHANGE["Behold identitet; håndter eksisterende delegeringer"]
  V7 -->|Ikke tillat| RECREATE["Opprett ny systembruker"]
  ROOT --- V9{"Valg 9: API-overgang?"}
  V9 -->|Dagens kontrakt| EXTEND["Utvid dagens kontrakt"]
  V9 -->|Ny kontrakt| VERSION["Innfør ny kontrakt eller versjon"]
  ROOT --- V12{"Valg 12: Bytte Maskinporten-klient?"}
  V12 -->|Tillat| REPLACE["Behold bruker; kontroller ny og avslutt gammel tilknytning"]
  V12 -->|Ikke tillat| NEWUSER["Opprett ny systembruker"]
{{< /mermaid >}}

Valg 7 gjelder oppsett der begge tilgangsmodeller støttes; eget system skal være fri. Valg 9 gjelder kontraktsstrategien, mens standard API for forespørsel allerede er vedtatt. Valg 12 trenger teknisk avklaring med Maskinporten før det landes.

## Uavhengige valg: Navn og GUI

{{< mermaid >}}
graph TD
  ROOT["Begreper for eksterne"]
  ROOT --- V10{"Valg 10: Navn?"}
  V10 --> FREE["Fri systembruker"]
  V10 --> UNLIMITED["Ubegrenset systembruker"]
  V10 --> CUSTOMER["Systembruker med kundestyrte rettigheter"]
  ROOT --- V11{"Valg 11: Må brukeren velge en kategori i GUI?"}
  V11 -->|Ja| CATEGORY["Vis kategorien som et eksplisitt valg"]
  V11 -->|Nei| ACTIONS["Vis konkrete handlinger og forklar forskjellen der den har betydning"]
{{< /mermaid >}}

Navnet kan velges uavhengig av enum-verdier og deteksjon. Fri betyr ikke at systembrukeren har tilgang før rettigheter er delegert, eller at delegeringsreglene oppheves.

## Informasjon som må innhentes

Før relevante valg landes, trenger vi bekreftet informasjon om eksisterende data og API-konsumenter, valideringsreglene i produksjon, Maskinporten-tilknytning og tokeninnhold, samt sporing av rettighetsgrunnlaget i standard GUI og backend.

Oppdatert 6. oktober 2026 med Codex, basert på samme avklaringer som slidedecket. Trærne viser diskusjonsalternativer og skal gjennomgås av teamet.
