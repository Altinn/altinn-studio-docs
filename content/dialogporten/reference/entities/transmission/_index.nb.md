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
- en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) (foretrukket), som kan evaluere tilgang til forsendelsen mot en annen ressurs, flere parter, eller begge deler
- `authorizationAttribute` (utfaset), som kan overstyre standard autorisasjonsressurs brukt for forsendelsen
- `relatedTransmissionId`, som knytter forsendelsen til en annen forsendelse når tjenesteeieren ønsker å uttrykke den relasjonen
- `content`, `attachments` og `navigationalActions`, som inneholder den forsendelsesspesifikke presentasjons- og navigasjonsdataen

I sluttbruker-API-er forteller `isAuthorized` deg om den autentiserte brukeren kan få tilgang til innholdet i forsendelsen. Hvis tilgang nektes, avgjør forsendelsens `unauthorizedPresentation` hva som skjer: `Disabled` lar forsendelsen bli liggende i listen, maskerer den innebygde innholdsreferansen og URL-ene til de underliggende delene, og lar resten av innholdet være lesbart, mens `Excluded` fjerner forsendelsen fra `transmissions` og legger ID-en og opprettelsestidspunktet i `excludedTransmissions` ved siden av - de underliggende delene følger med. `contextToken` er til stede når forsendelsen har en autorisasjonskontekst den nåværende brukeren er autorisert for, og må brukes i stedet for dialogtokenet mot URL-ene til forsendelsen, også for [front channel embed]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}}).

De frittstående forsendelsesendepunktene følger den samme regelen: `GET` etter ID svarer `403 Forbidden` for en utelukket forsendelse, og forsendelseslisten utelater den ganske enkelt.

Tjenesteeier-API-ene eksponerer det samme forsendelseskonseptet i tjenesteeierens dialogentitet og i endepunktene for tjenesteeierforsendelser.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogTransmission">}}

**Les mer**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/context-tokens">}}

{{<children />}}
