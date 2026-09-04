---
title: 'Vedlegg'
description: 'Referanseinformasjon om vedleggsentiteten'
weight: 25
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Vedlegg representerer logiske filer pluss én eller flere konkrete URL-representasjoner av disse filene.

Et vedlegg består av:

- metadata som `displayName` og valgfritt logisk `name`
- én eller flere URL-er i `urls`
- valgfri `expiresAt`

Hver URL representerer én konkret vedleggsrepresentasjon og kan variere etter:

- `mediaType`
- `consumerType`

Dette gjør det mulig å eksponere samme logiske vedlegg i ulike formater for ulike konsumenter, for eksempel en PDF for GUI-fronter og JSON eller XML for API-konsumenter.

Vedlegg kan finnes på to nivåer:

- på dialogroten
- på individuelle forsendelser

Vedlegg på dialognivå følger som standard autorisasjon på dialognivå, men kan ha sin egen [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) for å avgrense tilgangen ytterligere - tilgang til dialogen er fortsatt en forutsetning.

Forsendelsesvedlegg følger som standard autorisasjon på forsendelsesnivå, med samme mulighet til å ha sin egen autorisasjonskontekst - tilgang til forsendelsen er fortsatt en forutsetning. I sluttbruker-API-er skrives URL-ene til et vedlegg om til `urn:dialogporten:unauthorized` når brukeren ikke er autorisert til å få tilgang til det - eller, hvis `unauthorizedPresentation` er `Excluded`, fjernes vedlegget fra `attachments`, og bare ID-en og opprettelsestidspunktet vises i `excludedAttachments` ved siden av. Når vedlegget har en autorisasjonskontekst den nåværende brukeren er autorisert for, lister dialogtokenet opp vedleggets `id` (eller kontekstens `tokenRef`) i `e`-claimet sitt.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogAttachment">}}

**Les mer**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/dialog-tokens">}}

{{<children />}}
