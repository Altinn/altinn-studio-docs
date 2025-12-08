---
title: Feilkoder
linktitle: Feilkoder
description: Referanse for Altinn Notifications API feilkoder
weight: 20
toc: true
---

Denne siden gir en omfattende referanse for alle spesifikke feilkoder som returneres av Altinn Notifications API.

## Feilkodeformat

Altinn Notifications API bruker unike feilkoder i formatet `NOT-XXXXX` hvor `NOT` står for Notifications og `XXXXX` er et femsifret nummer.

Disse feilkodene returneres i `errorCode`-feltet i problemdetaljrespons når en feil oppstår.

## Feilkoder

### NOT-00001: Manglende kontaktinformasjon

**HTTP-statuskode:** 422 Unprocessable Entity

**Beskrivelse:** API-et kunne ikke behandle varslingordren fordi en eller flere mottakere ikke har påkrevd kontaktinformasjon registrert i Altinn.

**Vanlige årsaker:**
- Mottaker har ikke registrert e-postadresse eller telefonnummer i sin Altinn-profil
- Mottaker har registrert kontaktinformasjon, men den er ikke gyldig eller verifisert
- For organisasjonsmottakere kan det hende at organisasjonen ikke har registrert kontaktdetaljer

**Berørte endepunkter:**
- `POST /future/orders` - Oppretting av varslingordrer med mottakeroppslag
- `POST /future/orders/instant/sms` - Når man bruker fødselsnummer i stedet for direkte telefonnumre
- `POST /future/orders/instant/email` - Når man bruker fødselsnummer i stedet for direkte e-postadresser

**Eksempelrespons:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.23",
  "title": "Unprocessable Entity",
  "status": 422,
  "errorCode": "NOT-00001",
  "detail": "Missing contact information for recipient(s)",
  "instance": "/future/orders"
}
```

**Løsning:**
- Verifiser at mottakerens fødselsnummer eller organisasjonsnummer er korrekt
- Be mottakeren logge inn i Altinn og registrere sin kontaktinformasjon
- For umiddelbare varsler, vurder å bruke de direkte `emailAddress`- eller `phoneNumber`-feltene i stedet for å stole på mottakeroppslag

---

### NOT-00002: Forespørsel avbrutt

**HTTP-statuskode:** 499 Client Closed Request

**Beskrivelse:** Klienten koblet fra eller kansellerte forespørselen før serveren kunne fullføre behandlingen. Dette er en ikke-standard HTTP-statuskode (499) som ofte brukes for å indikere at klienten lukket tilkoblingen for tidlig.

**Vanlige årsaker:**
- Timeout på klientsiden oppstod
- Nettverkstilkoblingen ble avbrutt
- Bruker kansellerte operasjonen
- Applikasjonen avsluttet HTTP-forespørselen

**Berørte endepunkter:**
- Alle API-endepunkter (ethvert endepunkt kan motta denne feilen hvis klienten kobler fra)

**Eksempelrespons:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Client Closed Request",
  "status": 499,
  "errorCode": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing",
  "instance": "/future/orders/instant/sms"
}
```

**Løsning:**
- Øk timeout-innstillingen i HTTP-klienten din (anbefalt: 10-15 sekunder for umiddelbare varsler)
- Sjekk nettverkstilkobling og stabilitet
- Implementer retry-logikk ved å bruke samme `idempotencyId` for å trygt prøve forespørselen på nytt
- Hvis problemet vedvarer, kontakt Altinn support

---

### NOT-00003: Forsendelse ikke funnet

**HTTP-statuskode:** 404 Not Found

**Beskrivelse:** Den forespurte forsendelsen (varslingordre) ble ikke funnet. Dette kan oppstå når forsendelses-ID-en ikke eksisterer eller når den forespørrende organisasjonen ikke har tilgang til forsendelsen.

**Vanlige årsaker:**
- Forsendelses-ID-en (GUID) eksisterer ikke i systemet
- Forsendelsen ble opprettet av en annen organisasjon
- Forsendelses-ID-en er feilformatert eller ugyldig
- Forsendelsen kan ha blitt opprettet i et annet miljø (f.eks. test vs. produksjon)

**Berørte endepunkter:**
- `GET /future/shipment/{id}` - Henting av leveringsmanifest for en varslingordre

**Eksempelrespons:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
  "title": "Not Found",
  "status": 404,
  "errorCode": "NOT-00003",
  "detail": "Shipment not found",
  "instance": "/future/shipment/3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

**Løsning:**
- Verifiser at forsendelses-ID-en er korrekt og riktig formatert som en GUID
- Forsikre deg om at du spør i riktig miljø (test eller produksjon)
- Verifiser at den autentiserte organisasjonen har tilgang til forsendelsen
- Sjekk at forsendelsen ble vellykket opprettet før du prøver å hente den

---

## Generelle HTTP-statuskoder

I tillegg til de spesifikke feilkodene ovenfor returnerer API-et også standard HTTP-statuskoder:

| Statuskode | Beskrivelse |
|------------|-------------|
| `200 OK` | Forespørselen var vellykket |
| `201 Created` | Ressursen ble vellykket opprettet |
| `400 Bad Request` | Forespørselen er feilformatert eller inneholder ugyldige data |
| `401 Unauthorized` | Autentisering er påkrevd eller har feilet |
| `403 Forbidden` | Den autentiserte brukeren/organisasjonen har ikke tillatelse til å få tilgang til ressursen |
| `500 Internal Server Error` | En uventet feil oppstod på serveren |

## Beste praksis

1. **Sjekk alltid `errorCode`-feltet**: Når du mottar en feilrespons, undersøk `errorCode`-feltet i problemdetaljresponsen for å forstå det spesifikke problemet.

2. **Implementer riktig feilhåndtering**: Applikasjonen din bør håndtere hver feilkode på riktig måte:
   - For `NOT-00001`: Informer brukeren om manglende kontaktinformasjon og gi veiledning om hvordan man registrerer den
   - For `NOT-00002`: Implementer retry-logikk med passende timeouts
   - For `NOT-00003`: Valider forsendelses-ID-en før du gjør forespørselen

3. **Logg feildetaljer**: Logg alltid hele feilresponsen inkludert `errorCode`, `detail` og `instance`-feltene for feilsøkingsformål.

4. **Bruk idempotens**: For POST-forespørsler, bruk alltid en unik `idempotencyId` for å muliggjøre trygge nye forsøk ved nettverksfeil eller timeouts.

## Relaterte ressurser

- [Veiledning for umiddelbare varsler](/nb/notifications/guides/instant-messaging/)
- [Altinn Notifications API-referanse](/nb/notifications/reference/api/)
- [OpenAPI-spesifikasjon](/nb/notifications/reference/openapi/)
