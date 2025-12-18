# Arbeidsdagbok - Altinn Studio Dokumentasjon

## Status 18. desember 2025
- **Siste arbeid (tirsdag 17. des)**: Flettet inn komponentbeskrivelser fra v8 til v10
- **Konkret oppgave**:
  - **Målfil**: http://localhost:1313/nb/altinn-studio/v10/develop-a-service/components/
  - **Kildefiler**: `/content/altinn-studio/v8/guides/design/guidelines/components`
  - **Hva som flettes inn**: "Bruk", "Utseende (Anatomi)" og "Egenskaper" fra v8
  - **For hvilke**: Alle komponenter som har disse seksjonene i v8
- **Støttedokumentasjon**:
  - `component-analysis-v8.md` inneholder oversikt over alle v8-komponenter
  - v8-komponenter ligger også i `/content/altinn-studio/v8/reference/ux/components/`
- **Neste i 2026**: Fortsette flettearbeidet - sjekk hvilke komponenter som er gjort og hvilke som mangler

## Tidligere arbeid

### multi-app-solution (ikke fullført)
- **Mappe**: `/content/altinn-studio/v10/develop-a-service/multi-app-solution/`
- **Status**: Ikke startet - for gammel informasjon
- **Oppgave**: Klarspråk på norsk først, deretter britisk engelsk oversettelse

### Gjennomført 16. oktober 2025

### eFormidling-dokumentasjon
- **Filer**: `/content/altinn-studio/v10/develop-a-service/eFormidling/_index.nb.md` og `_index.en.md`
- Oversatt fra engelsk til norsk bokmål med klarspråk
- Fikset norske setninger i den engelske filen
- Endret "forsendelse" til "melding" (bedre IT-terminologi)
- Unngått "av + -ing" konstruksjoner
- La til needsReview-tag

### local-dev-dokumentasjon
- **Filer**: `/content/altinn-studio/v10/develop-a-service/local-dev/_index.nb.md` og `_index.en.md`
- Språkvasket norsk versjon med klarspråk
- Endret alle "Hvordan"-overskrifter til "Slik"
- Fjernet passive konstruksjoner
- Endret "output" til "resultat"
- La til bildeinstruksjoner ("Bytt dette bildet")
- Oversatt til britisk engelsk
- La til needsReview-tag

## Viktige retningslinjer
- Bruk konservativ bokmål ("listen", "hentet" - ikke "lista", "henta")
- Hovedoverskrifter: Infinitiv ("Opprette tjenesten")
- Steg-for-steg underoverskrifter: Imperativ ("Opprett ny tjeneste")
- GUI-elementer: Bold formatting ("Klikk på **Lagre**")
- Mushandlinger: "klikk"
- Tastaturhandlinger: "trykk"
- Valg fra lister: "velg"
- URLs: Soft line break før URL
- Alltid legg til `tags: [needsReview]` i frontmatter
