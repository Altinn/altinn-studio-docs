---
title: Feilkoder
linktitle: Feilkoder
description: Referanse for Altinn Notifications API feilkoder
weight: 20
toc: true
---

Denne siden gir en omfattende referanse for alle spesifikke feilkoder som returneres av Altinn Notifications API.

## Feilkodeformat

Altinn Notifications API bruker to typer feilkoder:

### Forretningsfeil
Format: `NOT-XXXXX` hvor `NOT` står for Notifications og `XXXXX` er et femsifret nummer.

Disse feilkodene returneres i `code`-feltet i problemdetaljrespons for forretningslogikkfeil (f.eks. manglende kontaktinformasjon, ressurs ikke funnet).

### Valideringsfeil
Format: `NOT.VLD-XXXXX` hvor `VLD` indikerer en valideringsfeil.

Valideringsfeil returneres når forespørselen inneholder ugyldig data. Responsen inneholder:
- En overordnet `code` med verdi `STD-00000`
- Et `validationErrors`-array med individuelle valideringsfeil, hver med sin egen `code`

**Eksempelrespons for valideringsfeil:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Bad Request",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "code": "STD-00000",
  "validationErrors": [
    {
      "code": "NOT.VLD-00001",
      "detail": "IdempotencyId cannot be null or empty.",
      "paths": ["IdempotencyId"]
    },
    {
      "code": "NOT.VLD-00010",
      "detail": "The requested send time value must have specified a time zone.",
      "paths": ["RequestedSendTime"]
    }
  ]
}
```

Disse feilkodene er definert ved hjelp av [RFC 7807](https://tools.ietf.org/html/rfc7807) (Problem Details for HTTP APIs), som gir maskinlesbar feilidentifikasjon.

## Feilkoder

### NOT-00001: Manglende kontaktinformasjon

**HTTP-statuskode:** 422 Unprocessable Entity

**Beskrivelse:** API-et kunne ikke behandle varslingsordren fordi én eller flere mottakere ikke har nødvendig kontaktinformasjon tilgjengelig for Altinn.

**Vanlige årsaker:**
- Mottakeren har ikke registrert en e-postadresse eller et telefonnummer
- Mottaker har registrert kontaktinformasjon, men den er ikke gyldig eller verifisert
- For organisasjonsmottakere kan det hende at organisasjonen ikke har registrert kontaktdetaljer

**Berørte endepunkter:**
- `POST /future/orders` - Oppretting av varslingordrer med mottakeroppslag

**Eksempelrespons:**
```json
{
  "status": 422,
  "code": "NOT-00001",
  "detail": "Missing contact information for recipient(s)"
}
```

**Løsning:**
- Verifiser at mottakerens fødselsnummer eller organisasjonsnummer er riktig
- Be mottakeren registrere sin kontaktinformasjon for å gjøre den tilgjengelig for Altinn
- For umiddelbare varsler, vurder å bruke de direkte `emailAddress`- eller `phoneNumber`-feltene i stedet for å stole på mottakeroppslag

---

### NOT-00002: Forespørsel avbrutt av klient

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
  "status": 499,
  "code": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing"
}
```

**Løsning:**

Hvis du får mange timeouts og lignende typer feil:
- Øk timeout-innstillingen i HTTP-klienten din
- Sjekk nettverkstilkobling og stabilitet
- Implementer retry-logikk ved å bruke samme `idempotencyId` for å trygt prøve forespørselen på nytt
- Hvis problemet vedvarer, kontakt Altinn support

{{% notice info %}}
Denne feilen er ikke forventet under normal drift. Feilen indikerer at klienten koblet fra eller avbrøt forespørselen før serveren kunne fullføre behandlingen, noe som betyr at klienten ikke lenger har en aktiv tilkobling for å motta responsen.
{{% /notice %}}
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
  "status": 404,
  "code": "NOT-00003",
  "detail": "Shipment not found"
}
```

**Løsning:**
- Verifiser at forsendelses-ID-en er korrekt og riktig formatert som en GUID
- Forsikre deg om at du spør i riktig miljø (test eller produksjon)
- Verifiser at den autentiserte organisasjonen har tilgang til forsendelsen
- Sjekk at forsendelsen ble vellykket opprettet før du prøver å hente den

---

## Valideringsfeilkoder

Følgende tabell viser alle valideringsfeilkoder som kan returneres av API-et. Disse returneres i `validationErrors`-arrayet i responsen.

### Grunnleggende forespørselsvalidering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00001` | IdempotencyId kan ikke være null eller tom |

### Sendetidsvalidering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00010` | Ønsket sendetid må ha spesifisert tidssone |
| `NOT.VLD-00011` | Sendetid kan ikke være i fortiden |

### Betingelsesendepunkt-validering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00020` | ConditionEndpoint må være en gyldig absolutt URI eller null |
| `NOT.VLD-00021` | ConditionEndpoint må bruke http eller https-skjema |

### Mottakervalidering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00030` | Må ha nøyaktig én mottaker |
| `NOT.VLD-00031` | Mottakerspesifikasjon kan ikke være null |
| `NOT.VLD-00032` | Én eller flere mottakere er påkrevd |
| `NOT.VLD-00033` | Ugyldig e-postadresseformat |
| `NOT.VLD-00034` | Ugyldig avsender-e-postadresseformat |
| `NOT.VLD-00035` | Mobilnummer kan kun inneholde '+' og numeriske tegn, og må følge E.164-standarden |
| `NOT.VLD-00036` | Fødselsnummer må være 11 siffer |
| `NOT.VLD-00037` | Organisasjonsnummer må være 9 siffer |
| `NOT.VLD-00038` | OrgNumber kan ikke være null eller tom |
| `NOT.VLD-00039` | ResourceId må ha gyldig syntaks |
| `NOT.VLD-00040` | Fødselsnummer kan ikke kombineres med andre identifikatorer |
| `NOT.VLD-00041` | Organisasjonsnummer kan ikke kombineres med andre identifikatorer |
| `NOT.VLD-00042` | Mottaker mangler kontaktinformasjon for foretrukket kanal |
| `NOT.VLD-00043` | Mottaker mangler kontaktinformasjon for SMS-kanal |
| `NOT.VLD-00044` | Mottaker mangler kontaktinformasjon for e-postkanal |

### E-postinnstillinger-validering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00050` | E-postsendingsalternativer kan ikke være null |
| `NOT.VLD-00051` | E-postemne kan ikke være tomt |
| `NOT.VLD-00052` | E-postinnhold kan ikke være tomt |
| `NOT.VLD-00053` | E-postinnholdstype må være enten Plain eller HTML |
| `NOT.VLD-00054` | E-post støtter kun sendetidspolicy «Anytime» |

### SMS-innstillinger-validering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00060` | SMS-innhold kan ikke være null eller tomt |
| `NOT.VLD-00061` | SMS støtter kun sendetidspolicy «Daytime» og «Anytime» |

### Påminnelsesvalidering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00070` | Enten DelayDays eller RequestedSendTime må være definert, men ikke begge |
| `NOT.VLD-00071` | DelayDays må være minst 1 dag |
| `NOT.VLD-00072` | RequestedSendTime må være null når DelayDays er satt |
| `NOT.VLD-00073` | DelayDays må være null når RequestedSendTime er satt |
| `NOT.VLD-00074` | Påminnelsens sendetid må ha spesifisert tidssone |
| `NOT.VLD-00075` | Påminnelsens sendetid kan ikke være i fortiden |

### Kanalskjema-validering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00080` | Ugyldig kanalskjemaverdi |
| `NOT.VLD-00081` | EmailSettings må settes når ChannelSchema er EmailAndSms |
| `NOT.VLD-00082` | SmsSettings må settes når ChannelSchema er EmailAndSms |
| `NOT.VLD-00083` | EmailSettings må settes når ChannelSchema er SmsPreferred eller EmailPreferred |
| `NOT.VLD-00084` | SmsSettings må settes når ChannelSchema er SmsPreferred eller EmailPreferred |
| `NOT.VLD-00085` | SmsSettings må settes når ChannelSchema er Sms |
| `NOT.VLD-00086` | EmailSettings må settes når ChannelSchema er Email |

### Statusfeed-validering

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00090` | Sekvensnummer kan ikke være mindre enn 0 |

### Dialogporten-validering

Disse valideringene kontrollerer kun at GUID-formatet er korrekt. Det gjøres ingen verifisering mot Dialogporten for å sjekke om dialogen eller forsendelsen faktisk eksisterer.

| Kode | Beskrivelse |
|------|-------------|
| `NOT.VLD-00100` | DialogId må være en gyldig ikke-tom GUID |
| `NOT.VLD-00101` | TransmissionId må være en gyldig ikke-tom GUID |

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

## Relaterte ressurser

- [Veiledning for umiddelbare varsler](/nb/notifications/guides/instant-notifications/)
- [Altinn Notifications API-referanse](/nb/notifications/reference/api/)
- [OpenAPI-spesifikasjon](/nb/notifications/reference/openapi/)
