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

Vedlegg på dialognivå følger autorisasjon på dialognivå.

Forsendelsesvedlegg følger autorisasjon på forsendelsesnivå. I sluttbruker-API-er skrives URL-er for forsendelsesvedlegg om til `urn:dialogporten:unauthorized` når brukeren ikke er autorisert til å få tilgang til forsendelsen.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogAttachment">}}

{{<children />}}
