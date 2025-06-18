---
title: 'Hendelser'
description: 'Informasjon om hendelsestyper produsert av Dialogporten'
weight: 50
---

## Introduksjon

Dette inneholder referanseinformasjon og eksempler på hendelser produsert av Dialogporten ved hjelp av Altinn Events.

For en funksjonell oversikt, se [komme i gang med hendelser]({{<relref "../../getting-started/events">}}).

For trinnvis informasjon om hvordan du bruker Altinn Events med Dialogporten, se [brukerhåndbøkene for å oppdage endringer]({{<relref "../../user-guides/detecting-changes">}}).

## Hendelsestyper

| Type                                          | Beskrivelse                                     |
|-----------------------------------------------|-------------------------------------------------|
| `dialogporten.dialog.created.v1`              | En ny dialog har blitt opprettet.                  |
| `dialogporten.dialog.updated.v1`              | En eksisterende dialog har blitt oppdatert.            |
| `dialogporten.dialog.deleted.v1`              | En dialog har blitt slettet.                      |
| `dialogporten.dialog.restored.v1`             | En dialog har blitt gjenopprettet.                     |
| `dialogporten.dialog.seen.v1`                 | En dialog har blitt sett (åpnet) av en sluttbruker. |
| `dialogporten.dialog.transmission.created.v1` | En forsendelse har blitt opprettet.                |

Hendelsene ovenfor er produsert direkte av Dialogporten. I tillegg er det hendelser som sendes ut når tjenesteeier oppdaterer [aktivitetsloggen]({{<relref "../../getting-started/activity-log">}}).

| Type                                                  | Beskrivelse                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| `dialogporten.dialog.activity.created.v1`             | En "dialog opprettet"-aktivitet har blitt lagt til.                   |
| `dialogporten.dialog.activity.closed.v1`              | En "dialog lukket"-aktivitet har blitt lagt til.                    |
| `dialogporten.dialog.activity.information.v1`         | Informasjonsaktivitet relatert til en dialog har blitt registrert. |
| `dialogporten.dialog.activity.transmission-opened.v1` | En forsendelse relatert til en dialog har blitt markert som åpnet. |
| `dialogporten.dialog.activity.payment-made.v1`        | En betalingsaktivitet i en dialog har blitt fullført.        |
| `dialogporten.dialog.activity.signature-provided.v1`  | En signatur har blitt gitt for en dialog.                   |
| `dialogporten.dialog.activity.dialog-opened.v1`       | En dialog har blitt markert som åpnet.                           |
| `dialogporten.dialog.activity.dialog-deleted.v1`      | En dialog har blitt markert som slettet.                          |
| `dialogporten.dialog.activity.dialog-restored.v1`     | En dialog har blitt gjenopprettet.                                   |
| `dialogporten.dialog.activity.sent-to-signing.v1`     | En dialog har blitt sendt til signering.                            |
| `dialogporten.dialog.activity.sent-to-form-fill.v1`   | En dialog har blitt sendt til skjemautfylling.                          |
| `dialogporten.dialog.activity.sent-to-send-in.v1`     | En dialog har blitt sendt for innsending.                            |
| `dialogporten.dialog.activity.sent-to-payment.v1`     | En dialog har blitt sendt til betaling.                            |
| `dialogporten.dialog.activity.form-submitted.v1`      | Et skjema tilknyttet dialogen er sendt inn.         |
| `dialogporten.dialog.activity.form-saved.v1`          | Et skjema tilknyttet dialogen er lagret.             |

## Hendelsesformat

Som med alle Altinn Events, danner [Cloud Events](https://cloudevents.io/) formatet grunnlaget for hendelsene som sendes ut av Dialogporten. Her er noen eksempler på hendelser:

### Eksempel 1 - dialog opprettet

```json
{
    "specversion": "1.0",

    // Unique event id
    "id": "91f2388f-bd8c-4647-8684-fd9f68af5b15",
    
    // See tables above for possible types
    "type": "dialogporten.dialog.created.v1",
    
    // Timestamp for when the event occured in Dialogporten
    "time": "2025-02-19T08:00:06.4014168Z",
    
    // urn:altinn:resource:{serviceResource}
    "resource": "urn:altinn:resource:super-simple-service", 
    
    // Dialog-ID
    "resourceinstance": "f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // Party
    "subject": "urn:altinn:organization:identifier-no::991825827",

    // URL to activity in Dialogporten
    "source": "https://platform.altinn.no/dialogporten/api/v1/enduser/dialogs/f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // These are additional fields, if present in the dialog (all are optional).
    "data": { 
        "process": "urn:some:process:id",
        "precedingProcess": "urn:some:preceding:process:id"
    }
} 
```


### Eksempel 2 - dialogaktivitet lagt til

```json
{
    "specversion": "1.0",

    // Unique event id
    "id": "91f2388f-bd8c-4647-8684-fd9f68af5b15",
    
    // See tables above for possible types
    "type": "dialogporten.dialog.activity.signature-provided.v1",
    
    // Timestamp for when the event occured in Dialogporten
    "time": "2025-02-20T13:04:02.6518542Z",
    
    // urn:altinn:resource:{serviceResource}
    "resource": "urn:altinn:resource:super-simple-service", 
    
    // Dialog-ID
    "resourceinstance": "f4e6df3c-7434-44c3-875e-8dca1cdf0b20",
    
    // Party
    "subject": "urn:altinn:organization:identifier-no::991825827",

    // URL to activity in Dialogporten
    "source": "https://platform.altinn.no/dialogporten.no/api/v1/enduser/dialogs/f4e6df3c-7434-44c3-875e-8dca1cdf0b20/activities/21241c7e-819f-462b-b8a4-d5d32352311a",
    
    // These are additional fields, if present. Only the activityId entry is always present for events
    // within the dialogporten.dialog.activity-namespace of events. All other fields are optional.
    "data": { 
        "activityId": "21241c7e-819f-462b-b8a4-d5d32352311a",
        "extendedActivityType": "additional-info-received",
        "process": "urn:some:process:id",
        "precedingProcess": "urn:some:preceding:process:id"
    }
} 
```



{{<children />}}