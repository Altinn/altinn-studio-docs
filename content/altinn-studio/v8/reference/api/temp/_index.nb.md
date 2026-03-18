---
title: Varsling
description: Hvordan ta i bruk eksperimentelle pakker for varsling ved instansiering
weight: 50
---

Dette dokumentet beskriver sending av varsler til instanseier når en instans opprettes. Her er en oversikt over funksjonaliteten og hvordan du kan prøve den ut.

Varsel ved instansiering er kun tilgjengelig i eksperimentelle pakker. Det vil si at pakkene er ment for testing.

## Eksperimentelle pakker

NuGet-pakkene er `Altinn.App.Api.Experimental` og `Altinn.App.Core.Experimental`, versjon `8.11.0-pr.4732.instantiation-notif-callback.0a231569`.

## Hva er nytt?

Det er lagt til et nytt felt, `notification`, i request-bodyen til `POST /instances/create` og `POST /instances` (multipart). Dette feltet lar deg spesifisere hvilken kanal varselet skal sendes på, eventuelt egendefinerte tekster, planlagt sendetid og påminnelser.

## Slik fungerer det

### Felter i notification-objektet

#### InstantiationNotification

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| notificationChannel | int (enum) | Nei | Kanal for utsending. Standard: 4 (EmailAndSms). Se tabell under for gyldige verdier. |
| language | string | Nei | Språkkode (nb, nn, en). Brukes kun for organisasjoner – privatpersoner bruker profilspråk. |
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending (ISO 8601, UTC). Hvis ikke satt, sendes varselet så snart som mulig. |
| allowSendingAfterWorkHours | bool | Nei | Tillater utsending utenom arbeidstid. Standard: false (kun dagtid). |
| customSms | objekt | Nei | Egendefinert SMS-tekst og avsendernavn. Hvis ikke satt, brukes standardtekst. |
| customEmail | objekt | Nei | Egendefinert e-postemne og brødtekst. Hvis ikke satt, brukes standardtekst. |
| reminders | liste | Nei | Liste med påminnelser som kan sendes etter hovedvarselet. |

#### customSms

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| senderName | string | Ja | Avsendernavn som vises i SMS-en. |
| text | CustomText | Ja | Egendefinert SMS-tekst på nb, nn og en. |

#### customEmail

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| subject | CustomText | Ja | Egendefinert emne på nb, nn og en. |
| body | CustomText | Ja | Egendefinert brødtekst på nb, nn og en. |

#### CustomText

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| nb | string | Ja | Tekst på norsk bokmål. |
| nn | string | Ja | Tekst på norsk nynorsk. |
| en | string | Ja | Tekst på engelsk. |

#### reminders (liste av påminnelsesobjekter)

Hvert objekt i `reminders`-listen kan inneholde følgende felter:

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending av påminnelsen (ISO 8601, UTC). |
| sendAfterDays | int | Nei | Antall dager etter hovedvarselet før påminnelsen sendes. Kan ikke kombineres med requestedSendTime. |
| customSms | objekt | Nei | Overstyrer SMS-teksten fra hovedvarselet for denne påminnelsen. |
| customEmail | objekt | Nei | Overstyrer e-postteksten fra hovedvarselet for denne påminnelsen. |

Hvis verken `requestedSendTime` eller `sendAfterDays` er satt, sendes påminnelsen så snart som mulig etter at hovedvarselet er behandlet.

Hvis ingen egendefinerte tekster er oppgitt på påminnelsen, arves tekstene fra hovedvarselet.

### Kanalvalg (notificationChannel)

Merk at `notificationChannel` er en integer-enum, ikke en streng. Gyldige verdier er:

| Verdi | Kanal | Beskrivelse |
|---|---|---|
| 0 | Email | Kun e-post |
| 1 | Sms | Kun SMS |
| 2 | EmailPreferred | E-post først, SMS som fallback hvis mottaker mangler e-postadresse |
| 3 | SmsPreferred | SMS først, e-post som fallback hvis mottaker mangler telefonnummer |
| 4 | EmailAndSms | Både e-post og SMS sendes samtidig (standard) |

### Språk

For privatpersoner hentes språket automatisk fra profilen deres i Altinn.
For organisasjoner brukes språket oppgitt i instansieringsforespørselen (`language`-feltet i `notification`-objektet), med norsk bokmål som fallback.

### Sendetidspunkt

Som standard sendes varsler kun i arbeidstiden. Hvis du ønsker å tillate utsending når som helst på døgnet, kan du sette `allowSendingAfterWorkHours` til `true`. Dette gjelder både e-post og SMS.

### Planlagt sendetid

Hvis `requestedSendTime` er satt, vil varselet ikke sendes før dette tidspunktet. I tillegg vil Altinn Notifications kalle tilbake til appen rett før utsending for å bekrefte at varselet fortsatt er relevant. Appen kan da avvise utsendingen dersom tilstanden har endret seg — for eksempel hvis instansen allerede er innsendt.

Hvis `requestedSendTime` ikke er satt, sendes varselet så snart som mulig (typisk innen noen minutter).

### Egendefinert avbestillingslogikk

Når `requestedSendTime` er satt, vil Altinn Notifications kalle tilbake til appen før hvert varsel og hver påminnelse sendes. Som standard sendes varselet kun hvis prosessen ikke er avsluttet — det vil si at instansen fortsatt er aktiv og venter på svar fra bruker.

Du kan overstyre denne oppførselen ved å implementere `ICancelInstantiationNotification`-grensesnittet og registrere det i DI-containeren:

```csharp
public class MyNotificationCancellation : ICancelInstantiationNotification
{
    public bool ShouldSend(Instance instance)
    {
        // Send kun varselet hvis instansen ikke er arkivert
        return instance.Status?.IsArchived is not true;
    }
}
```

Registrer implementasjonen i `Program.cs`:

```csharp
services.AddTransient<ICancelInstantiationNotification, MyNotificationCancellation>();
```

### Standardtekster

Hvis du ikke oppgir egendefinerte tekster, brukes standardtekster.

Eksempel på mottatt e-post med standardtekst:

**Emne:** Nytt skjema opprettet i Altinn

**Brødtekst:** Testdepartementet har opprettet et nytt skjema (varsel-instansiering-ttd) for ASTROLOG NÆR med fødselsnummer 54928201018 - åpne innboksen i Altinn for å se skjemaet.

### Egendefinerte tekster og tokens

Egendefinerte tekster støtter følgende tokens som erstattes dynamisk:

| Token | Beskrivelse |
|---|---|
| $appName$ | Appens navn fra app-metadata |
| $instanceOwnerName$ | Navn på instanseier |
| $serviceOwnerName$ | Navn på tjenesteeier fra Altinn CDN |
| $orgNumber$ | Organisasjonsnummer (hvis instanseier er org) |
| $socialSecurityNumber$ | Fødselsnummer (hvis instanseier er person) |
| $dueDate$ | Frist for instansen (format: dd-MM-yyyy) |

### Hvordan utledes mottakeradresse(r)?

Altinn Notifications tar seg av dette basert på Altinn Profil for enkeltpersoner og register for organisasjoner.

I testmiljøer kan kontaktopplysninger endres for testing på <https://tt02.altinn.no/ui/Profile>.

For test av SMS i et testmiljø må nummeret hvitelistes. Ta kontakt dersom dette er ønskelig.

## Eksempler

### Enkelt eksempel på en instansopprettelse med varsel

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

### Eksempel med egendefinerte tekster

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

### Eksempel med planlagt sendetid og utsending utenom arbeidstid

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0,
    "requestedSendTime": "2025-12-01T09:00:00Z",
    "allowSendingAfterWorkHours": true
  }
}
```

### Eksempel med påminnelser

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 0,
    "requestedSendTime": "2025-12-01T09:00:00Z",
    "reminders": [
      {
        "sendAfterDays": 7
      },
      {
        "sendAfterDays": 14,
        "customEmail": {
          "subject": {
            "nb": "Påminnelse: $appName$ venter på deg",
            "nn": "Påminning: $appName$ ventar på deg",
            "en": "Reminder: $appName$ is waiting for you"
          },
          "body": {
            "nb": "Hei $instanceOwnerName$, vi minner om at $appName$ fortsatt venter på svar.",
            "nn": "Hei $instanceOwnerName$, vi minner om at $appName$ framleis ventar på svar.",
            "en": "Hello $instanceOwnerName$, we would like to remind you that $appName$ is still awaiting your response."
          }
        }
      }
    ]
  }
}
```

### Selvidentifisert bruker

```json
{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:legacy-selfidentified:jensjensen"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

```json
{
  "instanceOwner": {
    "username": "epost:jens.jensen@digdir.no"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```
