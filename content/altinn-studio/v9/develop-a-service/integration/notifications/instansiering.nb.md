---
title: Varsle ved instansiering
linktitle: Varsling ved instansiering
description: Slik varsler du instanseieren når appen oppretter en instans
draft: true
weight: 30
toc: true
tags: [needsReview]
---

Når appen din oppretter en instans, kan du samtidig be Altinn om å varsle instanseieren på e-post eller SMS. Du styrer dette med feltet `notification` i instansieringsforespørselen, og du trenger ingen egen kode i appen for å ta funksjonen i bruk.

{{% notice warning %}}
Funksjonen krever versjon `8.11.0` eller nyere av `Altinn.App.Api` og `Altinn.App.Core`.
{{% /notice %}}

## Forutsetninger

Appen må ha støtte for tidssoner i containerbildet. Baseimaget `aspnet:8.0-alpine` inneholder ikke tidssonedata, og uten disse dataene kan varselet feile stille: appen oppretter instansen som normalt og API-et svarer `201 Created`, men varselet går aldri ut. Det eneste sporet er en feilmelding i apploggen.

Dette gjelder varsler der instansen har en frist (`dueBefore`) og varselet bruker egendefinerte tekster (`customEmail` eller `customSms`). Appen konverterer fristen til norsk lokaltid før den erstatter `$dueDate$`-tokenet, og den konverteringen trenger tidssonedata. Manglende tidssonedata gir også feil tidsstempler andre steder i appen, for eksempel i genererte PDF-er.

Apper som du har opprettet fra dagens appmal, har allerede denne støtten. I eldre apper må du legge til disse linjene i `Dockerfile`:

```Dockerfile
  # Add globalization timezone support
  RUN apk add --no-cache icu-libs icu-data-full tzdata
  ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
```

Linjene må ligge etter "FROM"-seksjonen som ender på "AS final". Se [Dockerfile i appmalen](https://github.com/Altinn/altinn-studio/blob/main/src/App/template/v8/src/Dockerfile) for et komplett eksempel.

## Slik fungerer det

Feltet `notification` hører hjemme i request-bodyen til `POST /instances/create` og `POST /instances` (multipart). I feltet velger du kanal for varselet, og du kan i tillegg oppgi egendefinerte tekster, planlagt sendetid og påminnelser.

### Felter i notification-objektet

#### InstantiationNotification

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| notificationChannel | int (enum) | Nei | Kanal for utsending. Standard: 4 (EmailAndSms). Se tabellen under for gyldige verdier. |
| language | string | Nei | Språkkode (nb, nn, en). Gjelder kun organisasjoner – privatpersoner får varselet på profilspråket sitt. |
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending (ISO 8601, UTC). Hvis du ikke setter feltet, går varselet ut så snart som mulig. Maks utsettelse er 30 dager. |
| allowSendingAfterWorkHours | bool | Nei | Tillater utsending utenom arbeidstid. Standard: false (kun dagtid). Gjelder kun SMS – e-post går ut uavhengig av tidspunkt. |
| customSms | objekt | Nei | Egendefinert SMS-tekst og avsendernavn. Hvis du ikke setter feltet, bruker Altinn standardteksten. |
| customEmail | objekt | Nei | Egendefinert e-postemne og brødtekst. Hvis du ikke setter feltet, bruker Altinn standardteksten. |
| reminders | liste | Nei | Liste med påminnelser som kan gå ut etter hovedvarselet. |

#### customSms

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| senderName | string | Ja | Avsendernavnet som mottakeren ser i SMS-en. Maks 11 tegn. |
| text | CustomText | Ja | Egendefinert SMS-tekst på nb, nn og en. |

{{% notice info %}}
Hvis avsendernavnet `senderName` er beskyttet – eller senere blir beskyttet – med et tredjepartsprodukt som SenderID, må du godkjenne Altinn/Digitaliseringsdirektoratet som meldingsprodusent.
{{% /notice %}}

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

{{% notice warning %}}
Du trenger Maskinporten for å kunne kansellere påminnelser.
{{% /notice %}}

Hvert objekt i `reminders`-listen kan inneholde disse feltene:

| Felt | Type | Påkrevd | Beskrivelse |
|---|---|---|---|
| requestedSendTime | string (datetime) | Nei | Tidligste tidspunkt for utsending av påminnelsen (ISO 8601, UTC). Du kan ikke kombinere feltet med `sendAfterDays`. Maks utsettelse er 30 dager. |
| sendAfterDays | int | Nei | Antall dager fra hovedvarselet til påminnelsen går ut. Du kan ikke kombinere feltet med `requestedSendTime`. Maks utsettelse er 30 dager. |
| customSms | objekt | Nei | Overstyrer SMS-teksten fra hovedvarselet for denne påminnelsen. |
| customEmail | objekt | Nei | Overstyrer e-postteksten fra hovedvarselet for denne påminnelsen. |

Hvis du verken setter `requestedSendTime` eller `sendAfterDays`, går påminnelsen ut så snart som mulig etter at Altinn har behandlet hovedvarselet.

Hvis du ikke oppgir egendefinerte tekster på påminnelsen, arver påminnelsen tekstene fra hovedvarselet.

### Kanalvalg (notificationChannel)

Merk at `notificationChannel` er en heltallsenum, ikke en tekststreng. Gyldige verdier er:

| Verdi | Kanal | Beskrivelse |
|---|---|---|
| 0 | Email | Kun e-post |
| 1 | Sms | Kun SMS |
| 2 | EmailPreferred | E-post først, SMS som reserve hvis mottakeren mangler e-postadresse |
| 3 | SmsPreferred | SMS først, e-post som reserve hvis mottakeren mangler telefonnummer |
| 4 | EmailAndSms | Både e-post og SMS samtidig (standard) |

### Språk

For privatpersoner henter Altinn språket automatisk fra profilen deres.

For organisasjoner gjelder språket du oppgir i instansieringsforespørselen (feltet `language` i `notification`-objektet), med norsk bokmål som reserve.

### Sendetidspunkt

Som standard går varsler kun ut i arbeidstiden. Hvis du vil tillate utsending når som helst på døgnet, setter du `allowSendingAfterWorkHours` til `true`. Dette gjelder både e-post og SMS.

### Planlagt sendetid

Hvis du setter `requestedSendTime`, går varselet tidligst ut på det tidspunktet. I tillegg kaller Altinn Varsling tilbake til appen rett før utsendingen for å bekrefte at varselet fortsatt er relevant. Appen kan da avvise utsendingen dersom tilstanden har endret seg – for eksempel hvis brukeren allerede har sendt inn instansen.

Hvis du ikke setter `requestedSendTime`, går varselet ut så snart som mulig, typisk innen noen minutter.

### Egen logikk for å avbryte varselet

Når du setter `requestedSendTime`, kaller Altinn Varsling tilbake til appen før hvert varsel og hver påminnelse. Som standard går varselet kun ut hvis prosessen ikke er avsluttet – det vil si at instansen fortsatt er aktiv og venter på svar fra brukeren.

Du kan overstyre denne oppførselen: skriv en klasse som bruker grensesnittet `ICancelInstantiationNotification`, og registrer klassen i DI-containeren.

```csharp
public class MyNotificationCancellation : ICancelInstantiationNotification
{
    public bool ShouldSend(Instance instance)
    {
        // Egen logikk her, for eksempel:
        // Send kun varselet hvis instansen ikke er arkivert
        return instance.Status?.IsArchived is not true;
    }
}
```

Registrer klassen i `Program.cs`:

```csharp
services.AddTransient<ICancelInstantiationNotification, MyNotificationCancellation>();
```

### Standardtekster

Hvis du ikke oppgir egendefinerte tekster, bruker Altinn standardtekster.

Eksempel på en mottatt e-post med standardtekst:

**Emne:** Nytt skjema opprettet i Altinn

**Brødtekst:** Testdepartementet har opprettet et nytt skjema (varsel-instansiering-ttd) for ASTROLOG NÆR med fødselsnummer 54928201018 - åpne innboksen i Altinn for å se skjemaet.

### Egendefinerte tekster og tokens

Egendefinerte tekster støtter disse tokenene, som Altinn erstatter dynamisk:

| Token | Beskrivelse |
|---|---|
| `$appName$`| Appens navn fra app-metadataene |
| `$instanceOwnerName$` | Navnet på instanseieren |
| `$serviceOwnerName$` | Navnet på tjenesteeieren fra Altinn CDN |
| `$orgNumber$` | Organisasjonsnummer (hvis instanseieren er en organisasjon) |
| `$socialSecurityNumber$` | Fødselsnummer (hvis instanseieren er en person) |
| `$dueDate$` | Fristen for instansen (format: `dd-MM-yyyy HH:mm:ss`) |

{{% notice warning %}}
Egendefinerte tekster kombinert med en frist (`dueBefore`) på instansen krever at containerbildet har støtte for tidssoner. Uten denne støtten går ingen varsler ut. Se [Forutsetninger](#forutsetninger).
{{% /notice %}}

### Slik finner Altinn mottakeradressene

Altinn Varsling finner adressene selv, basert på Altinn Profil for privatpersoner og Enhetsregisteret for organisasjoner.

I testmiljøer kan du endre kontaktopplysningene dine på
<https://tt02.altinn.no/ui/Profile>.

For å teste SMS i et testmiljø må nummeret være hvitelistet. Ta kontakt dersom du trenger det.

## Eksempler

Hvert eksempel nedenfor viser begge endepunktene:

- **`POST /{org}/{app}/instances/create`** – forenklet endepunkt der hele bodyen er ett JSON-objekt.
- **`POST /{org}/{app}/instances`** – multipart-endepunkt der `notification` må ligge i en egen multipart-part med `name="notification"` og `Content-Type: application/json`. Hvis du legger `notification` som et felt inni instance-template-parten, blir feltet stille ignorert.

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
    "notificationChannel": 0,
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
  "notificationChannel": 0,
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
