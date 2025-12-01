---
title: 'Status migrering'
description: 'Status migrering av data til Dialogporten'
weight: 70
cascade:
  params:
    diataxis: diataxis_explanation
---

## Status

Livesynkronisering: Alle endringer[^1] (skjema, meldinger) vises i Dialogporten.

[^1]: Med unntak av app-instanser fra Altinn 2 som ikke er fullført (f.eks. startet utfylling av et skjema, men ikke fullført)

### Historiske data

| Kilde | Migrert tilbake til |
|----------|----------|
| A2-Melding | 01.12.2024 |
| A2 arkiverte skjema / A3-app-instanser | 01.01.2025 |

## Mål og planer

Fase 1: Innen utgangen av 2025 vil alle historiske 2025-data være migrert til Dialogporten.
25/11: Vi vil migrere data tilbake til og med desember 2024 som en del av dette.

Fase 2: Eldre data vil bli migrert ferdig i løpet av andre kvartal 2026. Vi starter med nyeste data og jobber bakover.

## Detaljer
Dialoger i Dialogporten kommer fra tre kilder: direkte via Dialogportens API, fra Melding (correspondence), eller app-instanser (f.eks. utfylte skjema).
For de to sistnevnte skiller vi mellom data opprettet i Altinn 2 og data opprettet i Altinn 3, og mellom livesynkronisering av endringer og migrering av historiske data.

Nedenfor, for hver av de ulike datakildene, er en kort statusoppdatering, forklaring av kilden og andre relevante detaljer.

### ✔ Dialogtjenester
Alle endringer gjort direkte mot Dialogportens API er tilgjengelig umiddelbart.

Brukes typisk der tjenesteeier enten har egen plattform, eller håndterer dialoger utenfor standardfunksjonaliteten til Altinn Melding eller Altinn Studio/apper.

### ⚠ A2 Melding - Historisk
Foreløpig migrert tilbake til 1. desember 2024. Eldre meldinger vil bli migrert senere.

Manuell prosess. Historiske meldinger migreres fra Altinn 2 Melding til Altinn 3 Melding. Meldingene migreres deretter til Dialogporten i en separat prosess.

Se [migrering av meldingsdata](https://docs.altinn.studio/nb/correspondence/transition/data-migration/) for detaljer om migreringsprosessen.

### ✔ A2 Melding - Live
Nye meldinger opprettet i Altinn 2 Melding migreres til Dialogporten i nær sanntid (hvert 5. minutt).
Livesynkronisering er aktiv for både tt02 og prod.

Se [migrering av meldingsdata](https://docs.altinn.studio/nb/correspondence/transition/data-migration/#synkronisering-av-statusendringer-mellom-altinn-2-og-3) for detaljer om synkroniseringsprosessen.

### ✔ A3 Melding
Alle nye meldinger opprettet i Altinn 3 Melding er tilgjengelig i Dialogporten umiddelbart. Ingen migrering nødvendig.

### ⚠ A3 App-instanser - Historisk
Migrert tilbake til 1. januar 2025. Eldre app-instanser vil bli migrert senere.

### ✔ A3 App-instanser - Live
Nye app-instanser opprettet i Altinn 3 er tilgjengelig i Dialogporten umiddelbart. Endringer synkroniseres i sanntid.

### ⚠ A2 Arkiverte skjema - Historisk
Migrert tilbake til 1. januar 2025. Eldre arkiverte skjema vil bli migrert senere.

### ✔ A2 Arkiverte skjema - Live
Nye app-instanser opprettet i Altinn 2 migreres i puljer hvert 5. minutt.

## Endringslogg

01.12.2025:
- Problemer med historisk A2-melding er løst. Både manglende meldinger og feil datoer er korrigert.
- Historisk A2-melding migrert tilbake til 01.12.2024 (var 01.01.2025).
- Livesynkronisering av melding fra Altinn 2 og Altinn 3 gjenopptatt fredag 28.11.2025.

28.11.2025: 
- A2 arkiverte skjema og A3 app-instanser historisk er migrert tilbake til 01.01.2025 (var 01.02.2025). 
- Korrigeringer og migrering av data tilbake til og med desember 2024 er i gang.
- Lagt til lenke til [migrering av meldingsdata](https://docs.altinn.studio/nb/correspondence/transition/data-migration/) for detaljer om migrerings-/synkroniseringsprosess.

25.11.2025: Mer data er migrert, pause i livesynkronisering av melding, mål oppdatert:
- Historisk A2-melding migrert lenger tilbake til og med 01.01.2025, med unntak nevnt under.
- Mål oppdatert for migreringsfase 1: vil migrere gamle data tilbake til og med desember 2024 innen 2025.
- Livesynkronisering av A2 og A3 melding midlertidig satt på pause på grunn av tekniske problemer.
- For A2-melding mangler noen meldinger i perioden som allerede er migrert. Vi jobber med å migrere disse også.
- Noen historiske meldingsdialoger har feil datoer som vises i innboksen. Disse vil bli korrigert.

18.11.2025: App-instanser og arkiverte skjema tilbake til 01.02.2025.

17.11.2025: Mer historiske data migrert. Melding tilbake til 22.01.2025, app-instanser og arkiverte skjema tilbake til 01.03.2025.

14.11.2025: Første versjon av denne siden ble publisert.
