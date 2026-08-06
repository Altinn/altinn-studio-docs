---
title: Idempotens i Altinn 3 Melding
linktitle: Idempotens
description: Slik sikrer du at Altinn bare oppretter en melding én gang, selv om systemet ditt sender samme forespørsel flere ganger
tags: [Melding, guide, idempotens, idempotentKey, duplikater, Correspondence]
toc: true
weight: 50
---

{{<children />}}

Feltet `idempotentKey` sikrer at Altinn bare oppretter en melding én gang, selv om systemet ditt sender samme forespørsel flere ganger. **Vi anbefaler at alle som sender meldinger, bruker dette feltet.**

Uten nøkkelen kan Altinn ikke se om en forespørsel er et duplikat. Prøver integrasjonen din å sende forespørselen på nytt etter tidsavbrudd eller andre feil, så kan Altinn opprette en ny melding. Da får mottakeren to like meldinger i innboksen og ett varsel for hver av dem.

## Slik virker idempotentKey

`idempotentKey` er en GUID du legger ved når du oppretter en melding. Altinn lagrer nøkkelen sammen med meldingen, og

- den første forespørselen med en gitt nøkkel oppretter meldingen og får svaret `200 OK`
- alle senere forespørsler med samme nøkkel blir avvist med `409 Conflict` og feilkode 1034
- avviste forespørsler oppretter verken melding eller varsel

Altinn kontrollerer nøkkelen før noe blir opprettet. Kommer flere forespørsler med samme nøkkel helt samtidig, er det bare én som vinner. De øvrige får `409 Conflict`.

Nøkkelen har ingen utløpstid. Den gjelder for alltid, og den er felles for hele Altinn Melding.

### Legge nøkkelen ved forespørselen

`idempotentKey` ligger på øverste nivå i forespørselen, ved siden av `correspondence` og `recipients`:

```json
POST /correspondence/api/v1/correspondence

{
  "correspondence": { ... },
  "recipients": ["urn:altinn:organization:identifier-no:123456789"],
  "existingAttachments": [],
  "idempotentKey": "6b1f4c8e-3a2d-5f7b-9c04-1e8a5d2b7f36"
}
```

### Lage en stabil nøkkel

Nøkkelen virker bare hvis den er den samme hver gang systemet ditt prøver å sende den samme meldingen. Lager du en ny unik nøkkel rett før hvert kall, for eksempel med `Guid.NewGuid()`, får duplikate forespørsler hver sin nøkkel, og sikringen forsvinner.

Nøkkelen kan for eksempel være

- en UUID v5 regnet ut fra et fast navnerom og data som identifiserer utsendingen, som ressurs-id, mottaker og saksnummer
- en tilfeldig GUID, for eksempel UUID v7, som du lagrer før du kaller API-et

En UUID v5 blir den samme hver gang, uten at du lagrer noe. En UUID v7 er tidssortert og godt egnet som id i databaser, men verdien er tilfeldig, så du må lagre den for å finne den igjen ved nye forsøk.

### Slik finner du meldingen som finnes fra før

`409`-svaret inneholder ikke id-en til meldingen som finnes fra før. Trenger du den, søker du den opp med nøkkelen:

```
GET /correspondence/api/v1/correspondence?resourceId=<ressurs-id>&role=Sender&idempotentKey=<nøkkel>
```

Svaret inneholder id-en til meldingen. Finnes det ingen melding med nøkkelen, får du en tom liste.

## Begrensninger

- `idempotentKey` virker bare for forespørsler med én mottaker. Har du flere mottakere, sender du én forespørsel per mottaker med sin egen nøkkel. Ved [batch-utsending]({{< relref "/correspondence/explanation/basic-concepts" >}}) kan du ikke bruke nøkkelen.
- Altinn sammenligner ikke innholdet i meldingen. Sender du et annet innhold med samme nøkkel, får du `409 Conflict`, og meldingen som ble opprettet først, står uendret. Nøkkelen skal identifisere utsendingen, ikke innholdet.
- Sletter du meldingen, frigjør du ikke nøkkelen. Den samme nøkkelen gir fortsatt `409 Conflict`.
