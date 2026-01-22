---
draft: true
title: Betaling
description: Betaling er et prosessteg som lar brukere betale for tjenester eller gebyrer i appen.
weight: 20
tags: [needsReview]
---

## Betaling i Altinn Studio

Betaling er et prosessteg du kan legge til i appen din når brukerne skal betale gebyrer eller andre avgifter. I denne artikkelen forklarer vi hvordan betaling fungerer, hva som lagres, og hvilke betalingsleverandører du kan bruke.

### Hvordan fungerer betaling?

Når brukeren kommer til betalingssteget i appen, skjer følgende:

1. Appen omdirigerer brukeren til en ekstern betalingsleverandør.
2. Brukeren gjennomfører betalingen hos betalingsleverandøren.
3. Appen returnerer brukeren til tjenesten når betalingen er fullført.

<object data="payment.drawio.svg" type="image/svg+xml" style="width: 100%;"></object>

### Hva lagres om betalingen?

Appen lagrer ordregrunnlag og detaljer om betalingen i et dataelement som JSON (paymentInformation.json). Du kan laste ned denne informasjonen via API etter at brukeren har sendt inn skjemaet. Appen genererer også en PDF-kvittering.

Som tjenesteeier må du håndtere oppbevaring av betalingsinformasjon i henhold til bokføringsloven.

### Nets Easy

Støtte for Nets Easy som betalingsleverandør følger med applikasjonen. Du finner guide for oppsett av Nets Easy [her](/nb/altinn-studio/v8/guides/development/payment/).

For å bruke Nets Easy må tjenesteeier ha avtale med Nets Easy. Du finner informasjon om hvordan du oppretter avtalen her:
[payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).

### Flere betalingsleverandører

Du kan legge til flere betalingsleverandører ved hjelp av egenutviklet backend-kode. Flere betalingsleverandører kan brukes side om side i samme tjeneste. Ta kontakt hvis dette er aktuelt for deg.
