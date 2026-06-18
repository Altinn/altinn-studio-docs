---
title: 'Sett'
description: 'Referanseinformasjon om sett-logg-entiteten'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Schemaet nedenfor viser sett-logg-entiteten som returneres i dialogdetaljer.

Oppføringer i sett-loggen opprettes automatisk når et dialogdetaljendepunkt brukes til å hente en dialog. Søke- og listeoperasjoner oppretter ikke sett-logg-oppføringer.

Implementasjonen lagrer sett-informasjon per bruker og per dialogrevisjon:

- hvis samme bruker leser samme dialogrevisjon flere ganger, registreres bare den første tilgangen
- når dialogen endres og en ny revisjon opprettes, kan en ny sett-logg-oppføring opprettes for samme bruker

Hver oppføring inneholder:

- `id`
- `seenAt`
- `seenBy`
- `isViaServiceOwner`, som identifiserer oppføringer opprettet gjennom en frontend drevet av tjenesteeier
- `isCurrentEndUser`

Data i sett-loggen brukes også når `isContentSeen` beregnes. En dialog anses bare som innhold-sett hvis den er hentet etter siste innholdsoppdatering og den ikke har systemetiketten `MarkedAsUnopened`.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogSeenLog">}}

{{<children />}}
