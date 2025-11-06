---
title: "Instant messaging"
description: "Hva instant messaging er i Altinn Notifications og hvordan bruke det, med fokus på OTP-brukstilfeller og tekniske krav."
linktitle: "Instant messaging"
tags: [notifications, instant-messaging, otp]
weight: 30
---

## Introduksjon

Denne siden forklarer hva "instant messaging" i Altinn Notifications betyr, hvilke scenarier det passer for, og hvordan eksterne utviklere kan bruke funksjonaliteten, spesielt for One-Time Passwords (OTP).

## Hva er instant messaging?

Instant messaging i Altinn Notifications er en leveringsmekanisme for kortvarige, høy-prioritets meldinger som krever rask levering og ofte en bekreftelse eller handling fra mottakeren. Tjenesten er optimalisert for meldinger som:

- Krever rask levering (sekunder til få minutter)
- Er kortvarige og tidskritiske (for eksempel OTP)
- Har et begrenset livssyklus

## Typiske bruksområder

### One-Time Passwords (OTP)

OTP er et vanlig bruksområde for instant messaging. Når en applikasjon trenger å sende en kort kode for autentisering eller verifisering, gir instant messaging lav ventetid og høy leveringsprioritet.

### Varsler med høy prioritet

Andre eksempler inkluderer sikkerhetsvarsler, sanntidsoppdateringer og kritiske systemmeldinger.

## Tekniske krav og begrensninger

### Meldingsstørrelse og format

- Meldinger bør være korte (for eksempel under 160 tegn for SMS-lignende levering).
- Støttede formater: ren tekst. Eventuelle HTML-/rich-text-funksjoner er ikke garantert.

### Leveringsgaranti og backoff

- Instant messaging prioriteres i køen, men leveringsgarantier avhenger av underliggende transport (f.eks. SMS-leverandør).
- For OTP anbefales kortere TTL (time-to-live) og logikk for å unngå gjenbruk av koder.

### Rate limits

- Tjenesten kan ha rate limits per avsender for å forhindre misbruk. Kontakt teamet for nøyaktige tall.

## Eksempel: OTP-flow

1. Brukeren initierer en autentiseringsforespørsel i applikasjonen.
2. Applikasjonen kaller Notifications API for å opprette en instant messaging-melding med OTP-kode.
3. Notifications-ruting leverer meldingen via valgt kanal (for eksempel SMS).
4. Applikasjonen validerer OTP når brukeren oppgir koden.

```yaml
# Eksempel på payload (for illustrasjon)
# Felt og navn kan variere med API-spesifikasjonen
{
  "type": "instant",
  "channel": "sms",
  "to": "+47XXXXXXXX",
  "body": "Din kode er 123456. Den utløper om 5 minutter."
}
```

## Sikkerhet og personvern

- Unngå å inkludere sensitiv informasjon i meldinger.
- OTP-koder bør være korte-lived og unike.

## Begrensninger og anbefalinger

- Bruk instant messaging kun for tidskritiske meldinger.
- Test levering i relevante geografiske områder og med målte leverandører.

## Referanser

- Se også API-spesifikasjonen: [Notifications API reference](../../reference/)
- Se tilhørende swagger-oppdatering (issue #1077)

