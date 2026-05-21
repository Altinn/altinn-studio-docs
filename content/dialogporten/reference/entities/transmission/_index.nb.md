---
title: 'Forsendelse'
description: 'Referanseinformasjon om forsendelsesentiteten'
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Schemaet nedenfor viser sluttbrukerentiteten for forsendelse som returneres fra dialogdetaljer.

En forsendelse representerer én uforanderlig kommunikasjonsenhet inni en dialog. Listen over forsendelser kan bare utvides; eksisterende forsendelser oppdateres ikke eller fjernes ikke.

Viktige deler av forsendelsesmodellen er:

- `type`, som angir implementert forsendelseskategori som `Information`, `Acceptance`, `Rejection`, `Request`, `Alert`, `Decision`, `Submission` eller `Correction`
- `sender`, som identifiserer om forsendelsen kom fra tjenesteeieren eller en partsrepresentant
- `authorizationAttribute`, som kan overstyre standard autorisasjonsressurs brukt for forsendelsen
- `relatedTransmissionId`, som knytter forsendelsen til en annen forsendelse når tjenesteeieren ønsker å uttrykke den relasjonen
- `content`, `attachments` og `navigationalActions`, som inneholder den forsendelsesspesifikke presentasjons- og navigasjonsdataen

I sluttbruker-API-er forteller `isAuthorized` deg om den autentiserte brukeren kan få tilgang til innholdet i forsendelsen. Hvis tilgang nektes, er innebygd innhold og forsendelsesvedlegg ikke tilgjengelige, og navigasjons-URL-er skrives om til `urn:dialogporten:unauthorized`.

Tjenesteeier-API-ene eksponerer det samme forsendelseskonseptet i tjenesteeierens dialogentitet og i endepunktene for tjenesteeierforsendelser.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogTransmission">}}

{{<children />}}
