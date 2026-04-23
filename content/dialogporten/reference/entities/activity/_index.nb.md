---
title: 'Aktivitet'
description: 'Referanseinformasjon om aktivitetsentiteten for dialoger'
weight: 30
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Schemaet nedenfor viser sluttbrukerentiteten for aktivitet som returneres fra dialogdetaljer.

Aktiviteter er uforanderlige tidslinjeoppføringer knyttet til en dialog. De brukes til å registrere tilstandsendringer og viktige hendelser rundt dialogen, og eventuelt rundt en bestemt forsendelse.

En aktivitet inneholder:

- `id`
- `createdAt`
- `type`
- valgfri `extendedType`
- valgfri `transmissionId`
- `performedBy`
- `description`, som bare er satt for `Information`

Se schemaet nedenfor for den autoritative listen over aktivitetstyper.

Aktiviteter kompletterer forsendelser. En forsendelse registrerer selve kommunikasjonsenheten, mens en aktivitet registrerer at noe skjedde med dialogen eller forsendelsen.

Opprettelse av aktiviteter brukes også av andre Dialogporten-funksjoner, inkludert Altinn Events og API-ene for varselbetingelser.

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogActivity">}}

{{<children />}}
