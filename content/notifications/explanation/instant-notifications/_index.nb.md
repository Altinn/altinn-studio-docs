---
title: Umiddelbar varsling
description: "Umiddelbar varsling (instant notifications) er en funksjon i Altinn Varslinger som sender varsler øyeblikkelig til én enkelt mottaker. Dette er spesielt egnet for tidskritiske meldinger som engangskoder, varsler og andre situasjoner der forsinkelser ikke er akseptabelt."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, instant notifications, OTP, engangskode]
weight: 50
---

## Hva er umiddelbar varsling?

Umiddelbar varsling er en spesialisert variant av varslingstjenesten i Altinn Varsling, som sender meldinger **øyeblikkelig** til **én enkelt mottaker** (kun til e-postadresse eller telefonnummer).

Denne funksjonaliteten er designet for brukstilfeller, som for eksempel pålogging, der brukeren venter på informasjon via SMS/e-post for å komme videre i en pågående prosess.  


## Når bør du *IKKE* bruke umiddelbar varsling?

{{% notice info %}}
I de fleste tilfeller er bruken av "vanlig" varsling tilstrekkelig. Det er mulig å ikke spesifisere `requestedSendTime` for å indikere at varslet ønskes effektuert så snart som mulig, 
og å benytte `sendingTimePolicy: "Anytime",` for å tillate utsending når som helst på døgnet. Denne kombinasjonen vil som regel resultere i (f.eks) en SMS til brukeren i løpet av et par minutter.
{{% /notice %}}

## Tekniske egenskaper

### Umiddelbar sending med asynkron statusoppfølging

Tjenesten er semi-synkron ved at bestillingen/utsendingen er synkron frem til overlevering til til e-post/sms-leverandøren, mens leveranserapporter skjer asynkront som for vanlige bestillinger.

Umiddelbar varsling fungerer som følger:

- API-kallet registrerer ordren og sender den umiddelbart til SMS/e-post-tjenesten
- Varslingen sendes til SMS/e-post-gatewayen umiddelbart (går forbi køen)
- API-et returnerer `201 Created` eller `200 OK` med sporingsinformasjon for ordre (`shipmentId` og `notificationOrderId`)
- Leveringsstatus må hentes asynkront via statusfeed (`/future/shipment/feed`) eller ved å polle `/future/shipment/:id`
- **Merk:** den opprinnelige `201 Created`-responsen bekrefter kun at ordren ble registrert og akseptert av gatewayen, ikke at leveringen lyktes (e-post kan fortsatt feile av ulike årsaker eller mobiltelefonen er utenfor dekningsområdet etc)

### Idempotens

Umiddelbar varsling støtter **idempotens** gjennom et obligatorisk `idempotencyId`-felt:

- Forhindrer at samme melding sendes flere ganger ved gjentatte forespørsler
- Nyttig ved nettverksproblemer eller timeout
- Samme `idempotencyId` vil returnere samme resultat (`shipmentId`osv.) uten å sende meldingen på nytt.
- Det er ikke logikk/deteksjon av om innholdet er forskjellig fra tidligere kall
- API-et returnerer `201 Created` ved første vellykkede kall, eller `200 OK` dersom kallet (med samme `idempotencyId`) tidligere har gått OK

### Levetid (Time-to-Live)

For **SMS-baserte umiddelbare varsler** må du oppgi et `timeToLiveInSeconds`-felt:

- Definerer hvor lenge SMS-gatewayen skal prøve å levere meldingen
- Viktig for OTP-brukstilfeller der koden utløper etter en viss tid, og at sen leveranse er meningsløs (dvs. nyttig å motta en kode etter gyldighetsperioden).

### Kapasitet

Umiddelbar varsling er **ikke optimalisert for høyt volum**:

- Designet for **enkeltstående, tidskritiske meldinger**, ikke masseutsendelser
- Ment for varsler til enkeltmottakere som krever umiddelbar sending
- Ved høye volum eller masseutsendelser bør du bruke vanlige varslingsordre i stedet


## Neste steg

- Les [veiledningen for umiddelbar varsling](/nb/notifications/guides/instant-notifications/) for å lære hvordan du implementerer umiddelbar varsling i din tjeneste
- Utforsk [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for tekniske spesifikasjonsdetaljer
