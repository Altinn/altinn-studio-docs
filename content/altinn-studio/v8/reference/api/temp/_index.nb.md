---
title: Varsling
description: Hvordan ta i bruk eksperimentelle pakker for varsling ved instansiering
weight: 50
---

Dette dokumentet beskriver sending av varsler til instanseier når en instans opprettes. Her er en oversikt over funksjonaliteten og hvordan du kan prøve den ut.

{{% notice warning %}}
Varsel ved instansiering er kun tilgjengelig i eksperimentelle pakker. Det vil si at pakkene er ment for testing.
{{% /notice %}}

## Eksperimentelle pakker

NuGet-pakkene er Altinn.App.Api.Experimental og Altinn.App.Core.Experimental, versjon 8.11.0-pr.4620.instantiation-notification-api-approach.1c43a2d4.

## Hva er nytt?

Det er lagt til et nytt felt, `notification`, i request-bodyen til POST /instances/create og POST /instances (multipart). Dette feltet lar deg spesifisere hvilken kanal varselet skal sendes på, og eventuelt egendefinerte tekster.

## Slik fungerer det

### Felter i `notification`-objektet

**`InstansiationNotification`**

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| `notificationChannel` | int (enum) | Nei | Kanal for utsending. Standard: `4` (EmailAndSms). Se tabell over for gyldige verdier. |
| `language` | string | Nei | Språkkode (`nb`, `nn`, `en`). Brukes kun for organisasjoner – privatpersoner bruker profilspråk. |
| `customSms` | objekt | Nei | Egendefinert SMS-tekst og avsendernavn. Hvis ikke satt, brukes standardtekst. |
| `customEmail` | objekt | Nei | Egendefinert e-postemne og brødtekst. Hvis ikke satt, brukes standardtekst. |

**`customSms`**

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| `senderName` | string | Ja | Avsendernavn som vises i SMS-en. |
| `text` | CustomText | Ja | Egendefinert SMS-tekst på nb, nn og en. |

**`customEmail`**

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| `subject` | CustomText | Ja | Egendefinert emne på nb, nn og en. |
| `body` | CustomText | Ja | Egendefinert brødtekst på nb, nn og en. |

**`CustomText`**

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| `nb` | string | Ja | Tekst på norsk bokmål. |
| `nn` | string | Ja | Tekst på norsk nynorsk. |
| `en` | string | Ja | Tekst på engelsk. |

### Kanalvalg (`notificationChannel`)

Merk at `notificationChannel` er en integer-enum, ikke en streng. Gyldige verdier er:

| Verdi | Kanal | Beskrivelse |
|---|---|---|
| `0` | Email | Kun e-post |
| `1` | Sms | Kun SMS |
| `2` | EmailPreferred | E-post først, SMS som fallback hvis mottaker mangler e-postadresse |
| `3` | SmsPreferred | SMS først, e-post som fallback hvis mottaker mangler telefonnummer |
| `4` | EmailAndSms | Både e-post og SMS sendes samtidig (standard) |

### Språk

- For privatpersoner hentes språket automatisk fra profilen deres i Altinn.
- For organisasjoner brukes språket oppgitt i instansieringsforespørselen (`language`-feltet i `notification`-objektet), med norsk bokmål som fallback.

### Standardtekster

Hvis du ikke oppgir egendefinerte tekster, brukes standardtekster.

Eksempel på mottatt e-post med standardtekst:

*Emne:* Nytt skjema opprettet i Altinn

*Brødtekst:* Testdepartementet har opprettet et nytt skjema (varsel-instansiering-ttd) for ASTROLOG NÆR med fødselsnummer 54928201018 - åpne innboksen i Altinn for å se skjemaet.

## Egendefinerte tekster og tokens

Egendefinerte tekster støtter følgende tokens som erstattes dynamisk:

| Token | Beskrivelse |
|---|---|
| `$appName$` | Appens navn fra app-metadata |
| `$instanceOwnerName$` | Navn på instanseier |
| `$serviceOwnerName$` | Navn på tjenesteeier fra Altinn CDN |
| `$orgNumber$` | Organisasjonsnummer (hvis instanseier er org) |
| `$socialSecurityNumber$` | Fødselsnummer (hvis instanseier er person) |
| `$dueDate$` | Frist for instansen (format: dd-MM-yyyy) |

## Hvordan utledes mottakeradresse(r)?

Altinn Notifications tar seg av dette basert på Altinn Profil for enkeltpersoner og register for organisasjoner.

I testmiljøer kan kontaktopplysninger endres for testing på https://tt02.altinn.no/ui/Profile.

For test av SMS i et testmiljø må nummeret hvitelistes. Ta kontakt dersom dette er ønskelig.

## Enkelt eksempel på en instansopprettelse med varsel

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

Eksempel med egendefinerte tekster:

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 4,
    "customSms": {
      "senderName": "MinOrg",
      "text": {
        "nb": "$appName$ er klar for $instanceOwnerName$",
        "nn": "$appName$ er klar for $instanceOwnerName$",
        "en": "$appName$ is ready for $instanceOwnerName$"
      }
    },
    "customEmail": {
      "subject": {
        "nb": "$appName$ - ny instans opprettet",
        "nn": "$appName$ - ny instans oppretta",
        "en": "$appName$ - new instance created"
      },
      "body": {
        "nb": "Hei $instanceOwnerName$, en ny instans av $appName$ er opprettet for deg.",
        "nn": "Hei $instanceOwnerName$, ei ny instans av $appName$ er oppretta for deg.",
        "en": "Hello $instanceOwnerName$, a new instance of $appName$ has been created for you."
      }
    }
  }
}
```

## Merk

Dette er første preview. Støtte for planlagt sendetid, påminnelser og egendefinert avbestillingslogikk kommer i senere leveranser.
