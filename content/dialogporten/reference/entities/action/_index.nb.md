---
title: 'Handling'
description: 'Referanseinformasjon om handlingsentitetene'
weight: 50
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Handlinger beskriver operasjoner som sluttbrukeren eller en klientintegrasjon kan utføre i forbindelse med en dialog.

Både GUI-handlinger og API-handlinger deler den samme grunnleggende autorisasjonsmodellen:

- `action` mappes til en handlingsidentifikator i policyen for tjenesteressursen
- en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) (foretrukket) kan evaluere handlingen mot en annen ressurs, flere parter, eller begge deler
- `authorizationAttribute` (utfaset) kan overstyre standard autorisasjonsressurs for handlingen
- `isAuthorized` viser om den autentiserte brukeren er autorisert akkurat nå
- `contextToken` er til stede når handlingen har en autorisasjonskontekst den nåværende brukeren er autorisert for, og må brukes i stedet for dialogtokenet mot URL-ene til handlingen

I sluttbruker-API-er skjules uautoriserte mål:

- URL-er for GUI-handlinger skrives om til `urn:dialogporten:unauthorized`
- URL-er for endepunkter i API-handlinger skrives om til `urn:dialogporten:unauthorized`

GUI-handlinger er ment for nettleserbaserte fronter og legger til UI-spesifikke felt som:

- `priority`
- `httpMethod`
- `title`
- valgfri `prompt`
- `isDeleteDialogAction`

API-handlinger er ment for klientintegrasjoner og grupperer ett eller flere versjonerte endepunkter. Hvert endepunkt kan eksponere:

- `version`
- `url`
- `httpMethod`
- valgfri `documentationUrl`
- valgfri `requestSchema`
- valgfri `responseSchema`
- `deprecated`
- valgfri `sunsetAt`

## GUI-handlinger

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogGuiAction">}}

## API-handlinger

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogApiAction">}}

**Les mer**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/context-tokens">}}

{{<children />}}
