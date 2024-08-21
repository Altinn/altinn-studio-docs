---
title: Altinn 3 Correspondence Utviklerguider
linktitle: Hendelser
description: Hvordan komme i gang med å abonnere på hendelser fra Altinn 3 Correspondence, for utviklere
tags: [Melding, guide, events, hendelser, Correspondence]
toc: true
weight: 40
---

{{<children />}}

{{% notice warning  %}}
Denne delen av dokumentasjonen er under arbeid, og refererer derfor i stor grad til eksterne kilder.
{{% /notice %}}

{{% notice warning  %}}
For øyeblikket er hendelsene for Melding ikke klare for fullskala bruk, på grunn av kommende endringer i Altinn Events og Autorisasjon.
Dette dokumenterer det forventede scenarioet, men kan endres.
{{% /notice %}}

For å bruke hendelser/webhooks for en meldingstjeneste, må du sette opp et abonnement for den gitte ressursen.
Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av megleren havner. [Du kan lese mer om hvordan du setter opp et hendelsesabonnement i Altinn Events her](/events/subscribe-to-events/developer-guides/setup-subscription/).

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

Dette abonnementet brukes til å konfigurere endepunktet der hendelsene som publiseres av Atlinn Melding skal leveres. [Du kan lese mer om hvordan du setter opp et hendelsesabonnement i Altinn Events her](/events/subscribe-to-events/developer-guides/setup-subscription/).

Du må sette opp følgende filtre:

- sourceFilter
  - TT02: <https://platform.tt02.altinn.no/broker/api/v1/filetransfer>
  - PROD: <https://platform.altinn.no/broker/api/v1/filetransfer>
- resourceFilter
  - "urn:altinn:resource:" + Ressurs-IDen for meldingstjenesten
- alternativesubjectfilter
  - "/organisation/(organisasjonsnummer for din organisasjon)

*Alternativesubjectfilter* brukes til å begrense Event til bare den autoriserte avsenderen eller mottakeren for den spesifikke hendelsen, dette sikrer innholdet og reduserer synlighet.

*Resourceinstance* vil alltid være det samme som FileTransferId for Filoverføringen.

I tillegg kan du ønske å bruke *typeFilter*, slik at du mottar hendelsestypene du er interessert i/kan utføre handlinger på.
Hvis du ikke spesifiserer et *typeFilter*, vil du motta alle forskjellige typer hendelser, gitt at du har tilgang til dem.

**For Avsendere:**

- WIP

**For både Avsendere og Mottakere:**

- WIP
