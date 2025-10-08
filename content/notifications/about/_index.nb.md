---
title: Om Varslinger
description: Overordnet beskrivelse av Altinn Varslinger
aliases:
- /altinn-notifications/
weight: 10
cascade:
  params:
    diataxis: diataxis_explanation
---

**Altinn Varslinger** er en tjeneste utviklet for å fasilitere effektiv kommunikasjon med sluttbrukere gjennom ulike kanaler. Nøkkelfunksjoner inkluderer:

- Et robust API for å sende varsler via e-post og SMS.
- Sømløs integrasjon med Altinns tjenester for å effektivisere kommunikasjonsflyten.
- Sanntidsoppslag av navn og kontaktdetaljer fra nasjonale registre ved bruk av fødselsnummer eller organisasjonsnummer, som sikrer bruk av oppdatert informasjon.

## Funksjonalitet

**E-postvarslinger**: Send tilpassede, formaterte og informative e-poster direkte til brukere.

**SMS-varslinger**: Send tilpassede, konsise og tidsriktige meldinger til brukernes mobile enheter.

**Navneoppslag**: Hent gjeldende navn fra nasjonale registre.

**Kontaktdetaljoppslag**: Hent oppdatert kontaktinformasjon fra nasjonale registre.

## Hvordan det fungerer
Altinn Varslinger muliggjør integrasjon med interne tjenester og Altinn-applikasjoner for å sende varsler utløst av spesifikke hendelser eller betingelser.

### API-tilgang

Utviklere kan bruke Altinn Varslinger API-et til å sende varsler programmatisk og spore leveringsstatusen deres.

### Integrasjon med Altinn-tjenester

Altinn Varslinger benytter følgende Altinn-tjenester:

- **Register**: Henter navn og kontaktdetaljer for virksomheter.
- **Profil**: Henter navn og kontaktdetaljer for privatpersoner.
- **Ressursregister**: Identifiserer autoriserte mottakere innenfor en organisasjon.
- **Autorisasjon**: Sikrer trygg og forskriftsmessig kommunikasjon.

## Berettigede brukere

Følgende enheter kan sende meldinger via Altinn Varslinger, forutsatt at de er autorisert gjennom Maskinporten:

- Registrerte tjenesteeiere
- Altinn Apps
- Interne Altinn-tjenester
