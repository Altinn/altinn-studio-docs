---
title: Hendelser i Altinn 3 Melding
linktitle: Hendelser
description: Hvordan komme i gang med å abonnere på hendelser fra Altinn 3 Correspondence, for utviklere
tags: [Melding, guide, events, hendelser, Correspondence]
toc: true
weight: 40
---

{{<children />}}

For å bruke hendelser/webhooks for en meldingstjeneste, må du sette opp et abonnement for den gitte ressursen.
Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av megleren havner.

Alle hendelser publisert av Altinn Melding følger det samme mønsteret:

```json
{
 "id": "1faa107f-3c0a-4fa6-9fce-7cee8838e258",
 "resource": "urn:altinn:resource:altinn-correspondence-test-resource-1",
 "resourceinstance": "da4ceacc-ad44-4e54-99b6-b58e3c13c785",
 "source": "https://platform.tt02.altinn.no/correspondence/api/v1/correspondence",
 "specversion": "1.0",
 "type": "no.altinn.correspondence.Published",
 "subject": "/party/50015641",
 "alternativesubject": "/organisation/123456789",
 "time": "2024-04-19T07:22:19.438039Z"
}
```

## Hendelsesabonnement {#event-subcription}

Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av Atlinn Melding skal leveres. [Du kan lese mer om hvordan du setter opp et hendelsesabonnement i Altinn Events her](/nb/events/subscribe-to-events/developer-guides/setup-subscription/).

Du må sette opp følgende filtre:

- sourceFilter
  - TT02: <https://platform.tt02.altinn.no/correspondence/api/v1/correspondence>
  - PROD: <https://api.altinn.no/correspondence/api/v1/correspondence>
- resourceFilter
  - "urn:altinn:resource:" + Ressurs-IDen for meldingstjenesten
- alternativesubjectfilter
  - "/organisation/(organisasjonsnummer for din organisasjon) eller "/person/(personnummer)

*Alternativesubjectfilter* brukes til å begrense Event til bare den autoriserte avsenderen eller mottakeren for den spesifikke hendelsen, dette sikrer innholdet og reduserer synlighet.

*Resourceinstance* vil alltid være det samme som CorrespondenceId for Meldingen.

I tillegg kan du ønske å bruke *typeFilter*, slik at du mottar hendelsestypene du er interessert i/kan utføre handlinger på.
Hvis du ikke spesifiserer et *typeFilter*, vil du motta alle forskjellige typer hendelser, gitt at du har tilgang til dem.

**For Avsender:**
- `no.altinn.correspondence.attachmentinitialized`
- `no.altinn.correspondence.attachmentuploadprocessing`
- `no.altinn.correspondence.attachmentpublished`
- `no.altinn.correspondence.attachmentuploadfailed`
- `no.altinn.correspondence.attachmentpurged`

- `no.altinn.correspondence.correspondenceinitialized`
- `no.altinn.correspondence.correspondencearchived`
- `no.altinn.correspondence.correspondencepurged`
- `no.altinn.correspondence.correspondencepublishfailed`
- `no.altinn.correspondence.correspondencereceiverread`
- `no.altinn.correspondence.correspondencereceiverconfirmed`
- `no.altinn.correspondence.Correspondencereceiverreserved`


**For både Avsendere og Mottakere:**
- `no.altinn.correspondence.correspondencepublished`
- `no.altinn.correspondence.correspondencereceiverneverread`
- `no.altinn.correspondence.correspondencereceiverneverconfirmed`
