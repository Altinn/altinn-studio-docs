---
title: Umiddelbar varsling
description: "Umiddelbar varsling sender varsler øyeblikkelig til én mottaker, egnet for tidskritiske meldinger som engangskoder."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, instant notifications, OTP, engangskode]
weight: 50
---

## Hva er umiddelbar varsling?

Umiddelbar varsling er en variant av varslingstjenesten i Altinn Varsling som sender meldinger **øyeblikkelig** til **én mottaker** (e-postadresse eller telefonnummer).

Funksjonen er nyttig når brukeren venter på informasjon for å komme videre, for eksempel en engangskode (OTP) ved innlogging.

## Når bør du **ikke** bruke umiddelbar varsling?

{{% notice info %}}
I de fleste tilfeller er vanlig varsling tilstrekkelig. Du kan utelate `requestedSendTime` for å sende varselet så snart som mulig, og bruke `sendingTimePolicy: "Anytime"` for å tillate utsending hele døgnet. Denne kombinasjonen gir vanligvis en SMS til brukeren i løpet av et par minutter.
{{% /notice %}}

## Tekniske egenskaper

### Umiddelbar sending med asynkron statusoppfølging

Tjenesten er semisynkron: bestillingen og utsendingen skjer synkront fram til overlevering til e-post- eller SMS-leverandøren, mens leveranserapporter kommer asynkront som for vanlige bestillinger.

Umiddelbar varsling fungerer som følger:

- API-kallet registrerer bestillingen og sender den umiddelbart til SMS- eller e-posttjenesten
- Varselet sendes til meldingsgatewayen umiddelbart og omgår køen
- API-et returnerer `201 Created` eller `200 OK` med sporingsinformasjon (`shipmentId` og `notificationOrderId`)
- Leveringsstatus må hentes asynkront via statusfeed (`/future/shipment/feed`) eller ved å polle `/future/shipment/:id`
- **Merk:** Responskoden `201 Created` bekrefter bare at systemet registrerte og aksepterte bestillingen, ikke at leveringen lyktes. E-post kan feile av ulike årsaker, og mobiltelefoner kan være utenfor dekning.

### Idempotens

Umiddelbar varsling støtter **idempotens** gjennom et obligatorisk `idempotencyId`-felt:

- Forhindrer at samme melding sendes flere ganger ved gjentatte forespørsler
- Nyttig ved nettverksproblemer eller tidsavbrudd
- Samme `idempotencyId` returnerer samme resultat (`shipmentId` osv.) uten å sende meldingen på nytt
- API-et sjekker ikke om innholdet er forskjellig fra tidligere kall med samme ID
- API-et returnerer `201 Created` ved første vellykkede kall, eller `200 OK` hvis kallet med samme `idempotencyId` allerede har gått gjennom

### Levetid (Time-to-Live)

For **SMS-baserte umiddelbare varsler** må du oppgi et `timeToLiveInSeconds`-felt:

- Angir hvor lenge SMS-gatewayen skal forsøke å levere meldingen
- Viktig for engangskoder som utløper etter en viss tid. En kode som ankommer etter utløp, er ubrukelig.

### Kapasitet

Umiddelbar varsling **er ikke laget for høyt volum**:

- Beregnet på **enkeltstående, tidskritiske meldinger**, ikke masseutsendelser
- Beregnet på varsler til enkeltmottakere som **må** sendes umiddelbart
- Bruk vanlige varslingsbestillinger for høye volum eller masseutsendelser

## Neste steg

- Les [veiledningen for umiddelbar varsling](/nb/notifications/guides/instant-notifications/) for å lære hvordan du implementerer umiddelbar varsling i din tjeneste
- Utforsk [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for tekniske spesifikasjonsdetaljer
