---
title: Altinn 3 Formidling Utviklerguider
linktitle: Hendelser
description: Hvordan komme i gang med å abonnere på hendelser fra Altinn 3 Formidling, for utviklere
tags: [Broker, guide, events, hendelser, Formidling]
toc: true
weight: 40
---

{{<children />}}

For å bruke hendelser/webhooks for en formidlingstjeneste, må du sette opp et abonnement for den gitte ressursen.
Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av megleren havner. [Du kan lese mer om hvordan du setter opp et hendelsesabonnement i Altinn Events her](/nb/events/subscribe-to-events/developer-guides/setup-subscription/).

Alle hendelser publisert av Altinn Formidling følger det samme mønsteret:

```json
{
 "id": "1faa107f-3c0a-4fa6-9fce-7cee8838e258",
 "resource": "urn:altinn:resource:altinn-broker-test-resource-1",
 "resourceinstance": "da4ceacc-ad44-4e54-99b6-b58e3c13c785",
 "source": "https://platform.tt02.altinn.no/broker/api/v1/filetransfer",
 "specversion": "1.0",
 "type": "no.altinn.broker.Published",
 "subject": "/party/50015641",
 "alternativesubject": "/organisation/123456789",
 "time": "2024-04-19T07:22:19.438039Z"
}
```

## Hendelsesabonnement {#event-subcription}

Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av Atlinn Formidling skal leveres. [Du kan lese mer om hvordan du setter opp et hendelsesabonnement i Altinn Events her](/nb/events/subscribe-to-events/developer-guides/setup-subscription/).

Du må sette opp følgende filtre:

- sourceFilter
  - TT02: <https://platform.tt02.altinn.no/broker/api/v1/filetransfer>
  - PROD: <https://api.altinn.no/broker/api/v1/filetransfer>
- resourceFilter
  - "urn:altinn:resource:" + Ressurs-IDen for formidlingstjenesten
- alternativesubjectfilter
  - "/organisation/(organisasjonsnummer for din organisasjon)

*Alternativesubjectfilter* brukes til å begrense Event til bare den autoriserte avsenderen eller mottakeren for den spesifikke hendelsen, dette sikrer innholdet og reduserer synlighet.

*Resourceinstance* vil alltid være det samme som FileTransferId for Filoverføringen.

I tillegg kan du ønske å bruke *typeFilter*, slik at du mottar hendelsestypene du er interessert i/kan utføre handlinger på.
Hvis du ikke spesifiserer et *typeFilter*, vil du motta alle forskjellige typer hendelser, gitt at du har tilgang til dem.

**For Avsendere:**

- `no.altinn.broker.filetransferinitialized`
- `no.altinn.broker.uploadprocessing`
- `no.altinn.broker.uploadfailed`
- `no.altinn.broker.allconfirmeddownloaded`
- `no.altinn.broker.filepurged`

**For både Avsendere og Mottakere:**

- `no.altinn.broker.published`
- `no.altinn.broker.downloadconfirmed`
- `no.altinn.broker.fileneverconfirmeddownloaded`

For ytterligere beskrivelse av hendelser og deres bruk, se utviklerguider for [sende filer]({{< relref "/broker/getting-started/developer-guides/send-files/" >}}) og [motta filer]({{< relref "/broker/getting-started/developer-guides/receive-files/" >}}), da disse beskriver hendelsene for de respektive rollene/prosessene.
