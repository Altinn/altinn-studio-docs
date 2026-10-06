---
draft: true
title: Varsling ved instansiering
linktitle: Varsling
description: Slik varsler du instanseieren når du oppretter en instans gjennom API-et
toc: true
tags: [needsReview]
---

Når du oppretter en instans gjennom API-et, kan du be appen varsle instanseieren på e-post eller SMS. Denne siden beskriver hvordan du bestiller varselet, og hvordan appen avbestiller det når det ikke lenger trengs.

## Oversikt

Du bestiller varselet med feltet `notification` i forespørselen til `POST /instances/create` og `POST /instances` (multipart). Der velger du hvilken kanal varselet skal sendes på, og eventuelt egendefinerte tekster, planlagt sendetid og påminnelser.

Appen bestiller varselet i bakgrunnen etter at instansen er opprettet. Mislykkes bestillingen, prøver appen på nytt, og instansen påvirkes ikke. Et ugyldig `notification`-objekt avviser hele forespørselen.

## Slik fungerer det

### Felter i notification-objektet

#### InstantiationNotification

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| notificationChannel | int (enum) | Nei | Kanal for utsending. Standard: 4 (EmailAndSms). Se tabell under for gyldige verdier. |
| language | string | Nei | Språkkode (nb, nn, en). Brukes kun for organisasjoner – privatpersoner bruker profilspråk. |
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending (ISO 8601, UTC). Hvis ikke satt, sendes varselet så snart som mulig. Maks utsettelse er 30 dager. |
| allowSendingAfterWorkHours | bool | Nei | Tillater utsending utenom arbeidstid. Standard: false (kun dagtid). Gjelder kun for SMS. E-post sendes uavhengig av tidspunkt. |
| customSms | objekt | Nei | Egendefinert SMS-tekst og avsendernavn. Hvis ikke satt, brukes standardtekst. |
| customEmail | objekt | Nei | Egendefinert e-postemne og brødtekst. Hvis ikke satt, brukes standardtekst. |
| reminders | liste | Nei | Liste med påminnelser som kan sendes etter hovedvarselet. |

#### customSms

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| senderName | string | Ja | Avsendernavn som vises i SMS-en. Maks 11 tegn. |
| text | CustomText | Ja | Egendefinert SMS-tekst på nb, nn og en. |

Hvis avsendernavnet er beskyttet med en tjeneste som SenderID, må du godkjenne Digitaliseringsdirektoratet som meldingsprodusent.

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
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending av påminnelsen (ISO 8601, UTC). Kan ikke kombineres med `sendAfterDays`. Maks utsettelse er 30 dager. |
| sendAfterDays | int | Nei | Antall dager etter hovedvarselet før påminnelsen sendes. Kan ikke kombineres med `requestedSendTime`. Maks utsettelse er 30 dager. |
| customSms | objekt | Nei | Overstyrer SMS-teksten fra hovedvarselet for denne påminnelsen. |
| customEmail | objekt | Nei | Overstyrer e-postteksten fra hovedvarselet for denne påminnelsen. |

Hvis verken `requestedSendTime` eller `sendAfterDays` er satt, sendes påminnelsen så snart som mulig etter at hovedvarselet er behandlet.

Hvis ingen egendefinerte tekster er oppgitt på påminnelsen, arves tekstene fra hovedvarselet.

Påminnelser avbestilles på samme måte som hovedvarselet, se [Avbestilling av varsler](#avbestilling-av-varsler).

### Kanalvalg (notificationChannel)

`notificationChannel` er et tall, ikke en streng. Gyldige verdier er:

| Verdi | Kanal | Beskrivelse |
|---|---|---|
| 0 | Email | Kun e-post |
| 1 | Sms | Kun SMS |
| 2 | EmailPreferred | E-post først, SMS som fallback hvis mottaker mangler e-postadresse |
| 3 | SmsPreferred | SMS først, e-post som fallback hvis mottaker mangler telefonnummer |
| 4 | EmailAndSms | Både e-post og SMS sendes samtidig (standard) |

For selvidentifiserte brukere (instanseier med `externalIdentifier`) brukes alltid `EmailPreferred`.

### Språk

- For privatpersoner hentes språket automatisk fra profilen deres i Altinn, med norsk bokmål som fallback.
- For selvidentifiserte brukere hentes språket fra profilen deres i Altinn, med engelsk som fallback.
- For organisasjoner brukes språket oppgitt i instansieringsforespørselen (`language`-feltet i `notification`-objektet), med norsk bokmål som fallback.

### Sendetidspunkt

Som standard sendes SMS-varsler kun i arbeidstiden. Vil du tillate utsending hele døgnet, setter du `allowSendingAfterWorkHours` til `true`. E-post sendes uavhengig av tidspunkt.

### Planlagt sendetid

Hvis `requestedSendTime` er satt, sendes ikke varselet før dette tidspunktet.

Hvis `requestedSendTime` ikke er satt, sendes varselet så snart som mulig (typisk innen noen minutter).

### Avbestilling av varsler

Før hovedvarselet og hver påminnelse sendes, spør Altinn Notifications appen om varselet fortsatt skal sendes, ved hjelp av en [sendebetingelse](/nb/notifications/explanation/send-condition/). Appen svarer nei hvis instansen er slettet, eller – som standard – hvis prosessen er avsluttet.

Appen leser instansen som tjenesteeier med [den innebygde Maskinporten-klienten]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}). Scopene den trenger, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, får alle v9-apper automatisk når du publiserer appen. Autorisasjonspolicyen må også gi tjenesteeieren `read` og `write`. Regelen finnes i appmalen.

Hvis appen ikke får lest instansen, for eksempel på grunn av en midlertidig feil, prøver Altinn Notifications én gang til. Mislykkes også det forsøket, blir varselet sendt.

### Egendefinert avbestillingslogikk

Som standard sendes varselet bare så lenge prosessen ikke er avsluttet. Det er ikke nødvendigvis det samme som at skjemaet er sendt inn: Hvis prosessen har flere steg etter at brukeren er ferdig, kan varselet fortsatt bli sendt mens disse stegene pågår.

Du kan overstyre denne oppførselen ved å implementere grensesnittet `ICancelInstantiationNotification`. Implementasjonen kalles bare for instanser som finnes og ikke er slettet:

```csharp
public class MyNotificationCancellation : ICancelInstantiationNotification
{
    public bool ShouldSend(Instance instance)
    {
        // Egendefinert logikk her, f.eks.:
        // Send kun varselet hvis instansen ikke er arkivert
        return instance.Status?.IsArchived is not true;
    }
}
```

Registrer implementasjonen i `Program.cs`:

```csharp file=Program.cs
using Altinn.App.Core.Features.Notifications.Cancellation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<ICancelInstantiationNotification, MyNotificationCancellation>();
}
```

### Standardtekster

Hvis du ikke oppgir egendefinerte tekster, brukes standardtekster. Standardteksten for SMS er den samme som brødteksten i standard-e-posten.

Eksempel på mottatt e-post med standardtekst:

**Emne:** Nytt skjema opprettet i Altinn

**Brødtekst:** Testdepartementet har opprettet et nytt skjema (varsel-instansiering-ttd) for ASTROLOG NÆR med fødselsnummer 54928201018 - åpne innboksen i Altinn for å se skjemaet.

### Egendefinerte tekster og tokens

Egendefinerte tekster støtter følgende tokens som erstattes dynamisk:

| Token | Beskrivelse |
|---|---|
| `$appName$` | Appens navn, fra app-ID-en (`{org}/{app}`) |
| `$instanceOwnerName$` | Navn på instanseier |
| `$serviceOwnerName$` | Navn på tjenesteeier fra Altinn CDN |
| `$orgNumber$` | Organisasjonsnummer (hvis instanseier er org) |
| `$personNumber$` | Fødselsnummer (hvis instanseier er person). `$socialSecurityNumber$` fungerer også. |
| `$dueDate$` | Frist for instansen, i norsk tid (format: `dd-MM-yyyy HH:mm:ss`) |

### Slik finner Altinn Notifications mottakeren

Altinn Notifications henter kontaktopplysningene selv, fra Altinn Profil for privatpersoner og fra registeret for organisasjoner.

I testmiljøer kan kontaktopplysninger endres for testing på <https://tt02.altinn.no/ui/Profile>.

For å teste SMS i et testmiljø må nummeret hvitelistes. Ta kontakt hvis du trenger det.

## Eksempler

Hvert eksempel nedenfor vises for begge endepunktene:

- **`POST /{org}/{app}/instances/create`** — forenklet endepunkt. Hele forespørselen er ett JSON-objekt.
- **`POST /{org}/{app}/instances`** — multipart-endepunkt. `notification` må sendes som en egen multipart-part med `name="notification"` og `Content-Type: application/json`. Appen ignorerer uten feilmelding en `notification`-part uten `Content-Type: application/json`, og et `notification`-felt inni instance-template-parten.

Datoene i eksemplene er bare eksempler. `requestedSendTime` må ligge fram i tid, og høyst 30 dager fram.

### Enkelt eksempel på en instansopprettelse med varsel

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Eksempel med egendefinerte tekster

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
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
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Eksempel med planlagt sendetid og utsending utenom arbeidstid

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

```json
{
  "instanceOwner": {
    "personNumber": "54928201018"
  },
  "notification": {
    "notificationChannel": 1,
    "requestedSendTime": "2025-12-01T09:00:00Z",
    "allowSendingAfterWorkHours": true
  }
}
```

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 1,
  "requestedSendTime": "2025-12-01T09:00:00Z",
  "allowSendingAfterWorkHours": true
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Eksempel med påminnelser

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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
        "requestedSendTime": "2025-12-15T12:30:00Z",
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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "personNumber": "54928201018"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0,
  "requestedSendTime": "2025-12-01T09:00:00Z",
  "reminders": [
    {
      "sendAfterDays": 7
    },
    {
      "requestedSendTime": "2025-12-15T12:30:00Z",
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
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Selvidentifisert bruker

#### ID-porten e-post

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

```json
{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:idporten-email:jens.jensen@digdir.no"
  },
  "notification": {
    "notificationChannel": 0
  }
}
```

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:idporten-email:jens.jensen@digdir.no"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}

#### Utfaset brukernavn og passord

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="/instances/create">}}

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

{{</content-version-container>}}
{{<content-version-container version-label="/instances (multipart)">}}

```http
POST /ttd/min-app/instances HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="instance"
Content-Type: application/json

{
  "instanceOwner": {
    "externalIdentifier": "urn:altinn:person:legacy-selfidentified:jensjensen"
  }
}
--boundary
Content-Disposition: form-data; name="notification"
Content-Type: application/json

{
  "notificationChannel": 0
}
--boundary--
```

{{</content-version-container>}}
{{</content-version-selector>}}
