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
 "type": "no.altinn.correspondence.correspondencepublished",
 "subject": "urn:altinn:organization:identifier-no:123456789",
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

**For tjeneste-eier:**

| Event | Når | Bruk |
|-------|-----|------|
| `no.altinn.correspondence.attachmentinitialized` | Vedlegg er opprettet og venter på opplasting | Spor opprettelse av vedlegg |
| `no.altinn.correspondence.attachmentpublished` | Vedlegg har bestått malware-skanning og er klart til bruk | Bekreftelse på at vedlegg er tilgjengelig og kan sendes med nye meldinger |
| `no.altinn.correspondence.attachmentuploadfailed` | Vedlegg feilet malware-skanning | Varsel på at vedlegget er avvist |
| `no.altinn.correspondence.attachmentexpired` | Vedleggets utløpsdato er passert, er ikke lenger tilgjengelig for mottaker og kan ikke brukes i nye meldinger | Bekreftelse på at vedlegg har utløpt |
| `no.altinn.correspondence.correspondenceinitialized` | Meldingen er opprettet | Bekreftelse på at melding er initialisert |
| `no.altinn.correspondence.correspondencepublished` | Meldingen er publisert og tilgjengelig for mottaker | Bekreftelse og varsel på at melding er vellykket publisert |
| `no.altinn.correspondence.correspondencepurged` | Meldingen er enten slettet av mottaker etter publisering eller av tjeneste-eier før publisering | Varsel på at melding er slettet |
| `no.altinn.correspondence.correspondencepublishfailed` | Publisering feilet | Varsel på at melding feilet før publisering og vil ikke bli tilgjengelig for mottaker |
| `no.altinn.correspondence.notificationcreated` | Varslingsordre er opprettet i Altinn Notification | Bekreftelse på at varsling er bestilt |
| `no.altinn.correspondence.correspondencenotificationcreationfailed` | Opprettelse av varslingsordre feilet | Varsel på at varslingsordre ikke ble vellykket bestilt. Vurder oppfølging |
| `no.altinn.correspondence.correspondencenotificationfailed` | En eller flere varselmottakere fikk ikke varslet (delvis feil) | Varsel til minst en varslingsaddresse hos meldingsmottaker ble ikke vellykket sendt, men minst en addresse har mottat varselet. Vurder oppfølging |
| `no.altinn.correspondence.correspondencenotificationallfailed` | Alle varselmottakere for hovedordren feilet (fullstendig feil), ikke inkludert valgfri mottakere | Mottakeren ble ikke vellykket varslet. Vurder oppfølging |
| `no.altinn.correspondence.correspondencenotificationdelivered` | Initialvarselet er blitt bekreftet levert | Bekreftelse på at mottaker er varslet |
| `no.altinn.correspondence.correspondencenotificationreminderdelivered` | Påminnelsesvarselet er blitt bekreftet levert | Bekreftelse på at påminnelse er sendt |

**For hver mottaker:**

| Event | Når | Bruk |
|-------|-----|------|
| `no.altinn.correspondence.correspondencepublished` | Meldingen er publisert og tilgjengelig | Mottaker kan hente innholdet |
| `no.altinn.correspondence.correspondencereceiverread` | Mottaker har lest meldingen | Spor lesestatus |
| `no.altinn.correspondence.correspondencereceiverconfirmed` | Mottaker har bekreftet meldingen | Spor bekreftelse av mottak |
| `no.altinn.correspondence.correspondencereceiverneverread` | Fristdato passert uten at mottaker leste meldingen | Utløs purringer eller eskaleringsflyt |
| `no.altinn.correspondence.correspondencereceiverneverconfirmed` | Fristdato passert uten at mottaker bekreftet meldingen | Utløs purringer eller eskaleringsflyt |
